import argparse
import os
import re

script_dir = os.path.dirname(os.path.abspath(__file__))
workspace = os.path.dirname(script_dir)
chapters_dir = os.path.join(workspace, "chapters")
en_dir = os.path.join(workspace, "en")
claude_zh_dir = os.path.join(workspace, "claude")
claude_en_dir = os.path.join(workspace, "en", "claude")
gemini_zh_dir = os.path.join(workspace, "gemini")
gemini_en_dir = os.path.join(workspace, "en", "gemini")
kimi_zh_dir = os.path.join(workspace, "kimi")
kimi_en_dir = os.path.join(workspace, "en", "kimi")
public_dir = os.path.join(workspace, "public")

chapter_files = [
    "ch01_mindset.md",
    "ch02_setup.md",
    "ch03_sandbox.md",
    "ch04_goal_driven.md",
    "ch05_agents_protocol.md",
    "ch06_reasoning_steer.md",
    "ch07_desktop_computer_use.md",
    "ch08_mobile_workflow.md",
    "ch09_legacy_code.md",
    "ch10_saas_mvp.md",
    "ch11_expo_mobile.md",
    "ch12_commercialization.md",
    "ch13_2026_frontier.md"
]

toc_zh = """
## 🧭 目录 (Table of Contents)

### 第一部分：AI-Native 时代的产品心智与搭建
- [Ch.01 告别手写代码：Vibe Coding 时代的产品心智](#ch01-告别手写代码vibe-coding-时代的产品心智)
- [Ch.02 跨端掌控：Codex 多端生产力矩阵搭建](#ch02-跨端掌控codex-多端生产力矩阵搭建)
- [Ch.03 破局云端孤岛：沙盒调试与本地环境深度穿透](#ch03-破局云端孤岛沙盒调试与本地环境深度穿透)

### 第二部分：架构工程与智能体约束
- [Ch.04 目标驱动：用“边界与断言”驾驭推理型智能体](#ch04-目标驱动用边界与断言驾驭推理型智能体)
- [Ch.05 制定 CAP 协议：构建项目专属的 AGENTS.md 规则层](#ch05-制定-cap-协议构建项目专属的-agentsmd-规则层)
- [Ch.06 思维纠偏：如何像技术总监一样透视 CoT 推理链](#ch06-思维纠偏如何像技术总监一样透视-cot-推理链)

### 第三部分：高级多端编排与巡检
- [Ch.07 视觉闭环：Desktop Computer Use 自动巡检与设计还原](#ch07-视觉闭环desktop-computer-use-自动巡检与设计还原)
- [Ch.08 移动看护工作流：全天候离线编排实战](#ch08-移动看护工作流全天候离线编排实战)
- [Ch.09 架构复苏：混乱遗留系统的全景解析与渐进式解耦](#ch09-架构复苏混乱遗留系统的全景解析与渐进式解耦)

### 第四部分：一人公司的商业闭环
- [Ch.10 商业实战：2小时跑通 Next.js + Stripe 商业级 MVP](#ch10-商业实战2小时跑通-nextjs--stripe-商业级-mvp)
- [Ch.11 触角延伸：Expo 跨端原生 App 开发与云端打包](#ch11-触角延伸expo-跨端原生-app-开发与云端打包)
- [Ch.12 终局思考：独立开发者如何打造自动化商业飞轮](#ch12-终局思考独立开发者如何打造自动化商业飞轮)

### 第五部分：前沿瞭望与版本迁移
- [Ch.13 前沿瞭望：2026 Codex 生态全景升级](#ch13-前沿瞭望2026-codex-生态全景升级)
"""

toc_en = """
## 🧭 Table of Contents

### Part 1: Product Survival in the AI-Native Era
- [Ch.01 Saying Goodbye to Handwritten Code: Product Mindset in the Era of Vibe Coding](#ch01-saying-goodbye-to-handwritten-code-product-mindset-in-the-era-of-vibe-coding)
- [Ch.02 Cross-Device Control: Building Your Codex Multi-Surface Productivity Matrix](#ch02-cross-device-control-building-your-codex-multi-surface-productivity-matrix)
- [Ch.03 Breaking the Cloud Island: Sandbox Debugging and Deep Local Environment Tunneling](#ch03-breaking-the-cloud-island-sandbox-debugging-and-deep-local-environment-tunneling)

### Part 2: Architecture & Constraints
- [Ch.04 Goal-Driven Engineering: Taming Reasoning Agents with Boundaries and Assertions](#ch04-goal-driven-engineering-taming-reasoning-agents-with-boundaries-and-assertions)
- [Ch.05 Defining the CAP Protocol: Building Your Project's AGENTS.md Rule Compliance Layer](#ch05-defining-the-cap-protocol-building-your-projects-agentsmd-rule-compliance-layer)
- [Ch.06 Steering Reasoning: Supervising the CoT Process Like a Tech Lead](#ch06-steering-reasoning-supervising-the-cot-process-like-a-tech-lead)

### Part 3: Advanced Multi-Surface Telemetry
- [Ch.07 Closing the Visual Loop: Automated Inspection and Design Fidelity with Desktop Computer Use](#ch07-closing-the-visual-loop-automated-inspection-and-design-fidelity-with-desktop-computer-use)
- [Ch.08 Mobile Sentinel Workflows: 24/7 Remote Development and Orchestration](#ch08-mobile-sentinel-workflows-247-remote-development-and-orchestration)
- [Ch.09 Architecture Revitalization: Panoramic Analysis and Progressive Decoupling of Legacy Systems](#ch09-architecture-revitalization-panoramic-analysis-and-progressive-decoupling-of-legacy-systems)

### Part 4: One-Person SaaS Commercialization
- [Ch.10 Monetization in Practice: Shipping a Commercial Next.js + Stripe SaaS MVP in 2 Hours](#ch10-monetization-in-practice-shipping-a-commercial-nextjs--stripe-saas-mvp-in-2-hours)
- [Ch.11 Mobile Extension: Expo Cross-Platform App Development and Cloud Packaging](#ch11-mobile-extension-expo-cross-platform-app-development-and-cloud-packaging)
- [Ch.12 The Final Frontier: Building an Automated Growth Flywheel for a One-Person SaaS](#ch12-the-final-frontier-building-an-automated-growth-flywheel-for-a-one-person-saas)

### Part 5: Frontier Watch & Version Migration
- [Ch.13 Frontier Watch: The 2026 Codex Ecosystem Overhaul](#ch13-frontier-watch-the-2026-codex-ecosystem-overhaul)
"""


claude_chapter_files = [
    "ch01_programmable_platform.md",
    "ch02_context_economics.md",
    "ch03_hooks_code_mode.md",
    "ch04_whiteboards_docs.md",
    "ch05_design_canvas.md",
    "ch06_legacy_governance.md",
    "ch07_subagents_refactoring.md",
    "ch08_ship_pr_steward.md",
    "ch09_enterprise_saas.md",
    "ch10_frontier_cowork_critique.md"
]

claude_toc_zh = """
## 🧭 目录 (Table of Contents)

### 第一部分：心智跃迁与五大工程原语
- Ch.01 从对话编程到可编程工程平台：Claude 5.5 体系与全景心智
- Ch.02 上下文经济学：精简 `CLAUDE.md` 与按需加载 `Skills` 体系
- Ch.03 确定性防线：`Hooks` 生命周期门禁与实验性 Code Mode 批处理

### 第二部分：视觉画布与持久工作区协同
- Ch.04 从混沌脑暴到架构定稿：Claude Whiteboards 与结构化文档矩阵
- Ch.05 终端直通画板：`/design`（Claude Design）交互原型与源码回流实战

### 第三部分：百万上下文与大型存量系统治理
- Ch.06 存量巨石系统逆向与微创技术债清理
- Ch.07 多子代理分治（Subagents）与长时自主重构实战

### 第四部分：自动化合并上线与 ToB 商业闭环
- Ch.08 最后一公里自动化：`/ship`、PR Steward 与团队治理防线
- Ch.09 商业化实战：基于 Claude 打造高客单价企业级审计与情报 SaaS

### 第五部分：产品审视与前沿路线图
- Ch.10 2026 前沿瞭望与产品冷思考：Claude Cowork 锐评与异步记忆演进
"""

claude_toc_en = """
## 🧭 Table of Contents

### Part 1: Programmable Engineering Primitives
- Ch.01 From Chat Coding to Programmable Engineering: Claude 5.5
- Ch.02 Context Economics: Lean `CLAUDE.md`, Skills & MCP
- Ch.03 Deterministic Guardrails: `Hooks` & Experimental Code Mode

### Part 2: Visual Canvases & Persistent Workspaces
- Ch.04 From Messy Brainstorms to Architecture: Claude Whiteboards & Docs
- Ch.05 Terminal-to-Canvas: `/design` Artboards & Code Handoff

### Part 3: 1M-Context Legacy Governance
- Ch.06 Legacy Monolith Reverse Engineering & Safe Debt Cleanup
- Ch.07 Isolated Subagents & Long-Horizon Autonomous Refactoring

### Part 4: Automated Shipping & Enterprise Monetization
- Ch.08 Closing the Last Mile: `/ship`, PR Steward & Team Governance
- Ch.09 Commercial ToB SaaS: Prompt-Cached Auditing & Agent SDK

### Part 5: Critical Product Review & Frontier Watch
- Ch.10 2026 Frontier & Honest Critique: Claude Cowork & Async Memory
"""


gemini_chapter_files = [
    "ch01_antigravity_gemini4.md",
    "ch02_multimodal_rules_skills.md",
    "ch03_ai_studio_handoff.md",
    "ch04_video_live_api.md",
    "ch05_workspace_mcp.md",
    "ch06_colab_agy_pipelines.md",
    "ch07_swarm_alpine_peak.md",
    "ch08_browser_qa_cross_platform.md",
    "ch09_multimodal_commercial_saas.md",
    "ch10_frontier_quota_spatial.md"
]

gemini_toc_zh = """
## 🧭 目录 (Table of Contents)

### 第一部分：Antigravity 指挥舱与 Gemini 4 选型
- Ch.01 告别单线程 CLI：Google Antigravity 架构与 Gemini 4 模型矩阵
- Ch.02 多模态开发规约：`AGENTS.md`、`.agents/rules` 与自定义 Skills

### 第二部分：AI Studio × Antigravity 原生多模态流
- Ch.03 从灵感到工程仓：Google AI Studio Build Mode 无损接力流
- Ch.04 音视频理解与 Gemini Live API 实时交互应用落地

### 第三部分：Google Workspace × Colab 全家桶联动
- Ch.05 办公流即研发流：Google Workspace MCP 深度自动化实战
- Ch.06 云端算力外挂：Google Colab（`%%agy`）数据管线与模型实验闭环

### 第四部分：`/swarm` 蜂群编排、视觉巡检与跨端交付
- Ch.07 `/swarm` 多代理蜂群架构与官方《Alpine Peak》全栈案例复盘
- Ch.08 浏览器视觉自动走查与 Web / Chrome MV3 / 移动跨端交付

### 第五部分：多模态商业闭环与生态瞭望
- Ch.09 商业化实战：打造基于 Google 生态的多模态出海生产力工具
- Ch.10 2026 前沿瞭望：Gemini 4 演进路线、配额精算与跨界空间智能
"""

gemini_toc_en = """
## 🧭 Table of Contents

### Part 1: Antigravity Cockpit & Gemini 4 Routing
- Ch.01 Beyond Single-Loop CLIs: Google Antigravity & Gemini 4 Model Matrix
- Ch.02 Multimodal Rules: `AGENTS.md`, `.agents/rules` & Custom Skills

### Part 2: AI Studio × Antigravity Multimodal Flows
- Ch.03 Idea to Production Repo: AI Studio Build Mode Context-Preserving Handoff
- Ch.04 Video Understanding & Gemini Live API Real-Time Applications

### Part 3: Google Workspace × Colab Leverage
- Ch.05 Workspace MCP Automation: Docs, Sheets, Slides & Commercial Add-ons
- Ch.06 Cloud Compute Offload: Google Colab (`%%agy`) & Notebook Pipelines

### Part 4: `/swarm` Orchestration & Visual QA
- Ch.07 `/swarm` Architecture & Official "Alpine Peak" Full-Stack Case Study
- Ch.08 Automated Browser Visual QA, Chrome MV3 & Firebase / Cloud Run Delivery

### Part 5: Monetization & Frontier Watch
- Ch.09 Commercial Multimodal SaaS: Credit Metering, Guardrails & Distribution
- Ch.10 2026 Frontier Watch: Quota Economics, Web 3D & Official Release Tracking
"""


kimi_chapter_files = [
    "ch01_k31_architecture_cli.md",
    "ch02_acp_config_failover.md",
    "ch03_subagents_swarm.md",
    "ch04_moonvit_video_figma.md",
    "ch05_finance_audit_modeling.md",
    "ch06_legal_medical_citations.md",
    "ch07_kimi_slides_decks.md",
    "ch08_3d_make_blender_freecad.md",
    "ch09_vllm_self_hosting_saas.md",
    "ch10_four_agent_hybrid_frontier.md"
]

kimi_toc_zh = """
## 🧭 目录 (Table of Contents)

### 第一部分：K3.1 基座全景与 Kimi Code 三态指挥舱
- Ch.01 3 万亿参数开源新纪元：Kimi K3 / K3.1 Pro 架构与选型心智
- Ch.02 全协议互联：`config.toml`、`kimi acp` 跨 IDE 直连与多源容灾矩阵

### 第二部分：蜂群并发研发与视觉录屏排障
- Ch.03 分层子代理（`explore / plan / coder`）与 `/swarm` 蜂群全栈实战
- Ch.04 MoonViT-V2 视觉工程流：录屏诊断、Figma 还原与前端精修

### 第三部分：高壁垒垂直行业深水区（金融 · 法律 · 医药）
- Ch.05 金融投研与量化工程实战：百万 Token 财报审计与自动建模
- Ch.06 法律合规与生物医药实战：超长文献交叉推理与零幻觉引用校验

### 第四部分：Kimi Slides 与 3D Make 空间编码跃迁
- Ch.07 从原始数据到路演级交付：Kimi Slides 智能演示工程流
- Ch.08 空间智能与 3D Make 实战：从 Web 3D 交互、Blender 到 FreeCAD 机械装配

### 第五部分：开源私有化与全球商业闭环
- Ch.09 政企合规与商业化落地：vLLM / SGLang 私有化部署与垂直 Agent 产品化
- Ch.10 2026 前沿瞭望：四模型混合军团协同策略与官方情报追踪
"""

kimi_toc_en = """
## 🧭 Table of Contents

### Part 1: K3.1 Foundation & Multi-Mode Cockpit
- Ch.01 The 2.8T Open-Weight Generation: Kimi K3.1 Pro & Kimi Code CLI
- Ch.02 Protocol-First Connectivity: `config.toml`, `kimi acp` & Multi-Provider Failover

### Part 2: Swarm Engineering & Video Debugging
- Ch.03 Tiered Subagents (`explore / plan / coder`) & `/swarm` Parallel Refactors
- Ch.04 MoonViT-V2 Visual Engineering: Video-to-Fix & Figma MCP Fidelity

### Part 3: Regulated Vertical Workflows (Finance · Legal · Medical)
- Ch.05 Financial Research & Modeling: 1M-Context Audits & Formula Spreadsheets
- Ch.06 Legal Compliance & Biomedical Evidence: Zero-Hallucination Citation Gates

### Part 4: Kimi Slides & 3D Make Spatial Coding
- Ch.07 Executive Delivery with Kimi Slides: Structured Data to Editable `.pptx`
- Ch.08 Spatial Coding & 3D Make: Three.js, Headless Blender & Parametric FreeCAD

### Part 5: Open-Weight Self-Hosting & Hybrid Series Finale
- Ch.09 Enterprise Self-Hosting with vLLM / SGLang & Vertical Agent SaaS
- Ch.10 2026 Frontier Finale: Four-Agent Hybrid Strategy & Official Tracking
"""


def strip_frontmatter(content: str) -> str:
    return re.sub(r'^---\s*\n[\s\S]*?\n---\s*\n', '', content, count=1)


def clean_and_process_file(filepath: str, is_en: bool = False, rel_prefix: str = "") -> str:
    with open(filepath, "r", encoding="utf-8") as f:
        content = strip_frontmatter(f.read())

    lines = content.splitlines()
    cleaned_lines = []

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("[") and (
            "Index" in stripped or "Next" in stripped or "Prev" in stripped or
            "主目录" in stripped or "下一章" in stripped or "上一章" in stripped or
            "返回首页" in stripped or "Claude 专页" in stripped or "Claude Hub" in stripped or
            "Gemini 专页" in stripped or "Gemini Hub" in stripped or
            "Kimi 专页" in stripped or "Kimi Hub" in stripped or "四书总门户" in stripped or "Series Portal" in stripped
        ):
            continue
        cleaned_lines.append(line)

    processed_content = "\n".join(cleaned_lines).strip()
    processed_content = processed_content.replace("../AGENTS.md", "./AGENTS.md")
    processed_content = processed_content.replace("../README.md", "./README.md")
    processed_content = processed_content.replace("../README_EN.md", "./README_EN.md")

    target_prefix = rel_prefix or ("./en/" if is_en else "./chapters/")
    processed_content = re.sub(r'\(\./(ch\d+_[^)]+\.md)\)', rf'({target_prefix}\1)', processed_content)

    return processed_content


def build_zh() -> str:
    combined = []
    combined.append("# 《Codex 蓝皮书：从入门到架构大师》\n")
    combined.append("**v1.5.0 · 资料核对至 2026 年 11 月 26 日**\n")
    combined.append("![Codex 实战蓝皮书](./images/cover.jpg)\n\n")
    combined.append("主理人: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[ 🌐 English PDF Version ](./codex_blue_book_en.pdf) | [ 🌐 English Online Version ](./en/ch01_mindset.md)\n")
    combined.append(toc_zh.strip() + "\n\n---\n")
    combined.append("## 🔌 关联开源项目\n")
    combined.append("*   **[飞书助理 (Codex Feishu Sentinel)](https://github.com/aipmer/plugins-codex-feishu)**：蓝皮书 Ch.08 官方参考工程。专为 Codex 开发者打造的飞书助理，支持日报自动汇总推送、CI 熔断移动端警报与手机端一键审批。\n")
    combined.append("*   **[Codex Switch (多供应商无缝切换)](https://github.com/aipmer/codex-switch)**：macOS Codex 多供应商一键切换利器。支持 OpenAI 官方 / DeepSeek / Kimi Code 秒级平滑切换，历史会话跨供应商无缝续聊。\n\n---\n")

    for filename in chapter_files:
        zh_path = os.path.join(chapters_dir, filename)
        if os.path.exists(zh_path):
            chapter_content = clean_and_process_file(zh_path, is_en=False)
            combined.append(chapter_content + "\n\n---\n")

    full_text = "\n".join(combined)
    out_path = os.path.join(workspace, "codex_blue_book_zh.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Compiled and saved codex_blue_book_zh.md")
    return full_text


def build_en() -> str:
    combined = []
    combined.append("# Codex Practical Blue Book: From Beginner to Architect\n")
    combined.append("**v1.5.0 · Sources checked November 26, 2026**\n")
    combined.append("![Codex Practical Blue Book](./images/cover_en.jpg)\n\n")
    combined.append("Author: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[ 🌐 中文 PDF 版 ](./codex_blue_book_zh.pdf) | [ 🌐 中文在线版 ](./chapters/ch01_mindset.md)\n")
    combined.append(toc_en.strip() + "\n\n---\n")
    combined.append("## 🔌 Related Projects\n")
    combined.append("*   **[Feishu Assistant (Codex Feishu Sentinel)](https://github.com/aipmer/plugins-codex-feishu)**: The official companion repository for Ch.08. An intelligent duty assistant in Feishu for Codex developers, featuring automated daily git digest pushes, CI mobile alarms, and one-tap remote approvals.\n")
    combined.append("*   **[Codex Switch (Multi-Provider Switcher)](https://github.com/aipmer/codex-switch)**: One-click provider switcher for macOS Codex CLI. Seamlessly switch between official OpenAI, DeepSeek, and Kimi Code in seconds with cross-provider chat history continuation.\n\n---\n")

    for filename in chapter_files:
        en_path = os.path.join(en_dir, filename)
        if os.path.exists(en_path):
            chapter_content = clean_and_process_file(en_path, is_en=True)
            combined.append(chapter_content + "\n\n---\n")

    full_text = "\n".join(combined)
    out_path = os.path.join(workspace, "codex_blue_book_en.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Compiled and saved codex_blue_book_en.md")
    return full_text


def build_claude_zh() -> str:
    combined = []
    combined.append("# 《Claude 实战蓝皮书：可编程工程原语、画布协同与复杂系统重构指南》\n")
    combined.append("**v1.0.0 · 资料核对至 2026 年 11 月 26 日**\n")
    combined.append("![Claude 实战蓝皮书封面](./images/claude_cover.jpg)\n\n")
    combined.append("主理人: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[ 🌐 English PDF Version ](./claude_blue_book_en.pdf) | [ 🌐 在线阅读站 ](https://book.pmer.cn/claude/)\n")
    combined.append(claude_toc_zh.strip() + "\n\n---\n")
    combined.append("## 🔌 配套开源套件\n")
    combined.append("*   **[Claude Hooks & Subagents Kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/claude-hooks-kit)**：包含防危命 `PreToolUse` Bash 拦截脚本、敏感文件写保护与只读架构评审子代理配置。\n")
    combined.append("*   **[多智能体通用规约生成器](https://book.pmer.cn/generator)**：一键导出 `CLAUDE.md`、`settings.json` Hooks 与 `AGENTS.md` 跨工具规约。\n\n---\n")

    for filename in claude_chapter_files:
        zh_path = os.path.join(claude_zh_dir, filename)
        if os.path.exists(zh_path):
            chapter_content = clean_and_process_file(zh_path, is_en=False, rel_prefix="./claude/")
            combined.append(chapter_content + "\n\n---\n")

    full_text = "\n".join(combined)
    out_path = os.path.join(workspace, "claude_blue_book_zh.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Compiled and saved claude_blue_book_zh.md")
    return full_text


def build_claude_en() -> str:
    combined = []
    combined.append("# Claude Practical Blue Book: Programmable Primitives, Canvases & Legacy Governance\n")
    combined.append("**v1.0.0 · Sources verified November 26, 2026**\n")
    combined.append("![Claude Practical Blue Book Cover](./images/claude_cover.jpg)\n\n")
    combined.append("Author: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[ 🌐 中文 PDF 版 ](./claude_blue_book_zh.pdf) | [ 🌐 Online Hub ](https://book.pmer.cn/en/claude/)\n")
    combined.append(claude_toc_en.strip() + "\n\n---\n")
    combined.append("## 🔌 Companion Engineering Kit\n")
    combined.append("*   **[Claude Hooks & Subagents Kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/claude-hooks-kit)**: Runnable `PreToolUse` Bash danger blocker, secret-file write guard, and read-only architecture reviewer subagent.\n")
    combined.append("*   **[Multi-Agent Rules Generator](https://book.pmer.cn/en/generator)**: Export `CLAUDE.md`, `settings.json` Hooks, and shared `AGENTS.md` templates.\n\n---\n")

    for filename in claude_chapter_files:
        en_path = os.path.join(claude_en_dir, filename)
        if os.path.exists(en_path):
            chapter_content = clean_and_process_file(en_path, is_en=True, rel_prefix="./en/claude/")
            combined.append(chapter_content + "\n\n---\n")

    full_text = "\n".join(combined)
    out_path = os.path.join(workspace, "claude_blue_book_en.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Compiled and saved claude_blue_book_en.md")
    return full_text


def build_gemini_zh() -> str:
    combined = []
    combined.append("# 《Gemini 实战蓝皮书：Google 全域多模态编排与跨端交付指南》\n")
    combined.append("**v1.0.0 · 资料核对至 2026 年 11 月 26 日**\n")
    combined.append("![Gemini 实战蓝皮书封面](./images/gemini_cover.jpg)\n\n")
    combined.append("主理人: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[ 🌐 English PDF Version ](./gemini_blue_book_en.pdf) | [ 🌐 在线阅读站 ](https://book.pmer.cn/gemini/)\n")
    combined.append(gemini_toc_zh.strip() + "\n\n---\n")
    combined.append("## 🔌 配套开源套件\n")
    combined.append("*   **[Gemini Antigravity Starter Kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/gemini-antigravity-kit)**：包含 `AGENTS.md`、路径级 `.agents/rules/ui-multimodal.md`、三视口 `visual-audit` Skill 及零依赖 Gemini 4 配额预算门禁脚本 `check_gemini_quota.mjs`。\n")
    combined.append("*   **[多智能体通用规约生成器](https://book.pmer.cn/generator)**：一键导出 Antigravity `AGENTS.md` + `.agents/rules/`。\n\n---\n")

    for filename in gemini_chapter_files:
        zh_path = os.path.join(gemini_zh_dir, filename)
        if os.path.exists(zh_path):
            chapter_content = clean_and_process_file(zh_path, is_en=False, rel_prefix="./gemini/")
            combined.append(chapter_content + "\n\n---\n")

    full_text = "\n".join(combined)
    out_path = os.path.join(workspace, "gemini_blue_book_zh.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Compiled and saved gemini_blue_book_zh.md")
    return full_text


def build_gemini_en() -> str:
    combined = []
    combined.append("# Gemini Practical Blue Book: Multimodal Orchestration Across the Google Stack\n")
    combined.append("**v1.0.0 · Sources verified November 26, 2026**\n")
    combined.append("![Gemini Practical Blue Book Cover](./images/gemini_cover.jpg)\n\n")
    combined.append("Author: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[ 🌐 中文 PDF 版 ](./gemini_blue_book_zh.pdf) | [ 🌐 Online Hub ](https://book.pmer.cn/en/gemini/)\n")
    combined.append(gemini_toc_en.strip() + "\n\n---\n")
    combined.append("## 🔌 Companion Engineering Kit\n")
    combined.append("*   **[Gemini Antigravity Starter Kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/gemini-antigravity-kit)**: Runnable `AGENTS.md`, glob-scoped `.agents/rules/ui-multimodal.md`, `visual-audit` Skill, and zero-dependency `check_gemini_quota.mjs` budget guardrail.\n")
    combined.append("*   **[Multi-Agent Rules Generator](https://book.pmer.cn/en/generator)**: Export Antigravity rules and multi-agent templates.\n\n---\n")

    for filename in gemini_chapter_files:
        en_path = os.path.join(gemini_en_dir, filename)
        if os.path.exists(en_path):
            chapter_content = clean_and_process_file(en_path, is_en=True, rel_prefix="./en/gemini/")
            combined.append(chapter_content + "\n\n---\n")

    full_text = "\n".join(combined)
    out_path = os.path.join(workspace, "gemini_blue_book_en.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Compiled and saved gemini_blue_book_en.md")
    return full_text


def build_kimi_zh() -> str:
    combined = []
    combined.append("# 《Kimi 实战蓝皮书：K3.1 全栈蜂群、垂直行业深水区与 PPT/3D 跃迁指南》\n")
    combined.append("**v1.0.0 · 资料核对至 2026 年 11 月 26 日**\n")
    combined.append("![Kimi 实战蓝皮书封面](./images/kimi_cover.jpg)\n\n")
    combined.append("主理人: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[ 🌐 English PDF Version ](./kimi_blue_book_en.pdf) | [ 🌐 在线阅读站 ](https://book.pmer.cn/kimi/)\n")
    combined.append(kimi_toc_zh.strip() + "\n\n---\n")
    combined.append("## 🔌 配套开源套件\n")
    combined.append("*   **[Kimi K3.1 Starter Kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/kimi-k3-kit)**：包含 `~/.kimi-code/config.toml` 基线配置、零幻觉原文引用核验器 `verify_citations.py` 及 FreeCAD 参数化叶轮脚本 `freecad_turbine_blade.py`。\n")
    combined.append("*   **[多智能体通用规约生成器](https://book.pmer.cn/generator)**：一键导出 Kimi `AGENTS.md` + `config.toml`。\n\n---\n")

    for filename in kimi_chapter_files:
        zh_path = os.path.join(kimi_zh_dir, filename)
        if os.path.exists(zh_path):
            chapter_content = clean_and_process_file(zh_path, is_en=False, rel_prefix="./kimi/")
            combined.append(chapter_content + "\n\n---\n")

    full_text = "\n".join(combined)
    out_path = os.path.join(workspace, "kimi_blue_book_zh.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Compiled and saved kimi_blue_book_zh.md")
    return full_text


def build_kimi_en() -> str:
    combined = []
    combined.append("# Kimi Practical Blue Book: K3.1 Swarms, Regulated Verticals & Slides/3D Workflows\n")
    combined.append("**v1.0.0 · Sources verified November 26, 2026**\n")
    combined.append("![Kimi Practical Blue Book Cover](./images/kimi_cover.jpg)\n\n")
    combined.append("Author: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[ 🌐 中文 PDF 版 ](./kimi_blue_book_zh.pdf) | [ 🌐 Online Hub ](https://book.pmer.cn/en/kimi/)\n")
    combined.append(kimi_toc_en.strip() + "\n\n---\n")
    combined.append("## 🔌 Companion Engineering Kit\n")
    combined.append("*   **[Kimi K3.1 Starter Kit](https://github.com/aipmer/codex-blue-book/tree/main/examples/kimi-k3-kit)**: Production `config.toml`, zero-hallucination `verify_citations.py` gate, and parametric `freecad_turbine_blade.py` CAD generator.\n")
    combined.append("*   **[Multi-Agent Rules Generator](https://book.pmer.cn/en/generator)**: Export Kimi `AGENTS.md` + `config.toml`.\n\n---\n")

    for filename in kimi_chapter_files:
        en_path = os.path.join(kimi_en_dir, filename)
        if os.path.exists(en_path):
            chapter_content = clean_and_process_file(en_path, is_en=True, rel_prefix="./en/kimi/")
            combined.append(chapter_content + "\n\n---\n")

    full_text = "\n".join(combined)
    out_path = os.path.join(workspace, "kimi_blue_book_en.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Compiled and saved kimi_blue_book_en.md")
    return full_text


def build_llms_corpora(codex_zh: str, codex_en: str, claude_zh: str, claude_en: str, gemini_zh: str, gemini_en: str, kimi_zh: str, kimi_en: str) -> None:
    os.makedirs(public_dir, exist_ok=True)
    codex_corpus = (
        "# Codex Blue Book Plain-Markdown Corpus (v1.5.0 · Verified 2026-11-26)\n"
        "Source: https://book.pmer.cn/codex/\n\n"
        "## English Edition\n\n"
        + codex_en
        + "\n\n## Chinese Edition\n\n"
        + codex_zh
    )
    with open(os.path.join(public_dir, "llms-codex.txt"), "w", encoding="utf-8") as f:
        f.write(codex_corpus)

    claude_corpus = (
        "# Claude Practical Blue Book Plain-Markdown Corpus (v1.0.0 · Verified 2026-11-26)\n"
        "Source: https://book.pmer.cn/claude/\n\n"
        "## English Edition\n\n"
        + claude_en
        + "\n\n## Chinese Edition\n\n"
        + claude_zh
    )
    with open(os.path.join(public_dir, "llms-claude.txt"), "w", encoding="utf-8") as f:
        f.write(claude_corpus)

    gemini_corpus = (
        "# Gemini Practical Blue Book Plain-Markdown Corpus (v1.0.0 · Verified 2026-11-26)\n"
        "Source: https://book.pmer.cn/gemini/\n\n"
        "## English Edition\n\n"
        + gemini_en
        + "\n\n## Chinese Edition\n\n"
        + gemini_zh
    )
    with open(os.path.join(public_dir, "llms-gemini.txt"), "w", encoding="utf-8") as f:
        f.write(gemini_corpus)

    kimi_corpus = (
        "# Kimi Practical Blue Book Plain-Markdown Corpus (v1.0.0 · Verified 2026-11-26)\n"
        "Source: https://book.pmer.cn/kimi/\n\n"
        "## English Edition\n\n"
        + kimi_en
        + "\n\n## Chinese Edition\n\n"
        + kimi_zh
    )
    with open(os.path.join(public_dir, "llms-kimi.txt"), "w", encoding="utf-8") as f:
        f.write(kimi_corpus)

    extras = []
    for rel in ["compare.md", "en/compare.md", "codex/index.md", "en/codex/index.md", "claude/index.md", "en/claude/index.md", "gemini/index.md", "en/gemini/index.md", "kimi/index.md", "en/kimi/index.md"]:
        full = os.path.join(workspace, rel)
        if os.path.exists(full):
            extras.append(f"<!-- source: https://book.pmer.cn/{rel} -->\n" + strip_frontmatter(open(full, encoding="utf-8").read()).strip())

    full_corpus = (
        "# AI Coding Blue Books Series — Full Plain-Markdown Corpus (Verified 2026-11-26)\n"
        "Canonical Site: https://book.pmer.cn/\n\n"
        + "\n\n---\n\n".join(extras)
        + "\n\n---\n\n"
        + codex_corpus
        + "\n\n---\n\n"
        + claude_corpus
        + "\n\n---\n\n"
        + gemini_corpus
        + "\n\n---\n\n"
        + kimi_corpus
    )
    with open(os.path.join(public_dir, "llms-full.txt"), "w", encoding="utf-8") as f:
        f.write(full_corpus)
    print("Compiled public/llms-codex.txt, public/llms-claude.txt, public/llms-gemini.txt, public/llms-kimi.txt, and public/llms-full.txt")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compile Blue Book markdown collections and llms corpora.")
    parser.add_argument("--book", default="all", choices=["codex", "claude", "gemini", "kimi", "all"], help="Target book to compile")
    args = parser.parse_args()

    zh_text = build_zh() if args.book in ("codex", "all") else open(os.path.join(workspace, "codex_blue_book_zh.md"), encoding="utf-8").read()
    en_text = build_en() if args.book in ("codex", "all") else open(os.path.join(workspace, "codex_blue_book_en.md"), encoding="utf-8").read()
    claude_zh_text = build_claude_zh() if args.book in ("claude", "all") else open(os.path.join(workspace, "claude_blue_book_zh.md"), encoding="utf-8").read()
    claude_en_text = build_claude_en() if args.book in ("claude", "all") else open(os.path.join(workspace, "claude_blue_book_en.md"), encoding="utf-8").read()
    gemini_zh_text = build_gemini_zh() if args.book in ("gemini", "all") else open(os.path.join(workspace, "gemini_blue_book_zh.md"), encoding="utf-8").read()
    gemini_en_text = build_gemini_en() if args.book in ("gemini", "all") else open(os.path.join(workspace, "gemini_blue_book_en.md"), encoding="utf-8").read()
    kimi_zh_text = build_kimi_zh() if args.book in ("kimi", "all") else open(os.path.join(workspace, "kimi_blue_book_zh.md"), encoding="utf-8").read()
    kimi_en_text = build_kimi_en() if args.book in ("kimi", "all") else open(os.path.join(workspace, "kimi_blue_book_en.md"), encoding="utf-8").read()
    build_llms_corpora(zh_text, en_text, claude_zh_text, claude_en_text, gemini_zh_text, gemini_en_text, kimi_zh_text, kimi_en_text)
