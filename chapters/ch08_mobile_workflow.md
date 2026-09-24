[ 🏠 主目录 ](/) | [ ⬅️ 上一章 (Ch.07) ](./ch07_desktop_computer_use.md) | [ ➡️ 下一章 (Ch.09) ](./ch09_legacy_code.md) | [ 🌐 English ](../en/ch08_mobile_workflow.md)

# Ch.08 把构建告警和审批接到手机

> **问题**：离开电脑后，构建失败或待审操作可能无人处理。
>
> **本章实践**：搭建告警与人工审批链路，验证通知、身份和操作结果。

离开电脑时，构建结果和待审批操作仍需要被及时发现。本章先打通告警，再区分自动审查与人工决策。

示例把 GitHub Actions 的失败通知发到飞书，并演示一个本机决策中转网关。`--approve-for-me` 只审查适用的权限请求；生产发布还需独立确认项目、版本与部署结果。

---

## 理解方式：告警与审批是两条链路

自动检查负责尽早发现问题；通知负责把结果送到手机；审批则必须由能核对身份和任务的系统处理：

```text
GitHub Actions 检查失败 ──> 发送飞书告警 ──> 人在手机查看构建日志
Codex 权限请求       ──> 按当前策略审查 ──> 需要时由人确认
生产部署请求         ──> 核对项目、版本和审批人 ──> 独立部署程序执行并验证
```

这三条链路需要分别配置和验收。收到消息或记录“批准”都不等于部署成功。

---

## 动手实践：先完成这 3 步

用 3 步搭建你的移动告警通知通道：

1. **步骤一：创建飞书自定义群机器人**
   在群设置中添加机器人，复制其获得的 Webhook URL。
2. **步骤二：在终端发送一条测试告警卡片**  
   先在终端设置 `FEISHU_WEBHOOK_URL` 环境变量，再运行 curl 测试通知：
   ```bash
   curl -X POST -H "Content-Type: application/json" \
     -d '{"msg_type":"text","content":{"text":"Codex 测试通知：请确认手机能收到这条消息。"}}' \
     "$FEISHU_WEBHOOK_URL"
   ```
3. **步骤三：在沙盒中运行检查任务**
   在已确认测试不会改动生产数据后，可启动受工作区沙盒约束的任务：
   ```bash
   codex exec --sandbox workspace-write --approve-for-me "执行全仓回归测试并重构陈旧类型定义"
   ```

---

## 8.1 双层看护分流架构

下图展示建议的分流方式；自动审查是否放行取决于实际权限策略，手机通知不会自动授予部署权限：

```text
[项目检查] ──(失败)──> [飞书告警] ──> [人在手机查看日志]
[Codex 权限请求] ──> [当前沙盒与审批策略] ──> [人处理未获授权的请求]
[部署请求] ──> [身份与任务核对] ──> [人工确认] ──> [独立部署与结果验证]
```

配套参考开源工程：
- 关联参考工程：[plugins-codex-feishu](https://github.com/aipmer/plugins-codex-feishu)
- 本机极简穿透网关：[scripts/codex-watchdog](../scripts/codex-watchdog/README.md)

---

## 8.2 实战：GitHub Actions 失败推送与 Webhook 配置

在含有 `npm test` 脚本的 Node.js 项目中，创建 `.github/workflows/codex-watchdog.yml`。先把飞书机器人 URL 配为仓库 Secret `FEISHU_WEBHOOK_URL`。检查失败时发送简短告警，并保留失败状态；具体错误在 Actions 日志中查看：

```yaml
name: Codex Agent Watchdog

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  agent-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run Project Checks
        id: check
        continue-on-error: true
        run: |
          npm ci
          npm test

      - name: Push Fail Notice to Mobile
        if: steps.check.outcome == 'failure'
        env:
          FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}
        run: |
          curl -fsS -X POST -H 'Content-Type: application/json' \
            -d '{"msg_type":"text","content":{"text":"项目检查失败：请打开 GitHub Actions 查看本次运行日志。"}}' \
            "$FEISHU_WEBHOOK_URL"

      - name: Keep Check Failure Visible
        if: steps.check.outcome == 'failure'
        run: exit 1
```

---

## 8.3 户外移动端双向交互与审批

### 1. 场景：生产环境部署审批

下面是一条需要额外审批系统才能实现的通知示意；前述 Actions 告警和本机中转网关不会自动发送这张卡片：

```text
🚨 [Codex Auth Requested]
Project: pmer-cn-saas
Action: Deploy to production (Vercel)
Change summary: Implemented Stripe subscription webhook in /api/stripe.
Tests: 12 passed, 0 failed.
[回执指令]: 回复 "1" 批准发布，回复 "0" 记录拒绝，后续操作需人工确认。
```

### 2. 在本机检查审批中转网关

配套 `scripts/codex-watchdog/lib/gateway.js` 只接收决策并写入临时信号文件，**不会直接部署、终止 Codex 或回滚 Git**。它默认只监听 `127.0.0.1`，必须设置随机令牌。要从飞书接入，需要另行配置经身份验证的转发层，并由实际部署程序核对项目、任务和决策时效。

```bash
cd scripts/codex-watchdog
npm ci
export CODEX_WATCHDOG_TOKEN="$(openssl rand -hex 32)"
node bin/cli.js gateway --port 8080 &
gateway_pid=$!
```

仍在同一终端发送本地测试请求，返回 `denied` 表示已记录拒绝；它不会删除文件。测试后停止网关：

```bash
curl -fsS http://127.0.0.1:8080/api/mobile-reply \
  -H "Authorization: Bearer $CODEX_WATCHDOG_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"userMessage":"0"}'
kill "$gateway_pid"
```

---

## 8.4 关联参考工程：飞书助理 (Codex Feishu Sentinel)

可以查看作者维护的 **[plugins-codex-feishu（飞书助理）](https://github.com/aipmer/plugins-codex-feishu)**，了解飞书通知与审批的实现。使用前以该仓库当前 README、所需权限和测试结果为准。

按需要分别核对以下能力：

1. **日常巡检与值班日报（极速上手）**：
   - 核对日报的数据来源、发送对象与调度方式，并先发到测试会话。
2. **移动端警报与双向审批（离线编排）**：
   - 核对告警触发条件、送达情况和移动端回复的接收方式。
   - 手机端可提交审批意见；部署程序还应核对身份、项目、任务和有效期。拒绝操作只记录决定，不自动回滚代码。
3. **沉淀与进阶知识库（团队协同）**：
   - 如需写入飞书文档或多维表格，先核对应用权限与实际写入结果。

> 💡 **配置前核对**：若参考工程提供飞书应用清单，仍需在飞书开放平台检查所需权限、事件订阅和回调连接，再在测试群验证告警。

---

## 🛡️ 翻车自救与避坑速查表

| 常见踩坑现象 | 致命原因 | 排查与处理 |
| :--- | :--- | :--- |
| **手机接收不到 Webhook 消息** | 机器人安全设置中未配置自定义关键词或 IP 白名单 | 检查飞书机器人设置中的“安全设置”，设置包含关键词（如 `Codex`）或签名校验 |
| **手机回复了“1”但没有部署** | 本机网关只记录决策，没有部署程序 | 检查经过鉴权的转发层、任务核对和独立部署程序 |
| **手机反复收到审批消息** | 同一请求被重复发送 | 为审批请求设置唯一 ID、去重和过期时间 |

---

## 8.5 把通知与确认留给人

把重复检查交给 CI，把失败信息及时送达手机，可以减少反复守在电脑前等待的时间。对发布、数据变更等操作，仍要让有权限的人核对具体任务，并检查执行结果。

---

[ 🏠 主目录 ](/) | [ ⬅️ 上一章 (Ch.07) ](./ch07_desktop_computer_use.md) | [ ➡️ 下一章 (Ch.09) ](./ch09_legacy_code.md) | [ 🌐 English ](../en/ch08_mobile_workflow.md)
