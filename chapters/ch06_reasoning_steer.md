[ 🏠 主目录 ](/) | [ ⬅️ 上一章 (Ch.05) ](./ch05_agents_protocol.md) | [ ➡️ 下一章 (Ch.07) ](./ch07_desktop_computer_use.md) | [ 🌐 English ](../en/ch06_reasoning_steer.md)

# Ch.06 检查执行过程并及时纠偏

> **问题**：任务持续运行时，错误假设可能扩大改动范围。
>
> **本章实践**：查看可见的计划、命令和差异；发现偏离后中断并给出具体限制。

在传统开发中，管理初级程序员时最让人头疼的情景，莫过于他闷头闭门造车一周，最后交付了一堆与业务方向南辕北辙的代码，甚至把主干分支改崩。

无论使用哪款模型，任务范围和前置假设都可能出错。长任务应定期检查可见计划、工具调用和实际差异。

本章说明如何根据可见的执行记录发现偏离，并用明确的限制纠正任务。

---

## 理解方式：在 AI 脑海里装一个“监考透视窗”

不要把 AI 推理当成一个黑盒魔术：

```text
【被动盲等模式】 ──> 就像期末考试，你坐在考场外干等 2 小时，交卷后才发现学生从第一道题就把公式背错了，整张试卷全判零分。
【透视纠偏模式】 ──> 就像你在考场里站在学生身后，看着他面前的「草稿纸」（Reasoning Summary）：
                     - 他刚在草稿纸写下：“假设要重写整个数据库 Schema……”
                     - 你立刻轻轻拍拍他肩膀：“别动 Schema，只改当前的查询索引！”
                     - 学生瞬间在草稿纸划掉错误思路，重新回到正轨。
```

推理摘要可帮助理解当前方向，但仍应以实际命令、文件差异和测试结果为准。

---

## 动手实践：先完成这 3 步

用 3 步学会像技术总监一样监督并纠正 AI：

1. **步骤一：启动交互式 TUI 并锁定 Reasoning 面板**  
   在终端运行 `codex`，观察当前版本提供的状态摘要、工具调用和输出。
2. **步骤二：发现假定走偏立即按下 `Ctrl + C`**  
   一旦在思考流中看到它打算引入陌生外部依赖或重构核心非目标文件，立即按下 `Ctrl + C` 中断。
3. **步骤三：一句话精准纠偏并恢复会话**  
   直接输入修正提示词：“禁止重构已有数据表，改用内存缓存解决”，然后要求它先复述新的限制，再继续修改。

---

## 6.1 为什么要看模型的推理过程？

Codex 界面可能显示模型生成的推理摘要和执行状态；具体呈现随客户端与模型而变。可以用这些信息检查方向，但它们并不等于完整的内部推理。

```text
[用户需求] ──> 1. 解析目标与限制 ──> 2. 规划步骤 ──> 3. 运行测试 ──> 4. 自我修正 ──> [最终输出]
                 └───(在 TUI 中显示为 Reasoning Summary，即你的“监考视窗”)───┘
```

> ⚠️ **注意**：完整的思维链（Chain of Thought）为安全防护内部流，TUI 中看到的是模型自主生成的**推理摘要**。它只能作为线索，技术选型还应通过代码差异与验证结果确认。

---

## 6.2 如何在 TUI 中观察并解读推理过程

### 1. 交互模式（TUI）

运行 `codex` 进入 TUI。命令会随版本变化，先用 `/help` 核对可用指令，再查看差异或发起审查：

```bash
# TUI 交互快捷命令
/diff       # 查看当前会话生成的真实代码变动
/review     # 唤起子智能体自动审查最近的代码变更
/copy       # 快速复制最后一条响应代码
```

### 2. 非交互模式（脚本化分析）

在后台运行长任务时，可通过 JSONL 流进行监控：

```bash
# 非交互模式，输出结构化 JSONL 流
codex exec --json "重构认证中间件" > task.jsonl
```

### 实时推理摘要示范

当 Codex 收到“修复 Redis 限流器连接超时”时，Reasoning 面板的健康思考流通常如下：

```text
[Reasoning Summary - 正常流]
- User wants to fix Redis rate limiter connection timeout.
- Checking existing implementation in src/lib/redis.ts...
- Found `redis = new Redis()` without retryStrategy.
- If Redis is unreachable, this hangs the Node process, violating the 3000ms SLA in AGENTS.md.
- Action Plan:
  1. Add `maxRetriesPerRequest: null` and explicit connectTimeout: 2000.
  2. Implement custom retryStrategy up to 3 attempts.
  3. Run `npm run test:redis` to verify behavior.
```

---

## 6.3 识别 AI 陷入的典型“死循环”

在日常开发中，必须对以下两类死循环保持敏锐：

### 1. 依赖狂躁循环 (The Dependency Loop)
- **特征**：AI 尝试使用一个未经测试的新库，安装报错后，在推理流中尝试更换 3 个不同的版本或换成另一个更陌生的第三方库。
- **信号**：终端连续出现 `npm install --legacy-peer-deps` 超过 2 次。

### 2. 补丁打地鼠循环 (The Regression Loop)
- **特征**：修改 A 文件导致测试用例 B 挂掉；它去改 B，结果 C 模块报错；它回头去改 C，A 又坏了。
- **信号**：测试通过率在 80% 和 90% 之间反复横跳，且反复修改同一批文件。

---

## 6.4 介入三部曲：打断、修正与接管

### 第一步：果断打断 (`Ctrl + C`)
按下 `Ctrl + C`，立即终止当前任务，阻止 Token 损耗。

### 第二步：点对点纠偏（直接对话）
打断后直接告诉它盲区所在：
```text
你刚才试图引入 axios-retry，但本项目严禁使用第三方 HTTP 重试库。请使用原生的 AbortController 实现超时，重新规划。
```

### 第三步：人手接管与 Git 回滚
如果代码已经被改乱，先检查差异并确认该文件没有需要保留的人工改动，再只恢复目标文件：
```bash
git diff -- src/lib/redis.ts
git restore -- src/lib/redis.ts
```
在 [AGENTS.md](../AGENTS.md) 中追加一条红线：“严禁引入外部重试依赖”。

---

## 6.5 章节实操配套：Codex Web Copilot (Chrome 扩展沙盒样例)

为了让读者直观体验如何使用 Codex 思考链引导与 Anti-Loop 护栏进行浏览器插件开发，本项目配套提供了开箱即用的轻量开源样例：

👉 **源码沙盒目录**：[examples/ch06-chrome-extension](https://github.com/aipmer/codex-blue-book/tree/main/examples/ch06-chrome-extension)

### 核心亮点：
1. **纯原生 Manifest V3**：零打包依赖，直接在 Chrome 浏览器中「加载已解压的扩展程序」即可 1 分钟开箱体验；
2. **严格 CSP 护栏**：在 `AGENTS.md` 中严禁内联脚本与 `eval()`，展示 AI 智能体如何在最严苛的浏览器安全沙盒下编写高可用代码；
3. **自动化测试守卫**：执行 `npm test` 自动验证 MV3 规范与脚本语法。

---

## 🛡️ 翻车自救与避坑速查表

| 常见踩坑现象 | 致命原因 | 排查与处理 |
| :--- | :--- | :--- |
| **AI 陷入自我修改死循环停不下来** | 提示词缺少明确的重试上限阈值 | 立即 `Ctrl + C` 中断，在对话中追加指令：“已触发重试阈值，停止自旋，输出排查结论” |
| **打断后重新提问，AI 忘记了前面的背景** | 会话上下文丢失 | 使用 `codex resume` 恢复原有会话线程，保留先前的思考上下文 |
| **AI 改坏了多个历史核心文件** | 未在修改前隔离改动 | 先用 `git status` 和 `git diff` 确认要保留的文件；仅恢复确认可丢弃的改动，并为后续任务使用独立分支或工作树 |

---

[ 🏠 主目录 ](/) | [ ⬅️ 上一章 (Ch.05) ](./ch05_agents_protocol.md) | [ ➡️ 下一章 (Ch.07) ](./ch07_desktop_computer_use.md) | [ 🌐 English ](../en/ch06_reasoning_steer.md)
