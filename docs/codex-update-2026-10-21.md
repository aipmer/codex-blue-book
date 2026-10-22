# Codex 官方资料增量核对：2026-10-21

上轮正文资料截止日为 2026-09-24。本轮记录 2026-09-25 至 2026-10-21 的主要变化，书籍版本 v1.4.0。日期表示编辑核对结果，不保证长期为最新版本，也不代表本机 CLI 已更新。

## 事实与官方来源

| 主题 | 已核对内容 | 来源 |
| --- | --- | --- |
| CLI | 0.163.0 于 10 月 15 日发布；新增 `/config` 设置搜索、`/keymap` 前缀键、`/daemon` 管理，改进即时引导与权限恢复 | [更新日志](https://learn.chatgpt.com/docs/changelog) |
| 推荐模型 | 9 月 29 日推出 GPT-6.1 Sol，复杂日常工作优先试用；Astra 处理最难任务，Luna 处理明确高频工作 | [Codex 模型](https://learn.chatgpt.com/docs/models) |
| 可用性 | GPT-6.1 Sol 首发 Plus、Pro、Business、Enterprise、Edu，Enterprise/Edu 需管理员开启，Free/Go 不在首发范围；旧 Sol 与 GPT-5.6 系列在推出期间保留 | [Codex 模型](https://learn.chatgpt.com/docs/models) |
| API | `gpt-6.1-sol` 支持 low/medium/high/xhigh/max，medium 默认，不支持 none/minimal；工具调用使用 Responses；上下文 1,050,000、最大输出 128,000 token | [API 规格](https://developers.openai.com/api/docs/models/gpt-6.1-sol) |
| API 价格 | 标准处理、输入不超过 272K，每百万 token 输入 $2、缓存读取 $0.10、缓存写入 $2.50、输出 $10 | [API 价格](https://developers.openai.com/api/docs/models/gpt-6.1-sol) |
| 旧模型对照 | Astra、GPT-6 Sol、Luna 的推理档位和标准价格已重查；旧 Sol 的缓存输入仍为 $0.20 | [Astra](https://developers.openai.com/api/docs/models/gpt-6-astra)、[旧 Sol](https://developers.openai.com/api/docs/models/gpt-6-sol)、[Luna](https://developers.openai.com/api/docs/models/gpt-6-luna) |
| Ultrafast | 10 月 8 日扩展到 GPT-6.1 Sol，Pro $500 及符合条件的 Enterprise/Edu 可用；订阅内 8×，购买积分及企业按量 6×，API Key 使用 API 价格 | [速度与计费](https://learn.chatgpt.com/docs/agent-configuration/speed) |
| 输入建议 | 10 月 9 日 beta，个人 Pro、18 岁以上、受支持地区，本地/SSH Astra 或 GPT-6.1 Sol；Tab 仅接受草稿，发送需另行动作 | [输入建议](https://learn.chatgpt.com/docs/features/composer-predictions) |
| 退役范围 | 10 月 14 日 GPT-5.5 从 Codex 的 ChatGPT 登录态退役，API 和 API Key 会话不受通知影响 | [退役范围](https://learn.chatgpt.com/docs/agent-configuration/speed#retirement-and-migration) |
| 客户端 | App 26.928 worktree 终端与回答保留，以及后续审查导航、Windows/WSL、iOS 审批与队列恢复改进 | [更新日志](https://learn.chatgpt.com/docs/changelog) |

## 两站内容与跳转

- 当前 PMER 规范路径为 `/ai/tools/codex/`，英文为 `/en/ai/tools/codex/`；旧 `/ai-tools/` 路径由现有迁移规则跳转。本轮保留远端迁移，不覆盖为旧路径。
- 书站中英首页、README、导航、第 2／13 章指向对应语言频道；频道双语概览、指南与更新指向书站对应语言章节。
- 保留远端审稿、导航和安全修正。原工作区有其他未提交任务；本次在最新远端基线的独立工作区中合入本轮内容。

## GitHub 同步验收

- 最新基线为 `4145c11`；VitePress 构建通过，章节 312/312、链接 99/99、术语 16/16 通过。
- 现有 E2E 为 73/96 通过、23 项失败。在未修改的 `origin/main` 基线上复跑也是 73/96；失败 ID 集合完全一致，无新增失败。既有断言仍要求旧版宣传文案、按钮数量、固定图片宽度和旧目录标题；本轮不回退已审稿内容以迎合这些断言。
- Ego 抽查当前英文第 13 章与 PMER 英文频道：模型、CLI 与对应语言回链一致；本地旧地址跳转保留查询参数。
- 重新生成双语合订本和四份 PDF，正文含 `v1.4.0`、`gpt-6.1-sol`、`0.163.0`、`Ultrafast`。根目录、下载目录与最终构建内的文件逐字节相同，模型／价格页渲染抽查通过。
- 中文 PDF 41 页，SHA-256 `90af43337a68113c55524a4b0cabccb68b0e0075e69214ff2624b2a3691ced11`；英文 PDF 45 页，SHA-256 `e94d102aa306f77e07ec0610708aaca3102cd3fb4977449551f1d3957b45110a`。
- PMER 16 项工具／路由／双语测试通过，双语覆盖、SEO 与性能产物校验通过；既有 SEO 摘要长度警告保留。

使用专用分支和 PR，不直接推送 main，避免触发生产部署。GitHub 仓库简介与主页链接按本次授权同步。
