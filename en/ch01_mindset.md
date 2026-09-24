[ 🏠 Index ](/en/) | [ ➡️ Next (Ch.02) ](./ch02_setup.md) | [ 🌐 中文版 ](../chapters/ch01_mindset.md)

# Ch.01 From Code Generation to Verified Results

> **Problem**: Treating AI as autocomplete or accepting edits without review can miss requirements and regressions.
>
> **Practice**: Write one development task with a goal, boundaries, and verifiable acceptance checks.

When chatting with readers of "实战产品说" (Real-World Product Talk), I often notice a common pitfall: developers pushing themselves to memorize AI coding commands and shortcuts as if they were cramming for an API manual.

Coding agents such as Codex can help draft boilerplate, tests, and documentation. Developers still own requirements, key design decisions, and verification. A clear goal, edit scope, and acceptance checks matter more than memorizing prompts.

This chapter turns a product need into a development task that can be executed and checked.

---

## A Way to Think About It: Stop Being a Bricklayer, Become the Chief Architect

If you are new to AI-native development, do not view AI as a cold code generator:

```text
【Traditional Handwritten Code】 ──> You act as a manual bricklayer, stacking bricks one by one. If one corner is misaligned, the whole building collapses.
【Traditional AI Completion】    ──> You lay bricks while AI hands you mortar (you type a line, it guesses half; your hands never rest).
【Codex Orchestration Era】     ──> You are the "Chief Construction Architect", and Codex is your "elite engineering crew":
                                    - You sketch blueprints (Define the Goal);
                                    - You erect safety fences (Enforce Sandboxes & Constraints);
                                    - You inspect structural safety with laser levels (Automated Validation);
                                    - The crew (Codex) calculates structural mechanics, procures concrete, and builds the walls.
```

When your focus changes from "how do I type this loop" to "how do I dispatch a foolproof work order to my crew", you have officially stepped into AI-native engineering.

---

## 1.1 The Evolution of AI Coding: Where Are We?

```text
+-------------------------------------------------------------+
| Stage 1: Assisted Completion (Copilot)                      |
| - Experience: Input suggestions. You type, it guesses.       |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
| Stage 2: Terminal Dialog & Execution (Claude Code / Cursor) |
| - Experience: Outsourced developer. You prompt, it edits.    |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
| Stage 3: Autonomous Multi-Surface Agent (OpenAI Codex)      |
| - Experience: Digital full-stack team. Sandbox testing,     |
|   multi-surface (IDE/CLI/Mobile/Desktop) orchestration.      |
+-------------------------------------------------------------+
```

Codex has pushed us into Stage 3:
*   **Multi-Surface Productivity Matrix**: Automated execution via CLI, complex reviews and Sites in-place preview on ChatGPT Desktop (Code Mode), 24/7 mobile monitoring with Guardian approvals, and visual browser audits via Desktop Computer Use.
*   **Frontier Reasoning & Agentic Core**: From **GPT-6 Astra** for the hardest cross-tool work to **GPT-6 Sol** for everyday complex coding and **GPT-6 Luna** for focused tasks, agents now possess long-horizon reasoning, cross-application autonomy, and visual self-healing, moving far beyond mere boilerplate generation.

---

## 1.2 The Core Shift: From Process Control to Boundary Control

As a Product Manager (PM), you know that when writing a PRD, you don't instruct developers on "how to structure their loops." You define acceptance criteria and boundary constraints.

With Codex, the same rule applies. Stop micromanaging how AI writes logic. As an orchestrator, focus on three things:
1.  **Define the End State (Goal)**: What problem are we solving for users?
2.  **Establish Guardrails (Constraints)**: Which modules are off-limits? How are secrets isolated?
3.  **Automate Validation (Validation)**: Write test suites so Codex can prove its work is correct.

> [!IMPORTANT]
> **Orchestrator Formula**  
> `Successful Delivery = Clear Goal + Strict Constraints + Automated Testing`

---

## Practice: Start with Three Steps

For first-time users, avoid dumping thousands of words of vague thoughts. Follow this 3-step loop:

1. **Step 1: Draft a 50-Word Requirement Card**  
   Clarify 3 elements: Target page/feature (Goal), existing framework/libraries (Constraints), validation command (Validation).
2. **Step 2: Restrict Codex in a Safe Sandbox**  
   Execute in the terminal with workspace write permission: `codex exec --sandbox workspace-write`.
3. **Step 3: Require the Agent to Prove Verification**  
   Instruct Codex: "Run `npm run build` after editing and ensure exit code 0 before completing".

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| **Treating AI as a search engine for theory** | Hours of conversation without a single line of working code | Stop chatting; dispatch a concrete spec: "Create a login card in `src/` and pass tests" |
| **Pasting 10,000 lines of unrelated code** | Context bloated with noise, causing hallucinations | Point out 1-2 specific files to keep agent edits surgically targeted |
| **Trusting AI claims without running tests** | AI assumed it fixed the bug, but runtime crashes | Add mandatory validation specs: "Must run `npm test` in sandbox and print green pass report" |

---

## 1.3 Your New Moat: Orchestration and Domain Insight

When code is commoditized, what is your moat?

As shared on [pmer.cn](https://pmer.cn): **Your value lies in defining business boundaries and empathizing with user pain points.** You no longer need to spend three days tweaking CSS flexbox centering or wrestling with Webpack errors. Your core job is to structure architecture with Codex, deploy fast, and let the market validate your commercial MVP.

---

[ 🏠 Index ](/en/) | [ ➡️ Next (Ch.02) ](./ch02_setup.md) | [ 🌐 中文版 ](../chapters/ch01_mindset.md)
