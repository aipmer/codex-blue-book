import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const chapters = fs.readdirSync('chapters').filter(x => /^ch\d\d_.*\.md$/.test(x))
test('built chapters link to their real language counterparts and use clean canonicals', () => {
  assert.ok(chapters.length > 0)
  for (const name of chapters) {
    const stem = name.slice(0, -3)
    for (const [file, other, canonical] of [
      [`chapters/${stem}.html`, `/en/${stem}`, `/chapters/${stem}`],
      [`en/${stem}.html`, `/chapters/${stem}`, `/en/${stem}`]
    ]) {
      const html = fs.readFileSync(path.join('.vitepress/dist', file), 'utf8')
      assert.ok(html.includes(`href="${other}"`), `${file}: language target`)
      assert.ok(html.includes(`rel="canonical" href="https://book.pmer.cn${canonical}"`), `${file}: canonical`)
    }
  }
})
