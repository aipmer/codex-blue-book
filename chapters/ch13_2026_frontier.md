---
title: "Ch.13 2026 前沿作战地图：GPT-6.2、Terra 与 Codex CLI 0.172 迁移指南 | Codex 蓝皮书"
description: "核对至 2026 年 11 月 26 日：详述 GPT-6.2 Astra/Sol 与 GPT-6.1 Terra 定价与选型、Codex CLI 0.172.0 新特性、11.30/12.23 退役预警及 3D 渲染管线。"
lastUpdated: 2026-11-26
---

[主目录](/) | [上一章 (Ch.12)](./ch12_commercialization.md) | [English](../en/ch13_2026_frontier.md)

# Ch.13 前沿瞭望：2026 Codex 生态全景升级

> **具体工程麻烦**：工具迭代极快，客户端入口、CLI 命令、模型换代（GPT-6.2 Astra / Sol / GPT-6.1 Terra / Luna）与旧接口退役密集到来，旧指南极易误导。
> **可运行实战代码与落地收益**：2026 年 11 月迁移命令作战清单（CLI 0.172.0 核对、MCP 懒启动与细粒度审批配置、11.30 与 12.23 退役排查脚本）。
> **社交传播 / 截图金句**：“工具每三个月换一轮血，心智才是护城河。这里没有空洞新闻，只有告诉你哪条命令和模型即将作废的作战地图。”

前面十二章建立的是一套不依赖具体版本的编排方法论。方法论要落地，必须踩在真实工具版本上。本版资料核对至 **2026 年 11 月 26 日**，覆盖 10 月 21 日之后的 GPT-6.2 与 GPT-6.1 Terra 模型升级、Codex CLI `0.172.0` 变更以及近期退役硬节点。

---

## 生活化直觉隐喻：超音速客机的新一代航电换装

不必对频繁的版本更新焦虑，用飞行员的视角看这次升级：

```Plaintext
【驾驶心智】 ──> 你的飞行手册没有变：依然是目标驱动（起飞与降落目标）、边界约束（航线与安全高度）。
【动力引擎】 ──> 动力系统升级为「GPT-6.2 Astra」（复杂工程与高阶推理旗舰）、
                 「GPT-6.2 Sol」（日常复杂编码主力）、「GPT-6.1 Terra」（视觉推理与桌面走查）
                 以及「GPT-6 Luna」（明确小任务巡航引擎）。
【驾驶舱屏】 ──> 线程深链跳转、斜杠命令 Tab 补全、MCP 懒启动与工具级审批人配置继续提升效率；
                 具体能力是否开放，仍以本机客户端与账号权限为准。
【自动副驾】 ──> 旧的 --full-auto 兼容入口已弃用；新调用显式声明沙盒与审批模式。
```

心智不变，新版本只会让你交付更稳。

---

## 新手极速上手 3 步走（无痛起步）

用 3 步完成你的 2026 年 11 月工具链体检与迁移：

1. **步骤一：一键排查即将退役的旧模型代号**  
   在项目根目录与本地配置运行扫描（重点检查将于 2026-12-23 从 Codex 退役的 `gpt-5.6` 及历史 `gpt-5.4`）：
   ```bash
   grep -rnE "gpt-5\.[3456]" ~/.codex/config.toml .
   ```
2. **步骤二：检查本机 CLI，按需升级至 0.172.0+**
   先核对当前版本，再决定是否执行全局更新：
   ```bash
   codex --version
   npm install -g @openai/codex@latest
   codex --version
   ```
3. **步骤三：迁移已弃用的 `--full-auto` 调用**
   在本地别名（aliases）与 CI 脚本中，将 `--full-auto` 替换为：
   ```bash
   codex exec --sandbox workspace-write "Review the current changes and report issues"
   ```

---

## 13.1 桌面端与移动端：影响日常协作的变化

在当前桌面客户端进入 Codex，并分别核对账号与工作区权限。不要把某一次客户端更新推导成“所有账号默认拥有全部功能”，实际开放范围按套餐与管理员策略生效。

- **Worktree 与任务引导**：App 26.928 起改善已挂载 worktree 的终端启动，并在追加指令时保留此前回答；后续版本持续改进批量移动聊天、审查导航与 Windows/WSL 恢复。[官方更新日志](https://learn.chatgpt.com/docs/changelog)
- **输入建议（Composer predictions）**：beta 阶段下按 `Tab` 接受可编辑草稿，发送仍是独立动作；适用于受支持地区、18 岁以上的个人 Pro 用户，在本地与 SSH 聊天中按当前可用模型开启（Settings → General → Composer）。[输入建议说明](https://learn.chatgpt.com/docs/features/composer-predictions)
- **手机接续**：近期 iOS 更新改进审批展示、加号菜单中的插件入口与排队任务恢复。手机审批前仍需确认目标电脑、仓库路径与操作内容。[移动端更新日志](https://learn.chatgpt.com/docs/changelog)

```bash
# 挂载或交接聊天前，检查实际仓库与 worktree。
git status --short
git worktree list
codex --version
```

各客户端支持的登录方式与功能范围分别核对；API Key 与 ChatGPT 订阅的访问、计费规则相互独立。[Codex 模型说明](https://learn.chatgpt.com/docs/models)

---

## 13.2 GPT-6.2 与 GPT-6.1 Terra：2026 年 11 月模型选型

截至 **2026 年 11 月 26 日**，11 月中旬推出的 **GPT-6.2 Sol** 与 **GPT-6.2 Astra** 已进入 Codex、ChatGPT Work 与 API 主线，10 月下旬推出的 **GPT-6.1 Terra** 补齐了高性价比视觉推理与 Computer Use 档位。日常复杂编码优先使用 `gpt-6.2-sol`（或保留对照的 `gpt-6.1-sol`），高难实现与架构验证选 `gpt-6.2-astra`，高频视觉走查选 `gpt-6.1-terra`，明确小任务用 `gpt-6-luna`。[Codex 模型说明](https://learn.chatgpt.com/docs/models)

| 模型 ID | 适合的工作 | `reasoning.effort` | 边界说明 |
| :--- | :--- | :--- | :--- |
| `gpt-6.2-astra` | 最复杂的跨代码、系统架构与深度验证任务 | `low`、`medium`、`high`、`xhigh`、`max` | 1.05M 上下文（922K 最大输入 / 128K 输出）；API 拒绝 `none` |
| `gpt-6.2-sol` | 日常复杂编码、多步智能体与跨应用工作流 | `low`、`medium`、`high`、`xhigh`、`max` | 本版示例默认值；与 `gpt-6.1-sol` 同价但新一代编码推理增强 |
| `gpt-6.1-terra` | 视觉推理、UI 像素还原与高阶 Computer Use | `low`、`medium`、`high`、`xhigh`、`max` | 2026 年 10 月下旬推出；视觉与桌面自动化性价比档 |
| `gpt-6.1-sol` | 上一代日常主力（保留用于配置迁移对照） | `low`、`medium`、`high`、`xhigh`、`max` | 工具调用需使用 Responses API |
| `gpt-6-luna` | 范围明确的修订、提取、摘要和高频小任务 | `none`、`low`、`medium`、`high`、`xhigh`、`max` | 复杂度超限时切回 Sol 或 Astra | 工具调用优先使用 **Responses API**，内置 `openai-docs` 技能也已更新 GPT-6.2 迁移指引。Codex 界面中的 Max/Ultra 依账号开放，其中 Ultra 通过子智能体并行协同，不是 API 的 `reasoning.effort` 枚举值。[API 模型目录](https://developers.openai.com/api/docs/models) · [GPT-6 迁移指南](https://developers.openai.com/api/docs/guides/latest-model)

**API 计费与 Codex 订阅用量分开看。** 下表为截至 2026 年 11 月 26 日的标准档每百万文本 token API 标价（不是 ChatGPT 订阅价，也不等同 Codex 额度换算）；超长上下文（>272K）、Batch 5 折、Fast（2×）与缓存写入另按[官方定价页](https://developers.openai.com/api/docs/pricing)核算。

| API 模型 | 输入 | 缓存输入 | 输出 | 备注 |
| :--- | ---: | ---: | ---: | :--- |
| `gpt-6.2-astra` | $8.00 | $0.40 | $40.00 | 较初代 `gpt-6-astra`（$10/$1/$50）直降，缓存读 95% 折扣 |
| `gpt-6.2-sol` | $2.00 | $0.10 | $10.00 | Ultrafast 优惠期 3× 至 2027-02-28（3 月起 6×） |
| `gpt-6.1-terra` | $1.00 | $0.05 | $5.00 | 视觉推理与高频 Computer Use 成本利器 |
| `gpt-6.1-sol` | $2.00 | $0.10 | $10.00 | 保留对照；缓存写入标准档 $2.50/MTok |
| `gpt-6-luna` | $0.10 | $0.01 | $0.50 | 轻量化路由与结构化提取首选 | **速度档位独立控制。** `gpt-6.2-sol` / `gpt-6.1-sol` 的 Ultrafast 面向高阶套餐与符合条件的企业工作区开放；订阅内与按量计费倍率不同，且支持美区及 EEA+瑞士推理数据驻留。建议先用 Standard 跑熟基准任务，再按延迟收益决定是否开启。[速度与计费说明](https://learn.chatgpt.com/docs/agent-configuration/speed)

**选择模型：**

```bash
codex --version
codex --model gpt-6.2-sol
codex exec -m gpt-6-luna "Review the current changes"
```

交互会话可用 `/model` 实时切换。若新模型尚未出现在选择器，先核对 CLI 版本与账号推出进度，不要把 API 可用等同于 Codex 登录态可用。

**本地默认配置示例：**

```toml
# ~/.codex/config.toml
model = "gpt-6.2-sol"
```

此示例只设置本地默认模型。`--approve-for-me` 是独立审批模式，不绑定固定公开模型。

### 已证实的生命周期与退役预警表（2026–2027）

| 日期 | 影响范围 | 官方记录与迁移建议 |
| :--- | :--- | :--- |
| 2026-03-26 | API | `gpt-4-0314`、`gpt-4-1106-preview`、`gpt-4-0125-preview` 停用 |
| 2026-05-12 | API | `dall-e-2`、`dall-e-3` 停用 |
| 2026-08-26 | API | Assistants API 停用，迁往 Responses API 与 Conversations API |
| 2026-08-31 | Codex 登录态 | `gpt-5.4`、`gpt-5.4-mini` 退役 |
| 2026-10-14 | Codex 登录态 | GPT-5.5 从 ChatGPT 登录态退役（API Key 会话不受该通知影响） |
| 2026-10-23 | API | 旧版 `gpt-3.5-turbo`、`gpt-4`、`gpt-4-turbo` 与早期 `o1` 快照退役 |
| 2026-10 下旬 | API / Codex / Work | **GPT-6.1 Terra** 发布（视觉推理与 Computer Use） |
| 2026-11 中旬 | API / Codex / Work | **GPT-6.2 Astra & GPT-6.2 Sol** 发布 |
| **2026-11-30** | **API / 平台工具** | **`/v1/prompts`、Agent Builder 停用；Evals Dashboard & API 转只读**（Prompt 迁入代码库，评测迁往 Promptfoo，编排迁往 Agents SDK） |
| **2026-12-23** | **ChatGPT Work / Codex** | **GPT-5.6 Sol 与 GPT-5.6 Terra 退役**，请提前切至 `gpt-6.2-sol` / `gpt-6.1-terra` |
| 2027-04-01 | API | `gpt-5.3-codex`、`gpt-5.4-nano`、`gpt-5.1` 停服，官方建议迁往 `gpt-6-sol` / `gpt-6-luna` 系列 | 随时核对 [API 退役公告](https://developers.openai.com/api/docs/deprecations) 与 [Codex 更新日志](https://learn.chatgpt.com/docs/changelog)，区分登录态退役与 API 下线的边界。

---

## 13.3 Codex CLI：以 0.172.0 为本次核对点

截至本书 **2026 年 11 月 26 日**核对时，官方更新日志列出的最新 CLI 为 **`0.172.0`**（较上版 `0.163.0` 迭代了多个高频工程改进）。这是带日期的核对点，本机安装版本可能不同。[更新日志](https://learn.chatgpt.com/docs/changelog)

**`0.163.0 → 0.172.0` 关键实用更新：**
- **线程深链导航（Thread-Link）**：支持在搜索结果与会话记录中直接点击线程链接，跳转打开历史会话与嵌套子代理。
- **终端交互提速**：按 `Tab` 自动补全斜杠命令参数（如 `/mcp lo` → `/mcp login`）；`Shift+Up` / `Shift+Down` 快速在任务组间切换（保留 `/config`、`/keymap`、`/daemon`）。
- **MCP 懒启动机制**：带缓存工具清单的可选 `stdio` MCP Server 默认在首次工具调用时才启动，避免挂载十几个 MCP 拖慢 CLI 启动速度。
- **工具级细粒度审批与企业接入**：可在 `config.toml` 中为单个连接应用工具指定审批 reviewer；App Server 客户端新增 **Amazon Bedrock Runtime** 原生接入选项。
- **会话恢复与跨系统修复**：`codex exec resume` 正确恢复此前保存的沙盒权限、仓库根目录与工作路径；修复跨 OS 远程会话路径丢失，并在流式响应中直接暴露 API 消费上限错误。

```bash
codex --version
npm install -g @openai/codex@latest
codex --version
```

### 1. 迁移 `--full-auto` 的旧调用

`codex exec --full-auto` 是**已弃用的兼容入口**，当前会打印警告。新的非交互调用显式指定沙盒：

```bash
codex exec --sandbox workspace-write "Review the current changes and report issues"
```

沙盒限定工作区访问，`--approve-for-me` 把符合条件的越界请求交由自动审查；二者职责独立。[审批与安全说明](https://learn.chatgpt.com/docs/agent-approvals-security)

### 2. Hooks 使用受支持的事件结构

`config.toml` 的 Hooks 使用事件数组及处理器数组，不能写成 `[hooks] stop = "..."`。以下示例在任务结束时检查当前仓库的空白错误；首次启用时通过 `/hooks` 核对信任来源。[Hooks 文档](https://learn.chatgpt.com/docs/hooks)

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

`codex plugin add` 接受目录中显示的 `PLUGIN@MARKETPLACE` 形式；`codex plugin install` 不是当前 CLI 子命令。安装前先从目录核对插件 ID 与来源。[Codex 更新日志](https://learn.chatgpt.com/docs/changelog)

### 4. 自动审批不绑定公开模型

`--approve-for-me` 将适用的审批请求交给自动审查。它不扩大沙盒权限，也不保证所有高风险操作获准，更不能推断后台固定使用 GPT-6 Luna。[权限说明](https://learn.chatgpt.com/docs/permission-modes)

```bash
codex --approve-for-me "Review the current changes and suggest fixes"
```

---

## 13.4 Skills 生态：把重复流程沉淀为资产

如果说 `AGENTS.md` 是项目的通用边界规则，**Skills 就是某一类重复任务的专项工艺单**：

```text
skills/
└── pr-review/
    └── SKILL.md # 带 YAML frontmatter 的流程说明书
```

---

## 13.5 Codex Security：按已安装能力操作

Codex Security 是独立的安全审查能力。请在客户端插件目录中查看可用的 **Codex Security** 插件及其说明，再选择适合仓库的扫描入口；不同版本命令可能变化。本书不把未经核实的内部路由或安全评级写成可执行事实。[Codex Security 文档](https://learn.chatgpt.com/docs/security)

```bash
codex plugin list
```

---

## 13.6 3D 实践示例：GPT-6.2 Astra、Tripo3D 与 Blender

以下是开发者可自行组合的 3D 工作流：用 Astra 整理资产要求，用 Tripo3D 等 3D 服务生成 GLB，再用 Blender 的 `bpy` 脚本做渲染检查。各环节为独立工具，**不代表 OpenAI 与第三方存在官方集成，也不保证生成质量或完成时间**。[GPT-6 官方指南](https://developers.openai.com/api/docs/guides/latest-model)

### 1. 工作流边界

模型负责整理要求和辅助编写脚本；3D 服务负责生成网格；Blender 负责导入和渲染。最终由开发者审查几何、材质和性能，再决定是否上线。

```text
创意和比例要求 → GPT-6.2 Astra 整理提示词 → Tripo3D 生成 GLB
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
print(" Blender 自动化巡检渲染完成：./public/renders/validation_preview.png")
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

日常复杂编码从 `gpt-6.2-sol`（或对照的 `gpt-6.1-sol`）开始；高频视觉走查与桌面自动化选用 `gpt-6.1-terra`；范围明确的提取与小改动选 `gpt-6-luna`；最复杂的架构与跨应用深度验证评估 `gpt-6.2-astra`。先在自己的账号与客户端核对可用列表，再按实际质量、延迟与预算微调。[Codex 模型说明](https://learn.chatgpt.com/docs/models)

若项目使用多供应商备份，先独立验证其会话格式与工具能力。配套的 [Codex Switch](https://github.com/aipmer/codex-switch) 属于第三方开源工具，其兼容性以项目当前文档和实测为准。

---

## 13.8 本章迁移清单

```bash
codex --version
npm install -g @openai/codex@latest
codex --version
codex --model gpt-6.2-sol
codex exec --sandbox workspace-write "Review the current changes and report issues"
codex plugin list
```

1. 根据 [Codex 模型说明](https://learn.chatgpt.com/docs/models)核对账号与工作区的 GPT-6.2 / GPT-6.1 Terra 可用性。
2. 扫描并清理保存的 `gpt-5.6`（2026-12-23 从 Codex 退役）、`gpt-5.4`、`/v1/prompts`（2026-11-30 停用）与 `--full-auto` 配置。
3. 若使用 Hooks 或 MCP，对照 [Hooks 文档](https://learn.chatgpt.com/docs/hooks)核对事件数组结构，并在 `0.172.0+` 中检查 `stdio` MCP 懒启动与工具审批配置。

---

## 排错速查

| 现象 | 检查动作 |
| :--- | :--- |
| 模型选择器没有 GPT-6.2 Sol 或 Terra | 核对 CLI 版本（0.172.0+）、账号套餐、推出进度和工作区管理员设置 |
| `--full-auto` 显示弃用警告 | 新的非交互调用改用 `--sandbox workspace-write`；旧入口仍保留兼容 |
| 配置的模型无法使用 | 区分 Codex 登录态与 API 权限，在 `/model` 选择当前可用模型 |
| Hooks 未执行 | 检查事件数组结构，并在 `/hooks` 查看是否需要信任 | ---

## 13.9 不随版本变化的原则

将可能变化的模型 ID 和 CLI 选项集中管理；每次升级先对照官方文档，再验证本机行为。目标、权限边界与验收条件仍应写清楚。

---

[主目录](/) | [上一章 (Ch.12)](./ch12_commercialization.md) | [English](../en/ch13_2026_frontier.md)

## 关联工具频道

查看 [PMER Codex 工具频道的版本演进](https://pmer.cn/ai-tools/codex/#updates)，快速了解近期变化与上手提醒；本章提供详细配置。本书资料核对至 2026 年 11 月 26 日。
