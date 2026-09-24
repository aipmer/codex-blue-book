<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { BadgeCheck, Check, Copy, FileText, FileX, PackageX, ShieldAlert } from '@lucide/vue'
import { sandboxText, stackConfigs, stackKeys, type GeneratorLocale, type StackKey } from './generator-data'

const props = defineProps<{ locale: GeneratorLocale }>()
type SandboxLevel = 'standard' | 'strict' | 'tunnel'
type RuleKey = 'antiLoop' | 'noPlaceholder' | 'noExternalDeps' | 'enforceValidation'

const selectedStack = ref<StackKey>('nextjs')
const projectName = ref('my-saas-mvp')
const sandboxLevel = ref<SandboxLevel>('standard')
const rules = ref<Record<RuleKey, boolean>>({
  antiLoop: true,
  noPlaceholder: true,
  noExternalDeps: true,
  enforceValidation: true
})
const copied = ref(false)
const copyError = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

watch([selectedStack, projectName, sandboxLevel, rules], () => { copied.value = false }, { deep: true })

const labels = {
  zh: {
    stack: '1. 选择项目技术栈：',
    project: '2. 项目名称：',
    placeholder: '例如: my-awesome-saas',
    sandbox: '3. 写入运行环境建议：',
    guardrails: '4. 选择项目规则：',
    preview: '生成的 AGENTS.md 实时预览：',
    copy: '复制规则草稿', copied: '已复制到剪贴板', copyError: '复制失败，请手动选中预览内容复制。',
    stackOptions: {
      nextjs: 'Next.js 14/15 (React 全栈)', vue3: 'Vue 3 + Vite + TypeScript',
      fastapi: 'FastAPI (Python 现代微服务)', django: 'Django (Python 经典后端)',
      spring: 'Spring Boot (Java 3.x)', expo: 'React Native (Expo 移动端)',
      go: 'Go (Gin / Fiber)', rust: 'Rust (Axum / Tokio)',
      svelte: 'SvelteKit (Svelte 5)', chrome: 'Chrome 扩展 (Manifest V3)'
    },
    sandboxOptions: {
      standard: '标准开发：要求先确认依赖、测试命令和生产操作权限',
      strict: '只读审阅：要求仅输出建议，实际权限需由沙盒配置落实',
      tunnel: '本地联调：记录端口和数据库访问边界，敏感操作另行审批'
    },
    guardrailLabels: {
      antiLoop: '重复错误：同一失败重试 2 次后停止修改，报告错误与已尝试方法',
      noPlaceholder: '未完成代码：提交前检查 TODO、空函数和测试替身是否符合任务要求',
      noExternalDeps: '新增依赖：先说明用途、替代方案和影响，再修改依赖清单',
      enforceValidation: '交付验证：运行项目实际存在的测试与构建命令，记录结果'
    }
  },
  en: {
    stack: '1. Select Stack / Framework:',
    project: '2. Project Name:',
    placeholder: 'e.g.: my-awesome-saas',
    sandbox: '3. Execution Environment & Permissions (Defense Boundaries):',
    guardrails: '4. Core Safety Guardrails (Defense Scenarios):',
    preview: 'Real-time AGENTS.md Preview:',
    copy: 'Copy Rules', copied: 'Copied to Clipboard', copyError: 'Copy failed. Select and copy the preview manually.',
    stackOptions: {
      nextjs: 'Next.js 14/15 (Full-stack React)', vue3: 'Vue 3 + Vite + TypeScript',
      fastapi: 'FastAPI (Python Microservices)', django: 'Django (Python Backend)',
      spring: 'Spring Boot (Java 3.x)', expo: 'React Native (Expo Mobile)',
      go: 'Go (Gin / Fiber)', rust: 'Rust (Axum / Tokio)',
      svelte: 'SvelteKit (Svelte 5)', chrome: 'Chrome Extension (Manifest V3)'
    },
    sandboxOptions: {
      standard: 'Standard development: check dependencies, test commands, and production permissions',
      strict: 'Read-only review: request suggestions only; enforce permissions in sandbox settings',
      tunnel: 'Local debugging: document port and database access; review sensitive operations separately'
    },
    guardrailLabels: {
      antiLoop: 'Stop Infinite Loops (Prevent Loop): Stop after 2 repeats of the same failure and report the error and attempted fixes',
      noPlaceholder: 'Ban Fake Stubs (No Placeholders): Check TODOs, empty functions, and test doubles before delivery',
      noExternalDeps: 'Dependency Guard: Prefer standard libraries and built-in APIs; explain the purpose and impact before adding a dependency',
      enforceValidation: 'Deliver with Tests (Verification Specs): Run the test and build commands that exist in the project and record results'
    }
  }
}

const ui = computed(() => labels[props.locale])
const guardrailItems = [
  { key: 'antiLoop', icon: ShieldAlert },
  { key: 'noPlaceholder', icon: FileX },
  { key: 'noExternalDeps', icon: PackageX },
  { key: 'enforceValidation', icon: BadgeCheck }
] as const

const generatedContent = computed(() => {
  const stack = stackConfigs[props.locale][selectedStack.value]
  const name = projectName.value.trim() || 'my-project'
  const lines = props.locale === 'zh'
    ? [
        '# 项目协作规则 (AGENTS.md)', '',
        '## 📌 项目指纹',
        `- **项目名称**：${name}`,
        `- **目标架构**：${stack.name}`,
        '- **使用前核对**：以下命令、路径和权限要求须按当前项目修改；文字规则不能代替沙盒与人工审查。', '',
        '## 运行环境与权限建议',
        sandboxText.zh[sandboxLevel.value], '',
        '## 工程协作规则'
      ]
    : [
        '# 🤖 Codex Collaboration Protocol (CAP)', '',
        '## 📌 Project Signature',
        `- **Project Name**: ${name}`,
        `- **Target Architecture**: ${stack.name}`,
        '- **Before use**: Adapt commands, paths, and permissions to this repository. Written rules do not enforce sandbox access or replace review.', '',
        '## Environment and Permission Guidance',
        sandboxText.en[sandboxLevel.value], '',
        '## Engineering Rules'
      ]

  const selectedRules: string[] = []
  if (props.locale === 'zh') {
    if (rules.value.antiLoop) selectedRules.push('**🛑 防自旋死循环 (Anti-Loop)**：如果同一编译或测试错误在修改后重试 2 次仍未解决，停止修改并向开发者报告错误、尝试过的方法和下一步排查建议。')
    if (rules.value.noPlaceholder) selectedRules.push('**🚫 防虚假伪造 (严禁占位符)**：严禁提交含有 `// TODO: 实现此逻辑`、`pass`、或虚构假数据的未完成函数，所有代码必须真实可编译。')
    if (rules.value.noExternalDeps) selectedRules.push('**📦 防滥装依赖 (依赖守卫)**：常规逻辑优先使用原生标准库与内置 API，严禁未经确认私自安装体积庞大的未知第三方包。')
  } else {
    if (rules.value.antiLoop) selectedRules.push('**🛑 Stop Infinite Loops (Prevent Loop)**: If compilation or test fails twice in a row, halt immediately, log the full error context, and switch to single-module diagnostic mode. Continuous guessing loops are strictly forbidden.')
    if (rules.value.noPlaceholder) selectedRules.push('**🚫 Ban Fake Stubs (No Placeholders)**: No stubs like `// TODO: implement`, `pass`, or fabricated mock data. All code must be runnable.')
    if (rules.value.noExternalDeps) selectedRules.push('**📦 Dependency Guard**: Never introduce heavyweight dependencies or third-party wrappers without explicit review. Prefer standard library solutions.')
  }
  selectedRules.push(...stack.specificRules.map(rule => `**${props.locale === 'zh' ? '技术栈专有防御' : 'Stack-Specific'}**: ${rule}`))
  lines.push(...selectedRules.map((rule, index) => `${index + 1}. ${rule}`), '')

  if (rules.value.enforceValidation) {
    if (props.locale === 'zh') {
      lines.push('## 🧪 验证标准 (Validation Specs)', '智能体在每次阶段性修改完成后，先核对项目中是否存在下列命令，再执行适用的检查并记录退出状态：', '',
        '```bash', '# 1. 运行静态检查与单元测试', stack.testCmd, '', '# 2. 验证生产构建', stack.buildCmd, '```')
    } else {
      lines.push('## 🧪 Deliver with Tests (Verification Specs)', 'Before marking any task as complete, verify that the following commands exist in the project, run the applicable checks, and record their exit status:', '',
        '```bash', '# 1. Lint & Unit Tests', stack.testCmd, '', '# 2. Production Build Verification', stack.buildCmd, '```')
    }
  }
  return `${lines.join('\n').trimEnd()}\n`
})

async function copyContent() {
  try {
    await navigator.clipboard.writeText(generatedContent.value)
    copyError.value = false
    copied.value = true
    if (copiedTimer) clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => { copied.value = false }, 2500)
  } catch {
    copied.value = false
    copyError.value = true
  }
}
</script>

<template>
  <section class="generator-app" :lang="locale === 'zh' ? 'zh-CN' : 'en'">
    <div class="form-grid">
      <div class="form-group">
        <label class="label" for="generator-stack">{{ ui.stack }}</label>
        <select id="generator-stack" v-model="selectedStack" class="select-input">
          <option v-for="key in stackKeys" :key="key" :value="key">{{ ui.stackOptions[key] }}</option>
        </select>
      </div>
      <div class="form-group">
        <label class="label" for="generator-project">{{ ui.project }}</label>
        <input id="generator-project" v-model="projectName" type="text" class="text-input" :placeholder="ui.placeholder" />
      </div>
      <div class="form-group">
        <label class="label" for="generator-sandbox">{{ ui.sandbox }}</label>
        <select id="generator-sandbox" v-model="sandboxLevel" class="select-input">
          <option v-for="key in (['standard', 'strict', 'tunnel'] as const)" :key="key" :value="key">{{ ui.sandboxOptions[key] }}</option>
        </select>
      </div>
      <fieldset class="form-group rule-fieldset">
        <legend class="label">{{ ui.guardrails }}</legend>
        <div class="checkbox-group">
          <label v-for="item in guardrailItems" :key="item.key" class="checkbox-item">
            <input v-model="rules[item.key]" type="checkbox" />
            <component :is="item.icon" class="rule-icon" :size="18" :stroke-width="1.8" aria-hidden="true" />
            <span>{{ ui.guardrailLabels[item.key] }}</span>
          </label>
        </div>
      </fieldset>
    </div>
    <div class="output-section">
      <div class="output-header">
        <span class="output-title"><FileText :size="18" :stroke-width="1.8" aria-hidden="true" />{{ ui.preview }}</span>
        <button class="btn-copy" type="button" @click="copyContent">
          <Check v-if="copied" :size="17" :stroke-width="2" aria-hidden="true" />
          <Copy v-else :size="17" :stroke-width="1.8" aria-hidden="true" />
          {{ copied ? ui.copied : ui.copy }}
        </button>
      </div>
      <p v-if="copyError" class="copy-error" role="alert">{{ ui.copyError }}</p>
      <pre class="code-preview"><code>{{ generatedContent }}</code></pre>
    </div>
  </section>
</template>

<style scoped>
.generator-app, .form-grid, .form-group, .output-section { min-width: 0; max-width: 100%; }
.generator-app { margin-top: 24px; }
.form-grid { display: flex; flex-direction: column; gap: 18px; padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.label { color: var(--vp-c-text-1); font-size: 14px; font-weight: 600; line-height: 1.5; }
.select-input, .text-input { box-sizing: border-box; display: block; width: 100%; min-width: 0; max-width: 100%; min-height: 44px; padding: 9px 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); font: inherit; font-size: 14px; }
.select-input:focus-visible, .text-input:focus-visible, .checkbox-item input:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.rule-fieldset { margin: 0; padding: 0; border: 0; }
.rule-fieldset legend { margin-bottom: 8px; padding: 0; }
.checkbox-group { display: flex; flex-direction: column; gap: 10px; }
.checkbox-item { display: flex; align-items: flex-start; gap: 10px; color: var(--vp-c-text-2); font-size: 13px; line-height: 1.55; cursor: pointer; overflow-wrap: anywhere; }
.checkbox-item:hover { color: var(--vp-c-text-1); }
.checkbox-item input { flex: none; width: 16px; height: 16px; margin: 2px 0 0; accent-color: var(--vp-c-brand-1); }
.checkbox-item span { min-width: 0; }
.rule-icon { flex: none; margin-top: 1px; color: var(--vp-c-brand-1); }
.output-section { margin-top: 24px; }
.output-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
.output-title { display: inline-flex; align-items: center; gap: 8px; color: var(--vp-c-text-1); font-size: 14px; font-weight: 600; }
.output-title svg { flex: none; color: var(--vp-c-brand-1); }
.btn-copy { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 8px 16px; border: 1px solid var(--vp-button-brand-border); border-radius: 8px; background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text); font-size: 14px; font-weight: 600; line-height: 1.2; cursor: pointer; transition: background-color .18s ease, border-color .18s ease; }
.btn-copy:hover { border-color: var(--vp-button-brand-hover-border); background: var(--vp-button-brand-hover-bg); color: var(--vp-button-brand-hover-text); }
.btn-copy:active { border-color: var(--vp-button-brand-active-border); background: var(--vp-button-brand-active-bg); color: var(--vp-button-brand-active-text); }
.btn-copy:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.copy-error { margin: 0 0 10px; color: var(--vp-c-danger-1); font-size: 13px; }
.code-preview { box-sizing: border-box; width: 100%; min-width: 0; max-width: 100%; margin: 0; padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-alt); color: var(--vp-c-text-1); font-family: var(--vp-font-family-mono); font-size: 13px; line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; }
.code-preview code { padding: 0; background: transparent; color: inherit; font: inherit; white-space: inherit; }
@media (max-width: 480px) {
  .form-grid { padding: 16px; }
  .output-header { align-items: stretch; }
  .btn-copy { width: 100%; }
}
</style>
