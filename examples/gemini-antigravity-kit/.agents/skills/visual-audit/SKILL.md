---
name: visual-audit
description: Run a deterministic 3-viewport browser audit (390px, 768px, 1440px) checking horizontal overflow, minimum computed font size (>= 12px), and broken images before marking a frontend task done.
---

# Visual Audit Procedure

Use this skill whenever a task modifies layout CSS, responsive grids, navigation, or embedded images.

## Steps

1. Start the local preview server on a dedicated port (e.g., `127.0.0.1:4173`) and confirm it responds with HTTP 200.
2. Open the target route in the browser subagent or local browser automation harness.
3. Evaluate each of the three viewports (`390x844`, `768x1024`, `1440x900`):
   - `document.documentElement.scrollWidth - document.documentElement.clientWidth === 0`
   - Minimum visible text `getComputedStyle(el).fontSize >= 12`
   - Every visible `<img>` has `img.complete && img.naturalWidth > 0`
4. Fix the shared layout root cause if any viewport fails—do not insert manual `<br>` line breaks or hide overflow on `body` to mask clipped content.
5. Re-run the three-viewport check and report exact measurements per route.
