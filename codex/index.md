---
title: "Codex 蓝皮书：OpenAI AI 编程全栈实战指南"
description: "介绍 OpenAI 与 Codex（CLI 0.172.0、ChatGPT 桌面端代码模式与 GPT-6.2 / GPT-6.1 Terra），提供 13 章双语实战目录、PDF 下载与配套开源工具。"
lastUpdated: 2026-11-26
---

# 《Codex 蓝皮书：从入门到架构大师》

## 关于 Codex 与 OpenAI

**OpenAI** 成立于 2015 年，总部位于旧金山，是 ChatGPT 与 GPT 系列前沿大模型的研发机构。**OpenAI Codex** 是 OpenAI 面向软件工程推出的自主编程智能体产品线，当前涵盖终端工具 **Codex CLI（`0.172.0`）**、**ChatGPT 桌面端代码模式** 以及云端并行任务环境，底层由 **GPT-6.2 Astra / Sol**（复杂推理与日常主力编码）、**GPT-6.1 Terra**（屏幕视觉识别与桌面操作）与 **GPT-6 Luna**（轻量高速路由）驱动。

> **本书定位**：面向独立开发者、技术产品经理与全栈工程师，带你把 Codex 从零配通到可上线收费的 Web 与 App 产品（资料核对至 **2026 年 11 月 26 日**，当前版本 `v1.5.0`）。

- [立即从第一章开始阅读](/chapters/ch01_mindset)
- [查看 2026 年 11 月前沿迁移地图（Ch.13）](/chapters/ch13_2026_frontier)
- [下载中文版 PDF](/downloads/codex_blue_book_zh.pdf) · [Download English PDF](/downloads/codex_blue_book_en.pdf)
- [生成 Codex `AGENTS.md` 项目规则](/generator) · [工具对比](/compare)

---

## 全书 13 章导航

### 第一部分：心智与基建（从打字员到指挥官）
- [Ch.01 告别手写代码：Vibe Coding 时代的产品心智](/chapters/ch01_mindset)
- [Ch.02 多端指挥舱：CLI 0.172、桌面端与手机协同配置避坑](/chapters/ch02_setup)
- [Ch.03 本地环境与端口打通：让云端 AI 顺畅访问本地数据库](/chapters/ch03_sandbox)

### 第二部分：规范与认知编排（立规矩、防失控）
- [Ch.04 目标驱动编程：别教大厨切菜，用验收断言锁死边界](/chapters/ch04_goal_driven)
- [Ch.05 打造项目专属规则：让 AI 听话、防破坏与防死循环](/chapters/ch05_agents_protocol)
- [Ch.06 透视 AI 思考过程：像技术总监一样随时纠偏与打断](/chapters/ch06_reasoning_steer)

### 第三部分：跨端自动化与全天候值班
- [Ch.07 真实接管桌面与浏览器：GPT-6.1 Terra 视觉走查与像素级还原](/chapters/ch07_desktop_computer_use)
- [Ch.08 飞书助理值班：人在路上，用手机随时监控与审批](/chapters/ch08_mobile_workflow)

### 第四部分：工程重构与闭环交付
- [Ch.09 改造混乱老代码：逆向工程、防崩测试与微创重构](/chapters/ch09_legacy_code)
- [Ch.10 商业化实战：2 小时跑通 Next.js + Stripe 付费 SaaS](/chapters/ch10_saas_mvp)
- [Ch.11 跨端原生 App：告别环境地狱，用 Expo 极速上架双端](/chapters/ch11_expo_mobile)

### 第五部分：商业化与 2026 前沿作战地图
- [Ch.12 一人公司增长飞轮：自动化 SEO、日常运营与变现路径](/chapters/ch12_commercialization)
- [Ch.13 2026 前沿作战地图：GPT-6.2、Terra 与 CLI 0.172 迁移指南](/chapters/ch13_2026_frontier)

---

## 配套开源工具与沙盒仓库

- **[飞书助理 (plugins-codex-feishu)](https://github.com/aipmer/plugins-codex-feishu)**：Ch.08 官方参考实现，支持构建告警与手机一键审批。
- **[Codex Switch](https://github.com/aipmer/codex-switch)**：macOS 一键切换 OpenAI / DeepSeek / Kimi Code 并保持跨供应商续聊。
- **[全书可运行实战样例](https://github.com/aipmer/codex-blue-book/tree/main/examples)**：Chrome MV3 扩展、Next.js 15 Stripe SaaS 与 Expo SDK 57 原生 App。
- **[PMER Codex 工具频道](https://pmer.cn/ai-tools/codex/)**：同步跟踪 Codex 动态与上手提醒。
