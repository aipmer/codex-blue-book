---
title: "Ch.08 Spatial Coding & 3D Make: Three.js, Headless Blender & Parametric FreeCAD"
description: "Harness Kimi K3.1 Pro spatial coding and 3D Make across Three.js web scenes, headless Blender bpy environments, and parametric FreeCAD mechanical assemblies with STEP/STL export."
lastUpdated: 2026-11-26
---

[Back to Kimi Hub](/en/kimi/) | [Prev: Kimi Slides Executive Decks](/en/kimi/ch07_kimi_slides_decks) | [Next: vLLM Self-Hosting & Enterprise SaaS](/en/kimi/ch09_vllm_self_hosting_saas)

# Ch.08 Spatial Coding & 3D Make: Three.js, Headless Blender & Parametric FreeCAD

> 🎯 **Engineering pain solved**: Text-to-mesh generators output messy, uneditable triangle soups with arbitrary dimensions—useless for precision CAD assemblies or budgeted WebGL scenes—while hand-writing `bpy` or FreeCAD Python scripts takes specialized geometry skills.
>
> 💡 **What you ship**: Three reproducible spatial-coding pipelines powered by **Kimi K3.1 Pro + 3D Make**: WebGL **Three.js**, headless **Blender (`bpy`)** with MoonViT-V2 visual self-review, and a runnable **FreeCAD** parametric turbine rotor generator (`.step` / `.stl`).
>
> ⚡ **Bottom line**: Code-generated 3D assets give you exact millimeter tolerances, Git version control, and instant parameter sweeps—turning 3D into an engineering pipeline instead of lottery meshes.

---

## 8.1 Choosing the Right 3D Pipeline

| Deliverable | Target Engine & Format | Why Kimi K3.1 Pro / 3D Make Excels |
| :--- | :--- | :--- |
| **Interactive web configurator / showcase** | **Three.js / React Three Fiber** (WebGL / GLB) | Generates camera rigs, lighting budgets, and responsive state bindings |
| **Architectural / environment rendering** | **Headless Blender (`bpy`)** (`.blend` / `.glb` / Cycles PNG) | Procedural terrain, shaders, lighting, and automated multi-angle preview renders |
| **Mechanical CAD / 3D-printable parts** | **Python + FreeCAD** (`.step` / `.stl` / `.3mf`) | Exact B-Rep solids, watertight boolean unions, and parametric dimension updates |

---

## 8.2 Headless Blender (`bpy`) + MoonViT-V2 Visual Loop

Inspired by official K3.1 Pro procedural environment showcases, generate a headless `bpy` script, render a fast Cycles preview (`blender --background --python ...`), and feed `preview_render.png` back into Kimi Code so MoonViT-V2 flags floating meshes, clipping, or blown highlights:

```python
# Run: blender --background --python blender_scene_check.py
import bpy
import math

bpy.ops.wm.read_factory_settings(use_empty=True)

bpy.ops.mesh.primitive_grid_add(x_subdivisions=48, y_subdivisions=48, size=12.0, location=(0, 0, 0))
terrain = bpy.context.active_object
terrain.name = "CanyonTerrain"
for v in terrain.data.vertices:
    x, y = v.co.x, v.co.y
    v.co.z = max(-0.4, abs(x) * 0.45 + 0.25 * math.sin(x * 1.1) * math.cos(y * 0.9) - 1.2)

bpy.ops.mesh.primitive_plane_add(size=12.0, location=(0, 0, -0.25))
bpy.context.active_object.name = "StreamSurface"

bpy.ops.object.light_add(type="SUN", location=(6, -6, 10))
sun = bpy.context.active_object
sun.data.energy = 3.5
sun.rotation_euler = (math.radians(48), math.radians(15), math.radians(32))

bpy.ops.object.camera_add(location=(0, -9.5, 4.2), rotation=(math.radians(68), 0, 0))
bpy.context.scene.camera = bpy.context.active_object

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = 24
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.filepath = "//preview_render.png"
bpy.ops.render.render(write_still=True)
```

---

## 8.3 Parametric FreeCAD Turbine Rotor (`freecad_turbine_blade.py`)

For 3D-printable and CNC-ready parts, B-Rep solids eliminate non-manifold mesh holes. The companion script [examples/kimi-k3-kit/scripts/freecad_turbine_blade.py](https://github.com/aipmer/codex-blue-book/blob/main/examples/kimi-k3-kit/scripts/freecad_turbine_blade.py) validates blade chord and minimum wall thickness (`>= 1.6mm`) in plain Python before exporting watertight `.step` or `.stl` via `freecadcmd`:

```bash
# 1. Pure-Python parametric geometry pre-check
python3 examples/kimi-k3-kit/scripts/freecad_turbine_blade.py \
  --dry-run --blades 12 --hub-radius 28 --outer-radius 85 --pitch-deg 28

# 2. Headless FreeCAD STEP & 3D-printable STL export
freecadcmd examples/kimi-k3-kit/scripts/freecad_turbine_blade.py \
  --blades 12 --hub-radius 28 --outer-radius 85 --out turbine_rotor.step

freecadcmd examples/kimi-k3-kit/scripts/freecad_turbine_blade.py \
  --blades 12 --hub-radius 28 --outer-radius 85 --out turbine_rotor.stl
```

---

## 🚀 3-Step Quickstart

1. **Validate parametric math**: Run `freecad_turbine_blade.py --dry-run` with `--blades 16 --outer-radius 100` to verify automatic chord/spacing recalculation.
2. **Prototype visually in 3D Make**: Block out proportions from a sketch or prompt in Kimi 3D Make, then port into versioned scripts.
3. **Close the render-audit loop**: Render front and isometric views headlessly and have MoonViT-V2 inspect intersections and base-plane contact.

---

## 🛡️ Pitfall Recovery Table

| Failure Mode | Root Cause | Immediate Fix |
| :--- | :--- | :--- |
| Slicer rejects `.stl` with non-manifold edges | Parts touch face-to-face without solid boolean union | Overlap blades into hub by `1–2mm` and call `rotor.fuse(blade)` before exporting |
| `bpy` script fails with `AttributeError` in Blender 4.x | Deprecated Blender 3.x Principled BSDF socket names | Pin your exact `blender --version` in prompts and test via `--background` immediately |
| Mobile browser freezes on Three.js product page | Uncompressed 500K-triangle mesh loaded in root bundle | Decimate/compress with `gltf-transform` (`< 50K` tris, Draco/KTX2) and lazy-load via dynamic `import()` |

---

[Back to Kimi Hub](/en/kimi/) | [Prev: Kimi Slides Executive Decks](/en/kimi/ch07_kimi_slides_decks) | [Next: vLLM Self-Hosting & Enterprise SaaS](/en/kimi/ch09_vllm_self_hosting_saas)
