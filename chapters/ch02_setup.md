[ 🏠 主目录 ](/) | [ ⬅️ 上一章 (Ch.01) ](./ch01_mindset.md) | [ ➡️ 下一章 (Ch.03) ](./ch03_sandbox.md) | [ 🌐 English ](../en/ch02_setup.md)

# Ch.02 安装 Codex 并核对运行环境

> **问题**：CLI、依赖或权限配置不一致时，任务会在运行前失败。
>
> **本章实践**：安装 CLI，核对版本与登录状态，再检查桌面和移动入口的可用条件。

工欲善其事，必先利其器。在“实战产品说”中，我常强调一个原则：**AI Native 开发的第一步，是把你的“指挥舱”配置得足够稳定。** 很多新手急着去跟 AI 聊天写代码，结果因为本地环境不匹配、权限没开对，导致 AI 在终端疯狂报错、浪费 Token。

本章将带你一步步配置 Codex 的多端生产力矩阵，包括 Codex CLI 客户端、ChatGPT 桌面端代码模式以及 ChatGPT 移动端的联动桥接。

---

## 理解方式：打造你的“三端作战指挥舱”

不要把各个端当成孤立的软件。想象你正在指挥一支太空探险队：

```text
【Codex CLI】           ──> 主机舱的「动力引擎」：挂载在终端底层，负责高并发、纯代码批处理、跑测试与 CI 构建。
【ChatGPT 桌面端代码模式】──> 舰桥的「全景战术大屏」：多仓库 Diff 审查、Sites 页面原位预览、Computer Use 视觉走查。
【手机 ChatGPT App】    ──> 舰长的「随身呼机」：离开工位时监控构建状态，收到需要人工处理的操作提醒（须另行接入审批系统）。
```

三端各司其职，你就不必死守在工位前按键盘，实现全天候随时随地编排交付。

---

## 动手实践：先完成这 3 步

如果你是第一天上手，不需要做复杂的网络穿透或高级脚本配置，按以下 3 步即可 5 分钟跑通首个任务：

1. **步骤一：安装 CLI 并完成账号鉴权**  
   先确认已安装 Node.js 和 npm，再在终端运行：
   ```bash
   npm install -g @openai/codex@latest
   codex
   ```
   浏览器将自动弹出 ChatGPT 登录窗口，登录你的账号完成快速绑定。
2. **步骤二：确认版本并选择当前模型**
   先运行 `codex --version`。截至 2026 年 9 月 24 日，官方更新日志列出的 CLI 版本是 `0.156.1`；本机版本可能不同。[更新日志](https://learn.chatgpt.com/docs/changelog)
   在账号可用时，用以下命令启动 GPT-6 Sol；现有 `~/.codex/config.toml` 不会被覆盖：
   ```bash
   codex --version
   codex --model gpt-6-sol
   ```
   若希望设为本地默认模型，在现有 `~/.codex/config.toml` 中设置：
   ```toml
   model = "gpt-6-sol"
   ```
3. **步骤三：用安全沙盒模式跑通第一个任务**  
   进入你的项目根目录，运行：
   ```bash
   codex exec --sandbox workspace-write "检查当前目录代码规范并输出修复建议"
   ```

---

## 2.1 CLI 客户端安装与版本核对

Codex CLI 核心由高效的 Rust 编写（codex-rs），但 OpenAI 通过 npm 提供了官方封装分发，**作为用户你完全不需要安装 Rust 工具链**，通过 npm 安装时，先用 `npm view @openai/codex@latest engines` 核对当前包的 Node.js 要求。

### 1. 基础环境检查与安装

在终端运行：

```bash
# 1. 检查 Node.js 和当前 npm 包的版本要求
node --version
npm view @openai/codex@latest engines

# 2. 安装当前最新稳定版 CLI；版本以官方更新日志为准
npm install -g @openai/codex@latest

# 或使用官方一键脚本（macOS / Linux）
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Windows 用户可通过 PowerShell 安装：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

安装完成后验证版本：

```bash
codex --version
```

### 2. 认证方式选择：ChatGPT 账号 vs API Key

Codex CLI 提供两种认证方式，**官方默认推荐 ChatGPT 账号登录**：

- **方式 A（推荐 / 默认）**：直接在终端运行 `codex`，浏览器会自动弹出 ChatGPT 登录页面。**ChatGPT Plus（$20/月）、Pro、Team、Business、Edu、Enterprise 套餐都已经包含 Codex 用量额度**，对独立开发者是性价比最高的选择。
- **方式 B（按量计费 / CI 场景）**：使用 OpenAI API Key。适合 CI/CD 自动化流水线或没有浏览器交互的服务器。

使用 API Key 登录时，按 [Codex CLI 官方说明](https://learn.chatgpt.com/docs/codex/cli)从安全存储中读取密钥，不要把真实密钥写入仓库或教学示例。

### 3. 账单熔断防爆配置

很多新手最担心的就是 AI 暴走刷爆信用卡。Codex 提供多道用量与权限控制：

1. **OpenAI 后台硬上限（最关键）**：在 OpenAI 开发者后台为该 API Key 设置月度 Usage Limit 硬限制（新手建议设为 $50）。即使 AI 陷入异常死循环，也能确保你的资金万无一失。
2. **模型与任务匹配**：在 Codex 中选择实际可用的模型，日常复杂编码可从 `gpt-6-sol` 开始；API 账单与 Codex 订阅用量分别核对。
3. **沙盒与自动审批**：新的非交互调用使用 `--sandbox workspace-write`；`--approve-for-me` 是独立的自动审批模式，不能保证所有请求获准，也没有官方固定的 Luna 后台模型。[权限说明](https://learn.chatgpt.com/docs/permission-modes)

### 4. 可选：评估第三方供应商切换工具

如果要在不同模型供应商之间切换，先确认目标供应商的 API 兼容性和数据处理方式。**[Codex Switch](https://github.com/aipmer/codex-switch)** 是本书作者维护的独立开源工具，不属于 OpenAI 官方 CLI。其项目 README 记录了适用版本、配置步骤和对本机会话文件的修改方式；跨供应商续聊不能对未来版本作保证。

按该仓库当前 README，入口脚本是 `codex-switch.sh`，并不存在 `install.sh` 或 `codex-switch --to` 命令。先阅读 README、备份本机会话与配置，再按需要配置供应商并运行脚本。以下只核对下载后的入口文件，不执行切换：

```bash
git clone https://github.com/aipmer/codex-switch.git
cd codex-switch
test -f codex-switch.sh && sed -n '1,35p' README.md
```

---

## 2.2 桌面端：ChatGPT 桌面客户端「Codex 代码模式」

> ⚠️ **重要生态演进**：2026 年下半年，原独立的 Codex 桌面应用正式退役，所有桌面端能力已完全并入 **ChatGPT 桌面客户端**。

### 1. 安装与进入代码模式

```bash
# macOS：直接下载 ChatGPT.dmg，拖入 Applications
# Windows：使用 winget 一键安装
winget install OpenAI.ChatGPT
```

启动 ChatGPT 客户端并登录后，点击左侧边栏的 **Codex** 标签页，即进入「Codex 代码模式（Code Mode）」。

**新增核心生产力特性：**
- **Sites 原位托管**：在客户端内一键创建、部署和预览 Web 项目，配合 Annotations 批注实现“指着界面改代码”。
- **多仓库审查（Multi-repo Review）**：大型微服务或多包工程可在单一视图下统一审查 Diff。
- **内置浏览器升级**：直接检索浏览历史，并可引用当前 Chrome 打开的标签页进行上下文分析。

### 2. Computer Use 视觉测试权限配置

让 AI 自主操作桌面屏幕（Computer Use）**目前主要支持 macOS**，需在 macOS「系统设置 → 隐私与安全性」中授予 ChatGPT 两项核心权限：

```text
[macOS 系统设置] -> [隐私与安全性]
  ├─ 辅助功能 (Accessibility)  ──> 勾选 [ChatGPT] (允许模拟鼠标点击/按键)
  └─ 屏幕录制 (Screen Recording) ──> 勾选 [ChatGPT] (允许截屏并由 Vision 模型分析)
```

**安全边界控制**：
- 首次操作某个第三方应用（如 Google Chrome）时，会弹窗询问你是否授权该应用。
- ChatGPT 无法自动操作终端本身、自身界面或系统级管理员授权弹窗（例如 `sudo` 提权输入密码）。

---

## 2.3 手机端（ChatGPT App）全天候看护桥接

人在户外或离岗时，无需死守工位：

1. **官方原生任务同步**：当你使用 ChatGPT 账号登录 Codex 时，终端与云端的任务都会实时同步到手机 ChatGPT App 中。你可以掏出手机查看长任务的执行进度、随时发送补充指令。
2. **Guardian 审批与 Webhook 提醒**：结合 Ch.08 的移动看护网关，当遇到需要人工确认的临界高危操作（如线上部署、数据库变更）时，可通过飞书等渠道发送告警；真正的放行或驳回需要经过身份验证、任务绑定和执行结果检查。

---

## 🛡️ 翻车自救与避坑速查表

| 常见报错 / 翻车现象 | 核心原因 | 排查与处理 |
| :--- | :--- | :--- |
| `--full-auto` 显示弃用警告 | 旧调用仍走兼容入口 | 新的非交互调用使用 `--sandbox workspace-write` |
| `SyntaxError: Unexpected token ...` (Node 报错) | 本地 Node.js 版本低于 20 | 运行 `node -v` 检查，使用 `nvm use 20` 或 `nvm install 20` 升级 Node |
| `Permission denied: Screen Recording` | macOS 未开启屏幕录制权限 | 打开「系统设置 → 隐私与安全性 → 屏幕录制」，将 ChatGPT / Terminal 勾选开启并重启客户端 |
| `gpt-5.4` 在 Codex 登录态不可用 | 该模型于 2026-08-31 从 Codex 的 ChatGPT 登录态退役 | 检查 `~/.codex/config.toml`，在账号可用时选择 `gpt-6-sol` |

---

[ 🏠 主目录 ](/) | [ ⬅️ 上一章 (Ch.01) ](./ch01_mindset.md) | [ ➡️ 下一章 (Ch.03) ](./ch03_sandbox.md) | [ 🌐 English ](../en/ch02_setup.md)
