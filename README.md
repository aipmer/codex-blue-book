# 📘 《Codex 蓝皮书：从入门到架构大师》

![Codex 实战蓝皮书](./images/cover.jpg)

[ 🌐 在线沉浸阅读站 (VitePress) ](https://book.pmer.cn) | [ 📥 下载中文版 PDF ](./codex_blue_book_zh.pdf) | [ 📥 Download English PDF ](./codex_blue_book_en.pdf) | [ Codex 工具频道 ](https://pmer.cn/ai-tools/codex/) | [ 🌐 English Version ](#english-version)

> 💡 **AI 原生时代的产品研发与多端编排实战指南 (v1.5.0 · 资料核对至2026年11月26日)**
> 
> “做产品，最忌讳的是自嗨；用 AI 写代码，最忌讳的是人被 AI 牵着走。本书不讲花哨的学术理论，只聊怎么帮独立开发者和产品经理，用最新的 Codex 客户端以最快速度搓出能赚钱、能跑通商业闭环的产品。这是实战产品说一贯风格。” —— 主理人 [aipmer](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))

---

### 🌟 v1.5.0 四书门户升级与内容精修 (2026年11月26日)

*   **站点升级为「AI 编程实战蓝皮书系列」总门户**：`book.pmer.cn` 新增四书选型书架、横向对比页（`/compare`）与多智能体通用规约生成器（支持 Codex / Claude Code / Gemini Antigravity / Kimi Code），保留 Codex 原有 `/chapters/*` 与 `/en/ch*` 路由 100% 零死链；三本新书（Claude / Gemini / Kimi）分阶段上线。
*   **核对 GPT-6.2、GPT-6.1 Terra 与 Codex CLI 0.172.0**：更新 `gpt-6.2-astra`（$8/$0.40/$40）、`gpt-6.2-sol`（$2/$0.10/$10）、`gpt-6.1-terra`（$1/$0.05/$5）选型与定价；同步 CLI `0.172.0` 的线程深链导航、斜杠命令 `Tab` 补全、MCP 懒启动、工具级审批与 Bedrock 支持，并补充 `2026-11-30` 与 `2026-12-23` 退役预警。
*   **全书 26 章双语精修与 GEO/SEO 基建**：清理跨章遗留的 `GPT-5.6` 旧表述与套话，补齐全部章节独立 SEO Frontmatter、原生 `sitemap.xml`、`robots.txt`、`llms.txt`、`canonical`/`hreflang` 与 JSON-LD 结构化数据。
*   **收录配套开源利器：[Codex Switch](https://github.com/aipmer/codex-switch)**：macOS 平台 1 秒切换 OpenAI / DeepSeek / Kimi Code，支持跨供应商会话续聊，缓解单一供应商限流困扰。

<!--
## 🗺️ 多端发布与传播矩阵

本项目为 **“一源多端”** 发布体系，内容同步发布于以下渠道：

*   **开源源码库**：[GitHub Repository](https://github.com/aipmer/codex-blue-book) (本仓库) - 存放所有源文件、配置模板与实战工程代码。
*   **个人站点**：[pmer.cn](https://pmer.cn) - 精美极客风在线文档站，支持暗黑模式、移动端优化与代码一键复制。
*   **微信公众号**：**实战产品说** - 深度硬核干货剖析、开发避坑踩坑实录、一人公司商业变现逻辑。
*   **高密 PDF**：简化双语合并版 PDF，适合朋友圈与开发者社群一键转发。
-->

---

## 🧭 全书目录与导航

### 第一部分：AI-Native 时代的产品生存法则
*   [Ch.01 告别手写代码：Vibe Coding 时代的产品心智](./chapters/ch01_mindset.md) - 重新思考人机协作边界
*   [Ch.02 跨端掌控：Codex 多端生产力矩阵搭建](./chapters/ch02_setup.md) - CLI、桌面端与移动端联调
*   [Ch.03 破局云端孤岛：沙盒调试与本地环境深度穿透](./chapters/ch03_sandbox.md) - 网络、文件挂载与端口映射

### 第二部分：架构工程与智能体约束
*   [Ch.04 目标驱动：用“边界与断言”驾驭推理型智能体](./chapters/ch04_goal_driven.md) - 为什么不该教大厨切菜？
*   [Ch.05 制定 CAP 协议：构建项目专属的 AGENTS.md 规则层](./chapters/ch05_agents_protocol.md) - 制定上下文记忆与代码防腐层
*   [Ch.06 思维纠偏：如何像技术总监一样透视 CoT 推理链](./chapters/ch06_reasoning_steer.md) - 解读思考日志与动态干预

### 第三部分：高级多端编排与巡检
*   [Ch.07 视觉闭环：Desktop Computer Use 自动巡检与设计还原](./chapters/ch07_desktop_computer_use.md) - 模拟用户行为，打通视觉端到端测试
*   [Ch.08 移动看护工作流：全天候离线编排实战](./chapters/ch08_mobile_workflow.md) - 随时随地，使用手机微信或飞书监控项目构建
*   [Ch.09 架构复苏：混乱遗留系统的全景解析与渐进式解耦](./chapters/ch09_legacy_code.md) - 让 AI 读懂并优化百万行混乱代码

### 第四部分：一人公司的商业闭环
*   [Ch.10 商业实战：2小时跑通 Next.js + Stripe 商业级 MVP](./chapters/ch10_saas_mvp.md) - Next.js 15 + Supabase + Stripe 实战
*   [Ch.11 触角延伸：Expo 跨端原生 App 开发与云端打包](./chapters/ch11_expo_mobile.md) - 从本地模拟器联调到云端一键打包
*   [Ch.12 终局思考：独立开发者如何打造自动化商业飞轮](./chapters/ch12_commercialization.md) - 一人公司（One-Person SaaS）的流量与变现路径

### 第五部分：前沿瞭望与版本迁移
*   [Ch.13 前沿瞭望：2026 Codex 生态全景升级](./chapters/ch13_2026_frontier.md) - GPT-6.2 与 GPT-6.1 Terra 选型、CLI 0.172.0 核对与退役迁移指南

---

## 🛠️ Codex 智能体协作模板 (AGENTS-*.md)

为了方便开发者快速在项目中应用 **Codex 协作协议 (CAP)**，我们在 [templates/](./templates) 目录下提供了主流前后端框架的开箱即用双语模板。模板中深度融入了 **AI 循环防范机制 (Anti-Loop Safeguards)** 及沙盒环境边界定义：

*   [Next.js (React) 协作规约](./templates/AGENTS-nextjs.md)
*   [Vue 3 + Vite 协作规约](./templates/AGENTS-vue3-vite.md)
*   [FastAPI (Python) 协作规约](./templates/AGENTS-fastapi.md)
*   [Django (Python) 协作规约](./templates/AGENTS-django.md)
*   [Spring Boot (Java) 协作规约](./templates/AGENTS-spring-boot.md)
*   [React Native (Expo) 协作规约](./templates/AGENTS-react-native.md)
*   [Go (Gin/Fiber) 协作规约](./templates/AGENTS-go-gin.md)
*   [Rust (Axum) 协作规约](./templates/AGENTS-rust-axum.md)
*   [Svelte (SvelteKit) 协作规约](./templates/AGENTS-svelte.md)

---

## 📡 Codex Watchdog CLI 工具

[scripts/codex-watchdog](./scripts/codex-watchdog/README.md) 是一个极简的命令行工具包，用于辅助开发者完成：
1. **本地环境反向穿透**：打通本地数据库/服务与云端沙盒（Ch.03）。
2. **移动端审批中转网关**：实现户外使用手机审批智能体高危操作（Ch.08）。

---

## 🎬 演示录屏 (Democast)

Codex 自主完成 Ch.07 视觉巡检任务（审查并修复 landing 页可访问性问题）的真实终端录制：

![Codex 视觉巡检演示](./case-studies/recordings/ch07-codex-visual-audit-demo.gif)

*更多演示与复现命令见 [case-studies](./case-studies/README.md)。*

---

## 📈 项目迭代与进度追踪

- [📝 更新日志 (Changelog)](./docs/Changelog.md)：记录近一周及后续所有的功能迭代、CI 问题与解决方案。
- [📋 开发任务板 (Task Board)](./docs/Dev_Task.md)：追踪当前开发进度、进行中的任务以及后续的 Roadmap。

---

## 🔌 关联开源项目

*   **[飞书助理 (Codex Feishu Sentinel)](https://github.com/aipmer/plugins-codex-feishu)**：蓝皮书 Ch.08 官方参考工程。专为 Codex 开发者打造的飞书助理，支持日报自动汇总推送、CI 熔断移动端警报与手机端一键审批。
*   **[Codex Switch (多供应商无缝切换)](https://github.com/aipmer/codex-switch)**：macOS Codex 多供应商一键切换利器。支持 OpenAI 官方 / DeepSeek / Kimi Code 秒级平滑切换，历史会话跨供应商无缝续聊，彻底解决单模型配额耗尽与 Rate Limit 限流难题。

---

## 🤖 Codex 协作协议规范

开始实践前，建议在项目根目录下配置 **`AGENTS.md`**：

```markdown
# 🤖 Codex Collaboration Protocol (CAP)

## 📌 Project Signature
- Tech Stack: Node.js, React, TypeScript
- Directory Rule: Keep components in `src/components`, logic in `src/hooks`

## 🛑 Hard Constraints
- Never update package.json dependencies without manual approval.
- Do not remove any inline TypeScript documentation or comments.
- Always run `npm run test` before declaring a task complete.
```

*可直接参考 [AGENTS.md](./AGENTS.md) 了解本项目自身的智能体协作规范。*

---

*本项目持续迭代更新，欢迎在 pmer.cn 官网或公众号“实战产品说”中留言讨论！*

---

## ⚠️ 说明 (Disclaimer)

本书中标注为“示意/概念演示”的示例脚本用于阐释目标驱动、沙盒隔离与思维纠偏等工程模式；模型 ID、CLI 版本号与定价均按对应版本的官方更新日志核对并标注日期，实际使用以各供应商最新文档为准。

---
---

## 🌐 English Version

[ 🌐 Online Reader (VitePress) ](https://book.pmer.cn) | [ 📥 Download Chinese PDF ](./codex_blue_book_zh.pdf) | [ 📥 Download English PDF ](./codex_blue_book_en.pdf) | [ Codex Tool Hub (中文) ](https://pmer.cn/ai-tools/codex/) | [ 🌐 中文版 ](#)

# 📘 *Codex Practical Blue Book: From Beginner to Architect*

![Codex Practical Blue Book](./images/cover_en.jpg)

> 💡 **AI-Native Product Development & Multi-Surface Orchestration (v1.5.0 · Sources checked November 26, 2026)**
>
> "Product development is never about self-gratification; and in AI coding, the biggest trap is letting the AI lead the human. This book cuts out the fluff. We focus on helping indie hackers and product managers leverage OpenAI Codex to ship monetizable products. This is the hard-boiled style we practice at pmer.cn" —— Main Author [aipmer](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))

---

### 🌟 v1.5.0 Four-Book Portal & Content Revision (November 26, 2026)

*   **Four-Book Series Portal**: `book.pmer.cn` now serves the **AI Coding Blue Books Series (Codex · Claude · Gemini · Kimi)** with a horizontal comparison hub (`/en/compare`) and multi-agent rules generator (`/en/generator`), preserving all existing Codex URLs with zero broken links.
*   **Verified GPT-6.2, GPT-6.1 Terra & Codex CLI 0.172.0**: Updated pricing and routing for `gpt-6.2-astra`, `gpt-6.2-sol`, `gpt-6.1-terra`, and `gpt-6-luna`; added CLI `0.172.0` thread links, Tab completion, lazy stdio MCP startup, per-tool approvals, Bedrock support, and Nov 30 / Dec 23 deprecation alerts.
*   **26-Chapter Polish & GEO/SEO Infrastructure**: Removed stale `GPT-5.6` leftovers and filler prose across all 26 bilingual chapters; added per-chapter frontmatter, `sitemap.xml`, `robots.txt`, `llms.txt`, `canonical`/`hreflang`, and JSON-LD schema.
*   **Featured Open-Source Companion: [Codex Switch](https://github.com/aipmer/codex-switch)**: 1-second provider switching (OpenAI / DeepSeek / Kimi Code) on macOS with cross-provider conversation resume.

---

## 🧭 Directory and Navigation

### Part 1: Product Survival in the AI-Native Era
*   [Ch.01 Saying Goodbye to Handwritten Code: Product Mindset in the Era of Vibe Coding](./en/ch01_mindset.md)
*   [Ch.02 Cross-Device Control: Building Your Codex Multi-Surface Productivity Matrix](./en/ch02_setup.md)
*   [Ch.03 Breaking the Cloud Island: Sandbox Debugging and Deep Local Environment Tunneling](./en/ch03_sandbox.md)

### Part 2: Architecture & Constraints
*   [Ch.04 Taming Reasoning Agents with Boundaries and Assertions](./en/ch04_goal_driven.md)
*   [Ch.05 Defining the CAP Protocol: Building Your Project's AGENTS.md Rule Compliance Layer](./en/ch05_agents_protocol.md)
*   [Ch.06 Correcting Course: Supervising the CoT Reasoning Chain Like a Tech Lead](./en/ch06_reasoning_steer.md)

### Part 3: Advanced Multi-Surface Telemetry
*   [Ch.07 Closing the Visual Loop: Automated Auditing and Design Verification with Desktop Computer Use](./en/ch07_desktop_computer_use.md)
*   [Ch.08 Mobile Sentinel Workflows: 24/7 Remote Development and Orchestration](./en/ch08_mobile_workflow.md)
*   [Ch.09 Codebase Revitalization: Reverse Engineering and Progressive Decoupling of Legacy Systems](./en/ch09_legacy_code.md)

### Part 4: One-Person SaaS Commercialization
*   [Ch.10 Monetization in Practice: Shipping a Commercial SaaS MVP in 2 Hours](./en/ch10_saas_mvp.md)
*   [Ch.11 Mobile Extension: Expo Cross-Platform App Development and Cloud Packaging](./en/ch11_expo_mobile.md)
*   [Ch.12 The Final Frontier: Building an Automated Growth Flywheel for a One-Person SaaS](./en/ch12_commercialization.md)

### Part 5: Frontier Watch & Version Migration
*   [Ch.13 Frontier Watch: The 2026 Codex Ecosystem Overhaul](./en/ch13_2026_frontier.md) - GPT-6.2 & GPT-6.1 Terra routing, CLI 0.172.0 checks, and retirement migration guidance

---

## 🛠️ Codex Agent Collaboration Templates (AGENTS-*.md)

To quickly deploy the **Codex Collaboration Protocol (CAP)** in your own tech stacks, we provide pre-configured bilingual templates under [templates/](./templates):

*   [Next.js (React) CAP Spec](./templates/AGENTS-nextjs.md)
*   [Vue 3 + Vite CAP Spec](./templates/AGENTS-vue3-vite.md)
*   [FastAPI (Python) CAP Spec](./templates/AGENTS-fastapi.md)
*   [Django (Python) CAP Spec](./templates/AGENTS-django.md)
*   [Spring Boot (Java) CAP Spec](./templates/AGENTS-spring-boot.md)
*   [React Native (Expo) CAP Spec](./templates/AGENTS-react-native.md)
*   [Go (Gin/Fiber) CAP Spec](./templates/AGENTS-go-gin.md)
*   [Rust (Axum) CAP Spec](./templates/AGENTS-rust-axum.md)
*   [Svelte (SvelteKit) CAP Spec](./templates/AGENTS-svelte.md)

---

## 📡 Codex Watchdog CLI Helper

[scripts/codex-watchdog](./scripts/codex-watchdog/README.md) is a lightweight companion utility designed for:
1. **Reverse Tunneling**: Bridges local development databases/services with the cloud sandbox (Ch.03).
2. **Sentinel Gateway**: Authorizes high-risk agent operations remotely from WeChat/Feishu on mobile devices (Ch.08).

---

## 🎬 Democast

A real terminal recording of Codex autonomously completing the Ch.07 visual audit task (reviewing and fixing landing-page accessibility issues):

![Codex Visual Audit Demo](./case-studies/recordings/ch07-codex-visual-audit-demo.gif)

*More demos and reproduction commands in [case-studies](./case-studies/README.md).*

---

## 📈 Project Metrics & Tracking

- [📝 Changelog](./docs/Changelog.md): Chronological updates, CI issue resolutions, and features from the past week.
- [📋 Development Task Board](./docs/Dev_Task.md): Tracks current progress, active items, and future Roadmap.

---

## 🔌 Related Projects

*   **[Feishu Assistant (Codex Feishu Sentinel)](https://github.com/aipmer/plugins-codex-feishu)**: The official companion repository for Ch.08. An intelligent duty assistant in Feishu for Codex developers, featuring automated daily git digest pushes, CI mobile alarms, and one-tap remote approvals.
*   **[Codex Switch (Multi-Provider Switcher)](https://github.com/aipmer/codex-switch)**: One-click provider switcher for macOS Codex CLI. Seamlessly switch between official OpenAI, DeepSeek, and Kimi Code in seconds with cross-provider chat history continuation, bypassing quota caps and rate limits.

---

## 🤖 Codex Collaboration Protocol

Please review [AGENTS.md](./AGENTS.md) to inspect our repository's compliance protocol rules.

---

*This project is under active development. Join the conversation at [pmer.cn](https://pmer.cn) or follow **Real-World Product Talk (实战产品说)** on WeChat!*

---

## ⚠️ Disclaimer

Code blocks marked as illustrative/conceptual demos explain goal-driven specs, sandboxing, and reasoning-steering patterns. Model IDs, CLI versions, and standard API prices are verified against official changelogs as of the dated cutoff; check vendor docs for current availability.
