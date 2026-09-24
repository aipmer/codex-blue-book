import { defineConfig } from 'vitepress'

const base = (process.env.VITEPRESS_BASE || '/').replace(/\/?$/, '/')
const xIcon = '<svg class="footer-x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>'

export default defineConfig({
  title: 'Codex 蓝皮书',
  description: '用 Codex 完成项目规则、验证与交付的双语实践指南',
  head: [['link', { rel: 'icon', type: 'image/png', sizes: '128x128', href: `${base}brand/favicon.png` }]],
  base,
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
    'README.md',
    'CONTRIBUTING.md',
    'dev_task.md',
    'changelog.md',
    'codex_blue_book_zh.md',
    'codex_blue_book_en.md',
    'PROJECT.md',
    'TEST_*.md'
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Codex 蓝皮书',
      description: '用 Codex 完成项目规则、验证与交付的双语实践指南',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '章节阅读', link: '/chapters/ch01_mindset' },
          { text: '规则生成器', link: '/generator' },
          {
            text: '资源',
            items: [
              { text: '规则模板', link: 'https://github.com/aipmer/codex-blue-book/tree/main/templates' },
              { text: '实战样例', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples' },
              { text: '飞书助理', link: 'https://github.com/aipmer/plugins-codex-feishu' },
              { text: '供应商切换器', link: 'https://github.com/aipmer/codex-switch' },
              { text: '中文版 PDF (直链下载)', link: '/downloads/codex_blue_book_zh.pdf' },
              { text: '英文版 PDF (Direct Download)', link: '/downloads/codex_blue_book_en.pdf' },
              { text: 'Previous Release (v1.3.0)', link: 'https://github.com/aipmer/codex-blue-book/releases/tag/v1.3.0' }
            ]
          }
        ],
        sidebar: [
          {
            text: '第一部分：入门与环境',
            collapsed: false,
            items: [
              { text: 'Ch.01 从代码生成到结果验收', link: '/chapters/ch01_mindset' },
              { text: 'Ch.02 安装 Codex 并核对运行环境', link: '/chapters/ch02_setup' },
              { text: 'Ch.03 排查沙盒与本地服务的连接', link: '/chapters/ch03_sandbox' },
            ]
          },
          {
            text: '第二部分：任务与项目规则',
            collapsed: false,
            items: [
              { text: 'Ch.04 用目标和验收条件指导智能体', link: '/chapters/ch04_goal_driven' },
              { text: 'Ch.05 用 AGENTS.md 记录项目规则', link: '/chapters/ch05_agents_protocol' },
              { text: 'Ch.06 检查执行过程并及时纠偏', link: '/chapters/ch06_reasoning_steer' },
            ]
          },
          {
            text: '第三部分：界面与移动工作流',
            collapsed: false,
            items: [
              { text: 'Ch.07 用真实界面验证前端', link: '/chapters/ch07_desktop_computer_use' },
              { text: 'Ch.08 把构建告警和审批接到手机', link: '/chapters/ch08_mobile_workflow' },
            ]
          },
          {
            text: '第四部分：重构与产品交付',
            collapsed: false,
            items: [
              { text: 'Ch.09 先建立基线，再逐步改造旧系统', link: '/chapters/ch09_legacy_code' },
              { text: 'Ch.10 验证订阅制 SaaS 的支付闭环', link: '/chapters/ch10_saas_mvp' },
              { text: 'Ch.11 用 Expo 构建并检查移动应用', link: '/chapters/ch11_expo_mobile' },
            ]
          },
          {
            text: '第五部分：增长与版本迁移',
            collapsed: false,
            items: [
              { text: 'Ch.12 从产品使用数据到获客实验', link: '/chapters/ch12_commercialization' },
              { text: 'Ch.13 核对 2026 年的模型与工具变更', link: '/chapters/ch13_2026_frontier' },
            ]
          },
          {
            text: '附录：生态工具与沙盒样例',
            collapsed: false,
            items: [
              { text: 'AGENTS.md 规则生成器', link: '/generator' },
              { text: 'Chrome 扩展沙盒样例 (Ch.06)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch06-chrome-extension' },
              { text: 'Next.js 全栈 SaaS 样例 (Ch.10)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch10-saas-mvp' },
              { text: 'Expo 移动端 App 样例 (Ch.11)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch11-expo-mobile' },
            ]
          }
        ],
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
      title: 'Codex Blue Book',
      description: 'A Bilingual Guide to Project Rules, Verification, and Delivery with Codex',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Chapters', link: '/en/ch01_mindset' },
          { text: 'Rules Generator', link: '/en/generator' },
          {
            text: 'Tools',
            items: [
              { text: 'Templates', link: 'https://github.com/aipmer/codex-blue-book/tree/main/templates' },
              { text: 'Examples', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples' },
              { text: 'Feishu Assistant', link: 'https://github.com/aipmer/plugins-codex-feishu' },
              { text: 'Codex Switch', link: 'https://github.com/aipmer/codex-switch' },
              { text: 'English Edition (Direct Download)', link: '/downloads/codex_blue_book_en.pdf' },
              { text: 'Chinese Edition (中文版直链)', link: '/downloads/codex_blue_book_zh.pdf' },
              { text: 'Previous Release (v1.3.0)', link: 'https://github.com/aipmer/codex-blue-book/releases/tag/v1.3.0' }
            ]
          }
        ],
        sidebar: [
          {
            text: 'Part 1: Getting Started',
            collapsed: false,
            items: [
              { text: 'Ch.01 From Code Generation to Verified Results', link: '/en/ch01_mindset' },
              { text: 'Ch.02 Install Codex and Check Your Environment', link: '/en/ch02_setup' },
              { text: 'Ch.03 Diagnose Sandbox Access to Local Services', link: '/en/ch03_sandbox' },
            ]
          },
          {
            text: 'Part 2: Tasks and Project Rules',
            collapsed: false,
            items: [
              { text: 'Ch.04 Guide Agents with Goals and Acceptance Checks', link: '/en/ch04_goal_driven' },
              { text: 'Ch.05 Record Project Rules in AGENTS.md', link: '/en/ch05_agents_protocol' },
              { text: 'Ch.06 Inspect Progress and Correct Course', link: '/en/ch06_reasoning_steer' },
            ]
          },
          {
            text: 'Part 3: UI and Mobile Workflows',
            collapsed: false,
            items: [
              { text: 'Ch.07 Validate Frontends in a Real UI', link: '/en/ch07_desktop_computer_use' },
              { text: 'Ch.08 Route Build Alerts and Approvals to Mobile', link: '/en/ch08_mobile_workflow' },
            ]
          },
          {
            text: 'Part 4: Refactoring and Delivery',
            collapsed: false,
            items: [
              { text: 'Ch.09 Baseline and Refactor Legacy Code Incrementally', link: '/en/ch09_legacy_code' },
              { text: 'Ch.10 Validate a Subscription SaaS Payment Flow', link: '/en/ch10_saas_mvp' },
              { text: 'Ch.11 Build and Check a Mobile App with Expo', link: '/en/ch11_expo_mobile' },
            ]
          },
          {
            text: 'Part 5: Growth and Version Changes',
            collapsed: false,
            items: [
              { text: 'Ch.12 From Product Usage to Acquisition Experiments', link: '/en/ch12_commercialization' },
              { text: 'Ch.13 Check 2026 Model and Tool Changes', link: '/en/ch13_2026_frontier' },
            ]
          },
          {
            text: 'Appendix: Tools & Sandboxes',
            collapsed: false,
            items: [
              { text: 'AGENTS.md Protocol Generator', link: '/en/generator' },
              { text: 'Chrome Extension Sample (Ch.06)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch06-chrome-extension' },
              { text: 'Next.js SaaS MVP Sample (Ch.10)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch10-saas-mvp' },
              { text: 'Expo Mobile App Sample (Ch.11)', link: 'https://github.com/aipmer/codex-blue-book/tree/main/examples/ch11-expo-mobile' },
            ]
          }
        ],
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
      alt: 'Codex 蓝皮书'
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索全书',
                buttonAriaLabel: '搜索全书'
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
      message: `Released under the <a href="https://github.com/aipmer/codex-blue-book/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">Apache-2.0 License</a>. <a class="footer-x-link" href="https://x.com/ai_pmer" target="_blank" rel="noopener noreferrer" aria-label="PMER on X">${xIcon}<span>@ai_pmer</span></a>`,
      copyright: 'Copyright © 2026 <a href="https://pmer.cn/" target="_blank" rel="noopener noreferrer">pmer.cn</a>'
    }
  }
})
