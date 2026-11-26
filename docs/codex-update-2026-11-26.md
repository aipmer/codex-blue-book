# Codex 官方资料增量核对：2026-11-26

上轮正文资料截止日为 2026-10-21（v1.4.0）。本轮记录 2026-10-22 至 2026-11-26 的官方模型、CLI 与生命周期变化，书籍版本升级至 **v1.5.0**。日期代表本次核对结果，不代表本机已自动升级 CLI。

## 事实与官方来源

| 主题 | 已核对内容 | 来源 |
| :--- | :--- | :--- |
| CLI | 最新核对点推进至 `0.172.0`：新增线程深链跳转（Thread-Link）、斜杠命令 `Tab` 参数补全、`Shift+Up/Down` 任务组切换、`stdio` MCP 首次调用懒启动、`config.toml` 工具级审批人、Amazon Bedrock Runtime 接入、`codex exec resume` 沙盒权限恢复与跨 OS 远程目录修复 | [Codex 更新日志](https://learn.chatgpt.com/docs/changelog) |
| 新旗舰模型 | 11 月中旬推出 `gpt-6.2-astra`（1.05M 上下文 / 922K 输入 / 128K 输出；API 标价输入 $8.00 / 缓存 $0.40 / 输出 $40.00 / MTok；拒绝 `reasoning.effort: none`）与 `gpt-6.2-sol`（输入 $2.00 / 缓存 $0.10 / 输出 $10.00 / MTok；Ultrafast 促销 3× 至 2027-02-28） | [API 模型目录](https://developers.openai.com/api/docs/models) · [定价页](https://developers.openai.com/api/docs/pricing) |
| 视觉与 Computer Use | 10 月下旬推出 `gpt-6.1-terra`（输入 $1.00 / 缓存 $0.05 / 输出 $5.00 / MTok），覆盖 Plus/Pro/Business/Enterprise，面向视觉推理与桌面自动化 | [Codex 模型说明](https://learn.chatgpt.com/docs/models) |
| 已生效退役 | 2026-10-23 旧版 `gpt-3.5-turbo`、`gpt-4`、`gpt-4-turbo` 及早期 `o1` 快照退役 | [API 退役公告](https://developers.openai.com/api/docs/deprecations) |
| 近期硬节点 | 2026-11-30：`/v1/prompts`、Agent Builder 停用，Evals Dashboard & API 转只读；2026-12-23：GPT-5.6 Sol 与 Terra 从 ChatGPT Work 与 Codex 退役；2027-04-01：API `gpt-5.3-codex`、`gpt-5.4-nano`、`gpt-5.1` 停服 | [API 退役公告](https://developers.openai.com/api/docs/deprecations) · [Codex 更新日志](https://learn.chatgpt.com/docs/changelog) |

## 正文精修与 GEO/SEO 同步

- 清理 `ch04`、`ch06`、`ch07`、`ch09`（中英双语）历史残留的 `GPT-5.6 Terra` 表述，全书统一至 `gpt-6.2-sol` / `gpt-6.2-astra` / `gpt-6.1-terra` / `gpt-6-luna`。
- 依据 `renwei-writing` 原则完成 26 章首段去 AI 腔精修，消除咆哮式说教与重复垫场套话，保留全部结构化导读与测试护栏。
- 全部 26 章补齐独立 YAML `title`、`description`、`lastUpdated` frontmatter；同步生成全站 `sitemap.xml`、`robots.txt`、`llms.txt`、`llms-codex.txt`、`llms-full.txt`、`canonical`/`hreflang` 与 JSON-LD。
- `pmer.cn/ai-tools/codex/` 频道后续可按本表同步日期与 `0.172.0` / `GPT-6.2` 要点。
