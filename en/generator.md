---
title: "Multi-Agent Rules Generator: Codex, Claude Code, Gemini Antigravity & Kimi Code"
description: "Generate production-ready project rules in 30 seconds for OpenAI Codex (AGENTS.md), Claude Code (CLAUDE.md + Hooks), Gemini Antigravity (.agents/rules), and Kimi Code (config.toml)."
lastUpdated: 2026-11-26
---

# Multi-Agent Rules Generator (AGENTS.md / CLAUDE.md)

> Prevent AI from breaking established architectures, installing unvetted packages, hallucinating fake code, or spinning in infinite error loops. Switch across **Codex, Claude Code, Gemini Antigravity, and Kimi Code** and export tailored project guardrails in 30 seconds.

<ClientOnly>
<div class="generator-app">
<div class="form-grid">
  <div class="form-group">
    <label class="label">0. Select Target AI Coding Agent:</label>
    <div class="agent-tabs">
      <button type="button" :class="['agent-tab', { active: selectedAgent === 'codex' }]" @click="selectedAgent = 'codex'">Codex (AGENTS.md)</button>
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
      <option value="fastapi">FastAPI (Python Microservices)</option>
      <option value="django">Django (Python Backend)</option>
      <option value="spring">Spring Boot (Java 3.x)</option>
      <option value="expo">React Native (Expo Mobile)</option>
      <option value="go">Go (Gin / Fiber)</option>
      <option value="rust">Rust (Axum / Tokio)</option>
      <option value="svelte">SvelteKit (Svelte 5)</option>
      <option value="chrome">Chrome Extension (Manifest V3)</option>
    </select>
  </div>
  <div class="form-group">
    <label class="label">2. Project Name:</label>
    <input type="text" v-model="projectName" class="text-input" placeholder="e.g.: my-awesome-saas" />
  </div>
  <div class="form-group">
    <label class="label">3. Execution Environment & Permissions (Defense Boundaries):</label>
    <select v-model="sandboxLevel" class="select-input">
      <option value="standard">Standard Development Defense (Install, test, build allowed; no credential leakage)</option>
      <option value="strict">Strict Read-Only Protection (AI only proposes diffs, terminal execution banned, changes via PR)</option>
      <option value="tunnel">Local Debugging Mode (Bridge local Docker DB and APIs, with Feishu Assistant remote approvals)</option>
    </select>
  </div>
  <div class="form-group">
    <label class="label">4. Core Safety Guardrails (Defense Scenarios):</label>
    <div class="checkbox-group">
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.antiLoop" />
        <span>🛑 Stop Infinite Loops (Prevent Loop): Abort on 2 consecutive test/build failures and emit CoT logs, preventing endless spinning</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.noPlaceholder" />
        <span>🚫 Ban Fake Stubs (No Placeholders): Strictly forbid TODOs, mock stubs, or empty functions; all delivered code must be runnable</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.noExternalDeps" />
        <span>📦 Dependency Guard: Prefer standard libraries and built-in APIs; forbid unapproved heavy third-party packages</span>
      </label>
      <label class="checkbox-item">
        <input type="checkbox" v-model="rules.enforceValidation" />
        <span>✅ Deliver with Tests (Verification Specs): Must run automated test suites and production build checks with exit code 0 before delivery</span>
      </label>
    </div>
  </div>
</div>
<div class="output-section">
  <div class="output-header">
    <span class="output-title">📄 Real-time Preview ({{ targetFileHint }}):</span>
    <button class="btn-copy" @click="copyContent">
      {{ copied ? '✅ Copied to Clipboard' : '📋 Copy Protocol' }}
    </button>
  </div>
  <pre class="code-preview"><code>{{ generatedContent }}</code></pre>
</div>
</div>
</ClientOnly>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedAgent = ref<'codex' | 'claude' | 'gemini' | 'kimi'>('codex')
const selectedStack = ref('nextjs')
const projectName = ref('my-saas-mvp')
const sandboxLevel = ref('standard')
const copied = ref(false)

const rules = ref({
  antiLoop: true,
  noPlaceholder: true,
  noExternalDeps: true,
  enforceValidation: true
})

const stackConfigs: Record<string, any> = {
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
      'Use Pydantic v2 for payload validations and serialization',
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
      'Context must be passed as the first parameter; avoid un-synchronized Goroutines'
    ]
  },
  rust: {
    name: 'Rust (Axum + Tokio)',
    buildCmd: 'cargo check',
    testCmd: 'cargo test && cargo clippy -- -D warnings',
    specificRules: [
      'Banned usage of unwrap() or expect() in production; bubble errors via Result and thiserror',
      'Strictly honor ownership and lifetimes without superfluous clone() calls'
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
  }
}

const sandboxText: Record<string, string> = {
  standard: '- Standard Development Defense: Package installation, testing, and building are allowed. Production writes and credential leakage are strictly forbidden.',
  strict: '- Strict Read-Only Protection: Agent operates read-only. Terminal commands are forbidden and all changes require human review via Pull Requests.',
  tunnel: '- Local Debugging Mode: Allow port bridging to local Docker databases and APIs, paired with Feishu Assistant for mobile alerts and remote approvals.'
}

const targetFileHint = computed(() => {
  const map = {
    codex: 'AGENTS.md (OpenAI Codex)',
    claude: 'CLAUDE.md + .claude/settings.json (Claude Code)',
    gemini: 'AGENTS.md + .agents/rules/project.md (Gemini Antigravity)',
    kimi: 'AGENTS.md + ~/.kimi-code/config.toml (Kimi Code)'
  }
  return map[selectedAgent.value]
})

const generatedContent = computed(() => {
  const stack = stackConfigs[selectedStack.value]
  const pName = projectName.value || 'my-project'

  let core = `## 📌 Project Signature\n`
  core += `- **Project Name**: ${pName}\n`
  core += `- **Target Architecture**: ${stack.name}\n`
  core += `- **Collaboration Framework**: AI Coding Blue Books Guardrail Spec\n\n`

  core += `## 🛑 Defense Scenarios & Sandbox Boundaries\n`
  core += `${sandboxText[sandboxLevel.value]}\n\n`

  core += `## 🛡️ Core Engineering Guardrails (Anti-Loop)\n`
  if (rules.value.antiLoop) {
    core += `1. **🛑 Stop Infinite Loops (Prevent Loop)**: If compilation or test fails twice in a row, halt immediately, log the full error context, and switch to single-module diagnostic mode. Continuous guessing loops are strictly forbidden.\n`
  }
  if (rules.value.noPlaceholder) {
    core += `2. **🚫 Ban Fake Stubs (No Placeholders)**: No stubs like \`// TODO: implement\`, \`pass\`, or fabricated mock data. All code must be runnable.\n`
  }
  if (rules.value.noExternalDeps) {
    core += `3. **📦 Dependency Guard**: Never introduce heavyweight dependencies or third-party wrappers without explicit review. Prefer standard library solutions.\n`
  }
  stack.specificRules.forEach((rule: string, idx: number) => {
    core += `${idx + 4}. **Stack-Specific**: ${rule}\n`
  })
  core += `\n`

  if (rules.value.enforceValidation) {
    core += `## 🧪 Deliver with Tests (Verification Specs)\n`
    core += `Before marking any task as complete, execute the following commands to ensure a zero exit code:\n\n`
    core += `\`\`\`bash\n# 1. Lint & Unit Tests\n${stack.testCmd}\n\n# 2. Production Build Verification\n${stack.buildCmd}\n\`\`\`\n`
  }

  if (selectedAgent.value === 'codex') {
    return `# 🤖 Codex Collaboration Protocol (CAP)\n\n${core}`
  }

  if (selectedAgent.value === 'claude') {
    return `# CLAUDE.md (Lean Standing Rules · Pair with @AGENTS.md)\n\n${core}\n## 🔒 Claude Code Deterministic Hook (.claude/settings.json)\n\`\`\`json\n{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Bash",\n        "hooks": [{ "type": "command", "command": "echo '[Hook] Verify no destructive shell command before execution'" }]\n      }\n    ]\n  }\n}\n\`\`\`\n`
  }

  if (selectedAgent.value === 'gemini') {
    return `# Gemini Antigravity Project Rules (AGENTS.md / .agents/rules/project.md)\n\n${core}\n## 🎨 Multimodal & Visual Verification Guardrails\n- Verify frontend changes across 390px, 768px, and 1440px viewports with >= 12px visible text and zero horizontal overflow.\n- Pair Gemini 4 Carbon / Argon for architecture with Hydrogen via Antigravity Orchestrator for fast execution loops.\n`
  }

  return `# Kimi Code Project Rules (AGENTS.md)\n\n${core}\n## ⚙️ Recommended ~/.kimi-code/config.toml Snippet\n\`\`\`toml\n[runtime]\nmodel = "kimi-k3.1-pro"\npermission_mode = "${sandboxLevel.value === 'strict' ? 'always_ask' : 'auto'}"\n\n[subagents]\nexplore = true\nplan = true\ncoder = true\n\`\`\`\n`
})

async function copyContent() {
  try {
    await navigator.clipboard.writeText(generatedContent.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch (err) {
    alert('Failed to copy. Please manually select and copy.')
  }
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
  padding: 6px 12px;
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
  align-items: center;
  gap: 8px;
  font-size: 13px;
  cursor: pointer;
  color: var(--vp-c-text-2);
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
.btn-copy {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-copy:hover {
  opacity: 0.9;
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
