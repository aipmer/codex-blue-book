---
title: "Ch.08 空间智能与 3D Make 实战：从 Web 3D 交互、Blender 到 FreeCAD 机械装配"
description: "解析 Kimi K3.1 Pro 空间编码能力与 3D Make 工作流，实战 Three.js 3D 网页、无头 Blender bpy 环境程序化建模，以及 FreeCAD 参数化涡扇叶轮 CAD 生成与可打印导出。"
lastUpdated: 2026-11-26
---

[返回 Kimi 专页](/kimi/) | [上一章：Kimi Slides 智能演示工程流](/kimi/ch07_kimi_slides_decks) | [下一章：vLLM / SGLang 开源私有化与商业化落地](/kimi/ch09_vllm_self_hosting_saas)

# Ch.08 空间智能与 3D Make 实战：从 Web 3D 交互、Blender 到 FreeCAD 机械装配

> **本章解决的工程麻烦**：传统文生 3D 模型生成的是“表面一团烂网格、尺寸全靠猜、完全没法改参数”的不可编辑文件——既没法放进机械 CAD 做精确装配，也没法控制 Web 3D 场景的面数和材质逻辑；而纯手工写 Three.js、Blender `bpy` 或 FreeCAD Python 脚本门槛又太高。
>
> **实战落地收益**：吃透 **Kimi K3.1 Pro 空间编码（Spatial Coding）+ 3D Make** 工作流，落地三条可参数化复现的 3D 工程管线：**Web 3D（Three.js）**、**无头 Blender 场景脚本（`bpy`）** 与 **FreeCAD 参数化机械装配体（`.step` / `.stl`）**。
>
> **一句话结论**：程序化代码生成的 3D 资产天然带精确毫米尺寸、版本控制与一键改参能力——这是 K3.1 Pro 区别于普通图片/网格生成器的真正硬实力。

2026 年底 `@Kimi_Moonshot` 社区里传阅度最高的一组实战演示，既不是写贪吃蛇，也不是画海报，而是两类硬核空间工程作品：一类是 **Blender 程序化室内热带雨林峡谷**（精准控制地形、植被分布、体积光与水体反射），另一类是 **Python + FreeCAD 精密涡扇发动机参数化建模与爆炸视图**。

它们背后的共同密码叫 **Spatial Coding（空间编码）**——不是直接“画”出一坨像素或三角面，而是让具备强几何推理能力的 K3.1 Pro 直接输出可执行的三维建模代码。

---

## 8.1 选对 3D 交付管线：Web 3D vs Blender vs FreeCAD

动手前先按交付终点选管线，别拿错工具：

| 目标场景 | 首选引擎与输出格式 | Kimi K3.1 Pro / 3D Make 的核心优势 |
| :--- | :--- | :--- |
| **浏览器交互展厅 / 产品 3D 配置器** | **Three.js / React Three Fiber**（WebGL / GLB） | 一键生成带轨道控制、阴影预算与状态切换的响应式组件 |
| **影视级渲染 / 建筑与环境艺术场景** | **Blender 无头 `bpy` 脚本**（`.blend` / `.glb` / Cycles 渲染图） | 精确控制程序化节点材质、灯光角度、摄影机运镜与多角度批量渲染 |
| **工业设计 / 机械装配 / 3D 打印零件** | **Python + FreeCAD**（`.step` / `.stl` / `.3mf`） | 严格毫米级公差、布尔运算无破面、改一个半径参数全装配自动联动更新 | ---

## 8.2 管线一：无头 Blender（`bpy`）程序化环境构建与自动审图

受官方“室内热带雨林峡谷”程序化建模启发，最稳的 Blender AI 工作流不是盲目生成上千行脚本一次跑完，而是采用 **“代码生成场景 → 无头渲染三视角预览图 → 喂回 MoonViT-V2 检查穿模与光影 → 自动迭代修复”** 的视觉闭环：

```python
# blender_scene_check.py — 无头构建基础地形+水体+太阳光并输出渲染预览
# 运行命令: blender --background --python blender_scene_check.py
import bpy
import math

bpy.ops.wm.read_factory_settings(use_empty=True)

# 1. 创建程序化微地形平面
bpy.ops.mesh.primitive_grid_add(x_subdivisions=48, y_subdivisions=48, size=12.0, location=(0, 0, 0))
terrain = bpy.context.active_object
terrain.name = "CanyonTerrain"
for v in terrain.data.vertices:
    x, y = v.co.x, v.co.y
    canyon = abs(x) * 0.45
    ripple = 0.25 * math.sin(x * 1.1) * math.cos(y * 0.9)
    v.co.z = max(-0.4, canyon + ripple - 1.2)

# 2. 创建水面平面
bpy.ops.mesh.primitive_plane_add(size=12.0, location=(0, 0, -0.25))
water = bpy.context.active_object
water.name = "StreamSurface"

# 3. 布置主光与相机
bpy.ops.object.light_add(type="SUN", location=(6, -6, 10))
sun = bpy.context.active_object
sun.data.energy = 3.5
sun.rotation_euler = (math.radians(48), math.radians(15), math.radians(32))

bpy.ops.object.camera_add(location=(0, -9.5, 4.2), rotation=(math.radians(68), 0, 0))
bpy.context.scene.camera = bpy.context.active_object

# 4. 渲染低采样快速审图 PNG 供 MoonViT-V2 视觉核验
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = 24
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.filepath = "//preview_render.png"
bpy.ops.render.render(write_still=True)
```

每跑完一轮 `blender --background --python ...`，直接把生成的 `preview_render.png` 丢回 Kimi Code，让 MoonViT-V2 核对物体是否悬空、穿模、曝光过曝，两三轮即可收敛到稳定成片。

---

## 8.3 管线二：Python + FreeCAD 参数化涡扇叶轮生成与可打印导出

做工业零件或 3D 打印模型，最致命的错误是网格非流形（Non-Manifold）或壁厚太薄打印就裂。用 **FreeCAD B-Rep 实体建模** 从源头消灭破面问题。

配套套件 [examples/kimi-k3-kit/scripts/freecad_turbine_blade.py](https://github.com/aipmer/codex-blue-book/blob/main/examples/kimi-k3-kit/scripts/freecad_turbine_blade.py) 演示了一个完整可运行的参数化叶轮转子生成器——支持在没有装 FreeCAD 的普通 Python 环境下先用 `--dry-run` 校验叶片弦长、最小壁厚（`>= 1.6mm`）和角度均分，再用 `freecadcmd` 直接导出精密 `.step`（供 SolidWorks / Fusion 360 二次加工）或 `.stl`（直接进切片软件 3D 打印）：

```bash
# 1. 纯 Python 预检几何约束（确保壁厚 >= 1.6mm 且叶片分布无干涉）
python3 examples/kimi-k3-kit/scripts/freecad_turbine_blade.py \
  --dry-run --blades 12 --hub-radius 28 --outer-radius 85 --pitch-deg 28

# 2. 在安装了 FreeCAD 的机器上无头导出精密 STEP 实体与可打印 STL 网格
freecadcmd examples/kimi-k3-kit/scripts/freecad_turbine_blade.py \
  --blades 12 --hub-radius 28 --outer-radius 85 --out turbine_rotor.step

freecadcmd examples/kimi-k3-kit/scripts/freecad_turbine_blade.py \
  --blades 12 --hub-radius 28 --outer-radius 85 --out turbine_rotor.stl
```

---

## 新手极速上手 3 步走

1. **先跑参数校验**：运行上面的 `freecad_turbine_blade.py --dry-run`，尝试把 `--blades` 改成 `16` 或把 `--outer-radius` 改成 `100`，观察输出 JSON 中弦长、壁厚和均分角度的自动重算。
2. **用 3D Make 快速验证概念**：在 Kimi 3D Make 里用一句话或手绘草图生成目标物体初版，确认整体比例后再导出参数化脚本进本地仓库精修。
3. **打通视觉自检闭环**：用无头 Blender 渲染一张正面+45度等距视角预览图，喂给 Kimi Code 核对几何穿插、法线朝向与底面贴平度。

---

## 翻车自救与避坑速查表

| 故障现象 | 致命根因 | 即刻自救方案 |
| :--- | :--- | :--- |
| 生成的 `.stl` 导入切片软件报“非流形边 / 破洞无法切片” | 多个组件仅仅紧挨着放一起而未做实体布尔融合（`fuse`），或壁厚小于 1mm | 机械件用 FreeCAD 显式 `rotor.fuse(blade)` 融合成单一闭合实体（确保 `blade` 插入轮毂重叠 `1–2mm`），导出后检查流形闭合 |
| Blender `bpy` 脚本在新版 Blender 4.x 报属性不存在 | 模型按 Blender 3.x 旧 API 生成了已移除的 Principled BSDF 输入名 | 在提示词顶部显式指定本机 `blender --version` 主版本号，并先跑 `--background` 快速捕获 AttributeError |
| 网页 Three.js 场景在手机浏览器直接白屏或发热卡顿 | 导出模型高达 50 万面且未压缩纹理，也没有按路由懒加载 | 用 `gltf-transform` 压缩至 `< 50K` 三角面 + Draco/KTX2 压缩，Three.js 严格走动态 `import()` | ---

[返回 Kimi 专页](/kimi/) | [上一章：Kimi Slides 智能演示工程流](/kimi/ch07_kimi_slides_decks) | [下一章：vLLM / SGLang 开源私有化与商业化落地](/kimi/ch09_vllm_self_hosting_saas)
