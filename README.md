# 《Codex 蓝皮书：从入门到架构大师》

![Codex 蓝皮书](./images/cover.jpg)

[在线沉浸阅读 (book.pmer.cn/codex/)](https://book.pmer.cn/codex/) | [下载中文版 PDF](./codex_blue_book_zh.pdf) | [Download English PDF](./codex_blue_book_en.pdf) | [AI 协作规则生成器](https://book.pmer.cn/generator) | [English Version](#english-version)

> **版本 v1.5.0 · 资料核对至 2026 年 11 月 26 日**  
> 聚焦深度推理、科研计算、复杂后端与运维排错，涵盖 GPT-6.2 Astra/Sol、GPT-6.1 Terra、Codex CLI 0.172.0 与从 0 到 1 的端到端工程交付。
>
> 本指南为 [pmer.cn](https://pmer.cn) 主理人 Hunk Wu（[@ai_pmer](https://x.com/ai_pmer)）独立编写的开源工程实战手册，非官方出版物。

---

## 全书章节目录（中文）

- [Ch.01 告别手写代码：Vibe Coding 时代的产品心智](./chapters/ch01_mindset.md)
- [Ch.02 跨端掌控：Codex 多端生产力矩阵搭建](./chapters/ch02_setup.md)
- [Ch.03 破局云端孤岛：沙盒调试与本地环境深度穿透](./chapters/ch03_sandbox.md)
- [Ch.04 目标驱动：用“边界与断言”驾驭推理型智能体](./chapters/ch04_goal_driven.md)
- [Ch.05 制定 CAP 协议：构建项目专属的 AGENTS.md 规则层](./chapters/ch05_agents_protocol.md)
- [Ch.06 思维纠偏：如何像技术总监一样透视推理过程](./chapters/ch06_reasoning_steer.md)
- [Ch.07 视觉闭环：Desktop Computer Use 自动巡检与设计还原](./chapters/ch07_desktop_computer_use.md)
- [Ch.08 移动看护工作流：全天候离线编排实战](./chapters/ch08_mobile_workflow.md)
- [Ch.09 架构复苏：混乱遗留系统的全景解析与渐进式解耦](./chapters/ch09_legacy_code.md)
- [Ch.10 商业实战：2小时跑通 Next.js + Stripe 商业级 MVP](./chapters/ch10_saas_mvp.md)
- [Ch.11 触角延伸：Expo 跨端原生 App 开发与云端打包](./chapters/ch11_expo_mobile.md)
- [Ch.12 终局思考：独立开发者如何打造自动化商业飞轮](./chapters/ch12_commercialization.md)
- [Ch.13 前沿瞭望：2026 Codex 生态全景升级](./chapters/ch13_2026_frontier.md)

---

## 配套可运行工程与工具

- **[examples/ch06-chrome-extension](./examples/ch06-chrome-extension)**：Ch.06 Chrome MV3 扩展实战样例
- **[examples/ch10-saas-mvp](./examples/ch10-saas-mvp)**：Ch.10 Next.js 15 + Supabase + Stripe 商业 SaaS 样例
- **[examples/ch11-expo-mobile](./examples/ch11-expo-mobile)**：Ch.11 Expo SDK 57 跨端原生 App 样例
- **[templates/](./templates)**：主流前后端技术栈 `AGENTS.md` 项目规则模板
- **[case-studies/](./case-studies)** & **[scripts/codex-watchdog/](./scripts/codex-watchdog)**：Ch.08 飞书助理与实战复盘参考
- 配套独立开源项目：[飞书助理 (plugins-codex-feishu)](https://github.com/aipmer/plugins-codex-feishu) · [Codex Switch](https://github.com/aipmer/codex-switch)

---

## AI 编程实战蓝皮书系列

本仓库属于 **[AI 编程实战蓝皮书系列](https://book.pmer.cn/)**（总站源码仓：[aipmer/ai-coding-blue-books](https://github.com/aipmer/ai-coding-blue-books)），配套 [AI 协作规则生成器](https://book.pmer.cn/generator) 与 [工具对比总表](https://book.pmer.cn/compare)：

| 蓝皮书 | 在线阅读 | GitHub 仓库 | 核心聚焦 |
| :--- | :--- | :--- | :--- |
| **Codex 蓝皮书（本仓）** | [在线阅读](https://book.pmer.cn/codex/) | [aipmer/codex-blue-book](https://github.com/aipmer/codex-blue-book) | 深度推理、科研计算、后端与运维排错、0 到 1 工程交付 |
| Claude 蓝皮书 | [在线阅读](https://book.pmer.cn/claude/) | [aipmer/claude-blue-book](https://github.com/aipmer/claude-blue-book) | 需求沟通、方案规划、系统架构、高质量前端与大型代码库安全重构 |
| Gemini 蓝皮书 | [在线阅读](https://book.pmer.cn/gemini/) | [aipmer/gemini-blue-book](https://github.com/aipmer/gemini-blue-book) | 多模态视觉调试、方案双审、数据洞察与 Google 办公/云端算力 |
| Kimi 蓝皮书 | [在线阅读](https://book.pmer.cn/kimi/) | [aipmer/kimi-blue-book](https://github.com/aipmer/kimi-blue-book) | 百万字中文与专业文档深读、开源私有化部署、跨 IDE 与高并发协作 |

---

## English Version

# Codex Blue Book: From Zero to Production Architecture

[Read Online (book.pmer.cn/en/codex/)](https://book.pmer.cn/en/codex/) | [Download English PDF](./codex_blue_book_en.pdf) | [Download Chinese PDF](./codex_blue_book_zh.pdf) | [Rules Generator](https://book.pmer.cn/en/generator)

> **Version v1.5.0 · Verified November 26, 2026**  
> Focuses on deep reasoning, research computing, complex backend and DevOps debugging, covering GPT-6.2 Astra/Sol, GPT-6.1 Terra, Codex CLI 0.172.0, and 0-to-1 delivery.
>
> Independently authored by Hunk Wu ([pmer.cn](https://pmer.cn) / [@ai_pmer](https://x.com/ai_pmer)). Not affiliated with or endorsed by the model vendor.

## Chapters (English)

- [Ch.01 Saying Goodbye to Handwritten Code: Product Mindset in the Era of Vibe Coding](./en/ch01_mindset.md)
- [Ch.02 Cross-Device Control: Building Your Codex Multi-Surface Productivity Matrix](./en/ch02_setup.md)
- [Ch.03 Breaking the Cloud Island: Sandbox Debugging and Deep Local Environment Tunneling](./en/ch03_sandbox.md)
- [Ch.04 Goal-Driven Engineering: Taming Reasoning Agents with Boundaries and Assertions](./en/ch04_goal_driven.md)
- [Ch.05 Defining the CAP Protocol: Building Your Project's AGENTS.md Rule Compliance Layer](./en/ch05_agents_protocol.md)
- [Ch.06 Steering Reasoning: Supervising the CoT Process Like a Tech Lead](./en/ch06_reasoning_steer.md)
- [Ch.07 Closing the Visual Loop: Automated Inspection and Design Fidelity with Desktop Computer Use](./en/ch07_desktop_computer_use.md)
- [Ch.08 Mobile Sentinel Workflows: 24/7 Remote Development and Orchestration](./en/ch08_mobile_workflow.md)
- [Ch.09 Architecture Revitalization: Panoramic Analysis and Progressive Decoupling of Legacy Systems](./en/ch09_legacy_code.md)
- [Ch.10 Monetization in Practice: Shipping a Commercial Next.js + Stripe SaaS MVP in 2 Hours](./en/ch10_saas_mvp.md)
- [Ch.11 Mobile Extension: Expo Cross-Platform App Development and Cloud Packaging](./en/ch11_expo_mobile.md)
- [Ch.12 The Final Frontier: Building an Automated Growth Flywheel for a One-Person SaaS](./en/ch12_commercialization.md)
- [Ch.13 Frontier Watch: The 2026 Codex Ecosystem Overhaul](./en/ch13_2026_frontier.md)

## Companion Kits & Resources

- **[examples/ch06-chrome-extension](./examples/ch06-chrome-extension)**: Ch.06 Chrome MV3 extension sample
- **[examples/ch10-saas-mvp](./examples/ch10-saas-mvp)**: Ch.10 Next.js 15 + Supabase + Stripe SaaS starter
- **[examples/ch11-expo-mobile](./examples/ch11-expo-mobile)**: Ch.11 Expo SDK 57 cross-platform mobile sample
- **[templates/](./templates)**: Ready-to-drop `AGENTS.md` templates across major frameworks
- **[case-studies/](./case-studies)** & **[scripts/codex-watchdog/](./scripts/codex-watchdog)**: Ch.08 Feishu Assistant & field case studies
- Companion projects: [Feishu Assistant](https://github.com/aipmer/plugins-codex-feishu) · [Codex Switch](https://github.com/aipmer/codex-switch)

## AI Coding Blue Books Series

Part of the **[AI Coding Blue Books](https://book.pmer.cn/en/)** series (hub repo: [aipmer/ai-coding-blue-books](https://github.com/aipmer/ai-coding-blue-books)), with the interactive [Rules Generator](https://book.pmer.cn/en/generator) and [Tool Comparison](https://book.pmer.cn/en/compare):

| Blue Book | Online Reading | GitHub Repo | Core Focus |
| :--- | :--- | :--- | :--- |
| **Codex Blue Book (this repo)** | [Read Online](https://book.pmer.cn/en/codex/) | [aipmer/codex-blue-book](https://github.com/aipmer/codex-blue-book) | Deep reasoning, research computing, backend/DevOps debugging, 0-to-1 delivery |
| Claude Blue Book | [Read Online](https://book.pmer.cn/en/claude/) | [aipmer/claude-blue-book](https://github.com/aipmer/claude-blue-book) | Requirements alignment, architecture, high-craft frontend, Hooks & safe legacy refactors |
| Gemini Blue Book | [Read Online](https://book.pmer.cn/en/gemini/) | [aipmer/gemini-blue-book](https://github.com/aipmer/gemini-blue-book) | Multimodal UI debugging, dual-review planning, data insights, Workspace & Colab |
| Kimi Blue Book | [Read Online](https://book.pmer.cn/en/kimi/) | [aipmer/kimi-blue-book](https://github.com/aipmer/kimi-blue-book) | 1M-token document audits, open-weight self-hosting, ACP IDE workflows, Slides & 3D |

## Contributing & License

- Issues, errata, and topic requests are welcome in this repository's Issues tab.
- Full-site source and cross-book PRs live in [aipmer/ai-coding-blue-books](https://github.com/aipmer/ai-coding-blue-books) (see [CONTRIBUTING.md](./CONTRIBUTING.md)).
- Licensed under MIT & Apache-2.0. See [LICENSE](./LICENSE).
