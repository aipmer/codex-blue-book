import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

// Chapters and series pages map cleanly between root (zh-CN) and /en/ (en-US).
export function useLangs({ correspondingLink = false } = {}) {
  const { site, localeIndex, page, theme } = useData()
  const route = useRoute()
  const currentLang = computed(() => {
    const current = site.value.locales[localeIndex.value]
    return { label: current?.label, link: current?.link || (localeIndex.value === 'root' ? '/' : `/${localeIndex.value}/`) }
  })
  const localeLinks = computed(() => Object.entries(site.value.locales).flatMap(([key, value]) => {
    if (currentLang.value.label === value.label) return []
    let link = value.link || (key === 'root' ? '/' : `/${key}/`)
    if (correspondingLink && theme.value.i18nRouting !== false) {
      const source = page.value.relativePath.replace(/\.md$/, '')
      const clean = source.replace(/(^|\/)index$/, '$1')
      if (key === 'en') {
        if (/^chapters\/ch\d+_/.test(source)) link = `/en/${source.slice('chapters/'.length)}`
        else if (source === 'index') link = '/en/'
        else link = `/en/${clean}`
      } else if (key === 'root') {
        if (/^en\/ch\d+_/.test(source)) link = `/chapters/${source.slice('en/'.length)}`
        else if (source === 'en/index') link = '/'
        else if (source.startsWith('en/')) link = `/${clean.slice('en/'.length)}`
      }
    }
    return { text: value.label, link: link + (route.path.includes('#') ? route.path.slice(route.path.indexOf('#')) : '') }
  }))
  return { currentLang, localeLinks }
}
