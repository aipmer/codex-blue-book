# Codex 蓝皮书：从项目规则到交付验证

![Codex 实战蓝皮书](./images/cover.jpg)

[ 🌐 在线沉浸阅读站 (VitePress) ](https://book.pmer.cn) | [ 📥 下载中文版 PDF ](./codex_blue_book_zh.pdf) | [ 📥 Download English PDF ](./codex_blue_book_en.pdf) | [ 🌐 English Version ](#english-version)

> **v1.3.1 · 资料核对至 2026 年 9 月 24 日。** 本书通过 13 章中英双语实践，介绍如何写清项目规则、验证智能体改动、排查环境问题，以及用配套工程测试支付与移动端流程。示例需按自己的项目和当前官方文档核对。作者：[aipmer](https://pmer.cn)（[X](https://x.com/ai_pmer)）。

---

### 🌟 v1.3.1 内容校订 (2026年9月24日)

*   **核对 GPT-6 三款模型与 Codex CLI**：按 [OpenAI 更新日志](https://learn.chatgpt.com/docs/changelog)记录 CLI 0.156.1（2026 年 9 月 23 日发布），说明 Astra、Sol、Luna 的任务分工、可用范围和模型选择命令。第 13 章区分 API 定价与 Codex 订阅用量，并校对官方退役日期。
*   **保留可检查的 3D 实践示例**：以 Astra 整理资产要求，使用 Tripo3D 生成 GLB，再用 Blender `bpy` 渲染并通过 Three.js 展示；移除缺乏官方一手依据的评测数字和集成声明。
*   **注明第三方工具边界**：[Codex Switch](https://github.com/aipmer/codex-switch) 是本仓库作者的独立开源项目，切换供应商前应检查其配置与会话兼容性。
*   **双语内容校订**：13 对章节统一说明问题、动手步骤和验收方式；修正不准确的能力承诺和固定完成时间。

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
*   [Ch.01 从代码生成到结果验收](./chapters/ch01_mindset.md)
*   [Ch.02 安装 Codex 并核对运行环境](./chapters/ch02_setup.md)
*   [Ch.03 排查沙盒与本地服务的连接](./chapters/ch03_sandbox.md)

### 第二部分：架构工程与智能体约束
*   [Ch.04 用目标和验收条件指导智能体](./chapters/ch04_goal_driven.md)
*   [Ch.05 用 AGENTS.md 记录项目规则](./chapters/ch05_agents_protocol.md)
*   [Ch.06 检查执行过程并及时纠偏](./chapters/ch06_reasoning_steer.md)

### 第三部分：高级多端编排与巡检
*   [Ch.07 用真实界面验证前端](./chapters/ch07_desktop_computer_use.md)
*   [Ch.08 把构建告警和审批接到手机](./chapters/ch08_mobile_workflow.md)
*   [Ch.09 先建立基线，再逐步改造旧系统](./chapters/ch09_legacy_code.md)

### 第四部分：一人公司的商业闭环
*   [Ch.10 验证订阅制 SaaS 的支付闭环](./chapters/ch10_saas_mvp.md)
*   [Ch.11 用 Expo 构建并检查移动应用](./chapters/ch11_expo_mobile.md)
*   [Ch.12 从产品使用数据到获客实验](./chapters/ch12_commercialization.md)

### 第五部分：前沿瞭望与版本迁移
*   [Ch.13 核对 2026 年的模型与工具变更](./chapters/ch13_2026_frontier.md)

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
2. **移动端决策中转网关**：在本机记录批准或拒绝信号；实际审批与部署仍需独立鉴权和人工确认（Ch.08）。

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

*   **[飞书助理 (Codex Feishu Sentinel)](https://github.com/aipmer/plugins-codex-feishu)**：Ch.08 的关联参考工程，可用于了解通知与人工审批流程；部署前请核对项目当前支持的功能和权限配置。
*   **[Codex Switch](https://github.com/aipmer/codex-switch)**：本仓库作者维护的第三方 macOS 供应商切换工具；使用前请核对当前支持范围和备份会话数据。

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

本书中提及的部分命令（如 `codex --verbose --show-cot`、`codex refine`）、环境变量（如 `CODEX_MAX_BUDGET_PER_TASK`）以及模型代号（如 `GPT-5.5`）为针对自主代理（Autonomous Agent）协作流程设计的**示意/概念性演示**，旨在展示 AI 编排中的“目标驱动”、“思维纠偏”等设计模式与心智模型，并非特定的商业工具或硬性标准。

---
---

## 🌐 English Version

[ 🌐 Online Reader (VitePress) ](https://book.pmer.cn) | [ 📥 Download Chinese PDF ](./codex_blue_book_zh.pdf) | [ 📥 Download English PDF ](./codex_blue_book_en.pdf) | [ 🌐 中文版 ](#)

# Codex Blue Book: From Project Rules to Verified Delivery

![Codex Practical Blue Book](./images/cover_en.jpg)

> **v1.3.1 · Sources checked through September 24, 2026.** Across 13 bilingual chapters, this book shows how to write project rules, verify agent changes, diagnose environments, and test payment and mobile flows with companion projects. Check examples against your project and current official documentation. Author: [aipmer](https://pmer.cn) ([X](https://x.com/ai_pmer)).

---

### 🌟 v1.3.1 Content Revision (September 24, 2026)

*   **Verified GPT-6 Family and Codex CLI**: Records CLI 0.156.1, released September 23, 2026, from the [OpenAI changelog](https://learn.chatgpt.com/docs/changelog). Ch.13 explains the roles, availability, and selection commands for Astra, Sol, and Luna; it separates API prices from Codex subscription usage and checks retirement dates against official sources.
*   **Inspectable 3D Workflow Example**: Use Astra to structure requirements, a service such as Tripo3D to generate a GLB, Blender `bpy` to render it, and Three.js to display it. Unverified benchmark figures and integration claims have been removed.
*   **Third-party tool boundary**: [Codex Switch](https://github.com/aipmer/codex-switch) is a separate open-source project by this repository's author. Check its configuration and session compatibility before switching providers.
*   **Bilingual editorial revision**: All 13 chapter pairs now state the problem, practical steps, and verification method; unsupported capability and fixed-time promises were corrected.

---

## 🧭 Directory and Navigation

### Part 1: Product Survival in the AI-Native Era
*   [Ch.01 From Code Generation to Verified Results](./en/ch01_mindset.md)
*   [Ch.02 Install Codex and Check Your Environment](./en/ch02_setup.md)
*   [Ch.03 Diagnose Sandbox Access to Local Services](./en/ch03_sandbox.md)

### Part 2: Architecture & Constraints
*   [Ch.04 Guide Agents with Goals and Acceptance Checks](./en/ch04_goal_driven.md)
*   [Ch.05 Record Project Rules in AGENTS.md](./en/ch05_agents_protocol.md)
*   [Ch.06 Inspect Progress and Correct Course](./en/ch06_reasoning_steer.md)

### Part 3: Advanced Multi-Surface Telemetry
*   [Ch.07 Validate Frontends in a Real UI](./en/ch07_desktop_computer_use.md)
*   [Ch.08 Route Build Alerts and Approvals to Mobile](./en/ch08_mobile_workflow.md)
*   [Ch.09 Baseline and Refactor Legacy Code Incrementally](./en/ch09_legacy_code.md)

### Part 4: One-Person SaaS Commercialization
*   [Ch.10 Validate a Subscription SaaS Payment Flow](./en/ch10_saas_mvp.md)
*   [Ch.11 Build and Check a Mobile App with Expo](./en/ch11_expo_mobile.md)
*   [Ch.12 From Product Usage to Acquisition Experiments](./en/ch12_commercialization.md)

### Part 5: Frontier Watch & Version Migration
*   [Ch.13 Check 2026 Model and Tool Changes](./en/ch13_2026_frontier.md)

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
*   **[Codex Switch](https://github.com/aipmer/codex-switch)**: A separate macOS provider-switching tool maintained by this repository's author. Check current support and back up session data before using it.

---

## 🤖 Codex Collaboration Protocol

Please review [AGENTS.md](./AGENTS.md) to inspect our repository's compliance protocol rules.

---

*This project is under active development. Join the conversation at [pmer.cn](https://pmer.cn) or follow **Real-World Product Talk (实战产品说)** on WeChat!*

---

## ⚠️ Disclaimer

Some commands (e.g., `codex --verbose --show-cot`, `codex refine`), environment variables (e.g., `CODEX_MAX_BUDGET_PER_TASK`), and model references (e.g., `GPT-5.5`) mentioned in this book are **illustrative/conceptual demonstrations** designed to explain autonomous agent orchestration. They do not represent specific commercial software or mandatory production standards.
