[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.08) ](./ch08_mobile_workflow.md) | [ ➡️ Next (Ch.10) ](./ch10_saas_mvp.md) | [ 🌐 中文版 ](../chapters/ch09_legacy_code.md)

# Ch.09 Baseline and Refactor Legacy Code Incrementally

> **Problem**: Without tests, it is hard to tell whether a change broke legacy behavior.
>
> **Practice**: Map dependencies and test critical paths before refactoring in small commits.

When working on solo projects or inheriting legacy codebases, the biggest source of anxiety is taking over undocumented, test-free "spaghetti code" left behind by previous teams. Any minor code change can detonate hidden mines buried deep in the system.

First map entry points, dependencies, and critical behavior. Repeatable tests protect existing functionality; a large model context does not replace incremental verification.

---

## A Way to Think About It: Changing Tires on a Speeding Truck on the Highway

Refactoring an active legacy system is like this high-wire operation:

```text
[Reckless Full Rewrite] ──> ❌ "This old truck is too beat-up; I'll build a brand-new truck on the shoulder!"
                             (The new build stalls for 6 months, while the business starves to death.)
[Progressive Decoupling] ──> ✅ The old truck continues hauling freight on the highway (zero business interruption):
                             1. Fly a drone under the chassis (AI scans full repository to generate a topology map);
                             2. Mount anti-rollover safety brackets (write behavioral snapshot tests for critical APIs);
                             3. Unscrew one rusty bolt at a time, test-drive it, and only proceed once verified green.
```

Codex acts as a millimeter-precision robotic surgical arm: as long as you wrap it in test guardrails, it excises dead code without nicking healthy tissue.

---

## Practice: Start with Three Steps

When taking over an unfamiliar, messy repository on Day 1, take these 3 safe steps:

1. **Step 1: Ask AI for a Full-Repo Topology Map (Read-Only Exploration)**  
   Run a read-only sandboxed analysis to output a Mermaid dependency graph:
   ```bash
   codex exec --sandbox read-only "Analyze architecture and database models; output Mermaid dependency diagram in docs/topology.md"
   ```
2. **Step 2: Capture a "Behavioral Snapshot" for Target Endpoints (Baseline Recording)**  
   Instruct Codex: *"Do not touch business code in `src/api/`; only write 3 unit tests covering success and failure paths for the existing endpoints."*
3. **Step 3: Single-Point Extraction Guarded by Test Assertions**  
   Issue minimally invasive refactoring specs: *"Extract only one function at a time, running `npm test` automatically after each modification. All tests must stay 100% green."*

---

## 9.1 Step 1: Panoramic Reverse Engineering - Generating Codebase Topology

The primary duty when taking over a chaotic project is **drawing the map**. Leverage GPT-5.6 Terra's long-context scanning to directly reverse-engineer Mermaid Entity-Relationship Diagrams (ERD) and route topologies:

```markdown
# 🎯 Goal
Analyze the database configuration and routing layer of the current project, generating a Mermaid ERD illustrating core table structures and foreign key relationships.

# 🛑 Constraints
- Only analyze prisma/schema.prisma or src/db/models/.
- Exclude temporary cache tables and third-party integration logs.

# 🧪 Validation Specs
- Output a syntactically valid Mermaid diagram in docs/database_topology.md.
```

Within seconds, Codex unpacks complex many-to-many relationships and foreign key cascades, far outstripping manual code audits.

---

## 9.2 Step 2: Safety Guardrails - Writing Behavioral Baseline Tests

The absolute golden rule of legacy code refactoring is: **Before performing surgery, hook up the vital-signs monitor (baseline tests).**

```markdown
# 🎯 Goal
Write baseline unit tests for src/pages/api/checkout.ts, capturing real request inputs and response snapshots.

# 🛑 Constraints
- Strictly forbid altering any logic inside src/pages/api/checkout.ts itself.
- Use local Jest / Vitest to execute the test suite.

# 🧪 Validation Specs
- Cover three core branches: successful checkout, out-of-stock error, and unauthenticated access rejection.
- Ensure baseline tests pass 100% against the current legacy code.
```

---

## 9.3 Step 3: Minimally Invasive Surgery - Implementing Progressive Decoupling

### 1. Decoupling Fat Controllers

Gradually extract discount calculations, authentication, and inventory updates out of multi-hundred-line controller files into pure functions:

```markdown
# 🎯 Goal
Extract "discount calculation logic" from src/pages/api/checkout.ts into a standalone service src/services/discountService.ts.

# 🛑 Constraints
- External API Request / Response JSON schemas must maintain strict backward compatibility.
- Strictly avoid impacting other core logic branches inside checkout.ts.

# 🧪 Validation Specs
- Run npm run test to ensure the previously written checkout snapshot tests pass 100% green.
- Run npm run lint with zero type or syntax errors.
```

### 2. Local Validation and Safe Rollback

Ask Codex to run checks after each small edit. If a test fails, inspect the diff and confirm that there are no human changes to keep before restoring the file:

```bash
git diff -- src/pages/api/checkout.ts
git restore -- src/pages/api/checkout.ts
```

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Common Pitfall | Root Cause | Rapid Diagnosis & Fix Guide |
| :--- | :--- | :--- |
| **Commanding AI to "refactor the entire project" causing total system collapse** | Scope is too broad; AI suffers hallucinations and broken typings across large edits | Strictly constrain refactoring granularity; each prompt must touch only 1 specific service or function |
| **Legacy functionality mysteriously lost or broken after refactoring** | Missing pre-refactoring behavioral baseline snapshot tests | Enforce "test-first": require AI to write 100% passing baseline tests against old code before modifying logic |
| **AI arbitrarily upgrades underlying framework packages in package.json** | package.json was not locked down in constraints | Add hard rule to AGENTS.md & Constraints: *"Strictly forbid modifying any dependency versions in package.json"* |

---

[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.08) ](./ch08_mobile_workflow.md) | [ ➡️ Next (Ch.10) ](./ch10_saas_mvp.md) | [ 🌐 中文版 ](../chapters/ch09_legacy_code.md)
