# 🤖 Codex 协作协议 (Codex Collaboration Protocol - CAP)

[ 🌐 English Version ](#english-version)

## 📌 项目指纹
- **项目名称**：Codex 蓝皮书
- **项目类型**：Markdown 指南 / 电子书项目
- **写作风格**：专业、精炼、技术密度高、易读的中文，伴以恰当的格式与图表。
- **引用规范**：链接必须使用 `file:///` 格式的绝对路径（例如：`[link text](file:///Users/hunkwu/Desktop/ai/book/README.md)`）。

## 📡 发布目标
- **Vercel 正式项目**：`hunkwus-projects/codex-blue-book`，正式域名为 `book.pmer.cn`。本地目录名 `book` 不代表 Vercel 项目名，不要新建或重新绑定同名 `book` 项目。
- 使用 Vercel CLI 发布前，核对被 Git 忽略的 `.vercel/project.json`：`projectId` 必须为 `prj_on1hH3Ouj07w0Pp32OLRjDPTQNgQ`，`orgId` 必须为 `team_4Ct2Q4lrdZoikbEbGuBv04RI`。现有 GitHub Pages 工作流独立于此绑定。

## 🎯 目标受众
- 希望利用 AI 智能体（尤其是 OpenAI Codex）进行高效开发的专业开发者。
- 想要自主构建商业级 MVP 的独立黑客与创业者。

## 产品资料与推广素材
- 工程键与产品键均为 `book`，canonical ID 为 `book-pmer-cn`；按精确域名 `book.pmer.cn` 匹配，不归入 `pmer.cn` 的 PMER 产品资料。
- 当前产品事实源：`docs/backlink/product-profile/book.json`；分享素材与来源：`docs/promotion/2026-10-21/README.md`。共享使用和接入说明：`/Users/hunkwu/Desktop/ai/docs/product-library/README.md`。
- 更新先维护本项目事实与 manifest，再刷新资料库；英文展示优先，未知价格、主体和账号留空。登记素材不授权发布或提交。
- 分享元数据由 `.vitepress/config.mts` 的 `transformHead` 在构建时生成；根首页及英文页使用英文品牌图，中文章节使用中文图，页面自定义图优先。变更后运行 `npm run docs:build` 并检查生成 HTML 的 head。

## 🛑 约束红线
- **严禁使用占位符**：必须提供真实、可运行的示例代码和配置。
- **注重实操**：每个章节必须包含逐步的代码片段、命令行执行或配置文件模版。
- **链接完整**：确保各章节之间的链接引用正确，无死链。
- **杜绝冗长摘要**：避免重复内容；专注于可落地的洞察、心智模型和步骤演练。

## 🧪 验证标准
- 所有 Markdown 文件必须语法正确，且链接到真实存在的目标路径。
- 所有代码块必须带有正确的语言标签（例如：` ```bash `, ` ```markdown `, ` ```json `）。

---
---

## 🌐 English Version

# 🤖 Codex Collaboration Protocol (CAP)

## 📌 Project Signature
- **Project Name**: Codex Blue Book
- **Framework**: Markdown Guide / Book Project
- **Coding Style**: Professional, concise, tech-rich, easy-to-read Chinese with proper formatting and diagrams.
- **Reference Style**: Links should be absolute paths with `file:///` scheme (e.g. `[link text](file:///Users/hunkwu/Desktop/ai/book/README.md)`).

## 📡 Deployment Target
- **Production Vercel project**: `hunkwus-projects/codex-blue-book`, serving `book.pmer.cn`. The local directory name `book` is not the Vercel project name; do not create or relink a separate `book` project.
- Before deploying with Vercel CLI, verify the Git-ignored `.vercel/project.json`: `projectId` must be `prj_on1hH3Ouj07w0Pp32OLRjDPTQNgQ` and `orgId` must be `team_4Ct2Q4lrdZoikbEbGuBv04RI`. The existing GitHub Pages workflow is independent of this link.

## 🎯 Target Audience
- Professional developers looking to leverage AI agents (especially OpenAI Codex) for high-efficiency development.
- Indie Hackers / Entrepreneurs wanting to build commercial-grade MVPs autonomously.

## 🛑 Hard Constraints
- **Do not use placeholders**: Always provide real, functional examples and configurations.
- **Keep it practical**: Every chapter must contain step-by-step code snippets, command executions, or configuration templates.
- **Preserve Links**: Ensure all links between chapters are correctly referenced.
- **No verbose summaries**: Avoid repeating contents; focus on actionable insights, mental models, and step-by-step walkthroughs.

## 🧪 Verification Specs
- All markdown files must be syntactically valid and link to actual target paths.
- Code blocks must have language tags (e.g. ` ```bash `, ` ```markdown `, ` ```json `).
