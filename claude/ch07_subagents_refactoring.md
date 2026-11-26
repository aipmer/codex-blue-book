---
title: "Ch.07 多子代理分治（Subagents）与长时自主重构实战 | Claude 实战蓝皮书"
description: "编写 .claude/agents/*.md 隔离上下文并行分治，拆解官方 Rakuten 7 小时自主重构（提速 79%）与 Anthropic Python 转 Rust 差分迁移实战方法论。"
lastUpdated: 2026-11-26
---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.06) ](./ch06_legacy_governance.md) | [ ➡️ 下一章 (Ch.08) ](./ch08_ship_pr_steward.md) | [ 🌐 English ](/en/claude/ch07_subagents_refactoring)

# Ch.07 多子代理分治（Subagents）与长时自主重构实战

> 🎯 **具体工程麻烦**：主会话一边搜代码、一边改实现、一边跑测试、一边做安全评审，上下文很快变成一锅粥，既互相干扰又让“自己审自己”形同虚设。  
> 💡 **可运行实战代码与落地收益**：三套可直接落盘的 `.claude/agents/*.md` 配置（只读探索 / 领域重构 / 独立评审）；拆解官方 Rakuten 7 小时重构与 Anthropic Python→Rust 差分测试闭环。  
> ⚡ **社交传播 / 截图金句**：“别让写代码的同一个上下文去审自己的代码。把探索、执行与审查拆进隔离 Subagents，长时自主重构才稳得住。”

当单次重构涉及几十个文件、持续运行数小时，单线程对话必然撞上两个天花板：第一，中间搜索过程和海量测试日志迅速污染主窗口；第二，负责改代码的模型会天然偏袒自己刚写的假设，自我审查几乎抓不出盲区。

Claude Code 的 **Subagents（`.claude/agents/*.md`）** 正是为此而生——每个子代理拥有独立的系统提示词、独立的工具白名单、独立的模型选型以及**完全隔离的上下文窗口**，干完重活只把精炼结论回传给主协调者。

---

## 🎯 生活化直觉隐喻：把“全能一人岗”拆成“侦察兵 + 施工队 + 独立监理”

```text
【单会话大包大揽】──> 同一个人既画图、又施工、又自己签验收单，桌子堆满废纸，越干越糊涂。
【Subagents 分治】──> 主会话只当总指挥（Opus 5.5）：
                      ├── 侦察兵（repo-explorer · Haiku 5.5 · 只读）：翻遍百个文件，只回传 30 行定位摘要；
                      ├── 施工队（domain-refactor · Sonnet/Opus 5.5）：拿定位摘要在限定目录改代码跑单测；
                      └── 独立监理（arch-reviewer · Opus 5.5 · 禁 Bash）：零历史包袱审查 Diff，专挑架构与安全漏洞。
```

---

## 🚀 新手极速上手 3 步走（无痛起步）

1. **步骤一：在项目创建 `.claude/agents/` 目录**
   ```bash
   mkdir -p .claude/agents
   ```
2. **步骤二：放入只读探索与独立审查两个子代理 Markdown 文件**
   使用下节的标准 YAML frontmatter，明确声明 `model`、`tools` 与 `disallowedTools`。
3. **步骤三：在主会话中分派任务并验收回传摘要**
   向主会话下达指令：“先派 `repo-explorer` 找出所有直接操作 `orders` 表的调用点，再按结果分批重构，最后派 `arch-reviewer` 审查全部改动。”

---

## 7.1 三套生产级 `.claude/agents/*.md` 实战配置

### 1. 只读侦察兵：`.claude/agents/repo-explorer.md`（低成本 Haiku 5.5）

```markdown
---
name: repo-explorer
description: 高速只读扫描代码库依赖、接口定义与历史用法。当需要定位跨模块引用但不需要修改任何文件时使用。
model: claude-haiku-5-5
tools:
  - Read
  - Grep
  - Glob
disallowedTools:
  - Edit
  - Write
  - Bash
permissionMode: plan
---

# 只读代码侦察规范
1. 只返回确切的文件路径、行号与核心调用链摘要，严禁粘贴整段源码。
2. 汇总结果控制在 40 行 Markdown 以内，按风险从高到低排序。
```

### 2. 独立架构审查官：`.claude/agents/arch-reviewer.md`（隔离偏见）

```markdown
---
name: arch-reviewer
description: 审查代码 Diff 中的边界条件、并发隐患、安全漏洞与架构违例。每次阶段性改动完成或提 PR 前调用。
model: claude-opus-5-5
tools:
  - Read
  - Grep
  - Glob
disallowedTools:
  - Edit
  - Write
  - Bash
---

# 独立审查准则
你没有参与本次编码，请以挑刺的视角审阅所有变更：
1. 核查是否违反 `docs/adr/` 既有架构契约或修改了只读目录；
2. 核查鉴权、SQL 注入、空指针与异步竞态条件；
3. 仅输出可验证的问题清单（文件:行号 + 复现条件 + 修复建议），没问题直接回复 PASS。
```

---

## 7.2 官方标杆案例拆解（一）：Rakuten（乐天）7 小时自主重构启示录

Anthropic 公开的企业客户案例中，**Rakuten（乐天）**在横跨电商、金融科技与数字内容的 70 余条业务线中规模化部署了 Claude Code。其中最受关注的一次实战，是让 Claude Code 在复杂开源库上连续执行 **7 小时自主编码重构**，实现 **99.9% 数值精度**，并将整体新特性交付周期从 **24 天压缩至 5 天（缩短 79%）**。

很多团队照着跑长任务却撑不过 20 分钟就跑偏，核心差别在于三件事：
1. **结果断言（Outcomes）取代人工盯梢**：开工前先把目标写成可机器判定的数值/测试断言，不靠人每隔五分钟口头确认；
2. **主从分治隔离上下文**：由主协调代理拆解任务切片，派发后台子代理在各自窗口内完成编码与排错，主窗口始终清爽；
3. **验证闭环前置**：每一小步改动都强制跑自动化校验，一旦精度或断言偏差立刻在局部循环自愈，绝不把脏状态带进下一小时。

---

## 7.3 官方标杆案例拆解（二）：Anthropic 内部 Python → Rust 差分迁移法

在另一份引发广泛关注的内部工程实录中，Anthropic 团队使用多组 Claude 智能体，将核心 **Messages API 从 Python 完整迁移至 Rust**。跨语言重写最怕的不是编译不过，而是**细微的序列化、错误码与边界行为不一致**。

他们采用的核心武器叫 **差分测试（Differential Testing）**：

```text
同一批真实/合成请求流量
    ├──► 旧线上基线（Python 服务） ──► 响应 A（状态码 + Header + JSON 结构）
    └──► 新迁移实现（Rust 服务）   ──► 响应 B（状态码 + Header + JSON 结构）
                                            │
                                            ▼
                         差分比对器自动抓出任何字段偏差 ──► 派发 Claude 子代理定向修复
```

这套方法完全可以直接复用到你的存量重构或语言升级项目中：写一个轻量的 Node/Python 流量回放比对脚本，让 Claude 子代理持续“跑差分 → 看偏差 → 修新服务 → 再回放”，直到 100% 样本零差异。

---

## 🛡️ 翻车自救与避坑速查表

| 常见踩坑现象 | 致命原因 | 极速自救方案 |
| :--- | :--- | :--- |
| **并行开 5 个可写子代理同时改同一个模块，互相覆盖代码** | 多写者共享同一工作目录 | 写操作按互斥目录切分，或为每个写子代理分配独立 `git worktree` |
| **子代理回传了几千行原始日志，瞬间撑爆主会话** | 子代理提示词未限制输出格式与长度 | 在 `.claude/agents/*.md` 硬性规定“仅返回不超过 40 行的结构化摘要与文件路径” |
| **主代理从不自动调用你写好的自定义子代理** | `description` 缺少清晰分派条件 | 在 `description` 显式写明触发时机，或在主 Prompt 直接点名调用 `@arch-reviewer` |

---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.06) ](./ch06_legacy_governance.md) | [ ➡️ 下一章 (Ch.08) ](./ch08_ship_pr_steward.md) | [ 🌐 English ](/en/claude/ch07_subagents_refactoring)
