---
title: "Ch.05 终端直通画板：/design（Claude Design）交互原型与源码回流 | Claude 实战蓝皮书"
description: "在 Claude Code 终端直接调用 /design 启动 claude.ai/design 实时代码画板，绑定团队 Design System，选定交互画板后一键回流生产前端源码。"
lastUpdated: 2026-11-26
---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.04) ](./ch04_whiteboards_docs.md) | [ ➡️ 下一章 (Ch.06) ](./ch06_legacy_governance.md) | [ 🌐 English ](/en/claude/ch05_design_canvas)

# Ch.05 终端直通画板：`/design`（Claude Design）交互原型与源码回流实战

> 🎯 **具体工程麻烦**：纯靠终端文字描述改前端界面，反复盲猜间距与配色十几个来回，改出来的页面还是充满廉价“AI 紫渐变”模板味。  
> 💡 **可运行实战代码与落地收益**：掌握 Claude Code `/design` 技能完整闭环；配置团队 Design System 约束文件；复现官方“画板定稿 → 单日落地生产组件”流程。  
> ⚡ **社交传播 / 截图金句**：“别在命令行里用文字盲猜界面排版。敲一行 `/design`，在实时代码画板上挑好定稿，直接回流仓库写进源码。”

前端界面开发一直是命令行智能体的天然短板：终端里看不见视觉层次，只靠纯文字形容“卡片再克制一点、留白再透气一点”，往往要来回返工七八次。

Anthropic 推出的 **Claude Design（`claude.ai/design`）** 与 Claude Code 内置的 **`/design` 命令**，把终端工程流与可视化画板彻底接通了。关键在于：**Claude Design 生成的不是一张死图，而是运行在实时画板上的真实 HTML / CSS / JavaScript 交互界面**，带图层面板、多页面切换、行内批注与属性微调，选定画板后直接回流 Claude Code 落地为项目组件。

---

## 🎯 生活化直觉隐喻：设计师的“带电样板间”

```text
【传统纯文本改 UI】 ──> 你蒙着眼睛用对讲机指挥装修队“沙发往左挪 10 厘米”，挪完拍照再猜。
【图片生图再切图】  ──> 给你画一张精美的效果图，但尺寸比例全靠前端手工重新量、重新写 CSS。
【/design 代码画板】──> 在 Claude Code 敲 `/design`，直接搭出 3 套可点击交互的“带电样板间”：
                        你推开门点按钮、拉滑块调留白、批注删掉多余装饰，
                        拍板“就用 2 号方案”，Claude Code 直接把样板间结构落成你的 React/Vue 组件。
```

---

## 🚀 新手极速上手 3 步走（无痛起步）

1. **步骤一：在 Claude Code 会话中调用 `/design`**
   直接描述要改造的页面或组件，同时指明现有样式文件供其参考：
   ```text
   /design 重新设计移动端导航栏与定价卡片区域，参考 src/styles/tokens.css 的中性色板，给出 3 套高信息密度的专业工程风方案
   ```
2. **步骤二：打开伴生画板链接，用批注与滑块精修**
   终端会输出一个交互式画板链接（`claude.ai/design`）。在浏览器中直接对比多套画板，通过行内评论（Inline Comments）或滑块微调圆角、间距和排版层级。
3. **步骤三：指定选中画板回流源码并跑构建验证**
   回到终端告诉 Claude Code：“采纳画板 B，按现有 Tailwind 与组件目录规范落地到 `src/components/PricingSection.tsx`，运行 `npm run build` 验证通过。”

---

## 5.1 绑定团队 Design System：根治“AI 模板味”

不做约束时，模型默认容易产出泛滥的紫色发光按钮和过厚阴影。Team 及以上套餐支持在 Claude Design 中绑定持久化 **Design System**；独立开发者也可以在仓库中维护一份极简 `docs/design-tokens.json`，调用 `/design` 时显式引用：

```json
{
  "brand": "Acme Engineering Console",
  "palette": {
    "bgCanvas": "#0F172A",
    "bgSurface": "#1E293B",
    "textPrimary": "#F8FAFC",
    "textSecondary": "#94A3B8",
    "accentPrimary": "#2563EB",
    "borderSubtle": "rgba(148, 163, 184, 0.18)"
  },
  "typography": {
    "sans": "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    "mono": "JetBrains Mono, ui-monospace, monospace",
    "minBodyPx": 14,
    "minCaptionPx": 12
  },
  "layout": {
    "radiusCard": "10px",
    "radiusButton": "6px",
    "banPatterns": [
      "No neon purple gradients",
      "No bounce/translateY jump on card hover",
      "No text smaller than 12px"
    ]
  }
}
```

把这份 Token 清单传给 `/design` 后，生成的多个候选画板从第一稿起就会对齐你的品牌色、圆角与字号下限，不用事后再手工返工。

---

## 5.2 官方案例路径复现：从 Whiteboards 到单日落地前端模块

结合 Anthropic 2026 年公开的 Design-to-Code 团队实践（将原本数周的“需求 → 静态原型 → 前端切图 → 联调”压缩到单日闭环），推荐采用以下标准四步接力：

```text
Step 1: Whiteboards 梳理用户路径与信息架构（Ch.04）
          ↓
Step 2: Claude Code 敲 `/design` 生成 3 套可交互高保真画板
          ↓
Step 3: 浏览器画板内行内批注定稿（可选导出 HTML / PPTX / Canva 同步利益方）
          ↓
Step 4: Claude Code 读取定稿画板结构 → 拆分为项目组件 → 跑通单测与响应式验收
```

### 回流落地时的硬核约束 Prompt

画板定稿后，回流源码时别只说“照着写出来”，加上组件复用与无障碍红线：

```markdown
按已确认的画板方案 B 落地到项目源码：
- 仅修改 `src/components/PricingGrid.tsx` 与 `src/app/pricing/page.tsx`；
- 复用现有 `src/components/ui/Button.tsx`，禁止新建重复按钮组件；
- 覆盖 390px（移动端单列）、768px（平板双列）、1440px（桌面三列），严禁横向溢出；
- 所有外部链接保留下划线与可读对比度，完成后执行 `npm run lint && npm run build`。
```

---

## 5.3 多格式交付：一套画板兼顾研发与对外沟通

除了回流代码库，Claude Design 还支持把同一套画板直接导出为：
- **独立 HTML**：发给客户或投资人零环境点开体验交互；
- **PPTX / Google Slides / Canva 交接**：产品经理直接把功能原型页放进周会汇报或营销单页，彻底消除“研发做一套、市场重画一套”的内耗。

---

## 🛡️ 翻车自救与避坑速查表

| 常见踩坑现象 | 致命原因 | 极速自救方案 |
| :--- | :--- | :--- |
| **画板很好看，回流代码后硬编码了一堆内联样式** | 回流指令未要求映射到项目现有的 Tailwind / CSS Tokens | 明确要求“将画板色值与间距映射到 `tailwind.config.ts` 中既有 token，禁止写死 hex 色值” |
| **桌面端精美，手机端 390px 按钮被挤出屏幕** | 画板评审只看了默认宽屏视口 | 在画板批注中显式要求生成移动端断点视图，回流后用浏览器实测 390px 与 768px |
| **一次改整站导致组件职责混乱** | 单次 `/design` 范围过大 | 按页面区块粒度拆分（如先定导航栏，再定核心业务表格或定价区），逐块落地 |

---

[ 🏠 首页 ](/) | [ ⬅️ 上一章 (Ch.04) ](./ch04_whiteboards_docs.md) | [ ➡️ 下一章 (Ch.06) ](./ch06_legacy_governance.md) | [ 🌐 English ](/en/claude/ch05_design_canvas)
