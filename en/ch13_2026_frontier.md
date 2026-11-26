---
title: "Ch.13 2026 Codex Battle Map: GPT-6.2, Terra & CLI 0.172 Migration | Codex Blue Book"
description: "Verified November 26, 2026: GPT-6.2 Astra/Sol and GPT-6.1 Terra pricing, Codex CLI 0.172.0 upgrades, Nov 30 & Dec 23 retirements, and 3D workflow."
lastUpdated: 2026-11-26
---

[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.12) ](./ch12_commercialization.md) | [ 🌐 中文版 ](../chapters/ch13_2026_frontier.md)

# Ch.13 Frontier Watch: The 2026 Codex Ecosystem Overhaul

> 🎯 **The Real Problem**: Rapid changes to client entry points, CLI commands, GPT-6.2 / GPT-6.1 Terra rollouts, and upcoming model/endpoint retirements quickly invalidate older guides.
> 💡 **Tangible Output & Takeaway**: November 2026 migration checklist (CLI 0.172.0 checks, lazy MCP startup, per-tool approvals, and Nov 30 / Dec 23 deprecation scans).
> ⚡ **Viral Screenshot Quote**: *"Tools retool every quarter, but mental models remain your moat. Zero fluff—only an actionable battle map of what deprecated and what to adopt."*

The first twelve chapters built a version-independent orchestration methodology. To execute it safely, you still need current version facts. This edition is verified through **November 26, 2026**, covering the GPT-6.2 Astra/Sol and GPT-6.1 Terra releases, Codex CLI `0.172.0`, and urgent retirement cutoffs.

---

## 🎯 Intuitive Metaphor: Avionics Retrofit of a Supersonic Airliner

Do not panic over frequent tool upgrades. View this transition through the eyes of a pilot:

```Plaintext
[Pilot Mindset]   ──> Your flight manual remains identical: goal-driven execution (takeoff & landing targets)
                      and strict boundary constraints (flight corridors & safe altitudes).
[Engines]         ──> Propulsion upgraded to the latest generation:
                      - Frontier Flagship Core: "GPT-6.2 Astra" (deep architecture & complex verification);
                      - Daily Primary Thrust Engine: "GPT-6.2 Sol" (complex coding);
                      - Visual Reasoning Engine: "GPT-6.1 Terra" (UI audits & computer use);
                      - Auxiliary Cruise Engine: "GPT-6 Luna" (focused, frequent work).
[Cockpit Screen]  ──> Thread-link jumps, slash-command Tab completion, lazy MCP startup, and tool-level reviewers.
                      Check feature access in your installed client and workspace.
[Autopilot]       ──> The old --full-auto compatibility path is deprecated; new calls specify sandbox and approval modes.
```

With your mental model intact, upgraded avionics help you ship faster and steadier.

---

## 🚀 Beginner Quickstart (3 Easy Steps)

Complete your November 2026 toolchain health check in 3 steps:

1. **Step 1: Scan for Deprecated and Retiring Legacy Model Codenames**  
   Run a grep scan in your project root (including `gpt-5.6`, retiring from Codex on December 23, 2026):
   ```bash
   grep -rnE "gpt-5\.[3456]" ~/.codex/config.toml .
   ```
2. **Step 2: Check the Installed CLI and Update to 0.172.0+ If Needed**
   Check the installed version first; run the global npm update when ready:
   ```bash
   codex --version
   npm install -g @openai/codex@latest
   codex --version
   ```
3. **Step 3: Migrate Deprecated `--full-auto` Calls**
   In all shell aliases and CI scripts, replace `--full-auto` with:
   ```bash
   codex exec --sandbox workspace-write "Review the current changes and report issues"
   ```

---

## 13.1 Desktop and Mobile: Changes That Affect Daily Work

Use the Codex entry in your current desktop client and verify account and workspace access separately. Do not assume a single client release unlocks every feature for every plan tier.

- **Worktrees and steering**: App 26.928 onward improves terminal startup in attached worktrees and preserves prior answers during steering, with subsequent improvements to batch chat moves, review navigation, and Windows/WSL recovery. [Official changelog](https://learn.chatgpt.com/docs/changelog)
- **Composer predictions**: Beta suggestions appear in eligible local and SSH threads; `Tab` accepts an editable draft while sending remains a separate action (Personal Pro, 18+, supported regions; toggle under Settings → General → Composer). [Predictions](https://learn.chatgpt.com/docs/features/composer-predictions)
- **Mobile handoff**: Recent iOS releases improve approval presentation, plugin access from the plus menu, and queued-task recovery. Confirm the target host and repository before approving. [Mobile changelog](https://learn.chatgpt.com/docs/changelog)

```bash
# Check the repository before attaching or handing off a thread.
git status --short
git worktree list
codex --version
```

Check supported sign-in methods and feature access per client; API keys and ChatGPT subscriptions carry separate access and billing rules. [Codex models](https://learn.chatgpt.com/docs/models)

---

## 13.2 GPT-6.2 & GPT-6.1 Terra: Model Selection (November 2026)

As of **November 26, 2026**, **GPT-6.2 Sol** and **GPT-6.2 Astra** (launched mid-November) are live across Codex, ChatGPT Work, and the API, joined by **GPT-6.1 Terra** (launched late October) for cost-efficient visual reasoning and computer use. Start daily complex coding with `gpt-6.2-sol` (or `gpt-6.1-sol` during migration), escalate hardest architecture work to `gpt-6.2-astra`, run visual UI audits with `gpt-6.1-terra`, and route focused edits to `gpt-6-luna`. [Codex models](https://learn.chatgpt.com/docs/models)

| Model ID | Best fit | `reasoning.effort` | Boundary |
| :--- | :--- | :--- | :--- |
| `gpt-6.2-astra` | Hardest cross-codebase architecture, implementation, and verification | `low`, `medium`, `high`, `xhigh`, `max` | 1.05M context (922K max input / 128K output); API rejects `none` |
| `gpt-6.2-sol` | Everyday complex coding and multi-step agent workflows | `low`, `medium`, `high`, `xhigh`, `max` | Current example default; same standard price as `gpt-6.1-sol` |
| `gpt-6.1-terra` | Visual reasoning, UI screen audits, and Computer Use | `low`, `medium`, `high`, `xhigh`, `max` | Late-October 2026 release; half the standard price of Sol |
| `gpt-6.1-sol` | Previous Sol baseline (retained for migration comparison) | `low`, `medium`, `high`, `xhigh`, `max` | Use Responses API for tool calling |
| `gpt-6-luna` | Focused edits, extraction, summaries, and high-volume tasks | `none`, `low`, `medium`, `high`, `xhigh`, `max` | Escalate to Sol or Astra when complexity exceeds scope |

Prefer the **Responses API** for tool calling; the bundled `openai-docs` skill has been updated with GPT-6.2 endpoint migration guidance. In the Codex UI, Max/Ultra efforts depend on account settings—Ultra coordinates subagents and is not an API `reasoning.effort` value. [API model catalog](https://developers.openai.com/api/docs/models) · [GPT-6 migration guidance](https://developers.openai.com/api/docs/guides/latest-model)

**Keep API prices separate from Codex subscription usage.** The table below lists standard text-token API prices per million tokens checked on November 26, 2026. Long-context tiers (>272K), Batch (50% off), Fast (2×), and cache writes follow the [official pricing page](https://developers.openai.com/api/docs/pricing).

| API model | Input | Cached input | Output | Notes |
| :--- | ---: | ---: | ---: | :--- |
| `gpt-6.2-astra` | $8.00 | $0.40 | $40.00 | Reduced from initial `gpt-6-astra` ($10/$1/$50); 95% cache read discount |
| `gpt-6.2-sol` | $2.00 | $0.10 | $10.00 | Ultrafast promo 3× through Feb 28, 2027 (6× from Mar 1, 2027) |
| `gpt-6.1-terra` | $1.00 | $0.05 | $5.00 | Cost-efficient vision and computer-use tier |
| `gpt-6.1-sol` | $2.00 | $0.10 | $10.00 | Retained for comparison; cache write $2.50/MTok standard |
| `gpt-6-luna` | $0.10 | $0.01 | $0.50 | Fast routing and structured extraction |

**Speed is a separate control.** Ultrafast mode for Sol is available on eligible Pro/Enterprise/Edu plans with separate subscription vs. pay-as-you-go multipliers and US/EEA+Switzerland residency options. Benchmark on Standard first before turning Ultrafast on. [Speed and billing](https://learn.chatgpt.com/docs/agent-configuration/speed)

**Choose a model:**

```bash
codex --version
codex --model gpt-6.2-sol
codex exec -m gpt-6-luna "Review the current changes"
```

Use `/model` inside an interactive session. API access does not guarantee Codex sign-in availability.

**Local default configuration:**

```toml
# ~/.codex/config.toml
model = "gpt-6.2-sol"
```

This sets the local default model only. `--approve-for-me` is an independent permission mode.

### Verified lifecycle & retirement dates (2026–2027)

| Date | Scope | Official record & migration path |
| :--- | :--- | :--- |
| March 26, 2026 | API | `gpt-4-0314`, `gpt-4-1106-preview`, `gpt-4-0125-preview` shut down |
| May 12, 2026 | API | `dall-e-2` and `dall-e-3` shut down |
| August 26, 2026 | API | Assistants API shut down; migrate to Responses and Conversations APIs |
| August 31, 2026 | Codex sign-in | `gpt-5.4` and `gpt-5.4-mini` retired |
| October 14, 2026 | Codex sign-in | GPT-5.5 retired from ChatGPT sign-in (API-key sessions unaffected) |
| October 23, 2026 | API | Legacy `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, and early `o1` snapshots retired |
| Late October 2026 | API / Codex / Work | **GPT-6.1 Terra** released (visual reasoning & computer use) |
| Mid-November 2026 | API / Codex / Work | **GPT-6.2 Astra & GPT-6.2 Sol** released |
| **November 30, 2026** | **API / Platform** | **`/v1/prompts` and Agent Builder deprecated; Evals Dashboard & API read-only** (move prompts into code, evals to Promptfoo, agents to Agents SDK) |
| **December 23, 2026** | **ChatGPT Work / Codex** | **GPT-5.6 Sol and GPT-5.6 Terra retired**; migrate to `gpt-6.2-sol` / `gpt-6.1-terra` |
| April 1, 2027 | API | `gpt-5.3-codex`, `gpt-5.4-nano`, and `gpt-5.1` shut down; migrate to `gpt-6-sol` / `gpt-6-luna` |

Check [API deprecations](https://developers.openai.com/api/docs/deprecations) and the [Codex changelog](https://learn.chatgpt.com/docs/changelog) to separate interface retirements from API shutdowns.

---

## 13.3 Codex CLI: 0.172.0 at This Edition's Cutoff

The official changelog lists **CLI `0.172.0`** at this edition's **November 26, 2026** cutoff. This is a dated verification; check your local install separately. [Changelog](https://learn.chatgpt.com/docs/changelog)

**Key upgrades from `0.163.0` to `0.172.0`:**
- **Thread-link navigation**: Follow thread links directly from search results and transcripts to open saved sessions and nested subagents.
- **Faster terminal controls**: Press `Tab` to auto-complete slash-command arguments (e.g., `/mcp lo` → `/mcp login`) and `Shift+Up` / `Shift+Down` to jump between task groups (alongside `/config`, `/keymap`, `/daemon`).
- **Lazy stdio MCP startup**: Optional stdio MCP servers with cached tool lists now start on first tool call instead of slowing every CLI launch.
- **Per-tool approval reviewers & Bedrock**: Configure approval reviewers per connected app tool in `config.toml`; App-server clients now support **Amazon Bedrock Runtime**.
- **Session & cross-OS fixes**: `codex exec resume` restores saved sandbox permissions and working directories unless overridden; cross-OS remote paths and API spend-limit errors now propagate reliably.

```bash
codex --version
npm install -g @openai/codex@latest
codex --version
```

### 1. Migrate older `--full-auto` calls

`codex exec --full-auto` is a **deprecated compatibility path** that prints a warning. For new non-interactive runs, specify the sandbox explicitly:

```bash
codex exec --sandbox workspace-write "Review the current changes and report issues"
```

The sandbox restricts workspace access; `--approve-for-me` routes eligible escalation requests to automatic review. [Approval and security docs](https://learn.chatgpt.com/docs/agent-approvals-security)

### 2. Use the supported Hooks event structure

Hooks in `config.toml` use event arrays and handler arrays (`[hooks] stop = "..."` is invalid). Review and trust the hook source via `/hooks` when first enabled. [Hooks docs](https://learn.chatgpt.com/docs/hooks)

```toml
# ~/.codex/config.toml
[[hooks.Stop]]

[[hooks.Stop.hooks]]
type = "command"
command = "git diff --check"
```

### 3. Install plugins by catalog ID

```bash
codex plugin list
codex plugin add --help
```

`codex plugin add` accepts the `PLUGIN@MARKETPLACE` ID shown by the catalog (`codex plugin install` is not a current subcommand). [Codex changelog](https://learn.chatgpt.com/docs/changelog)

### 4. Automatic approval does not have a documented fixed model

`--approve-for-me` routes eligible approval requests to automatic review. It does not expand sandbox permissions or guarantee approval of risky commands. [Permissions docs](https://learn.chatgpt.com/docs/permission-modes)

```bash
codex --approve-for-me "Review the current changes and suggest fixes"
```

---

## 13.4 The Skills Economy: Compounding Repeated Workflows into Assets

If `AGENTS.md` sets project-wide guardrails, **Skills package repeatable task procedures**:

```text
skills/
└── pr-review/
    └── SKILL.md      # A procedural manual with YAML frontmatter
```

---

## 13.5 Codex Security: Use Verified Capabilities

Codex Security is a separate security review capability. Check the **Codex Security** entry and instructions in your client's plugin directory before running scans. [Codex Security docs](https://learn.chatgpt.com/docs/security)

```bash
codex plugin list
```

---

## 13.6 A 3D Workflow Example: GPT-6.2 Astra, Tripo3D, and Blender

Developers can chain separate tools themselves: use Astra to structure asset requirements, a 3D service such as Tripo3D to generate a GLB, and a headless Blender `bpy` script to render validation frames. **This example does not imply an official OpenAI integration with any third party.** [Official GPT-6 guide](https://developers.openai.com/api/docs/guides/latest-model)

### 1. Workflow boundaries

The model structures requirements and writes scripts; the 3D service generates meshes; Blender imports and renders them. A developer reviews geometry, materials, and performance before shipping.

```text
Concept and scale → GPT-6.2 Astra structures prompt → Tripo3D generates GLB
                                               ↓
                             Blender bpy render and review → Three.js display
```

### 2. Four-step walkthrough

#### Step 1: Structure 3D Prompts via GPT-6 Astra
Instruct Astra in your terminal or desktop prompt:

```text
Act as a Lead 3D Technical Artist. I want to build a "Cyberpunk Holographic Vending Machine" for a Web 3D product showcase.
Generate an engine-optimized, structured 3D prompt for Tripo3D.

Requirements:
1. Emphasize silhouette and geometric symmetry;
2. Enforce mesh topology tags (Clean quad topology, game-ready, low-poly);
3. Define PBR material specifications (Matte painted metal, glowing neon emissive panels).
```

For example, the model can draft the following prompt for a 3D service; inspect the actual generated result:

```text
Cyberpunk holographic vending machine, freestanding rectangular kiosk with chamfered edges.
Center features transparent acrylic dispenser bay with internal glowing LED strip.
Materials: Brushed matte dark gray titanium alloy (roughness: 0.35, metallic: 0.85),
glowing cyan neon emissive trim lines (emission strength: 5.0), scratched hazard decals on base.
Topology tags: clean quad-dominant topology, watertight mesh, manifold geometry, PBR 4K textures, game-ready asset.
```

#### Step 2: Generate & Export Standardized GLB via Tripo3D
Enter the prompt in a service such as [Tripo3D](https://www.tripo3d.ai/), inspect the generated mesh and materials, then export **`vending_machine.glb`** into `public/models/`. Speed and topology quality depend on the service and input.

#### Step 3: Automate Blender via GPT-6 Astra (`pipeline.py`)
Instead of wrestling with manual GUI dials, have Astra write and execute a headless Blender Python automation script:

```python
import bpy
import math
from pathlib import Path

# 1. Clean factory environment
bpy.ops.wm.read_factory_settings(use_empty=True)

# 2. Import Tripo3D GLB asset
asset_path = Path("public/models/vending_machine.glb").resolve()
if not asset_path.is_file():
    raise FileNotFoundError(asset_path)
bpy.ops.import_scene.gltf(filepath=str(asset_path))

# 3. Compute bounding box, center origin, and ground asset (Z=0)
imported_objs = [obj for obj in bpy.context.selected_objects if obj.type == 'MESH']
if imported_objs:
    bpy.ops.object.select_all(action='DESELECT')
    for obj in imported_objs:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = imported_objs[0]
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    
    min_z = min([v[2] for obj in imported_objs for v in [obj.matrix_world @ v.co for v in obj.data.vertices]])
    for obj in imported_objs:
        obj.location.z -= min_z

# 4. Automated Studio Three-Point Lighting
# Key Light
key_light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
key_light_data.energy = 500
key_light_data.size = 2.0
key_light = bpy.data.objects.new(name="Key_Light", object_data=key_light_data)
key_light.location = (3.0, -3.0, 4.0)
bpy.context.collection.objects.link(key_light)

# Fill Light
fill_light_data = bpy.data.lights.new(name="Fill_Light", type='AREA')
fill_light_data.energy = 200
fill_light_data.size = 3.0
fill_light = bpy.data.objects.new(name="Fill_Light", object_data=fill_light_data)
fill_light.location = (-3.0, -2.0, 2.0)
bpy.context.collection.objects.link(fill_light)

# Rim Light
rim_light_data = bpy.data.lights.new(name="Rim_Light", type='SUN')
rim_light_data.energy = 3.0
rim_light = bpy.data.objects.new(name="Rim_Light", object_data=rim_light_data)
rim_light.location = (0.0, 4.0, 3.0)
rim_light.rotation_euler = (math.radians(-45), 0, math.radians(180))
bpy.context.collection.objects.link(rim_light)

# 5. Product Showcase Camera
cam_data = bpy.data.cameras.new("Product_Camera")
cam_obj = bpy.data.objects.new("Product_Camera", cam_data)
cam_obj.location = (0, -4.5, 2.0)
cam_obj.rotation_euler = (math.radians(72), 0, 0)
bpy.context.collection.objects.link(cam_obj)
bpy.context.scene.camera = cam_obj

# 6. Eevee Next Headless Inspection Render
bpy.context.scene.render.engine = 'BLENDER_EEVEE_NEXT'
bpy.context.scene.render.resolution_x = 1280
bpy.context.scene.render.resolution_y = 720
render_path = Path("public/renders/validation_preview.png").resolve()
render_path.parent.mkdir(parents=True, exist_ok=True)
bpy.context.scene.render.filepath = str(render_path)

bpy.ops.render.render(write_still=True)
print("✅ Headless Blender validation frame generated: ./public/renders/validation_preview.png")
```

Execute in background mode:
```bash
blender --background --python pipeline.py
```
After rendering, provide `validation_preview.png` to a Codex session with image input and ask it to inspect visible geometry and lighting issues. Verify normals, UVs, and performance manually in Blender.

#### Step 4: Instant Web Embed (React Three Fiber / Three.js)
Distribute the optimized GLB asset directly inside your Next.js 15 or Vite web application:

```tsx
// components/VendingMachineViewer.tsx
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

export function VendingMachineViewer() {
  const { scene } = useGLTF('/models/vending_machine.glb');
  return (
    <div className="w-full h-[500px] bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <primitive object={scene} position={[0, -1, 0]} />
        <Environment preset="city" />
        <OrbitControls autoRotate autoRotateSpeed={2.0} enableZoom={true} />
      </Canvas>
    </div>
  );
}
```

---

## 13.7 Cost and Task-Based Routing

Start everyday complex coding with `gpt-6.2-sol` (or `gpt-6.1-sol` during migration), use `gpt-6.1-terra` for visual audits and computer use, route focused extraction and small edits to `gpt-6-luna`, and evaluate `gpt-6.2-astra` for the hardest cross-app architecture work. Check what your account and client expose, then tune by latency and cost. [Codex models](https://learn.chatgpt.com/docs/models)

If a project uses fallback providers, verify session formats and tool support independently. The companion [Codex Switch](https://github.com/aipmer/codex-switch) is a third-party open-source utility; rely on its current documentation and your own compatibility checks.

---

## 13.8 Migration Checklist

```bash
codex --version
npm install -g @openai/codex@latest
codex --version
codex --model gpt-6.2-sol
codex exec --sandbox workspace-write "Review the current changes and report issues"
codex plugin list
```

1. Check GPT-6.2 and GPT-6.1 Terra access for your account and workspace in [Codex models](https://learn.chatgpt.com/docs/models).
2. Scan saved configs for `gpt-5.6` (retiring from Codex on December 23, 2026), `gpt-5.4`, `/v1/prompts` (deprecated November 30, 2026), and `--full-auto`.
3. If using Hooks or MCP, verify the event-array structure in [Hooks docs](https://learn.chatgpt.com/docs/hooks) and check lazy stdio MCP startup and per-tool approval rules in CLI `0.172.0+`.

---

## Troubleshooting

| Symptom | Check |
| :--- | :--- |
| GPT-6.2 Sol or Terra is absent from the picker | Check CLI version (0.172.0+), plan, rollout, and workspace administrator settings |
| `--full-auto` prints a deprecation warning | Use `--sandbox workspace-write` for new non-interactive calls; the old path remains compatible |
| A configured model is unavailable | Distinguish Codex sign-in from API access and select an available model with `/model` |
| Hooks do not run | Check the event-array structure and review hook trust with `/hooks` |

---

## 13.9 Principles That Outlast Versions

Keep changing model IDs and CLI options in one place. Check official documentation and local behavior during each upgrade. Continue to state the task goal, permission boundary, and acceptance criteria clearly.

---

[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.12) ](./ch12_commercialization.md) | [ 🌐 中文版 ](../chapters/ch13_2026_frontier.md)

## Related tool channel

For concise updates and setup reminders, visit the [PMER Codex tool channel (Chinese)](https://pmer.cn/ai-tools/codex/#updates). This book's facts are verified through November 26, 2026.
