---
title: "Ch.03 确定性防线：Claude Code Hooks 生命周期门禁与 Code Mode | Claude 实战蓝皮书"
description: "详解 .claude/settings.json 的 PreToolUse、PostToolUse 与 PreSkillShellCommand 钩子脚本，配合 v2.1.323+ 实验性 Code Mode 提速批量工程改动。"
lastUpdated: 2026-11-26
---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.02) ](./ch02_context_economics.md) | [ ➡️ 下一章 (Ch.04) ](./ch04_whiteboards_docs.md) | [ 🌐 English ](/en/claude/ch03_hooks_code_mode)

# Ch.03 确定性防线：`Hooks` 生命周期门禁与实验性 Code Mode 批处理

> 🎯 **具体工程麻烦**：在 Prompt 里写十遍“严禁执行 `rm -rf` 或强推 `main`”，模型在复杂排障时仍可能误触发高危命令；逐个文件串行调工具改 30 个文件又慢到让人崩溃。  
> 💡 **可运行实战代码与落地收益**：配套可运行样例 [examples/claude-hooks-kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/claude-hooks-kit)（含 `.claude/settings.json` 与危险命令拦截脚本）；掌握 v2.1.323+ Code Mode 并行编排。  
> ⚡ **社交传播 / 截图金句**：“靠 Prompt 劝 AI 别删库，是把生产安全押在概率上；用 Hooks 拦在工具执行前，才是确定性工程。”

任何大模型的指令遵循本质上都是概率性的。即使 99.5% 的时候它都乖乖听话，只要在高并发调试的第 200 次误删了目录或把 `.env` 打印进了日志，一次事故就足以抵消一个月的效率红利。

Claude Code 给出的工程解法是 **Hooks（确定性生命周期门禁）**——由宿主程序在固定节点强制执行本地脚本，**不依赖模型是否记得规则，也不消耗任何上下文 Token**。与此同时，Claude Code `v2.1.323+` 引入的实验性 **Code Mode** 把原本串行的一连串工具调用压缩成脚本化并行执行，大幅拉高批量改造速度。

---

## 🎯 生活化直觉隐喻：工地安全员的“物理门禁闸机”

```text
【只靠 Prompt 叮嘱】 ──> 在门口贴标语“请勿带火种进仓库”，工人忙昏头时仍可能顺手带进去。
【配置 Hooks 门禁】  ──> 门口装上金属探测闸机（PreToolUse）：
                         - 只要工具入参命中 `rm -rf`、`git push --force` 或 `.env` 读取，
                           闸机直接亮红灯拦截（exit 2），把拒绝理由原样退回给模型；
                         - 每次改完 `.ts` 文件出门自动刷一遍格式化（PostToolUse）。
```

---

## 🚀 新手极速上手 3 步走（无痛起步）

1. **步骤一：在项目创建 `.claude/hooks/` 目录并放入拦截脚本**
   参考本仓库配套可运行工具包 `examples/claude-hooks-kit/`，将拦截脚本设为可执行：
   ```bash
   mkdir -p .claude/hooks
   chmod +x .claude/hooks/block-dangerous-bash.sh
   ```
2. **步骤二：写入 `.claude/settings.json` 挂载钩子**
   利用 2026 版支持的 `if` 条件过滤语法，只拦截命中的工具调用，避免无谓开销。
3. **步骤三：故意触发一条被禁命令做红队自测**
   在测试分支对 Claude 说“运行 `git push --force`”，确认钩子在真正执行前立即拦截并输出拒绝原因。

---

## 3.1 生产级 `.claude/settings.json` 三层门禁配置

下面是一套真实可落盘的项目级配置，覆盖 `PreToolUse`（防高危命令与密钥泄露）、`PostToolUse`（改完源码自动格式化）和 `PreSkillShellCommand`（防第三方 Skill 注入未授权 Shell）：

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(*)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-bash.sh"
          }
        ]
      },
      {
        "matcher": "Read|Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-secrets.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "if": "Edit(*.ts)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/format-on-edit.sh"
          }
        ]
      }
    ],
    "PreSkillShellCommand": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous-bash.sh"
          }
        ]
      }
    ]
  }
}
```

### 配套拦截脚本：`.claude/hooks/block-dangerous-bash.sh`

Claude Code 执行命令型 Hook 时，会通过 `stdin` 传入包含 `tool_name` 与 `tool_input` 的 JSON。以下脚本使用 `node` 解析输入（无需额外安装 `jq`），命中危险模式时以退出码 `2` 阻断执行并把明确提示退回给模型：

```bash
#!/usr/bin/env bash
set -euo pipefail

PAYLOAD="$(cat)"

node -e '
const input = JSON.parse(process.argv[1] || "{}");
const cmd = String(input?.tool_input?.command || input?.command || "");
const blocked = [
  { re: /\brm\s+-[a-zA-Z]*r[a-zA-Z]*f\b|\brm\s+-[a-zA-Z]*f[a-zA-Z]*r\b/, reason: "Blocked recursive force delete (rm -rf)" },
  { re: /\bgit\s+push\b.*(--force|-f)\b/, reason: "Blocked force push to remote repository" },
  { re: /\bgit\s+reset\s+--hard\b/, reason: "Blocked destructive git reset --hard" },
  { re: /\b(DROP\s+TABLE|TRUNCATE\s+TABLE)\b/i, reason: "Blocked destructive SQL DDL statement" },
  { re: /curl\b.*\|\s*(sh|bash)\b/, reason: "Blocked piping remote script directly to shell" }
];
for (const rule of blocked) {
  if (rule.re.test(cmd)) {
    console.error(`[Claude Hook Blocked] ${rule.reason}: ${cmd}`);
    process.exit(2);
  }
}
' "$PAYLOAD"
```

### 配套密钥保护脚本：`.claude/hooks/protect-secrets.sh`

防止智能体在排错过程中误读或改写 `.env`、私钥与云厂商凭据文件（同时规避加密命名管道挂死风险）：

```bash
#!/usr/bin/env bash
set -euo pipefail

PAYLOAD="$(cat)"

node -e '
const input = JSON.parse(process.argv[1] || "{}");
const target = String(input?.tool_input?.file_path || input?.tool_input?.path || "");
if (/(^|\/)\.env(\.[^/]+)?$|credentials\.env$|\.pem$|\.key$/i.test(target) && !target.endsWith(".env.example")) {
  console.error(`[Claude Hook Blocked] Direct access to secret file is forbidden: ${target}`);
  process.exit(2);
}
' "$PAYLOAD"
```

---

## 3.2 实验性 Code Mode（v2.1.323+）：脚本化并行工具编排

在传统工具调用循环里，如果你要批量给 40 个接口文件补充参数校验、提取路由清单并统一校验导入路径，模型不得不发起几十轮“调用一次 Read → 等返回 → 调用一次 Edit → 等返回”的串行往返，每轮还要重发整段对话历史。

Claude Code `v2.1.323+` 推出的实验性 **Code Mode** 改变了执行路径：模型可以直接编写并执行一段轻量的 **JavaScript 编排脚本**，在单轮内并行调度多个读取、搜索、过滤与结构化改写调用，只把汇总后的关键结果回传主上下文。

**最适合开启 Code Mode 的三类重活：**
1. **跨目录批量结构化迁移**：例如把 50 个路由里的旧日志函数统一迁移到新结构化 Logger，并同步校验每个文件的 import。
2. **大规模日志与报错过滤**：在沙盒脚本内先对数万行测试输出去重聚合，只把 5 类独立根因送回模型，避免把主上下文瞬间打爆。
3. **跨文件一致性核对**：一次并行检查所有 i18n 字典文件的键集合差异，直接产出缺失键报告。

> [!IMPORTANT]
> **安全边界提醒**：Code Mode 提升了批量吞吐，也放大了单轮改动的爆炸半径。上线前务必先配好本节的 `PreToolUse` Hooks 与干净 Git 分支，确保所有批量脚本都在可控沙盒内运行。

---

## 🛡️ 翻车自救与避坑速查表

| 常见踩坑现象 | 致命原因 | 极速自救方案 |
| :--- | :--- | :--- |
| **写好了 Hook 脚本却提示权限不足或直接跳过** | 脚本缺少可执行位或路径未用 `"$CLAUDE_PROJECT_DIR"` | 执行 `chmod +x .claude/hooks/*.sh`，并在终端用 `echo '{"tool_input":{"command":"rm -rf /"}}' \| .claude/hooks/block-dangerous-bash.sh` 单测 |
| **`PostToolUse` 格式化脚本拖慢每次微小编辑** | 未加 `if` 条件过滤，连修改 Markdown 也触发 Prettier | 用 `"if": "Edit(*.ts)"` 或 `"if": "Edit(*.tsx)"` 精准限定后缀 |
| **读取外部工具托管的 `.env` 命名管道导致会话卡死** | 命名管道阻塞文件读取 | 升级至 Claude Code v2.1.308+，并通过 `protect-secrets.sh` 直接拦截 `.env` 读取 |

---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.02) ](./ch02_context_economics.md) | [ ➡️ 下一章 (Ch.04) ](./ch04_whiteboards_docs.md) | [ 🌐 English ](/en/claude/ch03_hooks_code_mode)
