#!/usr/bin/env node
/**
 * Post-build GEO & SEO Verification Gate for book.pmer.cn
 * Verifies:
 * 1. sitemap.xml, robots.txt, llms.txt, llms-codex.txt, llms-full.txt exist and are non-empty.
 * 2. Every compiled HTML page (excluding 404.html) has:
 *    - exactly one self-consistent canonical link
 *    - zh-CN, en-US, and x-default hreflang links
 *    - non-empty meta description (and unique across chapters)
 *    - valid JSON-LD script block
 */

import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const DIST = path.join(ROOT, '.vitepress', 'dist')

let passed = 0
let failed = 0
const failures = []

function check(ok, label, detail = '') {
  if (ok) {
    passed++
    console.log(`  ✓ [PASS] ${label}`)
  } else {
    failed++
    const msg = `${label}${detail ? ': ' + detail : ''}`
    failures.push(msg)
    console.error(`  ✗ [FAIL] ${msg}`)
  }
}

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkHtml(full, out)
    } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== '404.html') {
      out.push(full)
    }
  }
  return out
}

console.log('=== GEO & SEO Build Verification Gate ===')

for (const asset of ['sitemap.xml', 'robots.txt', 'llms.txt', 'llms-codex.txt', 'llms-claude.txt', 'llms-gemini.txt', 'llms-kimi.txt', 'llms-full.txt']) {
  const full = path.join(DIST, asset)
  const exists = fs.existsSync(full)
  const size = exists ? fs.statSync(full).size : 0
  check(exists && size > 100, `Dist asset present & non-empty: ${asset} (${size} bytes)`)
}

const robots = fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8')
check(robots.includes('Sitemap: https://book.pmer.cn/sitemap.xml'), 'robots.txt references canonical sitemap.xml')
check(robots.includes('OAI-SearchBot') && robots.includes('Claude-SearchBot') && robots.includes('PerplexityBot'), 'robots.txt explicitly allows AI search crawlers')

const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8')
for (const url of [
  'https://book.pmer.cn/',
  'https://book.pmer.cn/en/',
  'https://book.pmer.cn/compare',
  'https://book.pmer.cn/en/compare',
  'https://book.pmer.cn/codex/',
  'https://book.pmer.cn/claude/',
  'https://book.pmer.cn/claude/ch01_programmable_platform',
  'https://book.pmer.cn/claude/ch10_frontier_cowork_critique',
  'https://book.pmer.cn/en/claude/ch01_programmable_platform',
  'https://book.pmer.cn/en/claude/ch10_frontier_cowork_critique',
  'https://book.pmer.cn/gemini/',
  'https://book.pmer.cn/gemini/ch01_antigravity_gemini4',
  'https://book.pmer.cn/gemini/ch10_frontier_quota_spatial',
  'https://book.pmer.cn/en/gemini/ch01_antigravity_gemini4',
  'https://book.pmer.cn/en/gemini/ch10_frontier_quota_spatial',
  'https://book.pmer.cn/kimi/',
  'https://book.pmer.cn/kimi/ch01_k31_architecture_cli',
  'https://book.pmer.cn/kimi/ch10_four_agent_hybrid_frontier',
  'https://book.pmer.cn/en/kimi/ch01_k31_architecture_cli',
  'https://book.pmer.cn/en/kimi/ch10_four_agent_hybrid_frontier',
  'https://book.pmer.cn/chapters/ch01_mindset',
  'https://book.pmer.cn/chapters/ch13_2026_frontier'
]) {
  check(sitemap.includes(`<loc>${url}</loc>`), `sitemap.xml contains ${url}`)
}

const htmlFiles = walkHtml(DIST)
check(htmlFiles.length >= 98, `Compiled HTML page count >= 98 (actual: ${htmlFiles.length})`)

const descriptions = new Map()
for (const file of htmlFiles) {
  const rel = path.relative(DIST, file)
  const html = fs.readFileSync(file, 'utf8')

  const canonicalMatches = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)]
  check(canonicalMatches.length === 1 && canonicalMatches[0][1].startsWith('https://book.pmer.cn/'), `Canonical valid in ${rel}`)

  const hasZh = /rel="alternate"[^>]+hreflang="zh-CN"/.test(html)
  const hasEn = /rel="alternate"[^>]+hreflang="en-US"/.test(html)
  const hasDefault = /rel="alternate"[^>]+hreflang="x-default"/.test(html)
  check(hasZh && hasEn && hasDefault, `Hreflang trio present in ${rel}`)

  const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/)
  const desc = descMatch ? descMatch[1].trim() : ''
  check(desc.length >= 30, `Non-empty description in ${rel} (${desc.length} chars)`)
  if (desc) {
    if (!descriptions.has(desc)) descriptions.set(desc, [])
    descriptions.get(desc).push(rel)
  }

  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  let validJsonLd = false
  if (ldMatch) {
    try {
      const parsed = JSON.parse(ldMatch[1])
      validJsonLd = parsed['@context'] === 'https://schema.org'
    } catch {
      validJsonLd = false
    }
  }
  check(validJsonLd, `Valid schema.org JSON-LD in ${rel}`)

  if (rel.startsWith('claude/') || rel.startsWith('en/claude/')) {
    check(
      html.includes('content="https://book.pmer.cn/social/claude-en-20261126.jpg"'),
      `Claude OG image present in ${rel}`
    )
  }
  if (rel.startsWith('gemini/') || rel.startsWith('en/gemini/')) {
    check(
      html.includes('content="https://book.pmer.cn/social/gemini-en-20261126.jpg"'),
      `Gemini OG image present in ${rel}`
    )
  }
  if (rel.startsWith('kimi/') || rel.startsWith('en/kimi/')) {
    check(
      html.includes('content="https://book.pmer.cn/social/kimi-en-20261126.jpg"'),
      `Kimi OG image present in ${rel}`
    )
  }
}

const dupDescs = [...descriptions.entries()].filter(([, pages]) => pages.length > 1)
check(
  dupDescs.length === 0,
  'Zero duplicate meta descriptions across all pages',
  dupDescs.map(([d, pages]) => `${pages.join(', ')} -> "${d.slice(0, 40)}..."`).join('; ')
)

console.log(`\nSummary: ${passed} passed, ${failed} failed.`)
if (failed > 0) {
  process.exit(1)
}
