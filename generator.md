---
title: "AI 协作规则生成器：一键导出 Codex / Claude / Gemini / Kimi 项目规则"
description: "30 秒生成适配 OpenAI Codex (AGENTS.md)、Claude Code (CLAUDE.md + Hooks)、Gemini Antigravity (.agents/rules) 与 Kimi Code (config.toml) 的项目协作规则与配套配置，支持一键复制与下载。"
lastUpdated: 2026-11-27
---

# AI 协作规则生成器（AGENTS.md / CLAUDE.md）

> 给项目立好清晰的协作边界，防止 AI 破坏既有架构、私自安装冗余依赖、陷入死循环盲猜或提交未完成的假代码。支持 **Codex、Claude Code、Gemini Antigravity 与 Kimi Code** 四款工具，主规则文件与工具专属配置分开生成，直接复制或一键下载落盘。

<ClientOnly>
<div class="generator-app">
<div class="form-grid">
  <div class="form-group">
    <label class="label">0. 选择目标 AI 编程工具（自动匹配规则格式与配套配置文件）：</label>
    <div class="agent-tabs">
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'codex' }]" @click="selectedAgent = 'codex'">Codex (AGENTS.md + config.toml)</button>
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'claude' }]" @click="selectedAgent = 'claude'">Claude Code (CLAUDE.md + Hooks)</button>
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'gemini' }]" @click="selectedAgent = 'gemini'">Gemini Antigravity (.agents/rules)</button>
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'kimi' }]" @click="selectedAgent = 'kimi'">Kimi Code (AGENTS.md + config.toml)</button>
    </div>
  </div>
  <div class="form-group">
    <label class="label">1. 选择项目技术栈（自动注入对应构建、测试命令与避坑约束）：</label>
    <select v-model="selectedStack" class="select-input">
      <option value="nextjs">Next.js 14/15 (React 全栈)</option>
      <option value="vue3">Vue 3 + Vite + TypeScript</option>
      <option value="fastapi">FastAPI (Python 现代后端)</option>
      <option value="django">Django (Python 经典后端)</option>
      <option value="datascience">Python 数据科学与科研 (Jupyter / PyTorch)</option>
      <option value="spring">Spring Boot (Java 3.x)</option>
      <option value="expo">React Native (Expo 移动端)</option>
      <option value="go">Go (Gin / Fiber)</option>
      <option value="rust">Rust (Axum / Tokio)</option>
      <option value="svelte">SvelteKit (Svelte 5)</option>
      <option value="chrome">Chrome 扩展 (Manifest V3)</option>
      <option value="general">通用项目 / 文档站与自动化脚本</option>
    </select>
  </div>
  <div class="form-group">
    <label class="label">2. 项目名称：</label>
    <input type="text" v-model="projectName" class="text-input" placeholder="例如: my-awesome-saas" />
  </div>
  <div class="form-group">
    <label class="label">3. 运行环境与权限边界（防危险操作与数据泄漏）：</label>
    <select v-model="sandboxLevel" class="select-input">
      <option value="standard">标准开发模式（允许安装依赖、跑测试与编译构建；禁止越权访问生产密钥与外部部署）</option>
      <option value="strict">严格只读保护（AI 仅分析代码与输出修改方案，禁止私自执行终端命令，全部变更走人工 PR 审查）</option>
      <option value="local">本地联调模式（允许访问本地端口、Docker 数据库与受控外部 API，破坏性或线上操作必须人工确认）</option>
    </select>
  </div>
  <div class="form-group">
    <label class="label">4. 激活核心安全护栏（防御常见失控场景）：</label>
    <div class="checkbox-group">
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.antiLoop" />
        <span>防自旋死循环：同一编译或测试报错连续修复 2 次不通过立即暂停，输出排错思路，严禁无脑烧 Token 乱试</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.noPlaceholder" />
        <span>防虚假伪造：严禁提交含有 // TODO、假 mock 数据或未实现的空函数，所有交付代码必须真实可编译</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.noExternalDeps" />
        <span>防滥装依赖：常规逻辑优先使用原生标准库与内置 API，严禁未经确认私自安装体积庞大的非必要外部包</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.enforceValidation" />
        <span>交付必带测试：阶段性修改完成后必须自动跑通测试与生产构建，退出码为 0 才算完成交付</span>
      </label>
    </div>
  </div>
</div>

<div class="output-section">
  <div class="output-header">
    <span class="output-title">主项目规则文件：<code>{{ primaryFile.path }}</code></span>
    <div class="output-actions">
      <button type="button" class="btn-secondary" @click="downloadFile(primaryFile.downloadName, primaryContent)">
        下载 {{ primaryFile.downloadName }}
      </button>
      <button type="button" class="btn-copy" @click="copyText(primaryContent, 'primary')">
        {{ copiedKey === 'primary' ? '已复制到剪贴板' : '一键复制规则' }}
      </button>
    </div>
  </div>
  <pre class="code-preview"><code>{{ primaryContent }}</code></pre>
</div>

<div class="output-section">
  <div class="output-header">
    <span class="output-title">工具专属配套配置：<code>{{ companionFile.path }}</code></span>
    <div class="output-actions">
      <button type="button" class="btn-secondary" @click="downloadFile(companionFile.downloadName, companionContent)">
        下载 {{ companionFile.downloadName }}
      </button>
      <button type="button" class="btn-copy" @click="copyText(companionContent, 'companion')">
        {{ copiedKey === 'companion' ? '已复制到剪贴板' : '复制配套配置' }}
      </button>
    </div>
  </div>
  <p class="companion-hint">{{ companionFile.hint }}</p>
  <pre class="code-preview"><code>{{ companionContent }}</code></pre>
</div>
</div>
</ClientOnly>

<script setup lang="ts">
import { ref, computed } from 'vue'

type AgentKey = 'codex' | 'claude' | 'gemini' | 'kimi'

const selectedAgent = ref<AgentKey>('codex')
const selectedStack = ref('nextjs')
const projectName = ref('my-saas-mvp')
const sandboxLevel = ref('standard')
const copiedKey = ref<'' | 'primary' | 'companion'>('')

const rules = ref({
  antiLoop: true,
  noPlaceholder: true,
  noExternalDeps: true,
  enforceValidation: true
})

const stackConfigs: Record<string, { name: string; buildCmd: string; testCmd: string; specificRules: string[] }> = {
  nextjs: {
    name: 'Next.js (App Router) + TypeScript',
    buildCmd: 'npm run build',
    testCmd: 'npm run lint && npm test',
    specificRules: [
      '所有组件默认优先为 React Server Component，仅在需要客户端交互时添加 "use client"',
      '样式使用 Tailwind CSS，不得在组件中混入纯内联全局 style',
      '环境变量严格区分 NEXT_PUBLIC_ 前缀，服务端敏感密钥严禁泄漏至客户端'
    ]
  },
  vue3: {
    name: 'Vue 3 + Vite + Pinia',
    buildCmd: 'npm run build',
    testCmd: 'npm run lint && vue-tsc --noEmit',
    specificRules: [
      '一律采用 <script setup lang="ts"> Composition API 编写',
      '状态管理使用 Pinia，禁止使用遗留 Vuex',
      '严格处理响应式解构，使用 storeToRefs 避免响应式丢失'
    ]
  },
  fastapi: {
    name: 'FastAPI + Pydantic v2',
    buildCmd: 'python -m compileall .',
    testCmd: 'pytest -v && ruff check .',
    specificRules: [
      '全面使用 Pydantic v2 模型进行入参校验与序列化',
      '异步函数显式标明 async def，数据库会话必须采用 AsyncSession 依赖注入',
      '所有路由 endpoint 必须附带清晰的 response_model 定义'
    ]
  },
  django: {
    name: 'Django + DRF',
    buildCmd: 'python manage.py check',
    testCmd: 'python manage.py test && flake8',
    specificRules: [
      '涉及数据表修改必须自动生成与执行 makemigrations，禁止手写裸 SQL 迁移',
      '严禁在视图层编写 N+1 查询，显式使用 select_related / prefetch_related'
    ]
  },
  datascience: {
    name: 'Python 数据科学与科研 (Jupyter / PyTorch)',
    buildCmd: 'python -m compileall src/',
    testCmd: 'pytest -v && ruff check src/',
    specificRules: [
      '所有实验脚本固定随机种子（random / numpy / torch），并将超参数与数据版本写入日志确保可复现',
      '原始数据集只读挂载，清洗与中间特征写入独立输出目录，严禁覆盖原始数据',
      '将核心建模逻辑沉淀在 src/ 模块中，Notebook 仅保留实验调用、图表输出与结论记录'
    ]
  },
  spring: {
    name: 'Spring Boot 3 + Java 21',
    buildCmd: './gradlew build -x test',
    testCmd: './gradlew check',
    specificRules: [
      '统一使用构造器注入 (Constructor Injection)，禁止使用 @Autowired 字段注入',
      '实体类与 DTO 严格解耦，不得将 JPA 实体直接作为 API 返回体'
    ]
  },
  expo: {
    name: 'React Native + Expo (SDK 57+)',
    buildCmd: 'npx expo export --platform web',
    testCmd: 'npx expo lint && npx --yes expo-doctor',
    specificRules: [
      '严禁直接引用未经 Expo 兼容验证的底层 iOS/Android 裸原生模块',
      '优先使用 NativeWind (Tailwind) 进行多端自适应排版',
      '安全区域必须包裹 SafeAreaProvider 与 SafeAreaView'
    ]
  },
  go: {
    name: 'Go 1.22+ (Gin / Fiber)',
    buildCmd: 'go build -v ./...',
    testCmd: 'go test -v ./... && golangci-lint run',
    specificRules: [
      '错误处理遵循 if err != nil 显式包装，严禁直接忽略 error 返回值',
      'Context 必须作为第一个参数透传，禁止跨 Goroutine 共享未同步状态'
    ]
  },
  rust: {
    name: 'Rust (Axum + Tokio)',
    buildCmd: 'cargo check',
    testCmd: 'cargo test && cargo clippy -- -D warnings',
    specificRules: [
      '严禁滥用 unwrap() 或 expect()，生产链路使用 Result 与 thiserror 向上抛出',
      '严格遵循所有权与生命周期机制，避免无意义的 clone()'
    ]
  },
  svelte: {
    name: 'SvelteKit + Svelte 5',
    buildCmd: 'npm run build',
    testCmd: 'npm run check',
    specificRules: [
      '使用 Svelte 5 Runes ($state, $derived, $effect) 替代旧式响应式声明',
      'Server 路由与 Client 组件严格物理隔离'
    ]
  },
  chrome: {
    name: 'Chrome Extension (Manifest V3)',
    buildCmd: 'node scripts/validate.js',
    testCmd: 'npm test',
    specificRules: [
      '严格遵循 MV3 CSP：严禁使用 eval() 与任何 HTML 内联脚本',
      'Service Worker 具备短暂休眠特性，状态持久化必须写入 chrome.storage.local',
      '申请权限遵循最小特权原则，默认优先使用 activeTab'
    ]
  },
  general: {
    name: '通用项目 / 文档站与自动化脚本',
    buildCmd: 'npm run build',
    testCmd: 'npm test',
    specificRules: [
      '修改文档或脚本前先盘点关联引用与构建入口，避免遗留死链或破坏现有自动化任务',
      '严禁将 API Key、Cookie、Token 或本机私密路径写入仓库代码与文档'
    ]
  }
}

const sandboxText: Record<string, string> = {
  standard: '- 标准开发模式：允许在项目内执行依赖安装、测试与代码构建；严禁任何生产部署、外部密钥读取或越权写操作。',
  strict: '- 严格只读保护：智能体仅具备文件阅读与方案输出权限，禁止私自执行终端命令；所有变更必须由人工审查后合并。',
  local: '- 本地联调模式：允许访问本地端口、Docker 数据库与受控测试 API；涉及删库、覆盖配置、推送或线上部署必须提前人工确认。'
}

const primaryFile = computed(() => {
  if (selectedAgent.value === 'claude') {
    return { path: 'CLAUDE.md', downloadName: 'CLAUDE.md' }
  }
  return { path: 'AGENTS.md', downloadName: 'AGENTS.md' }
})

const companionFile = computed(() => {
  const map: Record<AgentKey, { path: string; downloadName: string; hint: string }> = {
    codex: {
      path: '~/.codex/config.toml',
      downloadName: 'config.toml',
      hint: '用于控制 Codex CLI 的主力模型、审批策略与沙盒边界，放于用户目录或项目级配置中。'
    },
    claude: {
      path: '.claude/settings.json',
      downloadName: 'settings.json',
      hint: '确定性 PreToolUse 门禁：执行 Bash 前自动校验命令，命中 rm -rf /、读取 .env 或 git push --force 时直接以退出码 2 拦截。'
    },
    gemini: {
      path: '.agents/rules/project.md',
      downloadName: 'project.md',
      hint: '放入项目 .agents/rules/ 目录，Antigravity 会按触发条件自动加载视觉验收、方案双审与模型分层红线。'
    },
    kimi: {
      path: '~/.kimi-code/config.toml',
      downloadName: 'config.toml',
      hint: '配置 Kimi Code 默认模型（kimi-k3.1-pro）、权限模式以及 explore / plan / coder 子代理协作。'
    }
  }
  return map[selectedAgent.value]
})

const primaryContent = computed(() => {
  const stack = stackConfigs[selectedStack.value]
  const pName = projectName.value || 'my-project'

  let core = `## 项目指纹\n`
  core += `- **项目名称**：${pName}\n`
  core += `- **目标技术栈**：${stack.name}\n`
  core += `- **协作原则**：小改优于大改，先读清上下文再动代码，禁止编造未核实的配置或测试结果\n\n`

  core += `## 运行环境与权限边界\n`
  core += `${sandboxText[sandboxLevel.value]}\n\n`

  core += `## 核心安全护栏\n`
  let idx = 1
  if (rules.value.antiLoop) {
    core += `${idx++}. **防自旋死循环**：如果同一编译或测试报错连续修复 2 次仍未通过，必须立即暂停，输出完整排查思路并等待确认，严禁盲目重试。\n`
  }
  if (rules.value.noPlaceholder) {
    core += `${idx++}. **防虚假伪造**：严禁提交含有 \`// TODO\`、\`pass\`、占位函数或虚构假数据的半成品，所有交付代码必须真实可运行。\n`
  }
  if (rules.value.noExternalDeps) {
    core += `${idx++}. **防滥装依赖**：常规逻辑优先使用原生标准库与现有依赖，严禁未经确认私自引入重量级外部包。\n`
  }
  stack.specificRules.forEach((rule: string) => {
    core += `${idx++}. **技术栈约束**：${rule}\n`
  })
  core += `\n`

  if (rules.value.enforceValidation) {
    core += `## 交付验收命令\n`
    core += `阶段性修改完成后，必须按顺序跑通以下命令并确认退出码为 0：\n\n`
    core += `\`\`\`bash\n# 1. 运行静态检查与单元测试\n${stack.testCmd}\n\n# 2. 验证构建产物\n${stack.buildCmd}\n\`\`\`\n`
  }

  if (selectedAgent.value === 'claude') {
    return `# CLAUDE.md（Claude Code 常驻项目规则）\n\n> 若团队同时使用多款工具，可把通用边界维护在根目录 \`AGENTS.md\`，在本文开头写一行 \`@AGENTS.md\` 直接复用。\n\n${core}`
  }

  return `# 项目协作规则 (AGENTS.md)\n\n${core}`
})

const companionContent = computed(() => {
  const isStrict = sandboxLevel.value === 'strict'
  const isLocal = sandboxLevel.value === 'local'

  if (selectedAgent.value === 'codex') {
    const approval = isStrict ? 'untrusted' : 'on-request'
    const sandbox = isStrict ? 'read-only' : isLocal ? 'danger-full-access' : 'workspace-write'
    return `# ~/.codex/config.toml (OpenAI Codex CLI 推荐配置)\nmodel = "gpt-6.2-sol"\nmodel_reasoning_effort = "medium"\napproval_policy = "${approval}"\nsandbox_mode = "${sandbox}"\n\n[profiles.deep-debug]\nmodel = "gpt-6.2-astra"\nmodel_reasoning_effort = "high"\n`
  }

  if (selectedAgent.value === 'claude') {
    const guardCmd = `node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8'));const cmd=(d.tool_input&&d.tool_input.command)||'';const blocked=[/rm\\s+-rf\\s+(\\/|~|\\.)/,/git\\s+push\\s+.*--force/,/\\.env\\b/];if(blocked.some(r=>r.test(cmd))){console.error('[Hook Blocked] Dangerous command rejected: '+cmd);process.exit(2);}"`
    return JSON.stringify(
      {
        hooks: {
          PreToolUse: [
            {
              matcher: 'Bash',
              hooks: [
                {
                  type: 'command',
                  command: guardCmd
                }
              ]
            }
          ]
        }
      },
      null,
      2
    )
  }

  if (selectedAgent.value === 'gemini') {
    return `---\ntrigger: always_on\ndescription: "${projectName.value || 'my-project'} 视觉验收与方案双审规则"\n---\n\n# Antigravity 项目专属规则\n\n## 视觉与多端验收\n- 前端改动完成后需核查 390px / 768px / 1440px 三个视口：正文可见字号 >= 12px，无横向溢出，无文字截断。\n- 涉及页面交互与表单流转时，使用浏览器真实复测，不以静态构建通过替代视觉验收。\n\n## 方案双审与模型分层\n- 重大架构选型或数据方案先由推理档模型（Gemini 4 Carbon / Argon）输出方案并做一轮反向挑刺（双审制），再交给执行模型批量落地。\n- 高频局部改动与测试验证交由 Orchestrator 自动分流至 Gemini 4 Hydrogen，控制配额与响应延迟。\n`
  }

  return `# ~/.kimi-code/config.toml (Kimi Code 推荐配置)\n[runtime]\nmodel = "kimi-k3.1-pro"\npermission_mode = "${isStrict ? 'always_ask' : 'auto'}"\nmax_context_tokens = 1000000\n\n[subagents]\nexplore = true\nplan = true\ncoder = true\n`
})

async function copyText(text: string, key: 'primary' | 'companion') {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => {
      if (copiedKey.value === key) copiedKey.value = ''
    }, 2500)
  } catch (err) {
    alert('复制失败，请手动选中代码框内容复制。')
  }
}

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.generator-app {
  margin-top: 24px;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
.agent-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.agent-tab {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
.agent-tab.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #ffffff;
}
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--vp-c-bg-soft);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  max-width: 100%;
}
.label {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
}
.select-input, .text-input {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.checkbox-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;
  cursor: pointer;
  color: var(--vp-c-text-2);
}
.checkbox-item input {
  margin-top: 3px;
}
.checkbox-item:hover {
  color: var(--vp-c-text-1);
}
.output-section {
  margin-top: 24px;
  max-width: 100%;
  min-width: 0;
}
.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.output-title {
  font-weight: 600;
  font-size: 14px;
}
.output-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.companion-hint {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.btn-copy,
.btn-secondary {
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s, border-color 0.2s;
}
.btn-copy {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border: 1px solid var(--vp-c-brand-1);
}
.btn-secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}
.btn-copy:hover {
  opacity: 0.9;
}
.btn-secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.code-preview {
  max-width: 100%;
  box-sizing: border-box;
  background: var(--vp-c-bg-alt);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid var(--vp-c-divider);
}
.code-preview code {
  font-size: 13px;
}
</style>
