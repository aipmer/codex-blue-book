[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.12) ](./ch12_commercialization.md) | [ 🌐 中文版 ](../chapters/ch13_2026_frontier.md)

# Ch.13 Check 2026 Model and Tool Changes

> **Problem**: Models, clients, and commands change frequently, making older instructions stale.
>
> **Practice**: Check official changes as of this edition and run compatibility checks before migrating.

The first twelve chapters built a version-independent orchestration methodology. But methodology must land on real tooling. In 2026, the Codex ecosystem went through four structural shifts: **the desktop merger, the model transition, the maturing plugin economy, and security becoming its own product line**. This chapter breaks down each shift with concrete migration commands and configurations.

---

## A Way to Think About It: Avionics Retrofit of a Supersonic Airliner

Do not panic over frequent tool upgrades. View this transition through the eyes of a pilot:

```text
[Pilot Mindset]   ──> Your flight manual remains identical: goal-driven execution (takeoff & landing targets)
                      and strict boundary constraints (flight corridors & safe altitudes).
[Engines]         ──> Propulsion overhauled to next-generation powerplants:
                      - Frontier Flagship Core: "GPT-6 Astra" (beyond-visual-range radar & autonomous computer operator);
                      - Daily Primary Thrust Engine: "GPT-6 Sol" (complex coding);
                      - Auxiliary Cruise Engine: "GPT-6 Luna" (focused, frequent work).
[Cockpit Screen]  ──> The former standalone secondary monitor (separate Codex App) is officially integrated
                      into the main instrument panel (ChatGPT Desktop Code Mode), adding Sites radar & Annotations.
[Autopilot]       ──> The old --full-auto compatibility path is deprecated; new calls specify sandbox and approval modes.
```

With your mental model intact, upgraded avionics only help you fly faster and steadier.

---

## Practice: Start with Three Steps

Complete your 2026 toolchain health check and migration in 3 simple steps:

1. **Step 1: Scan for Deprecated Legacy Model Codenames**  
   Run a grep scan in your project root:
   ```bash
   grep -rn "gpt-5.4" ~/.codex/config.toml .
   ```
2. **Step 2: Check the Installed CLI and Update If Needed**
   Check the installed version first; run the global npm update when needed:
   ```bash
   codex --version
   npm install -g @openai/codex@latest
   codex --version
   ```
3. **Step 3: Migrate Deprecated `--full-auto` Calls**
   In all your shell aliases and CI scripts, replace `--full-auto` with:
   ```bash
   codex exec --sandbox workspace-write "Review the current changes and report issues"
   ```

---

## 13.1 The Desktop Merger: Codex App Folds into the ChatGPT Client

In July 2026, the standalone Codex desktop app was retired. All of its capabilities moved into the **ChatGPT desktop client** as a dedicated "Codex Code Mode," available to Free, Plus, and Enterprise users.

**Migration steps:**

```bash
# macOS: download ChatGPT.dmg and drag it into Applications
# Windows: install via winget
winget install OpenAI.ChatGPT
```

After signing in, click the **Codex** tab in the left sidebar to enter Code Mode. Two caveats:

1. **Account vs. API Key**: Signing in with a ChatGPT account unlocks the full feature set (cloud tasks, cross-device sync, Sites hosting, Computer Use); an API key grants only basic local coding.
2. **Standalone components are unaffected**: the Codex CLI, the VS Code extension, and Codex Cloud continue to evolve independently. The multi-surface matrix from Ch.02 still holds — the "desktop app" cell is simply replaced by the ChatGPT client.

**New capabilities at a glance:**
- Upgraded built-in browser: search browsing history from the address bar; the Chrome extension can reference open tabs.
- **Multi-repo Review**: multi-folder projects show changed lines across all repositories in one review view — no more tab-hopping between diffs.
- **Sites**: create, deploy, and manage hosted web projects directly in the client, with Annotations for in-place "point and edit" workflows.

---

## 13.2 The GPT-6 Family: Choose by Task

As of **September 24, 2026**, the GPT-6 family consists of Astra, released September 3, and Sol and Luna, released September 22. Sol and Luna are rolling out in Codex; availability depends on the plan, client, and workspace settings. GPT-5.6 Sol, Terra, and Luna remain available during the rollout. A new release is not a blanket retirement of earlier models. [Official GPT-6 guide](https://developers.openai.com/api/docs/guides/latest-model) · [Codex models](https://learn.chatgpt.com/docs/models)

| Model ID | Best fit | `reasoning.effort` | Boundary |
| :--- | :--- | :--- | :--- |
| `gpt-6-astra` | The hardest workflows across code, browsers, and desktop tools | `low`, `medium`, `high`, `xhigh`, `max` | No `none`; the client and tools still execute computer actions |
| `gpt-6-sol` | Everyday complex coding, code review, and multi-step agent work | `none`, `low`, `medium`, `high`, `xhigh`, `max` | This book's current default when the account has access |
| `gpt-6-luna` | Focused edits, extraction, summaries, and high-volume tasks | `none`, `low`, `medium`, `high`, `xhigh`, `max` | Move to Sol or Astra when the task needs more capability |

All three accept text and image input and produce text. The API model catalog lists a **1,050,000-token context window** and **128,000 maximum output tokens**. Prefer the Responses API for tools; Astra requires Responses for tool calling. [API model catalog](https://developers.openai.com/api/docs/models) · [GPT-6 migration guidance](https://developers.openai.com/api/docs/guides/latest-model)

**Keep API prices separate from Codex usage.** These are standard API text-token prices per million tokens for requests with up to 272K input tokens, as checked for this edition. They are neither ChatGPT subscription prices nor Codex credit conversions. Longer prompts, caching, and other processing tiers have separate [official prices](https://developers.openai.com/api/docs/pricing).

| API model | Input | Cached input | Output |
| :--- | ---: | ---: | ---: |
| `gpt-6-astra` | $10 | $1 | $50 |
| `gpt-6-sol` | $2 | $0.20 | $10 |
| `gpt-6-luna` | $0.10 | $0.01 | $0.50 |

**Choose a model:**

```bash
codex --version
codex --model gpt-6-sol
codex exec -m gpt-6-luna "Review the current changes"
```

Use `/model` in an interactive session. If a new model is missing from the picker, check client and account availability. API availability does not imply Codex sign-in availability. [Codex models](https://learn.chatgpt.com/docs/models)

**Local default configuration:**

```toml
# ~/.codex/config.toml
model = "gpt-6-sol"
```

This only selects the local default model. The `--approve-for-me` permission mode is not documented as using Luna.

### Verified lifecycle dates

| Date | Scope | Official record |
| :--- | :--- | :--- |
| March 26, 2026 | API | `gpt-4-0314`, `gpt-4-1106-preview`, and `gpt-4-0125-preview` shut down |
| May 12, 2026 | API | `dall-e-2` and `dall-e-3` shut down |
| August 26, 2026 | API | Assistants API shut down; migrate to Responses API and Conversations API |
| August 31, 2026 | Codex with ChatGPT sign-in | `gpt-5.4` and `gpt-5.4-mini` retired |
| September 3, 2026 | API | GPT-6 Astra released |
| September 22, 2026 | API / Codex | GPT-6 Sol and Luna released and began rolling out in Codex |
| October 14, 2026 (scheduled) | ChatGPT / Work / Codex | GPT-5.5 retirement; the API is not affected |

Check [API deprecations](https://developers.openai.com/api/docs/deprecations) for API shutdown dates and official replacements. Check [Codex models](https://learn.chatgpt.com/docs/models) and the [changelog](https://learn.chatgpt.com/docs/changelog) for Codex sign-in scope. A retirement in one interface does not mean the API model is gone.

---

## 13.3 Codex CLI: 0.156.1 at This Edition's Cutoff

OpenAI released Codex CLI `0.156.1` on **September 23, 2026**, adding GPT-6 Sol and Luna to the model picker. This edition's research cutoff is September 24, 2026; check the [current changelog](https://learn.chatgpt.com/docs/changelog) before installing.

```bash
codex --version
npm install -g @openai/codex@latest
codex --version
```

### 1. Migrate older `--full-auto` calls

`codex exec --full-auto` is a **deprecated compatibility path** that prints a warning. It has not been removed. For new non-interactive commands, specify the sandbox:

```bash
codex exec --sandbox workspace-write "Review the current changes and report issues"
```

The sandbox constrains workspace access. `--approve-for-me` routes eligible escalation requests to automatic review; it does not define the sandbox. [Approval and security docs](https://learn.chatgpt.com/docs/agent-approvals-security)

### 2. Use the supported Hooks event structure

Hooks in `config.toml` use event arrays and handler arrays. `[hooks] stop = "..."` is not a valid replacement. This example checks whitespace errors in the current repository at the end of a turn. Review and trust the hook source through `/hooks` when first enabled. [Hooks docs](https://learn.chatgpt.com/docs/hooks)

```toml
# ~/.codex/config.toml
[[hooks.Stop]]

[[hooks.Stop.hooks]]
type = "command"
command = "git diff --check"
```

### 3. Install plugins by IDs shown in the current catalog

```bash
codex plugin list
codex plugin add --help
```

`codex plugin add` accepts the `PLUGIN@MARKETPLACE` form shown by the catalog. `codex plugin install` is not a current CLI subcommand. Check the ID and source before installing. [Codex changelog](https://learn.chatgpt.com/docs/changelog)

### 4. Automatic approval does not have a documented fixed model

`--approve-for-me` sends eligible approval requests to automatic review. It does not expand sandbox permissions or guarantee approval of every risky action. The documentation does not say the reviewer always runs GPT-6 Luna. [Permissions docs](https://learn.chatgpt.com/docs/permission-modes)

```bash
codex --approve-for-me "Review the current changes and suggest fixes"
```

---

## 13.4 The Skills Economy: Compounding Repeated Workflows into Assets

If AGENTS.md is a project's "constitutional law," **Skills are the standard operating procedures for specific task types**:

```text
skills/
└── pr-review/
    └── SKILL.md      # A procedural manual with YAML frontmatter
```

---

## 13.5 Codex Security: Use Verified Capabilities

Codex Security is a separate security review capability. Check the **Codex Security** entry and instructions in your client's plugin directory before selecting a scan workflow. Commands can differ by version. This book does not present unverified Daybreak model routing, cybersecurity ratings, or scanner flags as executable facts. [Codex Security docs](https://learn.chatgpt.com/docs/security)

```bash
codex plugin list
```

---

## 13.6 A 3D Workflow Example: GPT-6 Astra, Tripo3D, and Blender

This is a workflow developers can assemble themselves: use Astra to structure asset requirements, a 3D service such as Tripo3D to generate a GLB, and a Blender `bpy` script to inspect a render. These are separate tools. **This example does not imply an official OpenAI integration with a third party or guarantee quality or completion time.** The official GPT-6 sources consulted for this edition do not provide the BenchCAD figure published in the previous edition. [Official GPT-6 guide](https://developers.openai.com/api/docs/guides/latest-model)

### 1. Workflow boundaries

The model structures requirements and helps write scripts; the 3D service generates a mesh; Blender imports and renders it. A developer reviews geometry, materials, and performance before shipping.

```text
Concept and scale → GPT-6 Astra structures prompt → Tripo3D generates GLB
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

Start everyday complex coding with `gpt-6-sol`, use `gpt-6-luna` for focused extraction and small edits, and evaluate `gpt-6-astra` for the hardest cross-app work. Check what your account and client can select, then compare quality, latency, and cost on your own tasks. [Codex models](https://learn.chatgpt.com/docs/models)

If a project uses other providers, verify session formats and tool support independently. The companion [Codex Switch](https://github.com/aipmer/codex-switch) is a third-party tool; rely on its current documentation and your own compatibility tests.

---

## 13.8 Migration Checklist

```bash
codex --version
npm install -g @openai/codex@latest
codex --version
codex --model gpt-6-sol
codex exec --sandbox workspace-write "Review the current changes and report issues"
codex plugin list
```

1. Check GPT-6 access for your account and workspace in [Codex models](https://learn.chatgpt.com/docs/models).
2. Search saved `gpt-5.4`, `gpt-5.4-mini`, and `--full-auto` settings; migrate each according to its actual scope.
3. If using Hooks, verify the event-array structure in the [Hooks docs](https://learn.chatgpt.com/docs/hooks) and inspect trust with `/hooks`.

---

## Troubleshooting

| Symptom | Check |
| :--- | :--- |
| GPT-6 Sol or Luna is absent from the picker | Check CLI version, plan, rollout, and workspace administrator settings |
| `--full-auto` prints a deprecation warning | Use `--sandbox workspace-write` for new non-interactive calls; the old path remains compatible |
| A configured model is unavailable | Distinguish Codex sign-in from API access and select an available model with `/model` |
| Hooks do not run | Check the event-array structure and review hook trust with `/hooks` |

---

## 13.9 Principles That Outlast Versions

Keep changing model IDs and CLI options in one place. Check official documentation and local behavior during each upgrade. Continue to state the task goal, permission boundary, and acceptance criteria clearly.

---

[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.12) ](./ch12_commercialization.md) | [ 🌐 中文版 ](../chapters/ch13_2026_frontier.md)
