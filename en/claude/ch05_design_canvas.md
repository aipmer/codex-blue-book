---
title: "Ch.05 Terminal-to-Canvas: /design Artboards & Code Handoff | Claude Blue Book"
description: "Invoke /design from Claude Code to iterate on live HTML/CSS/JS artboards in claude.ai/design with Design Systems, then ship selected layouts into code."
lastUpdated: 2026-11-26
---

[Home](/en/) | [Prev (Ch.04)](./ch04_whiteboards_docs.md) | [Next (Ch.06)](./ch06_legacy_governance.md) | [中文版](/claude/ch05_design_canvas)

# Ch.05 Terminal-to-Canvas: `/design` Prototypes & Direct Code Handoff

> **The Real Problem**: Tuning frontend UI spacing and visual hierarchy purely through CLI text prompts takes ten blind iterations and still produces generic "AI purple gradient" templates.  
> **Tangible Output & Takeaway**: Complete `/design` workflow from Claude Code to `claude.ai/design`, reusable `docs/design-tokens.json` guardrails, and single-day design-to-code handoff specs.  
> **Viral Screenshot Quote**: *"Stop describing padding over a text terminal. Run `/design`, pick the winning live artboard on canvas, and pull real components straight into your repo."*

CLI coding agents excel at backend logic, but text terminals are blind to visual hierarchy. **Claude Design (`claude.ai/design`)** and the built-in **`/design` command** in Claude Code bridge that gap directly. Instead of generating flat mock images, Claude Design renders **live, interactive HTML/CSS/JavaScript artboards** with layers, pages, inline comments, and sliders—then hands the approved option straight back to Claude Code for implementation.

---

## Intuitive Metaphor: Walking Through Live Model Rooms

```text
[Text-Only UI Tweaks] ──> Directing interior renovations over a walkie-talkie with your eyes closed.
[Static Image Mockups] ──> Painting a pretty poster that engineers still have to re-measure and code from scratch.
[/design Artboards] ──> Typing `/design` opens three clickable, live model rooms:
                           inspect breakpoints, leave inline comments, adjust spacing sliders,
                           approve Option B, and let Claude Code wire it into your React/Vue codebase.
```

---

## Beginner Quickstart: 3 Steps to Launch

1. **Step 1: Trigger `/design` inside Claude Code**
   ```text
   /design Redesign the mobile navigation and pricing grid using our neutral palette in src/styles/tokens.css; propose 3 high-density engineering options
   ```
2. **Step 2: Review and refine on the companion canvas**
   Open the generated `claude.ai/design` link, compare artboards, and leave inline comments or tweak sliders until layout and contrast look right.
3. **Step 3: Implement the approved artboard into source files**
   Tell Claude Code: "Implement Artboard B into `src/components/PricingSection.tsx` using existing Tailwind tokens and verify `npm run build`."

---

## 5.1 Locking Brand Taste with Design Systems & Token Files

Team plans support persistent **Design Systems** inside Claude Design. Solo builders can achieve consistent discipline by keeping `docs/design-tokens.json` in the repo and referencing it in `/design`:

```json
{
  "brand": "Acme Engineering Console",
  "palette": {
    "bgCanvas": "#0F172A",
    "bgSurface": "#1E293B",
    "textPrimary": "#F8FAFC",
    "textSecondary": "#94A3B8",
    "accentPrimary": "#2563EB",
    "borderSubtle": "rgba(148, 163, 184, 0.18)"
  },
  "typography": {
    "minBodyPx": 14,
    "minCaptionPx": 12
  },
  "banPatterns": ["No neon purple gradients",
    "No translateY jump on card hover",
    "No visible text smaller than 12px"]
}
```

---

## 5.2 Single-Day Design-to-Code Relay & Multi-Format Exports

Enterprise case studies using this relay compress multi-week mockup-to-production cycles into a single day:

```text
Whiteboards (Ch.04 flows) → /design (3 live artboards) → Inline approval → Claude Code component PR
```

When handing off an approved artboard back to Claude Code, attach strict reuse constraints:
- Map colors and spacing to existing `tailwind.config.ts` tokens instead of hardcoded hex values;
- Reuse existing `src/components/ui/Button.tsx` primitives;
- Verify `390px`, `768px`, and `1440px` viewports with zero horizontal overflow.

Need stakeholder buy-in before coding? Export the same artboard directly to standalone **HTML**, **PPTX**, **Google Slides**, or **Canva** without rebuilding slides manually.

---

## Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Implemented component hardcodes raw hex colors and inline styles** | Handoff prompt omitted existing Tailwind/CSS token mapping | Require mapping to project design tokens and forbid arbitrary inline styles |
| **Desktop looks sharp but 390px mobile overflows** | Artboard review inspected desktop width only | Request a mobile artboard variant and verify 390px / 768px in browser |
| **Redesigning the whole app at once creates tangled components** | `/design` scope was too broad | Scope one section per pass (nav bar, pricing table, settings panel) | ---

[Home](/en/) | [Prev (Ch.04)](./ch04_whiteboards_docs.md) | [Next (Ch.06)](./ch06_legacy_governance.md) | [中文版](/claude/ch05_design_canvas)
