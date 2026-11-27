import { defineConfig, type HeadConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

const base = (process.env.VITEPRESS_BASE || '/').replace(/\/?$/, '/')
const ORIGIN = 'https://book.pmer.cn'

function toCleanRoute(relativePath: string): string {
  const noIndex = relativePath.replace(/(^|\/)index\.md$/, '$1')
  const noExt = noIndex.replace(/\.md$/, '')
  return noExt === '' ? '/' : `/${noExt}`
}

function getBilingualRoutes(relativePath: string): { zhRoute: string; enRoute: string } {
  if (relativePath === 'index.md' || relativePath === 'en/index.md') {
    return { zhRoute: '/', enRoute: '/en/' }
  }
  if (relativePath.startsWith('chapters/')) {
    const file = relativePath.replace(/^chapters\//, '').replace(/\.md$/, '')
    return { zhRoute: `/chapters/${file}`, enRoute: `/en/${file}` }
  }
  if (/^en\/ch\d+/.test(relativePath)) {
    const file = relativePath.replace(/^en\//, '').replace(/\.md$/, '')
    return { zhRoute: `/chapters/${file}`, enRoute: `/en/${file}` }
  }
  if (relativePath.startsWith('en/')) {
    const sub = relativePath.replace(/^en\//, '')
    return { zhRoute: toCleanRoute(sub), enRoute: toCleanRoute(relativePath) }
  }
  return { zhRoute: toCleanRoute(relativePath), enRoute: toCleanRoute(`en/${relativePath}`) }
}

function detectBookContext(relativePath: string, english: boolean) {
  if (relativePath.startsWith('claude/') || relativePath.startsWith('en/claude/')) {
    return {
      key: 'claude',
      name: english ? 'Claude Practical Blue Book' : 'Claude 实战蓝皮书',
      hubUrl: `${ORIGIN}${english ? '/en/claude/' : '/claude/'}`
    }
  }
  if (relativePath.startsWith('gemini/') || relativePath.startsWith('en/gemini/')) {
    return {
      key: 'gemini',
      name: english ? 'Gemini Practical Blue Book' : 'Gemini 实战蓝皮书',
      hubUrl: `${ORIGIN}${english ? '/en/gemini/' : '/gemini/'}`
    }
  }
  if (relativePath.startsWith('kimi/') || relativePath.startsWith('en/kimi/')) {
    return {
      key: 'kimi',
      name: english ? 'Kimi Practical Blue Book' : 'Kimi 实战蓝皮书',
      hubUrl: `${ORIGIN}${english ? '/en/kimi/' : '/kimi/'}`
    }
  }
  if (
    relativePath.startsWith('chapters/') ||
    relativePath.startsWith('codex/') ||
    relativePath.startsWith('en/codex/') ||
    /^en\/ch\d+/.test(relativePath)
  ) {
    return {
      key: 'codex',
      name: english ? 'Codex Blue Book' : 'Codex 蓝皮书',
      hubUrl: `${ORIGIN}${english ? '/en/codex/' : '/codex/'}`
    }
  }
  return {
    key: 'series',
    name: english ? 'AI Coding Blue Books' : 'AI 编程实战蓝皮书系列',
    hubUrl: `${ORIGIN}${english ? '/en/' : '/'}`
  }
}

function buildJsonLd(
  relativePath: string,
  english: boolean,
  title: string,
  description: string,
  canonicalUrl: string,
  dateModified: string
) {
  const author = {
    '@type': 'Person',
    name: 'Hunk Wu (aipmer)',
    url: 'https://pmer.cn',
    sameAs: ['https://pmer.cn', 'https://github.com/aipmer', 'https://x.com/ai_pmer']
  }
  const inLanguage = english ? 'en-US' : 'zh-CN'
  const ctx = detectBookContext(relativePath, english)
  const homeUrl = `${ORIGIN}${english ? '/en/' : '/'}`
  const homeName = english ? 'AI Coding Blue Books' : 'AI 编程实战蓝皮书系列'

  if (relativePath === 'index.md' || relativePath === 'en/index.md') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: homeName,
          url: homeUrl,
          inLanguage,
          description,
          author
        },
        {
          '@type': 'CollectionPage',
          name: title,
          url: canonicalUrl,
          inLanguage,
          description,
          hasPart: [
            { '@type': 'Book', name: english ? 'Codex Blue Book' : 'Codex 蓝皮书', url: `${ORIGIN}${english ? '/en/codex/' : '/codex/'}` },
            { '@type': 'Book', name: english ? 'Claude Practical Blue Book' : 'Claude 实战蓝皮书', url: `${ORIGIN}${english ? '/en/claude/' : '/claude/'}` },
            { '@type': 'Book', name: english ? 'Gemini Practical Blue Book' : 'Gemini 实战蓝皮书', url: `${ORIGIN}${english ? '/en/gemini/' : '/gemini/'}` },
            { '@type': 'Book', name: english ? 'Kimi Practical Blue Book' : 'Kimi 实战蓝皮书', url: `${ORIGIN}${english ? '/en/kimi/' : '/kimi/'}` }
          ]
        }
      ]
    }
  }

  if (relativePath === 'generator.md' || relativePath === 'en/generator.md') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: title,
          url: canonicalUrl,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          inLanguage,
          description,
          author
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
            { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl }
          ]
        }
      ]
    }
  }

  if (relativePath === 'compare.md' || relativePath === 'en/compare.md') {
    const faqItems = english
      ? [
          {
            q: 'Do I need four separate rule files for the same repository?',
            a: 'No. Maintain shared boundaries in root AGENTS.md. Codex, Antigravity, and Kimi Code read it natively, while Claude Code reuses it via @AGENTS.md inside CLAUDE.md.'
          },
          {
            q: 'How do I avoid hitting single-vendor rate limits during heavy refactors?',
            a: 'Use Antigravity Orchestrator to route Carbon and Hydrogen, or use Codex Switch to switch between OpenAI, DeepSeek, and Kimi Code without losing conversation history.'
          },
          {
            q: 'Which late-2026 retirements require immediate migration?',
            a: '/v1/prompts and Agent Builder deprecate and Evals becomes read-only on November 30, 2026; GPT-5.6 Sol and Terra retire from ChatGPT Work and Codex on December 23, 2026.'
          }
        ]
      : [
          {
            q: '同一个项目需要为四款工具分别写四份项目规则文件吗？',
            a: '不需要。在根目录统一维护 AGENTS.md 即可，Codex、Antigravity 与 Kimi Code 原生支持，Claude Code 只需在 CLAUDE.md 中写入 @AGENTS.md 即可复用。'
          },
          {
            q: '单靠订阅套餐容易触发限流怎么办？',
            a: '在 Antigravity 开启 Orchestrator 自动混排，或在 Codex CLI 使用开源工具 Codex Switch 秒切供应商并继承历史会话上下文。'
          },
          {
            q: '2026 年底有哪些必须立刻处理的模型退役风险？',
            a: '2026 年 11 月 30 日 /v1/prompts 与 Agent Builder 停用、Evals 转只读；2026 年 12 月 23 日 GPT-5.6 Sol 与 Terra 从 ChatGPT Work 与 Codex 退役，应迁往 gpt-6.2-sol 或 gpt-6.1-terra。'
          }
        ]
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          headline: title,
          url: canonicalUrl,
          inLanguage,
          description,
          dateModified,
          author
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
            { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl }
          ]
        }
      ]
    }
  }

  if (/(^|\/)(codex|claude|gemini|kimi)\/index\.md$/.test(relativePath)) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Book',
          name: ctx.name,
          headline: title,
          url: canonicalUrl,
          inLanguage,
          description,
          dateModified,
          author
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
            { '@type': 'ListItem', position: 2, name: ctx.name, item: canonicalUrl }
          ]
        }
      ]
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: title,
        url: canonicalUrl,
        inLanguage,
        description,
        dateModified,
        author,
        isPartOf: {
          '@type': 'Book',
          name: ctx.name,
          url: ctx.hubUrl
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: ctx.name, item: ctx.hubUrl },
          { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl }
        ]
      }
    ]
  }
}

const codexSidebarZh = [
  {
    text: '第一部分：心智与基建（从打字员到指挥官）',
    collapsed: false,
    items: [
      { text: 'Codex 蓝皮书专页 (v1.5.0)', link: '/codex/' },
      { text: 'Ch.01 AI 原生心智：把 AI 当全栈团队，甩掉打字机包袱', link: '/chapters/ch01_mindset' },
      { text: 'Ch.02 多端指挥舱：CLI 0.172、桌面端与手机协同配置', link: '/chapters/ch02_setup' },
      { text: 'Ch.03 本地环境与端口打通：让云端 AI 顺畅访问本地数据库', link: '/chapters/ch03_sandbox' }
    ]
  },
  {
    text: '第二部分：规范与认知编排（立规矩、防失控）',
    collapsed: false,
    items: [
      { text: 'Ch.04 目标驱动编程：别教大厨切菜，用验收断言锁死边界', link: '/chapters/ch04_goal_driven' },
      { text: 'Ch.05 打造项目专属规则：让 AI 听话、防破坏与防死循环', link: '/chapters/ch05_agents_protocol' },
      { text: 'Ch.06 透视 AI 思考过程：像技术总监一样随时纠偏与打断', link: '/chapters/ch06_reasoning_steer' }
    ]
  },
  {
    text: '第三部分：跨端自动化与全天候值班（解放双手与工位）',
    collapsed: false,
    items: [
      { text: 'Ch.07 真实接管桌面与浏览器：GPT-6.1 Terra 视觉走查与还原', link: '/chapters/ch07_desktop_computer_use' },
      { text: 'Ch.08 飞书助理值班：人在路上，用手机随时监控与审批', link: '/chapters/ch08_mobile_workflow' }
    ]
  },
  {
    text: '第四部分：工程重构与闭环交付（真实硬核落地）',
    collapsed: false,
    items: [
      { text: 'Ch.09 改造混乱老代码：逆向工程、防崩测试与微创重构', link: '/chapters/ch09_legacy_code' },
      { text: 'Ch.10 商业化实战：2 小时跑通 Next.js + Stripe 付费 SaaS', link: '/chapters/ch10_saas_mvp' },
      { text: 'Ch.11 跨端原生 App：告别环境地狱，用 Expo 极速上架双端', link: '/chapters/ch11_expo_mobile' }
    ]
  },
  {
    text: '第五部分：商业化与前沿瞭望（一人公司与生态升级）',
    collapsed: false,
    items: [
      { text: 'Ch.12 一人公司增长飞轮：自动化 SEO、日常运营与变现路径', link: '/chapters/ch12_commercialization' },
      { text: 'Ch.13 2026 前沿作战地图：GPT-6.2、Terra 与 CLI 0.172 迁移', link: '/chapters/ch13_2026_frontier' }
    ]
  },
  {
    text: '附录：系列工具与沙盒样例',
    collapsed: false,
    items: [
      { text: '工具对比', link: '/compare' },
      { text: 'AI 协作规则生成器', link: '/generator' },
      { text: 'Chrome 扩展沙盒样例 (Ch.06)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch06-chrome-extension' },
      { text: 'Next.js 全栈 SaaS 样例 (Ch.10)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch10-saas-mvp' },
      { text: 'Expo 移动端 App 样例 (Ch.11)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch11-expo-mobile' }
    ]
  }
]

const codexSidebarEn = [
  {
    text: 'Part 1: Mindset & Infrastructure (From Typist to Architect)',
    collapsed: false,
    items: [
      { text: 'Codex Blue Book Hub (v1.5.0)', link: '/en/codex/' },
      { text: 'Ch.01 AI-Native Mindset: Treat AI as a Full-Stack Team', link: '/en/ch01_mindset' },
      { text: 'Ch.02 Multi-Surface Setup: CLI 0.172, Desktop & Mobile', link: '/en/ch02_setup' },
      { text: 'Ch.03 Connect Local Environments & Ports: Access Local DB', link: '/en/ch03_sandbox' }
    ]
  },
  {
    text: 'Part 2: Specifications & Cognitive Steering (Rules & Safety Boundaries)',
    collapsed: false,
    items: [
      { text: 'Ch.04 Goal-Driven Programming: Assert Boundaries', link: '/en/ch04_goal_driven' },
      { text: 'Ch.05 Custom Project Rules: AGENTS.md & Hooks', link: '/en/ch05_agents_protocol' },
      { text: 'Ch.06 Steering AI Reasoning: Inspect & Correct Thinking', link: '/en/ch06_reasoning_steer' }
    ]
  },
  {
    text: 'Part 3: Cross-Device Automation & 24/7 Feishu Sentinel',
    collapsed: false,
    items: [
      { text: 'Ch.07 Desktop Computer Use & GPT-6.1 Terra Visual Audits', link: '/en/ch07_desktop_computer_use' },
      { text: 'Ch.08 Feishu Assistant: 24/7 Mobile Telemetry & Approvals', link: '/en/ch08_mobile_workflow' }
    ]
  },
  {
    text: 'Part 4: Refactoring & Commercial Delivery (Real Code, Zero Fluff)',
    collapsed: false,
    items: [
      { text: 'Ch.09 Refactoring Legacy Code: Reverse Engineering & Tests', link: '/en/ch09_legacy_code' },
      { text: 'Ch.10 Commercial SaaS MVP: Shipping Stripe in 2 Hours', link: '/en/ch10_saas_mvp' },
      { text: 'Ch.11 Cross-Platform Mobile Apps: Ship Native with Expo', link: '/en/ch11_expo_mobile' }
    ]
  },
  {
    text: 'Part 5: Commercialization & Frontier (One-Person SaaS & 2026 Upgrades)',
    collapsed: false,
    items: [
      { text: 'Ch.12 One-Person SaaS Growth Flywheel: Automated SEO & Ops', link: '/en/ch12_commercialization' },
      { text: 'Ch.13 2026 Codex Battle Map: GPT-6.2, Terra & CLI 0.172', link: '/en/ch13_2026_frontier' }
    ]
  },
  {
    text: 'Appendix: Tools & Sandboxes',
    collapsed: false,
    items: [
      { text: 'Tool Comparison', link: '/en/compare' },
      { text: 'Multi-Agent Rules Generator', link: '/en/generator' },
      { text: 'Chrome Extension Sample (Ch.06)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch06-chrome-extension' },
      { text: 'Next.js SaaS MVP Sample (Ch.10)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch10-saas-mvp' },
      { text: 'Expo Mobile App Sample (Ch.11)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch11-expo-mobile' }
    ]
  }
]

const claudeSidebarZh = [
  {
    text: '第一部分：心智跃迁与五大工程原语',
    collapsed: false,
    items: [
      { text: 'Claude 蓝皮书专页 (v1.0.0)', link: '/claude/' },
      { text: 'Ch.01 从对话编程到可编程工程平台：Claude 5.5 体系与全景心智', link: '/claude/ch01_programmable_platform' },
      { text: 'Ch.02 上下文经济学：精简 CLAUDE.md、Skills 与 MCP', link: '/claude/ch02_context_economics' },
      { text: 'Ch.03 确定性防线：Hooks 生命周期门禁与 Code Mode', link: '/claude/ch03_hooks_code_mode' }
    ]
  },
  {
    text: '第二部分：视觉画布与持久工作区协同',
    collapsed: false,
    items: [
      { text: 'Ch.04 从混沌脑暴到架构定稿：Whiteboards 与文档矩阵', link: '/claude/ch04_whiteboards_docs' },
      { text: 'Ch.05 终端直通画板：/design 交互原型与源码回流', link: '/claude/ch05_design_canvas' }
    ]
  },
  {
    text: '第三部分：百万上下文与大型存量系统治理',
    collapsed: false,
    items: [
      { text: 'Ch.06 存量巨石系统逆向与微创技术债清理', link: '/claude/ch06_legacy_governance' },
      { text: 'Ch.07 多子代理分治（Subagents）与长时自主重构', link: '/claude/ch07_subagents_refactoring' }
    ]
  },
  {
    text: '第四部分：自动化合并上线与 ToB 商业闭环',
    collapsed: false,
    items: [
      { text: 'Ch.08 最后一公里自动化：/ship、PR Steward 与团队治理', link: '/claude/ch08_ship_pr_steward' },
      { text: 'Ch.09 商业化实战：高客单价企业级审计与情报 SaaS', link: '/claude/ch09_enterprise_saas' }
    ]
  },
  {
    text: '第五部分：产品审视与前沿路线图',
    collapsed: false,
    items: [
      { text: 'Ch.10 2026 前沿与产品冷思考：Claude Cowork 锐评', link: '/claude/ch10_frontier_cowork_critique' }
    ]
  },
  {
    text: '附录：套件与系列工具',
    collapsed: false,
    items: [
      { text: 'Hooks 与子代理可运行套件 (GitHub)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/claude-hooks-kit' },
      { text: '工具对比', link: '/compare' },
      { text: 'AI 协作规则生成器', link: '/generator' }
    ]
  }
]

const claudeSidebarEn = [
  {
    text: 'Part 1: Programmable Engineering Primitives',
    collapsed: false,
    items: [
      { text: 'Claude Blue Book Hub (v1.0.0)', link: '/en/claude/' },
      { text: 'Ch.01 From Chat Coding to Programmable Engineering: Claude 5.5', link: '/en/claude/ch01_programmable_platform' },
      { text: 'Ch.02 Context Economics: Lean CLAUDE.md, Skills & MCP', link: '/en/claude/ch02_context_economics' },
      { text: 'Ch.03 Deterministic Guardrails: Hooks & Code Mode', link: '/en/claude/ch03_hooks_code_mode' }
    ]
  },
  {
    text: 'Part 2: Visual Canvases & Persistent Workspaces',
    collapsed: false,
    items: [
      { text: 'Ch.04 From Messy Brainstorms to Architecture: Whiteboards & Docs', link: '/en/claude/ch04_whiteboards_docs' },
      { text: 'Ch.05 Terminal-to-Canvas: /design Artboards & Code Handoff', link: '/en/claude/ch05_design_canvas' }
    ]
  },
  {
    text: 'Part 3: 1M-Context Legacy Governance',
    collapsed: false,
    items: [
      { text: 'Ch.06 Legacy Monolith Reverse Engineering & Debt Cleanup', link: '/en/claude/ch06_legacy_governance' },
      { text: 'Ch.07 Isolated Subagents & Long-Horizon Refactoring', link: '/en/claude/ch07_subagents_refactoring' }
    ]
  },
  {
    text: 'Part 4: Automated Shipping & Enterprise Monetization',
    collapsed: false,
    items: [
      { text: 'Ch.08 Closing the Last Mile: /ship, PR Steward & Governance', link: '/en/claude/ch08_ship_pr_steward' },
      { text: 'Ch.09 Commercial ToB SaaS: Prompt-Cached Auditing & Agent SDK', link: '/en/claude/ch09_enterprise_saas' }
    ]
  },
  {
    text: 'Part 5: Critical Product Review & Frontier Watch',
    collapsed: false,
    items: [
      { text: 'Ch.10 2026 Frontier & Honest Critique: Claude Cowork', link: '/en/claude/ch10_frontier_cowork_critique' }
    ]
  },
  {
    text: 'Appendix: Kit & Series Tools',
    collapsed: false,
    items: [
      { text: 'Runnable Hooks & Subagents Kit (GitHub)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/claude-hooks-kit' },
      { text: 'Tool Comparison', link: '/en/compare' },
      { text: 'Multi-Agent Rules Generator', link: '/en/generator' }
    ]
  }
]

const geminiSidebarZh = [
  {
    text: '第一部分：Antigravity 指挥舱与 Gemini 4 选型',
    collapsed: false,
    items: [
      { text: 'Gemini 蓝皮书专页 (v1.0.0)', link: '/gemini/' },
      { text: 'Ch.01 告别单线程 CLI：Antigravity 与 Gemini 4 矩阵', link: '/gemini/ch01_antigravity_gemini4' },
      { text: 'Ch.02 多模态项目规则：AGENTS.md、.agents/rules 与 Skills', link: '/gemini/ch02_multimodal_rules_skills' }
    ]
  },
  {
    text: '第二部分：AI Studio × Antigravity 原生多模态流',
    collapsed: false,
    items: [
      { text: 'Ch.03 从灵感到工程仓：AI Studio Build Mode 无损导出', link: '/gemini/ch03_ai_studio_handoff' },
      { text: 'Ch.04 音视频理解与 Gemini Live API 实时交互', link: '/gemini/ch04_video_live_api' }
    ]
  },
  {
    text: '第三部分：Google Workspace × Colab 全家桶联动',
    collapsed: false,
    items: [
      { text: 'Ch.05 办公流即研发流：Workspace MCP 与插件商业化', link: '/gemini/ch05_workspace_mcp' },
      { text: 'Ch.06 云端算力外挂：Colab 代理扩展与数据管线', link: '/gemini/ch06_colab_agy_pipelines' }
    ]
  },
  {
    text: '第四部分：多智能体协作、视觉巡检与跨端交付',
    collapsed: false,
    items: [
      { text: 'Ch.07 多智能体协作架构与官方《Alpine Peak》复盘', link: '/gemini/ch07_swarm_alpine_peak' },
      { text: 'Ch.08 浏览器视觉走查、Chrome MV3 与 Cloud Run', link: '/gemini/ch08_browser_qa_cross_platform' }
    ]
  },
  {
    text: '第五部分：多模态商业闭环与生态瞭望',
    collapsed: false,
    items: [
      { text: 'Ch.09 商业化实战：多模态出海工具与配额计费风控', link: '/gemini/ch09_multimodal_commercial_saas' },
      { text: 'Ch.10 2026 前沿瞭望：配额精算、Web 3D 与升级追踪', link: '/gemini/ch10_frontier_quota_spatial' }
    ]
  },
  {
    text: '附录：套件与系列工具',
    collapsed: false,
    items: [
      { text: 'Antigravity 规则与配额门禁套件 (GitHub)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/gemini-antigravity-kit' },
      { text: '工具对比', link: '/compare' },
      { text: 'AI 协作规则生成器', link: '/generator' }
    ]
  }
]

const geminiSidebarEn = [
  {
    text: 'Part 1: Antigravity Cockpit & Gemini 4 Routing',
    collapsed: false,
    items: [
      { text: 'Gemini Blue Book Hub (v1.0.0)', link: '/en/gemini/' },
      { text: 'Ch.01 Beyond Single-Loop CLIs: Antigravity & Gemini 4', link: '/en/gemini/ch01_antigravity_gemini4' },
      { text: 'Ch.02 Multimodal Rules: AGENTS.md, .agents/rules & Skills', link: '/en/gemini/ch02_multimodal_rules_skills' }
    ]
  },
  {
    text: 'Part 2: AI Studio × Antigravity Multimodal Flows',
    collapsed: false,
    items: [
      { text: 'Ch.03 Idea to Repo: AI Studio Build Mode Handoff', link: '/en/gemini/ch03_ai_studio_handoff' },
      { text: 'Ch.04 Video Understanding & Gemini Live API', link: '/en/gemini/ch04_video_live_api' }
    ]
  },
  {
    text: 'Part 3: Google Workspace × Colab Leverage',
    collapsed: false,
    items: [
      { text: 'Ch.05 Workspace MCP Automation & Add-ons', link: '/en/gemini/ch05_workspace_mcp' },
      { text: 'Ch.06 Cloud Compute Offload: Colab Agent Pipelines', link: '/en/gemini/ch06_colab_agy_pipelines' }
    ]
  },
  {
    text: 'Part 4: Multi-Agent Collaboration & Visual QA',
    collapsed: false,
    items: [
      { text: 'Ch.07 Multi-Agent Architecture & Alpine Peak Case Study', link: '/en/gemini/ch07_swarm_alpine_peak' },
      { text: 'Ch.08 Browser Visual QA, Chrome MV3 & Cloud Run', link: '/en/gemini/ch08_browser_qa_cross_platform' }
    ]
  },
  {
    text: 'Part 5: Monetization & Frontier Watch',
    collapsed: false,
    items: [
      { text: 'Ch.09 Commercial Multimodal SaaS & Credit Metering', link: '/en/gemini/ch09_multimodal_commercial_saas' },
      { text: 'Ch.10 2026 Frontier: Quota Economics & Web 3D', link: '/en/gemini/ch10_frontier_quota_spatial' }
    ]
  },
  {
    text: 'Appendix: Kit & Series Tools',
    collapsed: false,
    items: [
      { text: 'Antigravity Rules & Quota Kit (GitHub)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/gemini-antigravity-kit' },
      { text: 'Tool Comparison', link: '/en/compare' },
      { text: 'Multi-Agent Rules Generator', link: '/en/generator' }
    ]
  }
]

const kimiSidebarZh = [
  {
    text: '第一部分：K3.1 基座全景与 Kimi Code 三态指挥舱',
    collapsed: false,
    items: [
      { text: 'Kimi 蓝皮书专页 (v1.0.0)', link: '/kimi/' },
      { text: 'Ch.01 3 万亿参数开源新纪元：K3.1 Pro 与 CLI', link: '/kimi/ch01_k31_architecture_cli' },
      { text: 'Ch.02 全协议互联：config.toml、kimi acp 与容灾', link: '/kimi/ch02_acp_config_failover' }
    ]
  },
  {
    text: '第二部分：多智能体协作与视觉录屏排障',
    collapsed: false,
    items: [
      { text: 'Ch.03 分层子代理（explore/plan/coder）与多智能体并行', link: '/kimi/ch03_subagents_swarm' },
      { text: 'Ch.04 MoonViT-V2 录屏诊断与 Figma MCP 还原', link: '/kimi/ch04_moonvit_video_figma' }
    ]
  },
  {
    text: '第三部分：高壁垒垂直行业深水区（金融 · 法律 · 医药）',
    collapsed: false,
    items: [
      { text: 'Ch.05 金融投研与百万 Token 财报自动建模', link: '/kimi/ch05_finance_audit_modeling' },
      { text: 'Ch.06 法律合规、生物医药与零幻觉引用校验', link: '/kimi/ch06_legal_medical_citations' }
    ]
  },
  {
    text: '第四部分：Kimi Slides 与 3D Make 空间编码跃迁',
    collapsed: false,
    items: [
      { text: 'Ch.07 Kimi Slides 智能演示与原生 .pptx 交付', link: '/kimi/ch07_kimi_slides_decks' },
      { text: 'Ch.08 空间智能与 3D Make：Blender 与 FreeCAD', link: '/kimi/ch08_3d_make_blender_freecad' }
    ]
  },
  {
    text: '第五部分：开源私有化与全球商业闭环',
    collapsed: false,
    items: [
      { text: 'Ch.09 vLLM / SGLang 私有化部署与垂直产品化', link: '/kimi/ch09_vllm_self_hosting_saas' },
      { text: 'Ch.10 2026 前沿瞭望：四模型混合军团收官策略', link: '/kimi/ch10_four_agent_hybrid_frontier' }
    ]
  },
  {
    text: '附录：套件与系列工具',
    collapsed: false,
    items: [
      { text: 'Kimi K3.1 配置、引用校验与 FreeCAD 套件 (GitHub)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/kimi-k3-kit' },
      { text: '工具对比', link: '/compare' },
      { text: 'AI 协作规则生成器', link: '/generator' }
    ]
  }
]

const kimiSidebarEn = [
  {
    text: 'Part 1: K3.1 Foundation & Multi-Mode Cockpit',
    collapsed: false,
    items: [
      { text: 'Kimi Blue Book Hub (v1.0.0)', link: '/en/kimi/' },
      { text: 'Ch.01 The 2.8T Open-Weight Generation: K3.1 Pro & CLI', link: '/en/kimi/ch01_k31_architecture_cli' },
      { text: 'Ch.02 Protocol-First Connectivity: config.toml & kimi acp', link: '/en/kimi/ch02_acp_config_failover' }
    ]
  },
  {
    text: 'Part 2: Multi-Agent Engineering & Video Debugging',
    collapsed: false,
    items: [
      { text: 'Ch.03 Tiered Subagents & Parallel Multi-Agent Refactors', link: '/en/kimi/ch03_subagents_swarm' },
      { text: 'Ch.04 MoonViT-V2 Video-to-Fix & Figma MCP Fidelity', link: '/en/kimi/ch04_moonvit_video_figma' }
    ]
  },
  {
    text: 'Part 3: Regulated Verticals (Finance · Legal · Medical)',
    collapsed: false,
    items: [
      { text: 'Ch.05 Financial 1M-Context Audits & Formula Models', link: '/en/kimi/ch05_finance_audit_modeling' },
      { text: 'Ch.06 Legal & Biomedical Zero-Hallucination Gates', link: '/en/kimi/ch06_legal_medical_citations' }
    ]
  },
  {
    text: 'Part 4: Kimi Slides & 3D Make Spatial Coding',
    collapsed: false,
    items: [
      { text: 'Ch.07 Executive Decks with Kimi Slides (.pptx)', link: '/en/kimi/ch07_kimi_slides_decks' },
      { text: 'Ch.08 Spatial Coding: Three.js, Blender & FreeCAD', link: '/en/kimi/ch08_3d_make_blender_freecad' }
    ]
  },
  {
    text: 'Part 5: Self-Hosting & Four-Agent Finale',
    collapsed: false,
    items: [
      { text: 'Ch.09 vLLM / SGLang Self-Hosting & Vertical SaaS', link: '/en/kimi/ch09_vllm_self_hosting_saas' },
      { text: 'Ch.10 2026 Frontier Finale: Four-Agent Hybrid Strategy', link: '/en/kimi/ch10_four_agent_hybrid_frontier' }
    ]
  },
  {
    text: 'Appendix: Kit & Series Tools',
    collapsed: false,
    items: [
      { text: 'Kimi K3.1 Config, Citation & FreeCAD Kit (GitHub)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/kimi-k3-kit' },
      { text: 'Tool Comparison', link: '/en/compare' },
      { text: 'Multi-Agent Rules Generator', link: '/en/generator' }
    ]
  }
]

const seriesSidebarZh = [
  {
    text: 'AI 编程实战蓝皮书',
    collapsed: false,
    items: [
      { text: '首页', link: '/' },
      { text: '工具对比', link: '/compare' },
      { text: 'Codex 蓝皮书', link: '/codex/' },
      { text: 'Claude 蓝皮书', link: '/claude/' },
      { text: 'Gemini 蓝皮书', link: '/gemini/' },
      { text: 'Kimi 蓝皮书', link: '/kimi/' }
    ]
  },
  {
    text: '共享工程工具',
    collapsed: false,
    items: [
      { text: '规则生成器', link: '/generator' },
      { text: '飞书助理 (GitHub)', link: 'https://github.com/aipmer/plugins-codex-feishu' },
      { text: 'Codex Switch (GitHub)', link: 'https://github.com/aipmer/codex-switch' }
    ]
  }
]

const seriesSidebarEn = [
  {
    text: 'AI Coding Blue Books',
    collapsed: false,
    items: [
      { text: 'Home', link: '/en/' },
      { text: 'Tool Comparison', link: '/en/compare' },
      { text: 'Codex Blue Book', link: '/en/codex/' },
      { text: 'Claude Blue Book', link: '/en/claude/' },
      { text: 'Gemini Blue Book', link: '/en/gemini/' },
      { text: 'Kimi Blue Book', link: '/en/kimi/' }
    ]
  },
  {
    text: 'Shared Engineering Tools',
    collapsed: false,
    items: [
      { text: 'Multi-Agent Rules Generator', link: '/en/generator' },
      { text: 'Feishu Assistant (GitHub)', link: 'https://github.com/aipmer/plugins-codex-feishu' },
      { text: 'Codex Switch (GitHub)', link: 'https://github.com/aipmer/codex-switch' }
    ]
  }
]

export default defineConfig({
  title: 'AI 编程实战蓝皮书',
  description: '面向开发者与独立产品构建者的双语 AI 智能体工程实战系列：Codex、Claude、Gemini 与 Kimi 蓝皮书',
  sitemap: {
    hostname: ORIGIN,
    lastmodDateOnly: false
  },
  head: [['link', { rel: 'icon', type: 'image/png', sizes: '128x128', href: `${base}brand/favicon.png` }]],
  transformHead({ pageData, title, description, head }) {
    const relativePath = pageData.relativePath
    const english = relativePath.startsWith('en/')
    const coverLanguage = english || relativePath === 'index.md' ? 'en' : 'zh'
    const route = toCleanRoute(relativePath)
    const canonicalUrl = new URL(route, `${ORIGIN}/`).href
    const { zhRoute, enRoute } = getBilingualRoutes(relativePath)
    const zhUrl = new URL(zhRoute, `${ORIGIN}/`).href
    const enUrl = new URL(enRoute, `${ORIGIN}/`).href
    const ctx = detectBookContext(relativePath, english)
    const isClaude = ctx.key === 'claude'
    const isGemini = ctx.key === 'gemini'
    const isKimi = ctx.key === 'kimi'
    const image = isClaude
      ? `${ORIGIN}/social/claude-en-20261126.jpg`
      : isGemini
        ? `${ORIGIN}/social/gemini-en-20261126.jpg`
        : isKimi
          ? `${ORIGIN}/social/kimi-en-20261126.jpg`
          : `${ORIGIN}/social/brand-${coverLanguage}-20261021.jpg`
    const alt = isClaude
      ? (english
          ? 'Claude Practical Blue Book: Programmable primitives, /design artboards, legacy governance, and /ship.'
          : 'Claude 实战蓝皮书：Claude 5.5 五大原语、/design 画板、百万上下文重构与 /ship 自动合并。')
      : isGemini
        ? (english
            ? 'Gemini Practical Blue Book: Google Antigravity 2.x, Gemini 4 swarms, AI Studio, Workspace MCP, and Colab.'
            : 'Gemini 实战蓝皮书：Google Antigravity 2.x、Gemini 4 蜂群、AI Studio、Workspace MCP 与 Colab 全域多模态交付。')
        : isKimi
          ? (english
              ? 'Kimi Practical Blue Book: K3.1 Pro open weights, Kimi Code ACP swarms, verticals, Slides, and 3D Make.'
              : 'Kimi 实战蓝皮书：K3.1 Pro 开源基座、Kimi Code ACP 蜂群、金融法律医药深水区、Slides 与 3D Make。')
          : (coverLanguage === 'en'
              ? 'AI Coding Blue Books Series: Practical engineering guides for Codex, Claude, Gemini, and Kimi.'
              : 'AI 编程实战蓝皮书系列：Codex、Claude、Gemini 与 Kimi 工程实践指南。')
    const dateModified = String(pageData.frontmatter?.lastUpdated || '2026-11-26')

    const defaults: Record<string, string> = {
      'og:type': relativePath.endsWith('index.md') ? 'website' : 'article',
      'og:site_name': ctx.name,
      'og:title': title,
      'og:description': description,
      'og:url': canonicalUrl,
      'og:locale': english ? 'en_US' : 'zh_CN',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description
    }
    const existingMeta = new Set(head.map(([, attrs]) => attrs?.property || attrs?.name))
    if (!existingMeta.has('og:image') && !existingMeta.has('twitter:image')) {
      Object.assign(defaults, {
        'og:image': image,
        'og:image:width': '1200',
        'og:image:height': '630',
        'og:image:type': 'image/jpeg',
        'og:image:alt': alt,
        'twitter:image': image,
        'twitter:image:alt': alt
      })
    }

    const result: HeadConfig[] = Object.entries(defaults)
      .filter(([key]) => !existingMeta.has(key))
      .map(([key, content]): HeadConfig => ['meta', { [key.startsWith('og:') ? 'property' : 'name']: key, content }])

    result.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: zhUrl }],
      ['link', { rel: 'alternate', hreflang: 'en-US', href: enUrl }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: enUrl }]
    )

    const jsonLd = buildJsonLd(relativePath, english, title, description, canonicalUrl, dateModified)
    result.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)])

    return result
  },
  base,
  vite: {
    plugins: [{
      name: 'blue-book-locale-links',
      enforce: 'pre',
      resolveId(source, importer) {
        if (source === '../composables/langs' && importer?.includes('vitepress/dist/client/theme-default/components/VPNav')) {
          return fileURLToPath(new URL('./theme/langs.ts', import.meta.url))
        }
      }
    }]
  },
  cleanUrls: true,
  ignoreDeadLinks: true,
  srcExclude: [
    '**/node_modules/**',
    '**/examples/**',
    '**/scripts/**',
    '**/case-studies/**',
    '**/templates/**',
    '**/docs/**',
    'AGENTS.md',
    'CLAUDE.md',
    'README.md',
    'CONTRIBUTING.md',
    'dev_task.md',
    'changelog.md',
    '*_blue_book_zh.md',
    '*_blue_book_en.md',
    'PROJECT.md',
    'TEST_*.md'
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'AI 编程实战蓝皮书',
      description: '基于 Codex、Claude Code、Gemini Antigravity 与 Kimi Code 的双语智能体工程实战系列指南',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          {
            text: '蓝皮书系列',
            items: [
              { text: 'Codex 蓝皮书', link: '/codex/' },
              { text: 'Claude 蓝皮书', link: '/claude/' },
              { text: 'Gemini 蓝皮书', link: '/gemini/' },
              { text: 'Kimi 蓝皮书', link: '/kimi/' }
            ]
          },
          { text: '工具对比', link: '/compare' },
          { text: '规则生成器', link: '/generator' },
          { text: '更多AI发现', link: 'https://pmer.cn/ai/' },
          {
            text: '下载 PDF',
            items: [
              { text: 'Codex 中文版 PDF (v1.5.0)', link: '/downloads/codex_blue_book_zh.pdf' },
              { text: 'Codex 英文版 PDF (v1.5.0)', link: '/downloads/codex_blue_book_en.pdf' },
              { text: 'Claude 中文版 PDF (v1.0.0)', link: '/downloads/claude_blue_book_zh.pdf' },
              { text: 'Claude 英文版 PDF (v1.0.0)', link: '/downloads/claude_blue_book_en.pdf' },
              { text: 'Gemini 中文版 PDF (v1.0.0)', link: '/downloads/gemini_blue_book_zh.pdf' },
              { text: 'Gemini 英文版 PDF (v1.0.0)', link: '/downloads/gemini_blue_book_en.pdf' },
              { text: 'Kimi 中文版 PDF (v1.0.0)', link: '/downloads/kimi_blue_book_zh.pdf' },
              { text: 'Kimi 英文版 PDF (v1.0.0)', link: '/downloads/kimi_blue_book_en.pdf' },
              { text: 'GitHub 历史版本 (v1.3.0)', link: 'https://github.com/aipmer/codex-blue-book/releases/tag/v1.3.0' }
            ]
          }
        ],
        sidebar: {
          '/chapters/': codexSidebarZh,
          '/codex/': codexSidebarZh,
          '/claude/': claudeSidebarZh,
          '/gemini/': geminiSidebarZh,
          '/kimi/': kimiSidebarZh,
          '/compare': seriesSidebarZh
        },
        outline: {
          level: [2, 3],
          label: '本章目录'
        },
        docFooter: {
          prev: '上一章',
          next: '下一章'
        },
        darkModeSwitchLabel: '深浅模式',
        sidebarMenuLabel: '目录菜单',
        returnToTopLabel: '回到顶部'
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'AI Coding Blue Books',
      description: 'Independent Bilingual Engineering Guides for Codex, Claude Code, Gemini Antigravity, and Kimi Code',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          {
            text: 'Blue Books',
            items: [
              { text: 'Codex Blue Book', link: '/en/codex/' },
              { text: 'Claude Blue Book', link: '/en/claude/' },
              { text: 'Gemini Blue Book', link: '/en/gemini/' },
              { text: 'Kimi Blue Book', link: '/en/kimi/' }
            ]
          },
          { text: 'Compare Tools', link: '/en/compare' },
          { text: 'Rules Generator', link: '/en/generator' },
          { text: 'More AI Discovery', link: 'https://pmer.cn/ai/' },
          {
            text: 'Download PDF',
            items: [
              { text: 'Codex English PDF (v1.5.0)', link: '/downloads/codex_blue_book_en.pdf' },
              { text: 'Codex Chinese PDF (v1.5.0)', link: '/downloads/codex_blue_book_zh.pdf' },
              { text: 'Claude English PDF (v1.0.0)', link: '/downloads/claude_blue_book_en.pdf' },
              { text: 'Claude Chinese PDF (v1.0.0)', link: '/downloads/claude_blue_book_zh.pdf' },
              { text: 'Gemini English PDF (v1.0.0)', link: '/downloads/gemini_blue_book_en.pdf' },
              { text: 'Gemini Chinese PDF (v1.0.0)', link: '/downloads/gemini_blue_book_zh.pdf' },
              { text: 'Kimi English PDF (v1.0.0)', link: '/downloads/kimi_blue_book_en.pdf' },
              { text: 'Kimi Chinese PDF (v1.0.0)', link: '/downloads/kimi_blue_book_zh.pdf' },
              { text: 'GitHub Archive (v1.3.0)', link: 'https://github.com/aipmer/codex-blue-book/releases/tag/v1.3.0' }
            ]
          }
        ],
        sidebar: {
          '/en/ch': codexSidebarEn,
          '/en/codex/': codexSidebarEn,
          '/en/claude/': claudeSidebarEn,
          '/en/gemini/': geminiSidebarEn,
          '/en/kimi/': kimiSidebarEn,
          '/en/compare': seriesSidebarEn
        },
        outline: {
          level: [2, 3],
          label: 'On This Page'
        },
        docFooter: {
          prev: 'Previous Chapter',
          next: 'Next Chapter'
        }
      }
    }
  },

  themeConfig: {
    logo: {
      light: '/brand/logo-light.png',
      dark: '/brand/logo-dark.png',
      alt: 'AI 编程实战蓝皮书'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索全站',
                buttonAriaLabel: '搜索全站'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aipmer/codex-blue-book' }
    ],
    footer: {
      message: 'Released under the MIT & Apache-2.0 Licenses.',
      copyright: 'Copyright © 2026 <a href="https://pmer.cn" target="_blank" rel="noopener noreferrer">pmer.cn</a>'
    }
  }
})
