# Project Engineering Contract (Antigravity / Gemini 4)

## 1. Execution & Verification
- Never claim a UI or API change works without running the real build and verifying rendered output.
- Keep `AGENTS.md` concise (< 150 lines). Put domain-specific procedures in `.agents/skills/<name>/SKILL.md` and path-specific constraints in `.agents/rules/`.
- Before touching files in `/swarm`, each worker owns disjoint directories inside its own Git worktree (`workspace: "share"`).

## 2. Multimodal & Visual Quality Gate
- Every visible text element must render at `>= 12px` computed `font-size`.
- Verify `390px` (mobile), `768px` (tablet), and `1440px` (desktop) with `0` horizontal overflow (`scrollWidth <= clientWidth`).
- Keep raw design/video sources outside `public/`; optimize and resize runtime assets before bundling.

## 3. Model Routing & Budget Guardrail
- Default Orchestrator pairing: plan with `gemini-4-neon` (or `gemini-4-carbon` for architecture/debugging), execute routine edits with `gemini-4-hydrogen`.
- Run `node scripts/check_gemini_quota.mjs` before launching unattended batch media jobs.
- Never hardcode `GEMINI_API_KEY` or commit `.env.local` files; load server-side secrets only via runtime environment variables.
