import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

// Chapters use different directories in the two locales; VitePress's default
// prefix substitution would link to paths that do not exist.
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
      if (key === 'en' && /^chapters\/ch\d+_/.test(source)) link = `/en/${source.slice('chapters/'.length)}`
      else if (key === 'root' && /^en\/ch\d+_/.test(source)) link = `/chapters/${source.slice('en/'.length)}`
      else if (source !== 'index' && source !== 'en/index') link = value.link || (key === 'root' ? '/' : `/${key}/`)
    }
    return { text: value.label, link: link + (route.path.includes('#') ? route.path.slice(route.path.indexOf('#')) : '') }
  }))
  return { currentLang, localeLinks }
}
