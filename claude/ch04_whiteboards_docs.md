---
title: "Ch.04 从混沌脑暴到架构定稿：Claude Whiteboards 与持久工作区 | Claude 实战蓝皮书"
description: "跳出聊天框线性陷阱，用 Claude Whiteboards 无限画布整理复杂业务流与架构草图，无损流转为 Claude Docs、Sheets、Miro 与代码库 ADR 文档。"
lastUpdated: 2026-11-26
---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.03) ](./ch03_hooks_code_mode.md) | [ ➡️ 下一章 (Ch.05) ](./ch05_design_canvas.md) | [ 🌐 English ](/en/claude/ch04_whiteboards_docs)

# Ch.04 从混沌脑暴到架构定稿：Claude Whiteboards 与结构化文档矩阵

> 🎯 **具体工程麻烦**：复杂需求还没想清楚就直接进终端写代码，聊天记录滚了上百屏，架构决策、字段口径和排期散落在不同角落，最后写出一堆返工代码。  
> 💡 **可运行实战代码与落地收益**：Whiteboards → Claude Docs / Sheets → 仓库 `docs/adr/` 双向锚定工作流；可直接落盘的 ADR 架构决策模板。  
> ⚡ **社交传播 / 截图金句**：“聊天框是线性的，真实业务是网状的。先把混沌想法摊在白板上收敛，再让 Claude Code 动第一行代码。”

很多软件返工不是因为模型代码写得烂，而是需求本身在动工前就是一团浆糊。把未成型的业务流程、权限矩阵和异常分支塞进一维聊天框里来回讨论，翻十几屏之后，连人自己都忘了最终拍板的是第几版方案。

Anthropic 在 2026 年补齐了一套非线性的持久工作区矩阵——**Claude Whiteboards（无限画布白板）**、**Claude Docs**、**Claude Sheets** 与 **Claude Data**。这一章讲清楚怎么在动代码前，把白板上的脑暴一步步收敛成能直接喂给 Claude Code 的硬规格。

---

## 🎯 生活化直觉隐喻：先在白板墙上拉红线，再进施工现场

```text
【线性聊天直出代码】──> 边画图纸边砌墙，聊到第 30 句改了承重墙位置，前面砌的全得砸。
【持久工作区接力流】──> 1. Whiteboards（作战室白板）：把语音、便签、业务异常全倒上去，让 Claude 聚类连线；
                        2. Claude Docs / Sheets（施工蓝图与预算表）：一键从白板转成 PRD 与容量成本表；
                        3. 仓库 docs/adr/（落地契约）：提交进 Git，Claude Code 按契约写代码并双向同步。
```

---

## 🚀 新手极速上手 3 步走（无痛起步）

1. **步骤一：把碎片想法直接倒进 Claude Whiteboards**
   打开 Claude Whiteboards，不用整理格式，直接用口语或粘贴会议纪要输入核心业务目标、角色与顾虑，让 Claude 自动按泳道分组、生成用户主流程与异常分支。
2. **步骤二：框选白板局部区域定向深挖**
   选中白板上的“支付回调与退款”区块，只针对这一块追问边界条件和状态机，避免改动已经定稿的其他模块。
3. **步骤三：一键转化为 Docs / Sheets 并导出至项目仓库**
   白板定稿后，直接转换为 Claude Docs 技术规格书（或导出至 Miro / Lucid 供跨团队评审），再将最终 ADR 文档落盘到仓库 `docs/adr/` 目录。

---

## 4.1 Claude Whiteboards 实战：把混乱业务流收敛为架构图

Whiteboards 最有价值的阶段不是画精美的汇报图，而是**早期混沌发散与收敛**：

- **多人实时同屏编辑**：产品、研发与测试可以同时在白板上拖放卡片、圈选待决问题，让 Claude 基于当前选中区域补全缺失分支；
- **结构化重排**：面对几十条杂乱的头脑风暴便签，一条指令即可让 Claude 按“用户旅程 / 微服务边界 / 风险等级”重新分组；
- **状态机校验**：在白板上明确列出订单或审批流的所有终态，提前揪出“已退款还能再次发货”这类状态死角。

---

## 4.2 持久工作区串联：Docs、Sheets 与 Data 协同

白板拍板后，最容易丢上下文的环节是“把画出来的图重新抄进文档和表格”。Claude 持久工作区的价值在于**零复制粘贴的无损转化**：

| 工作区载体 | 解决什么工程问题 | 进入研发流的方式 |
| :--- | :--- | :--- |
| **Claude Whiteboards** | 早期脑暴、业务泳道、跨模块依赖与复盘行动项 | 选中模块收敛后转 Docs，或导出至 Miro / Lucid |
| **Claude Docs** | 正式 PRD、API 契约与技术设计说明书 | 导出 Markdown 存入仓库 `docs/specs/`，供 Claude Code 读取 |
| **Claude Sheets** | 多标签页容量估算、API Token 成本测算与权限矩阵（含公式与下拉项） | 导出 CSV/JSON 作为测试用例输入与计费配置依据 |
| **Claude Data** | 连接 Snowflake / Salesforce / Mixpanel / Amplitude 查线上真实指标 | 用真实线上漏斗与报错分布反推重构优先级 |

---

## 4.3 文档与代码双向锚定：仓库级 ADR 落盘规范

白板和云端文档再好用，最终必须回到 Git 仓库里变成**版本化事实**，Claude Code 才不会在三个月后把当初的架构决策推翻重来。

在项目根目录建立 `docs/adr/`，每项重大决策落盘一份简明 ADR（Architecture Decision Record）：

```markdown
# ADR-004: 订单状态机采用显式事件表而非直接覆盖 status 字段

- **日期**：2026-11-26
- **状态**：已定稿（来源：Claude Whiteboard 订单重构评审板）
- **决策**：新增 `order_events` 仅追加事件表，所有状态变更必须通过 `transitionOrder()` 纯函数校验前置状态。
- **拒绝方案**：在业务 Controller 中直接 `UPDATE orders SET status = ...`（会导致并发回调覆盖状态）。
- **代码锚点**：
  - `src/domain/order/stateMachine.ts`
  - `src/domain/order/stateMachine.test.ts`
```

随后在 `CLAUDE.md` 中加一行索引，让 Claude Code 每次修改订单域代码前先核对 `docs/adr/004-order-state-machine.md`：

```markdown
## 架构决策索引
- 修改订单状态流转前，必读 `docs/adr/004-order-state-machine.md`，严禁绕过 `transitionOrder()` 直接写库。
```

通过 Git 提交把白板结论锁死在代码仓里，再配合下一章的 `/design` 画板，需求和界面就彻底告别了口口相传。

---

## 🛡️ 翻车自救与避坑速查表

| 常见踩坑现象 | 致命原因 | 极速自救方案 |
| :--- | :--- | :--- |
| **白板越画越大，最后没人能看懂全貌** | 把所有细节字段都堆在同一张画布上 | 白板只放模块边界、主链路与状态机；接口字段细节转入 Claude Docs 与 Sheets |
| **文档写了，但 Claude Code 写代码时完全没遵守** | 文档留在云端未同步进 Git，且 `CLAUDE.md` 未建立路径索引 | 将定稿导出为 `docs/adr/*.md` 入库，并在 `CLAUDE.md` 加 1 行明确路径指引 |
| **代码后来改了逻辑，ADR 文档却过期误导 AI** | 缺少代码变更同步文档的收尾检查 | 在 PR 检查 Skill 中加入断言：“修改核心域接口时必须同步更新对应 `docs/adr/`” |

---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.03) ](./ch03_hooks_code_mode.md) | [ ➡️ 下一章 (Ch.05) ](./ch05_design_canvas.md) | [ 🌐 English ](/en/claude/ch04_whiteboards_docs)
