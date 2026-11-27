<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import DefaultTheme, { useSidebar } from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { hasSidebar } = useSidebar()
const { lang } = useData()

const STORAGE_KEY = 'book-sidebar-collapsed'
const collapsed = ref(false)

const isEnglish = computed(() => lang.value.startsWith('en'))
const toggleLabel = computed(() => {
  if (collapsed.value) {
    return isEnglish.value ? 'Expand sidebar' : '展开目录'
  }
  return isEnglish.value ? 'Collapse sidebar' : '收起目录'
})

function syncHtmlClass() {
  if (typeof document === 'undefined') return
  const active = hasSidebar.value && collapsed.value
  document.documentElement.classList.toggle('sidebar-collapsed', active)
}

function toggleSidebar() {
  collapsed.value = !collapsed.value
  try {
    localStorage.setItem(STORAGE_KEY, collapsed.value ? '1' : '0')
  } catch {
    // ignore storage errors in restricted contexts
  }
  syncHtmlClass()
}

onMounted(() => {
  try {
    collapsed.value = localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    collapsed.value = false
  }
  syncHtmlClass()
})

watch([hasSidebar, collapsed], syncHtmlClass)

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('sidebar-collapsed')
  }
})
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <button
        v-if="hasSidebar"
        type="button"
        class="sidebar-fold-btn"
        :class="{ 'is-collapsed': collapsed }"
        :aria-expanded="!collapsed"
        :aria-label="toggleLabel"
        :title="toggleLabel"
        @click="toggleSidebar"
      >
        <svg
          v-if="!collapsed"
          class="sidebar-fold-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M11 6h10" />
          <path d="M11 12h10" />
          <path d="M11 18h10" />
          <path d="M7 9l-3 3 3 3" />
        </svg>
        <svg
          v-else
          class="sidebar-fold-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h10" />
          <path d="M3 12h10" />
          <path d="M3 18h10" />
          <path d="M17 9l3 3-3 3" />
        </svg>
      </button>
    </template>
  </Layout>
</template>
