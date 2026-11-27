---
title: "2026 AI 编程智能体横向选型：Codex vs Claude Code vs Gemini Antigravity vs Kimi Code"
description: "核对至 2026 年 11 月 26 日：全面对比 OpenAI Codex (GPT-6.2)、Claude Code (Claude 5.5)、Google Antigravity (Gemini 4) 与 Kimi Code (K3.1 Pro) 的定价、上下文、工程原语与选型场景。"
lastUpdated: 2026-11-26
---

# 2026 AI 编程智能体横向选型：Codex vs Claude Code vs Gemini Antigravity vs Kimi Code

> **核心结论（核对日期：2026 年 11 月 26 日）**：没有单一工具通吃所有场景。**深度推理、科研计算、复杂后端与运维排错及 0 到 1 交付**首选 **Codex**；**需求沟通、方案规划、系统架构、高质量前端与大型老代码重构**首选 **Claude Code**；**多模态视觉调试、方案双审、数据洞察与 Google 办公/Colab 联动**首选 **Gemini Antigravity**；**百万字中文与专业文档深读、开源私有化部署、跨 IDE 与高并发 Agent 协作**首选 **Kimi Code + K3.1 Pro**。

---

## 一、核心能力与 2026 年 11 月最新基线总表

| 对比维度 | OpenAI Codex | Claude Code | Google Antigravity (Gemini) | Kimi Code |
| :--- | :--- | :--- | :--- | :--- |
| **最新主力模型** | GPT-6.2 Astra / Sol · GPT-6.1 Terra · GPT-6 Luna | Claude 5.5 (Opus / Sonnet / Haiku) · Fable 5.2 | Gemini 4 (Carbon / Argon / Neon / Hydrogen) | Kimi K3.1 Pro (2.8T–3T MoE) · K3 · K2.5 |
| **上下文窗口** | 1.05M（922K 输入 / 128K 输出） | 1M（128K 输出） | 1M 统一窗口 | 1M 原生窗口（Gated DSA 稀疏注意力） |
| **主力研发载体** | CLI `0.172.0` · ChatGPT Desktop Code Mode | Claude Code v2.1.323+ · Whiteboards · `/design` | Antigravity 2.x IDE · `agy` CLI · AI Studio | `kimi` TUI · `kimi web` · `kimi acp` |
| **项目规则文件** | `AGENTS.md` + `~/.codex/config.toml` | `CLAUDE.md` + `.claude/settings.json` | `AGENTS.md` + `.agents/rules/` | `AGENTS.md` + `~/.kimi-code/config.toml` |
| **多代理与并发** | Ultra 界面子代理 · 线程深链跳转 | 独立上下文 Subagents · Code Mode JS 编排 | 多智能体协作（Git worktree + 对抗验证） | `explore/plan/coder` 子代理 · 多智能体并行协作 |
| **视觉与设计能力** | Desktop Computer Use + GPT-6.1 Terra | `/design` 可交互 HTML/JS 画板 + Whiteboards | 内置浏览器巡检 + 原生生图 + Live API | MoonViT-V2 录屏排障 + Figma MCP + 3D Make |
| **生态独家杀手锏** | 飞书助理远程审批 · Sites 原位预览 · Bedrock 接入 | Hooks 确定性门禁 · `/ship` PR Steward · MCP Skills | AI Studio 带上下文一键导出 · Workspace MCP · Google Colab 代理扩展 | ACP 直连 Zed/JetBrains · 开源权重私有化 · Kimi Slides |
| **配套蓝皮书** | [Codex 蓝皮书](/codex/) | [Claude 蓝皮书](/claude/) | [Gemini 蓝皮书](/gemini/) | [Kimi 蓝皮书](/kimi/) |

---

## 二、标准 API 文本定价速查（每百万 Token，2026-11-26 核对）

> 注意：以下为公开标准档 API 价格参考，**不等同于各家客户端月费订阅配额**；超长上下文与极速倍率以各家官网定价页为准。

| 供应商 / 模型 | 输入（/1M） | 缓存读取（/1M） | 输出（/1M） | 适用层级 |
| :--- | ---: | ---: | ---: | :--- |
| OpenAI `gpt-6.2-astra` | $8.00 | $0.40 | $40.00 | 复杂架构与深度验证 |
| OpenAI `gpt-6.2-sol` | $2.00 | $0.10 | $10.00 | 日常复杂编码主力 |
| OpenAI `gpt-6.1-terra` | $1.00 | $0.05 | $5.00 | 视觉推理与 Computer Use |
| OpenAI `gpt-6-luna` | $0.10 | $0.01 | $0.50 | 轻量路由与高频提取 |
| Anthropic `Claude Fable 5.2` | $8.00 | 低价缓存 | $40.00 | 极限架构与科研推理 |
| Anthropic `Claude Opus 5.5` | $4.00 | 超低缓存读 | $20.00 | 重度工程与长时重构 |
| Anthropic `Claude Sonnet 5.5` | $2.00 | 超低缓存读 | $10.00 | 高速主力编码 |
| Anthropic `Claude Haiku 5.5` | $0.10 | 超低缓存读 | $0.50 | 轻量子代理与批处理 |
| Moonshot `Kimi K3.1 Pro` | \$2.00 | \$0.20（90% 折扣） | \$10.00 | 全栈/3D/金融研究（另提供 2.8T MoE 开源权重） |
| Google `gemini-4-argon` / `carbon` | \$2.00（Argon 12.01 起 \$4.00） | \$0.10（\$0.20） | \$10.00（\$20.00） | 深度架构探索与企业级长程工程 |
| Google `gemini-4-neon` | \$3.00 | \$0.15 | \$15.00 | Orchestrator 默认协调器与复杂编码 |
| Google `gemini-4-hydrogen` | \$1.50 | 缓存优惠 | \$7.50 | 1M 窗口一口价极速执行与并行执行代理 |

---

## 三、按场景快速拍板

1. **科研计算、复杂后端/运维排错，以及独立开发者从 0 到 1 交付产品**  
   → 首选 **[《Codex 蓝皮书》](/codex/)**，配合 [Codex Switch](https://github.com/aipmer/codex-switch) 在触达限流时 1 秒切至 Kimi Code 或 DeepSeek 续聊。
2. **需求沟通、方案规划、系统架构、高质量前端与大型存量代码安全重构**  
   → 首选 **[《Claude 蓝皮书》](/claude/)**，用 `CLAUDE.md` + `Hooks` + `/design` + `/ship` 锁死架构红线。
3. **多模态界面调试、方案双审、数据洞察与 Google 办公套件 / Colab 联动**  
   → 首选 **[《Gemini 蓝皮书》](/gemini/)**，吃透 AI Studio → Antigravity 多智能体协作 → Workspace MCP 的零摩擦闭环。
4. **百万字中文与专业文档深读（金融/法律/医药）、开源私有化部署与高并发跨 IDE 协作**  
   → 首选 **[《Kimi 蓝皮书》](/kimi/)**，发挥 K3.1 Pro 开源基座与 `kimi acp` 跨编辑器优势（同时支持 Slides 与 3D Make）。

---

## 四、常见问题（FAQ）

### Q1：同一个项目需要为四款工具分别写四份项目规则文件吗？
不需要。核心项目边界建议统一维护在根目录 **`AGENTS.md`** 中：Codex、Antigravity 与 Kimi Code 原生直接读取 `AGENTS.md`，Claude Code 只需在根目录放置一行 `@AGENTS.md` 的 `CLAUDE.md` 即可复用，再按需补充各工具独有的 Hooks 或 `config.toml`。你可以直接用 [AI 协作规则生成器](/generator) 一键导出。

### Q2：单靠订阅套餐容易触发限流怎么办？
高强度全栈开发建议采用「主力订阅 + 备援 API/切换器」模式：在 Antigravity 开启 Orchestrator（Carbon 规划 + Hydrogen 执行），在 Codex CLI 使用开源工具 [Codex Switch](https://github.com/aipmer/codex-switch) 无损切换供应商并继承会话上下文。

### Q3：2026 年底有哪些必须立刻处理的模型退役风险？
OpenAI 方面需重点关注：**2026 年 11 月 30 日** `/v1/prompts` 与 Agent Builder 停用、Evals 转只读；**2026 年 12 月 23 日** `GPT-5.6 Sol` 与 `GPT-5.6 Terra` 从 ChatGPT Work 与 Codex 退役，请尽早迁移至 `gpt-6.2-sol` 或 `gpt-6.1-terra`（详见 [Codex Ch.13](/chapters/ch13_2026_frontier)）。
