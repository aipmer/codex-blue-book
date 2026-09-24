export type GeneratorLocale = 'zh' | 'en'

export type StackKey =
  | 'nextjs'
  | 'vue3'
  | 'fastapi'
  | 'django'
  | 'spring'
  | 'expo'
  | 'go'
  | 'rust'
  | 'svelte'
  | 'chrome'

export interface StackConfig {
  name: string
  buildCmd: string
  testCmd: string
  specificRules: string[]
}

export const stackKeys: StackKey[] = [
  'nextjs', 'vue3', 'fastapi', 'django', 'spring',
  'expo', 'go', 'rust', 'svelte', 'chrome'
]

export const stackConfigs: Record<GeneratorLocale, Record<StackKey, StackConfig>> = {
  zh: {
    nextjs: {
      name: 'Next.js (App Router) + TypeScript', buildCmd: 'npm run build', testCmd: 'npm run lint && npm test',
      specificRules: ['所有组件默认优先为 React Server Component，仅在需要客户端交互时添加 "use client"', '样式使用 Tailwind CSS，不得在组件中混入纯内联全局 style', '环境变量严格区分 NEXT_PUBLIC_ 前缀，服务端敏感密钥严禁泄漏至客户端']
    },
    vue3: {
      name: 'Vue 3 + Vite + Pinia', buildCmd: 'npm run build', testCmd: 'npm run lint && vue-tsc --noEmit',
      specificRules: ['一律采用 <script setup lang="ts"> Composition API 编写', '状态管理使用 Pinia，禁止使用遗留 Vuex', '严格处理响应式解构，使用 storeToRefs 避免响应式丢失']
    },
    fastapi: {
      name: 'FastAPI + Pydantic v2', buildCmd: 'python -m compileall .', testCmd: 'pytest -v && ruff check .',
      specificRules: ['全面使用 Pydantic v2 模型进行入参校验与序列化', '异步函数显式标明 async def，数据库会话必须采用 AsyncSession 依赖注入', '所有路由 endpoint 必须附带清晰的 response_model 定义']
    },
    django: {
      name: 'Django + DRF', buildCmd: 'python manage.py check', testCmd: 'python manage.py test && flake8',
      specificRules: ['涉及数据表修改必须自动生成与执行 makemigrations，禁止手写裸 SQL 迁移', '严禁在视图层编写 N+1 查询，显式使用 select_related / prefetch_related']
    },
    spring: {
      name: 'Spring Boot 3 + Java 21', buildCmd: './gradlew build -x test', testCmd: './gradlew check',
      specificRules: ['统一使用构造器注入 (Constructor Injection)，禁止使用 @Autowired 字段注入', '实体类与 DTO 严格解耦，不得将 JPA 实体直接作为 API 返回体']
    },
    expo: {
      name: 'React Native + Expo (SDK 52+)', buildCmd: 'npx expo export --platform web', testCmd: 'npx expo lint && npx --yes expo-doctor',
      specificRules: ['严禁直接引用未经 Expo 兼容验证的底层 iOS/Android 裸原生模块', '优先使用 NativeWind (Tailwind) 进行多端自适应排版', '安全区域必须包裹 SafeAreaProvider 与 SafeAreaView']
    },
    go: {
      name: 'Go 1.22+ (Gin / Fiber)', buildCmd: 'go build -v ./...', testCmd: 'go test -v ./... && golangci-lint run',
      specificRules: ['错误处理遵循 if err != nil 显式包装，严禁直接忽略 error 返回值', 'Context 必须作为第一个参数透传，禁止跨 Goroutine 共享未同步状态']
    },
    rust: {
      name: 'Rust (Axum + Tokio)', buildCmd: 'cargo check', testCmd: 'cargo test && cargo clippy -- -D warnings',
      specificRules: ['严禁滥用 unwrap() 或 expect()，生产链路使用 Result 与 thiserror 向上抛出', '严格遵循所有权与生命周期机制，避免无意义的 clone()']
    },
    svelte: {
      name: 'SvelteKit + Svelte 5', buildCmd: 'npm run build', testCmd: 'npm run check',
      specificRules: ['使用 Svelte 5 Runes ($state, $derived, $effect) 替代旧式响应式声明', 'Server 路由与 Client 组件严格物理隔离']
    },
    chrome: {
      name: 'Chrome Extension (Manifest V3)', buildCmd: 'node scripts/validate.js', testCmd: 'npm test',
      specificRules: ['严格遵循 MV3 CSP：严禁使用 eval() 与任何 HTML 内联脚本', 'Service Worker 具备短暂休眠特性，状态持久化必须写入 chrome.storage.local', '申请权限遵循最小特权原则，默认优先使用 activeTab']
    }
  },
  en: {
    nextjs: {
      name: 'Next.js (App Router) + TypeScript', buildCmd: 'npm run build', testCmd: 'npm run lint && npm test',
      specificRules: ['Components default to React Server Components; only add "use client" when interaction is required', 'Use Tailwind CSS; inline arbitrary style objects are prohibited', 'Strictly separate server envs from client NEXT_PUBLIC_ variables']
    },
    vue3: {
      name: 'Vue 3 + Vite + Pinia', buildCmd: 'npm run build', testCmd: 'npm run lint && vue-tsc --noEmit',
      specificRules: ['Standardize on <script setup lang="ts"> Composition API', 'Use Pinia for global state; legacy Vuex is banned', 'Handle reactive destructuring with storeToRefs to avoid reactivity loss']
    },
    fastapi: {
      name: 'FastAPI + Pydantic v2', buildCmd: 'python -m compileall .', testCmd: 'pytest -v && ruff check .',
      specificRules: ['Use Pydantic v2 for payload validations and serialization', 'Explicitly declare async def endpoints with AsyncSession dependency injection', 'All endpoints must specify an explicit response_model']
    },
    django: {
      name: 'Django + DRF', buildCmd: 'python manage.py check', testCmd: 'python manage.py test && flake8',
      specificRules: ['Schema changes must run via makemigrations; raw SQL migrations are banned', 'Avoid N+1 queries by using select_related / prefetch_related']
    },
    spring: {
      name: 'Spring Boot 3 + Java 21', buildCmd: './gradlew build -x test', testCmd: './gradlew check',
      specificRules: ['Use Constructor Injection; field-level @Autowired is prohibited', 'Strictly decouple entity models from API transfer DTOs']
    },
    expo: {
      name: 'React Native + Expo (SDK 52+)', buildCmd: 'npx expo export --platform web', testCmd: 'npx expo lint && npx --yes expo-doctor',
      specificRules: ['Never reference bare iOS/Android native modules without Expo config plugins', 'Prefer NativeWind (Tailwind) for responsive layouts across mobile screens', 'Wrap all views within SafeAreaProvider and SafeAreaView']
    },
    go: {
      name: 'Go 1.22+ (Gin / Fiber)', buildCmd: 'go build -v ./...', testCmd: 'go test -v ./... && golangci-lint run',
      specificRules: ['Wrap errors with context (if err != nil); never swallow errors silently', 'Context must be passed as the first parameter; avoid un-synchronized Goroutines']
    },
    rust: {
      name: 'Rust (Axum + Tokio)', buildCmd: 'cargo check', testCmd: 'cargo test && cargo clippy -- -D warnings',
      specificRules: ['Banned usage of unwrap() or expect() in production; bubble errors via Result and thiserror', 'Strictly honor ownership and lifetimes without superfluous clone() calls']
    },
    svelte: {
      name: 'SvelteKit + Svelte 5', buildCmd: 'npm run build', testCmd: 'npm run check',
      specificRules: ['Use Svelte 5 Runes ($state, $derived, $effect) instead of legacy reactive declarations', 'Isolate server endpoints and client component logic']
    },
    chrome: {
      name: 'Chrome Extension (Manifest V3)', buildCmd: 'node scripts/validate.js', testCmd: 'npm test',
      specificRules: ['Strict MV3 CSP: eval() and inline <script> tags are banned', 'Service Workers are ephemeral; state must persist in chrome.storage.local', 'Adhere to least privilege; prefer activeTab over broad host permissions']
    }
  }
}

export const sandboxText = {
  zh: {
    standard: '- 标准开发防御：允许在项目内执行依赖安装、测试与代码构建。严禁任何生产部署、外部密钥读写等越权高危行为。',
    strict: '- 严格只读保护：智能体仅具备文件阅读与方案输出权限，禁止私自执行终端命令。所有变更必须由人类在终端显式审查后走 PR 合并。',
    tunnel: '- 本地联调模式：允许打通本地端口访问 Docker 数据库与外部 API，配合飞书助理移动端随时接收告警与审批高危操作。'
  },
  en: {
    standard: '- Standard Development Defense: Package installation, testing, and building are allowed. Production writes and credential leakage are strictly forbidden.',
    strict: '- Strict Read-Only Protection: Agent operates read-only. Terminal commands are forbidden and all changes require human review via Pull Requests.',
    tunnel: '- Local Debugging Mode: Allow port bridging to local Docker databases and APIs, paired with Feishu Assistant for mobile alerts and remote approvals.'
  }
}
