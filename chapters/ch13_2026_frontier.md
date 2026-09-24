[ 🏠 主目录 ](/) | [ ⬅️ 上一章 (Ch.12) ](./ch12_commercialization.md) | [ 🌐 English ](../en/ch13_2026_frontier.md)

# Ch.13 核对 2026 年的模型与工具变更

> **问题**：模型、客户端和命令更新频繁，旧版本说明可能已失效。
>
> **本章实践**：按本书资料截止日核对官方变更，运行兼容性检查后再迁移。

前面十二章建立的，是一套不依赖具体版本的编排方法论。但方法论要落地，就必须踩在真实的工具地面上。2026 年的 Codex 生态发生了四次结构性地震：**桌面端大合并、模型大换代、插件生态成型、安全能力独立成军**。本章逐条拆解这些变化，并给出具体的迁移命令与配置。

---

## 理解方式：超音速客机的新一代航电换装

不要对频繁的版本迭代感到恐慌。用飞行员的视角来理解这次升级：

```text
【驾驶心智】 ──> 你的飞行手册没有变：依然是目标驱动（起飞与降落目标）、边界约束（航线与安全高度）。
【动力引擎】 ──> 动力系统换装为前沿旗舰「GPT-6 Astra」（具备超视距雷达与全自主航电控制的顶级核心）、
                 日常复杂编码发动机「GPT-6 Sol」以及明确小任务的巡航发动机「GPT-6 Luna」。
【驾驶舱屏】 ──> 原先外挂的副屏（独立 Codex App）正式集成到主驾驶台（ChatGPT 桌面端代码模式），
                 并新增 Sites 原位实景雷达与 Annotations 触控批注。
【自动副驾】 ──> 旧的 --full-auto 兼容入口已弃用；新调用显式设置沙盒与审批模式。
```

只要心智在握，新工具只会让你飞得更快、更稳。

---

## 动手实践：先完成这 3 步

用 3 步完成你的 2026 工具链体检与迁移：

1. **步骤一：扫描项目和配置中的旧模型代号**
   在项目根目录运行 grep 扫描：
   ```bash
   grep -rn "gpt-5.4" ~/.codex/config.toml .
   ```
2. **步骤二：检查本机 CLI，按需更新**
   先核对当前版本；需要更新时再运行 npm 全局更新命令：
   ```bash
   codex --version
   npm install -g @openai/codex@latest
   codex --version
   ```
3. **步骤三：迁移已弃用的 `--full-auto` 调用**
   在所有本地别名（aliases）与 CI 脚本中，将 `--full-auto` 替换为：
   ```bash
   codex exec --sandbox workspace-write "Review the current changes and report issues"
   ```

---

## 13.1 桌面端大合并：Codex App 并入 ChatGPT 客户端

2026 年 7 月，独立的 Codex 桌面应用正式退役，全部能力并入 **ChatGPT 桌面客户端**，以「Codex 代码模式（Code Mode）」的形态存在。免费、Plus 与企业版用户均可使用。

**迁移动作：**

```bash
# macOS：直接下载 ChatGPT.dmg，拖入 Applications
# Windows：使用 winget 安装
winget install OpenAI.ChatGPT
```

登录后点击左侧边栏的 **Codex** 标签页即可进入代码模式。需要特别注意的两点：

1. **账号 vs API Key**：使用 ChatGPT 账号登录可获得完整能力（云端任务、跨端同步、Sites 托管、Computer Use）；使用 API Key 登录仅有本地基础编码能力。
2. **独立组件不受影响**：Codex CLI、VS Code 插件、Codex Cloud 均为独立产品，继续正常演进。本书 Ch.02 的多端矩阵依然成立，只是「桌面 App」这一格换成了 ChatGPT 客户端。

**新增能力速览：**
- 内置浏览器升级：地址栏直接搜索浏览历史，Chrome 扩展可引用当前打开的标签页。
- **多仓库审查（Multi-repo Review）**：多文件夹项目可在一个视图中查看所有仓库的变更行数并逐一审查 Diff，不再需要来回切换。
- **Sites**：在客户端内直接创建、部署、管理托管 Web 项目，配合 Annotations 实现「指哪改哪」的原位编辑。

---

## 13.2 GPT-6 三款模型：按任务选型

截至 **2026 年 9 月 24 日**，GPT-6 家族包括 9 月 3 日发布的 Astra，以及 9 月 22 日发布的 Sol 和 Luna。Codex 中 Sol、Luna 正在分批开放；能否选择取决于账号套餐、客户端和工作区设置。GPT-5.6 Sol、Terra、Luna 在推出期间仍可用，不能把“推出新模型”写成“旧模型已退役”。[GPT-6 官方指南](https://developers.openai.com/api/docs/guides/latest-model) · [Codex 模型说明](https://learn.chatgpt.com/docs/models)

| 模型 ID | 适合的工作 | `reasoning.effort` | 边界 |
| :--- | :--- | :--- | :--- |
| `gpt-6-astra` | 最复杂的跨代码、浏览器和桌面工具任务 | `low`、`medium`、`high`、`xhigh`、`max` | 不支持 `none`；Computer Use 仍由客户端和工具执行操作 |
| `gpt-6-sol` | 日常复杂编码、代码审查和多步智能体工作 | `none`、`low`、`medium`、`high`、`xhigh`、`max` | 作为本书当前的默认选型，先确认账号可用 |
| `gpt-6-luna` | 范围明确的修订、提取、摘要和高频任务 | `none`、`low`、`medium`、`high`、`xhigh`、`max` | 任务复杂度超出能力时改用 Sol 或 Astra |

三款模型均支持文本和图片输入、文本输出；API 模型目录列出 **1,050,000 token 上下文窗口**和 **128,000 token 最大输出**。工具调用优先使用 Responses API，尤其 Astra 带工具调用时必须使用 Responses。[API 模型目录](https://developers.openai.com/api/docs/models) · [GPT-6 迁移指南](https://developers.openai.com/api/docs/guides/latest-model)

**API 计费与 Codex 用量分开看。** 下表是截至本次核对时，标准处理、输入不超过 272K token 时每百万文本 token 的 API 标价；它不是 ChatGPT 订阅价，也不是 Codex 额度换算。长上下文、缓存及其他处理档位另按[官方定价页](https://developers.openai.com/api/docs/pricing)核算。

| API 模型 | 输入 | 缓存输入 | 输出 |
| :--- | ---: | ---: | ---: |
| `gpt-6-astra` | $10 | $1 | $50 |
| `gpt-6-sol` | $2 | $0.20 | $10 |
| `gpt-6-luna` | $0.10 | $0.01 | $0.50 |

**选择模型：**

```bash
codex --version
codex --model gpt-6-sol
codex exec -m gpt-6-luna "Review the current changes"
```

交互会话也可用 `/model` 切换。若新模型尚未出现在选择器中，先核对客户端和账号可用性，不要把 API 可调用等同于 Codex 登录态可用。[Codex 模型说明](https://learn.chatgpt.com/docs/models)

**本地默认配置示例：**

```toml
# ~/.codex/config.toml
model = "gpt-6-sol"
```

此示例只设置本地默认模型。自动审批 `--approve-for-me` 是权限模式，不应声称固定由 Luna 执行。

### 已证实的生命周期节点

| 日期 | 范围 | 官方记录 |
| :--- | :--- | :--- |
| 2026-03-26 | API | `gpt-4-0314`、`gpt-4-1106-preview`、`gpt-4-0125-preview` 停用 |
| 2026-05-12 | API | `dall-e-2`、`dall-e-3` 停用 |
| 2026-08-26 | API | Assistants API 停用，迁移至 Responses API 和 Conversations API |
| 2026-08-31 | Codex 的 ChatGPT 登录态 | `gpt-5.4`、`gpt-5.4-mini` 退役 |
| 2026-09-03 | API | GPT-6 Astra 发布 |
| 2026-09-22 | API / Codex | GPT-6 Sol、Luna 发布并开始向 Codex 用户推出 |
| 2026-10-14（计划） | ChatGPT / Work / Codex | GPT-5.5 计划退役；不适用于 API |

API 退役日期与官方建议替代模型见 [API 退役公告](https://developers.openai.com/api/docs/deprecations)；Codex 登录态的日期与适用范围见 [Codex 模型说明](https://learn.chatgpt.com/docs/models)和[更新日志](https://learn.chatgpt.com/docs/changelog)。不要把某个界面的退役扩大描述成 API 全面下线。

---

## 13.3 Codex CLI：以 0.156.1 为本次核对点

OpenAI 于 **2026 年 9 月 23 日**发布 Codex CLI `0.156.1`，加入 GPT-6 Sol、Luna 的模型选择器条目。本书以 2026 年 9 月 24 日为资料截止日；安装前仍应查看[最新更新日志](https://learn.chatgpt.com/docs/changelog)。

```bash
codex --version
npm install -g @openai/codex@latest
codex --version
```

### 1. 迁移 `--full-auto` 的旧调用

`codex exec --full-auto` 是**已弃用的兼容入口**，当前会提示警告；不应写成“已移除并立即报错”。新的非交互调用明确指定沙盒：

```bash
codex exec --sandbox workspace-write "Review the current changes and report issues"
```

沙盒限定工作区访问，`--approve-for-me` 则把符合条件的越界请求送交自动审查；二者用途不同。[审批与安全说明](https://learn.chatgpt.com/docs/agent-approvals-security)

### 2. Hooks 使用受支持的事件结构

`config.toml` 的 Hooks 使用事件数组及处理器数组，不能写成 `[hooks] stop = "..."`。以下示例在任务结束时检查当前仓库的空白错误；首次启用时通过 `/hooks` 检查和信任来源。[Hooks 文档](https://learn.chatgpt.com/docs/hooks)

```toml
# ~/.codex/config.toml
[[hooks.Stop]]

[[hooks.Stop.hooks]]
type = "command"
command = "git diff --check"
```

### 3. 插件以当前目录中的 ID 安装

```bash
codex plugin list
codex plugin add --help
```

`codex plugin add` 接受目录中显示的 `PLUGIN@MARKETPLACE` 形式；`codex plugin install` 不是当前 CLI 子命令。安装前先从目录核对插件 ID 和来源。[Codex 更新日志](https://learn.chatgpt.com/docs/changelog)

### 4. 自动审批不绑定公开模型

`--approve-for-me` 将适用的审批请求交给自动审查。它不扩大沙盒权限，也不表示所有高风险操作一定获准，更不能推断后台固定使用 GPT-6 Luna。[权限说明](https://learn.chatgpt.com/docs/permission-modes)

```bash
codex --approve-for-me "Review the current changes and suggest fixes"
```

---

## 13.4 Skills 生态：把重复流程沉淀为资产

如果说 AGENTS.md 是项目的“通用宪法”，**Skills 就是某一类任务的“专项工艺流程”**：

```text
skills/
└── pr-review/
    └── SKILL.md      # 带 YAML frontmatter 的流程说明书
```

---

## 13.5 Codex Security：按已安装能力操作

Codex Security 是独立的安全审查能力。请在客户端的插件目录中查看可用的 **Codex Security** 插件及其说明，再选择适合仓库的扫描入口；不同版本可能提供不同命令。本书不把未经核实的 Daybreak 模型路由、网络安全评级或扫描参数写成可执行事实。[Codex Security 文档](https://learn.chatgpt.com/docs/security)

```bash
codex plugin list
```

---

## 13.6 3D 实践示例：GPT-6 Astra、Tripo3D 与 Blender

以下是开发者可自行搭建的工作流示例：用 Astra 整理资产要求，用 Tripo3D 等 3D 服务生成 GLB，再用 Blender 的 `bpy` 脚本做渲染检查。各环节是独立工具，**不代表 OpenAI 与第三方有官方集成，也不保证生成质量或完成时间**。目前引用的 OpenAI 官方 GPT-6 资料没有给出本书旧版所写的 BenchCAD 数字。[GPT-6 官方指南](https://developers.openai.com/api/docs/guides/latest-model)

### 1. 工作流边界

模型负责整理要求和辅助编写脚本；3D 服务负责生成网格；Blender 负责导入和渲染。最后由开发者审查几何、材质和性能，再决定是否用于产品。

```text
创意和比例要求 → GPT-6 Astra 整理提示词 → Tripo3D 生成 GLB
                                      ↓
                    Blender bpy 渲染与人工检查 → Three.js 展示
```

### 2. 四步操作演练

#### 步骤一：使用 GPT-6 Astra 结构化提纯 3D 提示词
在 Codex 终端或桌面端中向 GPT-6 Astra 发送需求，要求其以 3D 技术总监角色输出适合 Tripo3D 的提示词：

```text
你现在是资深 3D 技术美术总监。我要在 Web 项目中嵌入一个“赛博朋克风格的全息贩卖机”。
请输出一份专为 Tripo3D 优化的专业结构化 3D 生成提示词。

要求：
1. 突出主体轮廓（Silhouette）与几何对称性；
2. 强制指定拓扑质量标签（Clean quad topology, game-ready, low-poly）；
3. 声明 PBR 材质映射规范（Matte painted metal, glowing neon emissive panels）。
```

例如，可整理出以下供 3D 服务参考的提示词；实际生成结果需检查：

```text
Cyberpunk holographic vending machine, freestanding rectangular kiosk with chamfered edges.
Center features transparent acrylic dispenser bay with internal glowing LED strip.
Materials: Brushed matte dark gray titanium alloy (roughness: 0.35, metallic: 0.85),
glowing cyan neon emissive trim lines (emission strength: 5.0), scratched hazard decals on base.
Topology tags: clean quad-dominant topology, watertight mesh, manifold geometry, PBR 4K textures, game-ready asset.
```

#### 步骤二：Tripo3D 快速生成并导出标准化 GLB
在 [Tripo3D](https://www.tripo3d.ai/) 等服务中输入提示词，检查生成的网格和材质，再导出为 **`vending_machine.glb`**，放入项目的 `public/models/` 目录。生成速度和拓扑质量取决于服务与输入。

#### 步骤三：GPT-6 Astra 编写 Blender 自动化管线脚本（`pipeline.py`）
无需人工打开 Blender 费时调整，让 Astra 编写并运行完全无头的 Python 自动化脚本：

```python
import bpy
import math
from pathlib import Path

# 1. 初始化纯净环境（清空默认立方体与杂乱灯光）
bpy.ops.wm.read_factory_settings(use_empty=True)

# 2. 自动导入 Tripo3D 生成的 GLB 资产
asset_path = Path("public/models/vending_machine.glb").resolve()
if not asset_path.is_file():
    raise FileNotFoundError(asset_path)
bpy.ops.import_scene.gltf(filepath=str(asset_path))

# 3. 选中导入网格，自动计算边界盒并吸附至地面 (Z=0)
imported_objs = [obj for obj in bpy.context.selected_objects if obj.type == 'MESH']
if imported_objs:
    bpy.ops.object.select_all(action='DESELECT')
    for obj in imported_objs:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = imported_objs[0]
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    
    # 获取世界坐标系下的最低点并补偿对齐
    min_z = min([v[2] for obj in imported_objs for v in [obj.matrix_world @ v.co for v in obj.data.vertices]])
    for obj in imported_objs:
        obj.location.z -= min_z

# 4. 自动化标准影棚三点布光 (Studio 3-Point Lighting)
# 主光 (Key Light)
key_light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
key_light_data.energy = 500
key_light_data.size = 2.0
key_light = bpy.data.objects.new(name="Key_Light", object_data=key_light_data)
key_light.location = (3.0, -3.0, 4.0)
bpy.context.collection.objects.link(key_light)

# 辅光 (Fill Light)
fill_light_data = bpy.data.lights.new(name="Fill_Light", type='AREA')
fill_light_data.energy = 200
fill_light_data.size = 3.0
fill_light = bpy.data.objects.new(name="Fill_Light", object_data=fill_light_data)
fill_light.location = (-3.0, -2.0, 2.0)
bpy.context.collection.objects.link(fill_light)

# 轮廓光 (Rim Light)
rim_light_data = bpy.data.lights.new(name="Rim_Light", type='SUN')
rim_light_data.energy = 3.0
rim_light = bpy.data.objects.new(name="Rim_Light", object_data=rim_light_data)
rim_light.location = (0.0, 4.0, 3.0)
rim_light.rotation_euler = (math.radians(-45), 0, math.radians(180))
bpy.context.collection.objects.link(rim_light)

# 5. 设置展示摄像机
cam_data = bpy.data.cameras.new("Product_Camera")
cam_obj = bpy.data.objects.new("Product_Camera", cam_data)
cam_obj.location = (0, -4.5, 2.0)
cam_obj.rotation_euler = (math.radians(72), 0, 0)
bpy.context.collection.objects.link(cam_obj)
bpy.context.scene.camera = cam_obj

# 6. 配置 Eevee 快速无头验证渲染
bpy.context.scene.render.engine = 'BLENDER_EEVEE_NEXT'
bpy.context.scene.render.resolution_x = 1280
bpy.context.scene.render.resolution_y = 720
render_path = Path("public/renders/validation_preview.png").resolve()
render_path.parent.mkdir(parents=True, exist_ok=True)
bpy.context.scene.render.filepath = str(render_path)

bpy.ops.render.render(write_still=True)
print("✅ Blender 自动化巡检渲染完成：./public/renders/validation_preview.png")
```

在终端以无头后台方式运行：
```bash
blender --background --python pipeline.py
```
渲染完成后，把 `validation_preview.png` 提供给具备图像输入的 Codex 会话，请它检查可见的模型和光照问题；法线、UV 与性能仍需在 Blender 中人工核实。

#### 步骤四：一键嵌入 Web 端（React Three Fiber 商业化呈现）
最后，将该资产嵌入你的前端产品（如 Next.js 15 或 Vite 项目）中，供用户实时旋转查看：

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

## 13.7 成本优化与弹性分流

日常复杂编码从 `gpt-6-sol` 开始；范围明确的提取或小改动选 `gpt-6-luna`；跨应用、需要更高判断能力的任务评估 `gpt-6-astra`。先在自己的账号和客户端核对可用模型，再根据实际质量、时延和成本调整。[Codex 模型说明](https://learn.chatgpt.com/docs/models)

若项目使用不同供应商，先独立验证其会话格式与工具能力。配套的 [Codex Switch](https://github.com/aipmer/codex-switch) 属于第三方工具，其兼容性以该项目当前文档和实测为准。

---

## 13.8 本章迁移清单

```bash
codex --version
npm install -g @openai/codex@latest
codex --version
codex --model gpt-6-sol
codex exec --sandbox workspace-write "Review the current changes and report issues"
codex plugin list
```

1. 根据 [Codex 模型说明](https://learn.chatgpt.com/docs/models)核对账号和工作区的 GPT-6 可用性。
2. 搜索保存的 `gpt-5.4`、`gpt-5.4-mini` 和 `--full-auto` 配置；按各自适用范围迁移。
3. 若使用 Hooks，对照 [Hooks 文档](https://learn.chatgpt.com/docs/hooks)检查事件结构，并用 `/hooks` 审查信任状态。

---

## 排错速查

| 现象 | 检查动作 |
| :--- | :--- |
| 模型选择器没有 GPT-6 Sol 或 Luna | 核对 CLI 版本、账号套餐、推出进度和工作区管理员设置 |
| `--full-auto` 显示弃用警告 | 新的非交互调用改用 `--sandbox workspace-write`；旧入口仍保留兼容 |
| 配置的模型无法使用 | 区分 Codex 登录态与 API 权限，在 `/model` 选择当前可用模型 |
| Hooks 未执行 | 检查事件数组结构，并在 `/hooks` 查看是否需要信任 |

---

## 13.9 不随版本变化的原则

将可能变化的模型 ID 和 CLI 选项集中管理；每次升级先对照官方文档，再验证本机行为。目标、权限边界与验收条件仍应写清楚。

---

[ 🏠 主目录 ](/) | [ ⬅️ 上一章 (Ch.12) ](./ch12_commercialization.md) | [ 🌐 English ](../en/ch13_2026_frontier.md)
