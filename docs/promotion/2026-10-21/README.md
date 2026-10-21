# Codex Blue Book 双语分享素材

2026-10-21。双语品牌封面与资料库接入，英文优先；本轮已授权提交、推送与生产发布。实际部署及正式域名验收状态以接续记录为准，平台内预览与社交发布仍未完成。

## 素材与来源

| 用途 | 英文 | 中文 |
| --- | --- | --- |
| OG / Twitter / Bluesky / Reddit 链接图 | public/social/brand-en-20261021.jpg | public/social/brand-zh-20261021.jpg |
| Pinterest 2:3 | docs/promotion/2026-10-21/pinterest/book-en-1000x1500.jpg | docs/promotion/2026-10-21/pinterest/book-zh-1000x1500.jpg |

横版 1200×630，竖版 1000×1500，均为 sRGB JPEG，小于 500KB。原图、提示词、文案、尺寸与 SHA-256 保存在本目录 `originals/`、`prompts.json`、`og-manifest.json` 与 `pinterest-manifest.json`；可复制文案另有 `pinterest-copy.csv`。

使用 Codex 原生 `imagegen` 生成并完成中文文字替换；继承前轮 Hands-On 封面的明亮、浅蓝、柔和立体风格。插画为蓝色书籍、笔记本与相连的编程工作流卡片，不替换原站 Logo 或书封。已有品牌 Logo 与两本书封单独登记为既有素材。

重新导出（需要 macOS sips，只做尺寸、格式与色彩空间处理）：

```bash
cd /Users/hunkwu/Desktop/ai/book
python3 docs/promotion/2026-10-21/export-assets.py
npm run docs:build
```

## 语言与元数据

VitePress 的 `transformHead` 在构建时生成初始 HTML 标签；根首页及 `/en/` 使用英文封面，中文章节及中文生成器使用中文封面。标题、描述与 `og:locale` 仍按正文语言；不改变页面内容、路由、canonical 或索引设置。已有页面级 `og:image` / `twitter:image` 优先，避免品牌图覆盖专属图或附加错误尺寸。

## 平台与授权

- X、Bluesky、Reddit 复用横版链接图；本地 HTML/文件检查不代表平台已抓取或实际显示。原会话的 X 问题按用户要求跳过。
- Pinterest 提供独立竖版、双语文案、Alt 与匹配语言的落地链接；图板与账号留空，状态为 prepared_not_published，不沿用 GreetingCardGo 账号。
- 尚无 Book 视频主题或频道需求，本轮不机械生成 YouTube 缩略图/横幅。
- 不新增伪文章或商品 Schema。资料登记不产生注册、上传、发布或部署授权。平台预览、浏览器交互继续沿用原会话的暂缓约定，不升级浏览器。

## 验证与维护

共享注册表只追加 Book；资料与原图由本项目维护。验证与备份见 [接续记录](file:///Users/hunkwu/Desktop/ai/reports/book-promotion-2026-10-21/README.md)。每次变更先改项目事实与 manifest，再刷新 product-promotion；不可把本地候选状态写成生产生效。
