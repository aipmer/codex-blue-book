---
title: "AI Collaboration Rules Generator: Codex, Claude Code, Gemini Antigravity & Kimi Code"
description: "Generate ready-to-drop project rules and tool-specific configs in 30 seconds for OpenAI Codex (AGENTS.md), Claude Code (CLAUDE.md + Hooks), Gemini Antigravity (.agents/rules), and Kimi Code (config.toml)."
lastUpdated: 2026-11-27
---

# AI Collaboration Rules Generator (AGENTS.md / CLAUDE.md)

> Set clear engineering guardrails before an agent touches your repository—prevent architecture drift, unvetted packages, fake stubs, or infinite retry loops. Switch across **Codex, Claude Code, Gemini Antigravity, and Kimi Code**, then copy or download both the primary rules file and its companion tool config separately.

<ClientOnly>
<div class="generator-app">
<div class="form-grid">
  <div class="form-group">
    <label class="label">0. Select Target AI Coding Agent (matches rules format & companion config):</label>
    <div class="agent-tabs">
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'codex' }]" @click="selectedAgent = 'codex'">Codex (AGENTS.md + config.toml)</button>
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'claude' }]" @click="selectedAgent = 'claude'">Claude Code (CLAUDE.md + Hooks)</button>
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'gemini' }]" @click="selectedAgent = 'gemini'">Gemini Antigravity (.agents/rules)</button>
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'kimi' }]" @click="selectedAgent = 'kimi'">Kimi Code (AGENTS.md + config.toml)</button>
    </div>
  </div>
  <div class="form-group">
    <label class="label">1. Select Stack / Framework:</label>
    <select v-model="selectedStack" class="select-input">
      <option value="nextjs">Next.js 14/15 (Full-stack React)</option>
      <option value="vue3">Vue 3 + Vite + TypeScript</option>
      <option value="fastapi">FastAPI (Python Backend)</option>
      <option value="django">Django (Python Backend)</option>
      <option value="datascience">Python Data Science & Research (Jupyter / PyTorch)</option>
      <option value="spring">Spring Boot (Java 3.x)</option>
      <option value="expo">React Native (Expo Mobile)</option>
      <option value="go">Go (Gin / Fiber)</option>
      <option value="rust">Rust (Axum / Tokio)</option>
      <option value="svelte">SvelteKit (Svelte 5)</option>
      <option value="chrome">Chrome Extension (Manifest V3)</option>
      <option value="general">General Repository / Docs & Automation Scripts</option>
    </select>
  </div>
  <div class="form-group">
    <label class="label">2. Project Name:</label>
    <input type="text" v-model="projectName" class="text-input" placeholder="e.g.: my-awesome-saas" />
  </div>
  <div class="form-group">
    <label class="label">3. Execution Environment & Permissions:</label>
    <select v-model="sandboxLevel" class="select-input">
      <option value="standard">Standard Development Mode (Install, test, build allowed; no production writes or secret leakage)</option>
      <option value="strict">Strict Read-Only Protection (AI only proposes plans/diffs; terminal execution banned; human PR review required)</option>
      <option value="local">Local Integration Mode (Allow local ports, Docker DBs, and staging APIs; destructive or prod actions require confirmation)</option>
    </select>
  </div>
  <div class="form-group">
    <label class="label">4. Core Safety Guardrails:</label>
    <div class="checkbox-group">
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.antiLoop" />
        <span>Stop Infinite Loops (Prevent Loop): Abort on 2 consecutive test/build failures and emit diagnostic notes instead of blindly retrying</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.noPlaceholder" />
        <span>Ban Fake Stubs (No Placeholders): Strictly forbid TODOs, mock stubs, or empty functions; all delivered code must be runnable</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.noExternalDeps" />
        <span>Dependency Guard: Prefer standard libraries and built-in APIs; forbid unapproved heavy third-party packages</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.enforceValidation" />
        <span>Deliver with Tests (Verification Specs): Must run automated tests and production build checks with exit code 0 before delivery</span>
      </label>
    </div>
  </div>
</div>

<div class="output-section">
  <div class="output-header">
    <span class="output-title">Primary Project Rules: <code>{{ primaryFile.path }}</code></span>
    <div class="output-actions">
      <button type="button" class="btn-secondary" @click="downloadFile(primaryFile.downloadName, primaryContent)">
        Download {{ primaryFile.downloadName }}
      </button>
      <button type="button" class="btn-copy" @click="copyText(primaryContent, 'primary')">
        {{ copiedKey === 'primary' ? 'Copied to Clipboard' : 'Copy Rules' }}
      </button>
    </div>
  </div>
  <pre class="code-preview"><code>{{ primaryContent }}</code></pre>
</div>

<div class="output-section">
  <div class="output-header">
    <span class="output-title">Companion Tool Config: <code>{{ companionFile.path }}</code></span>
    <div class="output-actions">
      <button type="button" class="btn-secondary" @click="downloadFile(companionFile.downloadName, companionContent)">
        Download {{ companionFile.downloadName }}
      </button>
      <button type="button" class="btn-copy" @click="copyText(companionContent, 'companion')">
        {{ copiedKey === 'companion' ? 'Copied to Clipboard' : 'Copy Config' }}
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
      'Components default to React Server Components; only add "use client" when interaction is required',
      'Use Tailwind CSS; inline arbitrary style objects are prohibited',
      'Strictly separate server envs from client NEXT_PUBLIC_ variables'
    ]
  },
  vue3: {
    name: 'Vue 3 + Vite + Pinia',
    buildCmd: 'npm run build',
    testCmd: 'npm run lint && vue-tsc --noEmit',
    specificRules: [
      'Standardize on <script setup lang="ts"> Composition API',
      'Use Pinia for global state; legacy Vuex is banned',
      'Handle reactive destructuring with storeToRefs to avoid reactivity loss'
    ]
  },
  fastapi: {
    name: 'FastAPI + Pydantic v2',
    buildCmd: 'python -m compileall .',
    testCmd: 'pytest -v && ruff check .',
    specificRules: [
      'Use Pydantic v2 for payload validation and serialization',
      'Explicitly declare async def endpoints with AsyncSession dependency injection',
      'All endpoints must specify an explicit response_model'
    ]
  },
  django: {
    name: 'Django + DRF',
    buildCmd: 'python manage.py check',
    testCmd: 'python manage.py test && flake8',
    specificRules: [
      'Schema changes must run via makemigrations; raw SQL migrations are banned',
      'Avoid N+1 queries by using select_related / prefetch_related'
    ]
  },
  datascience: {
    name: 'Python Data Science & Research (Jupyter / PyTorch)',
    buildCmd: 'python -m compileall src/',
    testCmd: 'pytest -v && ruff check src/',
    specificRules: [
      'Pin random seeds (random / numpy / torch) and log hyperparameters plus dataset versions for reproducibility',
      'Mount raw datasets read-only; write derived features and checkpoints to dedicated output folders',
      'Keep reusable modeling code in src/ modules and reserve notebooks for experiments, charts, and findings'
    ]
  },
  spring: {
    name: 'Spring Boot 3 + Java 21',
    buildCmd: './gradlew build -x test',
    testCmd: './gradlew check',
    specificRules: [
      'Use Constructor Injection; field-level @Autowired is prohibited',
      'Strictly decouple entity models from API transfer DTOs'
    ]
  },
  expo: {
    name: 'React Native + Expo (SDK 57+)',
    buildCmd: 'npx expo export --platform web',
    testCmd: 'npx expo lint && npx --yes expo-doctor',
    specificRules: [
      'Never reference bare iOS/Android native modules without Expo config plugins',
      'Prefer NativeWind (Tailwind) for responsive layouts across mobile screens',
      'Wrap all views within SafeAreaProvider and SafeAreaView'
    ]
  },
  go: {
    name: 'Go 1.22+ (Gin / Fiber)',
    buildCmd: 'go build -v ./...',
    testCmd: 'go test -v ./... && golangci-lint run',
    specificRules: [
      'Wrap errors with context (if err != nil); never swallow errors silently',
      'Context must be passed as the first parameter; avoid unsynchronized Goroutines'
    ]
  },
  rust: {
    name: 'Rust (Axum + Tokio)',
    buildCmd: 'cargo check',
    testCmd: 'cargo test && cargo clippy -- -D warnings',
    specificRules: [
      'Ban unwrap() or expect() in production paths; propagate errors via Result and thiserror',
      'Honor ownership and lifetimes without superfluous clone() calls'
    ]
  },
  svelte: {
    name: 'SvelteKit + Svelte 5',
    buildCmd: 'npm run build',
    testCmd: 'npm run check',
    specificRules: [
      'Use Svelte 5 Runes ($state, $derived, $effect) instead of legacy reactive declarations',
      'Isolate server endpoints and client component logic'
    ]
  },
  chrome: {
    name: 'Chrome Extension (Manifest V3)',
    buildCmd: 'node scripts/validate.js',
    testCmd: 'npm test',
    specificRules: [
      'Strict MV3 CSP: eval() and inline <script> tags are banned',
      'Service Workers are ephemeral; state must persist in chrome.storage.local',
      'Adhere to least privilege; prefer activeTab over broad host permissions'
    ]
  },
  general: {
    name: 'General Repository / Docs & Automation Scripts',
    buildCmd: 'npm run build',
    testCmd: 'npm test',
    specificRules: [
      'Audit references, links, and CI entrypoints before moving or renaming files',
      'Never commit API keys, cookies, tokens, or local private paths into repository files'
    ]
  }
}

const sandboxText: Record<string, string> = {
  standard: '- Standard Development Mode: Package installation, testing, and building are allowed. Production writes and credential leakage are strictly forbidden.',
  strict: '- Strict Read-Only Protection: Agent operates read-only. Terminal commands are forbidden and all changes require human review via Pull Requests.',
  local: '- Local Integration Mode: Allow local ports, Docker databases, and staging APIs. Destructive actions, force pushes, or production deploys require explicit human confirmation.'
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
      hint: 'Controls OpenAI Codex CLI default model, approval policy, and sandbox boundary.'
    },
    claude: {
      path: '.claude/settings.json',
      downloadName: 'settings.json',
      hint: 'Deterministic PreToolUse hook that inspects every Bash command and exits with code 2 to block rm -rf /, .env reads, or git push --force.'
    },
    gemini: {
      path: '.agents/rules/project.md',
      downloadName: 'project.md',
      hint: 'Save under .agents/rules/ so Google Antigravity automatically enforces responsive QA, dual-review planning, and model routing.'
    },
    kimi: {
      path: '~/.kimi-code/config.toml',
      downloadName: 'config.toml',
      hint: 'Configures Kimi Code with kimi-k3.1-pro, 1M context budget, permission mode, and explore/plan/coder subagents.'
    }
  }
  return map[selectedAgent.value]
})

const primaryContent = computed(() => {
  const stack = stackConfigs[selectedStack.value]
  const pName = projectName.value || 'my-project'

  let core = `## Project Signature\n`
  core += `- **Project Name**: ${pName}\n`
  core += `- **Target Stack**: ${stack.name}\n`
  core += `- **Collaboration Principle**: Prefer small, verifiable edits; inspect existing code first and never fabricate unverified configs or test passes\n\n`

  core += `## Execution Boundaries\n`
  core += `${sandboxText[sandboxLevel.value]}\n\n`

  core += `## Core Engineering Guardrails\n`
  let idx = 1
  if (rules.value.antiLoop) {
    core += `${idx++}. **Stop Infinite Loops (Prevent Loop)**: If compilation or tests fail twice in a row, halt immediately, summarize the root cause, and wait for direction instead of guessing.\n`
  }
  if (rules.value.noPlaceholder) {
    core += `${idx++}. **Ban Fake Stubs (No Placeholders)**: No \`// TODO\`, \`pass\`, or fabricated mock stubs. All delivered code must be runnable.\n`
  }
  if (rules.value.noExternalDeps) {
    core += `${idx++}. **Dependency Guard**: Prefer standard libraries and existing packages; never add heavyweight third-party dependencies without approval.\n`
  }
  stack.specificRules.forEach((rule: string) => {
    core += `${idx++}. **Stack-Specific**: ${rule}\n`
  })
  core += `\n`

  if (rules.value.enforceValidation) {
    core += `## Deliver with Tests (Verification Specs)\n`
    core += `Before marking any task complete, run the following commands and verify exit code 0:\n\n`
    core += `\`\`\`bash\n# 1. Lint & Unit Tests\n${stack.testCmd}\n\n# 2. Build Verification\n${stack.buildCmd}\n\`\`\`\n`
  }

  if (selectedAgent.value === 'claude') {
    return `# CLAUDE.md (Claude Code Standing Project Rules)\n\n> If your team shares rules across multiple agents, keep common rules in root \`AGENTS.md\` and include \`@AGENTS.md\` at the top of this file.\n\n${core}`
  }

  return `# Project Collaboration Rules (AGENTS.md)\n\n${core}`
})

const companionContent = computed(() => {
  const isStrict = sandboxLevel.value === 'strict'
  const isLocal = sandboxLevel.value === 'local'

  if (selectedAgent.value === 'codex') {
    const approval = isStrict ? 'untrusted' : 'on-request'
    const sandbox = isStrict ? 'read-only' : isLocal ? 'danger-full-access' : 'workspace-write'
    return `# ~/.codex/config.toml (OpenAI Codex CLI)\nmodel = "gpt-6.2-sol"\nmodel_reasoning_effort = "medium"\napproval_policy = "${approval}"\nsandbox_mode = "${sandbox}"\n\n[profiles.deep-debug]\nmodel = "gpt-6.2-astra"\nmodel_reasoning_effort = "high"\n`
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
    return `---\ntrigger: always_on\ndescription: "${projectName.value || 'my-project'} visual QA and dual-review guardrails"\n---\n\n# Antigravity Project Rules\n\n## Visual & Cross-Device QA\n- Verify UI changes across 390px, 768px, and 1440px viewports with >= 12px visible text and zero horizontal overflow.\n- Validate real user flows in the browser; a passing build does not replace visual verification.\n\n## Dual-Review Planning & Model Routing\n- Draft major architecture or data plans with Gemini 4 Carbon / Argon and run an adversarial review pass before bulk edits.\n- Let Antigravity Orchestrator route routine edits and test loops to Gemini 4 Hydrogen for lower latency and quota cost.\n`
  }

  return `# ~/.kimi-code/config.toml (Kimi Code)\n[runtime]\nmodel = "kimi-k3.1-pro"\npermission_mode = "${isStrict ? 'always_ask' : 'auto'}"\nmax_context_tokens = 1000000\n\n[subagents]\nexplore = true\nplan = true\ncoder = true\n`
})

async function copyText(text: string, key: 'primary' | 'companion') {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => {
      if (copiedKey.value === key) copiedKey.value = ''
    }, 2500)
  } catch (err) {
    alert('Failed to copy. Please manually select and copy.')
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
