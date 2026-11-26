---
title: "Ch.02 上下文经济学：精简 CLAUDE.md、Skills 与 MCP 技能挂载 | Claude 实战蓝皮书"
description: "掌握 CLAUDE.md 150 行精简法则与 @AGENTS.md 跨工具复用，编写按需加载的 SKILL.md，接入 MCP server:skill 并用 claude plugin eval 量化收益。"
lastUpdated: 2026-11-26
---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.01) ](./ch01_programmable_platform.md) | [ ➡️ 下一章 (Ch.03) ](./ch03_hooks_code_mode.md) | [ 🌐 English ](/en/claude/ch02_context_economics)

# Ch.02 上下文经济学：精简 `CLAUDE.md` 与按需加载 `Skills` 体系

> 🎯 **具体工程麻烦**：把所有规范、数据库文档和部署手册全堆进 `CLAUDE.md`，导致每轮请求 Token 飙升、模型注意力被稀释，关键禁令反而失效。  
> 💡 **可运行实战代码与落地收益**：150 行 `CLAUDE.md` + `@AGENTS.md` 跨工具复用结构；标准 `SKILL.md` 渐进式披露模板；`claude plugin eval` 评测命令。  
> ⚡ **社交传播 / 截图金句**：“往 `CLAUDE.md` 塞 1000 行规范，等于把禁烟标志贴满整面广告墙——真正致命的那条，AI 反而看不见。”

很多团队用完一周 Claude Code 后，会把踩过的每一个坑都追加到 `CLAUDE.md` 里。一个月后，这个文件膨胀到上千行，涵盖前端规范、数据库迁移、发布流程和客服文案。结果每发一句“帮我改个按钮颜色”，模型都要先吞下上千行无关背景，既烧缓存写入费，又让核心约束被噪音淹没。

解决这个问题的思路叫**渐进式披露（Progressive Disclosure）**：常驻规则只留全仓库通用的极简硬约束，专项流程全部拆成按需加载的 **Skills**。

---

## 🎯 生活化直觉隐喻：口袋卡片 vs 挂墙维修手册

```text
【臃肿 CLAUDE.md】 ──> 要求技师每天背着 20 斤重的全厂百科全书上班，拧一颗螺丝也要翻半小时。
【分层上下文体系】 ──> 1. 胸牌背面（CLAUDE.md / @AGENTS.md）：只印 10 条绝对不能碰的安全红线和常用命令；
                       2. 工具箱抽屉（.claude/skills/*/SKILL.md）：修数据库才抽《迁移手册》，
                          做发版才抽《上线检查单》，平时只露出抽屉标签（name + description）。
```

---

## 🚀 新手极速上手 3 步走（无痛起步）

1. **步骤一：用 `@AGENTS.md` 实现四工具共享一套项目规则**
   如果你的仓库已经有面向 Codex / Antigravity / Kimi 的 `AGENTS.md`，在项目根目录创建极简 `CLAUDE.md`：
   ```markdown
   @AGENTS.md

   ## Claude Code 专属约定
   - 复杂重构先进入 plan 模式输出变更文件清单，再修改代码。
   - 提交前必须通过 `.claude/settings.json` 中的 Hooks 校验。
   ```
2. **步骤二：创建第一个按需加载的 Skill 目录**
   ```bash
   mkdir -p .claude/skills/db-migration
   ```
3. **步骤三：用 `/db-migration` 或自然语言触发验证**
   在 Claude Code 中输入“帮我给 User 表加一个索引”，观察模型自动发现并按需读取 `.claude/skills/db-migration/SKILL.md`。

---

## 2.1 `CLAUDE.md` 的黄金 150 行法则

`CLAUDE.md` 在每次会话启动时自动注入，因此只适合放**几乎每次任务都会用到**的信息：

- **项目指纹**：技术栈、包管理器、核心目录划分（不超过 15 行）；
- **标准命令**：`build`、`lint`、`typecheck`、`test` 的确切可执行命令；
- **硬性禁区**：禁止修改的历史目录、禁止泄露的凭据前缀、禁止绕过的测试步骤。

**什么不该写进 `CLAUDE.md`？**
- 只有特定场景才用的长流程（比如 Stripe Webhook 排错、数据库迁移步骤）→ 拆到 `.claude/skills/`；
- 必须 100% 强制执行的规则（比如禁止 `rm -rf`、保存后自动跑 Prettier）→ 下沉到 Ch.03 的 `Hooks`；
- 冗长的代码风格说教 → 交给 ESLint / Biome / Ruff 等确定性静态检查工具。

---

## 2.2 编写符合开放标准的模块化 `SKILL.md`

遵循开放的 Agent Skills 规范，一个 Skill 是一个独立文件夹，启动时 Claude 只加载 `name` 与 `description` 元数据，命中场景时才读取完整正文与附属脚本：

```text
.claude/skills/
└── db-migration/
    ├── SKILL.md
    └── scripts/
        └── check-lock-risk.sh
```

以下是可直接落盘的 `.claude/skills/db-migration/SKILL.md` 示例：

```markdown
---
name: db-migration
description: 编写与校验生产级 Prisma / PostgreSQL 数据库迁移。当任务涉及修改 schema.prisma、新增索引或表结构变更时触发。
model: inherit
allowed-tools:
  - Read
  - Edit
  - Bash
---

# 数据库安全迁移流程

执行任何表结构修改前，严格按以下 4 步推进：

1. 先运行 `npx prisma validate` 确认 schema 语法无误。
2. 生成迁移 SQL 但不直接应用生产库：`npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script`。
3. 审查生成的 SQL，拦截以下高危锁表操作：
   - 大表直接 `ADD COLUMN ... NOT NULL` 未提供 `DEFAULT`；
   - 未带 `CONCURRENTLY` 的大表 `CREATE INDEX`。
4. 在本地测试库跑通迁移并执行 `npm run test:db`，退出码为 0 后才交付。
```

---

## 2.3 MCP 进阶：使用 `server:skill` 挂载远端团队工作流

2026 年 11 月的 Claude Code 更新支持 **MCP Server 直接分发 Skills（`server:skill`）**。

过去接入一个包含 15 个接口的内部 MCP 服务，模型常常不知道该按什么顺序串联调用。现在服务端可以直接把标准操作流打包为 Skill 随工具一起暴露：

```bash
# 查看已连接 MCP 服务及其暴露的远程 Skill
claude mcp list

# 在交互会话的斜杠菜单中直接调用远端 MCP 技能
# 格式：/<server-name>:<skill-name>
/sentry:triage-production-spike
```

这种方式有两个直接工程收益：
1. 团队更新发布或排障流程时，只需更新远端 MCP Server 里的 Skill，所有工程师终端即时生效，不用挨个同步本地 Markdown；
2. 配合下一章的 `PreSkillShellCommand` 钩子，可以拦截未经审核的远端 Skill 注入恶意 Shell 命令。

---

## 2.4 用 `claude plugin eval` 量化检验 Skill 真实收益

写完一套 Skill 或自定义插件后，别靠主观感觉判断“好像变好用了”。使用 Claude Code 内置评测命令，将挂载插件后的表现与无插件基线做对照：

```bash
# 为自定义插件自动生成评测集并对比无插件基线
claude plugin eval ./plugins/db-migration-kit --baseline none
```

评测会输出任务通过率、工具调用步数与 Token 消耗对比。如果某个 Skill 增加了 30% Token 却没有拉高通过率，说明指令过于啰嗦，应当立刻删减。

---

## 🛡️ 翻车自救与避坑速查表

| 常见踩坑现象 | 致命原因 | 极速自救方案 |
| :--- | :--- | :--- |
| **写好了 `SKILL.md` 却从不被自动触发** | `description` 写得太抽象，缺少明确触发关键词 | 在 `description` 写明具体文件后缀与场景动词（如“修改 `schema.prisma` 时使用”） |
| **多人协作时 `CLAUDE.md` 与 `AGENTS.md` 内容打架** | 两份文件各自维护，规则互相覆盖 | 统一以 `AGENTS.md` 为唯一事实源，`CLAUDE.md` 首行只写 `@AGENTS.md` |
| **引入第三方 Skill 后被暗藏脚本改坏环境** | 未启用 `PreSkillShellCommand` 拦截与来源审查 | 接入第三方插件前先人工读 `SKILL.md`，并在 `.claude/settings.json` 配置门禁钩子 |

---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.01) ](./ch01_programmable_platform.md) | [ ➡️ 下一章 (Ch.03) ](./ch03_hooks_code_mode.md) | [ 🌐 English ](/en/claude/ch02_context_economics)
