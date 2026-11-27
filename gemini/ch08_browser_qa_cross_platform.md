---
title: "Ch.08 浏览器视觉自动走查与 Web / Chrome MV3 / 移动跨端交付"
description: "实战 Antigravity 浏览器子代理三视口视觉巡检闭环，按 Manifest V3 严格 CSP 护栏开发结合浏览器内置 AI 的 Chrome 扩展，并用 Firebase 与 Cloud Run 完成全球交付。"
lastUpdated: 2026-11-26
---

[返回 Gemini 专页](/gemini/) | [上一章：多智能体协作架构与 Alpine Peak 复盘](/gemini/ch07_swarm_alpine_peak) | [下一章：多模态商业化闭环实战](/gemini/ch09_multimodal_commercial_saas)

# Ch.08 浏览器视觉自动走查与 Web / Chrome MV3 / 移动跨端交付

> **本章解决的工程麻烦**：代码在桌面 1440px 看着挺好，一发线上就被用户截图反馈“iPhone 竖屏右侧切掉一半”“平板导航换行把按钮挡住”；做 Chrome 扩展时被 Manifest V3 的 CSP 报错和 Service Worker 休眠折磨到怀疑人生；上线还要自己手配 HTTPS、鉴权和边缘缓存。
>
> **实战落地收益**：搭建“本地预览 → 浏览器子代理三视口计算值巡检 → 定位 CSS 根因并复测”的零盲区视觉闭环；按 MV3 最新规范开发可提审的 Chrome 侧边栏智能扩展；跑通 **Firebase Hosting + Cloud Run** 全球部署与线上验活。
>
> **一句话结论**：构建通过不等于视觉验收通过；只有把浏览器真实计算值、扩展权限最小化和云端健康检查接进交付流水线，跨端才不会靠运气。

前几章解决了“写得快”，这一章解决“发出去不翻车”。Google 生态在终端交付侧有一个常被低估的组合拳：**内置浏览器自动化巡检 + Chrome Manifest V3 扩展生态 + Firebase / Cloud Run 托管底座**。

---

## 8.1 浏览器视觉自动走查：不靠肉眼猜，用计算值说话

很多开发者让 AI“检查一下页面布局”，AI 只是把 `.css` 文件读了一遍就回复“布局合理”。真正的视觉闭环必须让浏览器子代理打开真实渲染后的页面，量取三个硬指标：

1. **三视口零横向溢出**：在 `390×844`（窄屏手机）、`768×1024`（平板）和 `1440×900`（桌面）下，`document.documentElement.scrollWidth - document.documentElement.clientWidth === 0`。
2. **最小可见字号红线**：遍历所有可见文本节点，`parseFloat(getComputedStyle(el).fontSize) >= 12`。
3. **媒体完整与路由状态**：所有 `<img>` 满足 `complete && naturalWidth > 0`；站内切换路由不触发意外整页重载，不丢失查询参数和语言状态。

下面这段浏览器端评测探针可以直接嵌入你的自动化验收脚本或 Antigravity 视觉 Skill：

```javascript
(() => {
  const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  let minFont = 999;
  let minFontTarget = "";

  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || parseFloat(s.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;
    const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
    if (!hasText) continue;
    const size = parseFloat(s.fontSize);
    if (size > 0 && size < minFont) {
      minFont = size;
      minFontTarget = `${el.tagName}.${String(el.className).slice(0, 24)}:${el.textContent.trim().slice(0, 18)}`;
    }
  }

  const brokenImages = [...document.querySelectorAll("img")]
    .filter((img) => img.offsetParent !== null && (!img.complete || img.naturalWidth === 0))
    .map((img) => img.getAttribute("src"));

  return {
    overflow,
    minFont: Number(minFont.toFixed(2)),
    minFontTarget,
    brokenImages
  };
})();
```

> **修复铁律**：一旦测出某个容器在 `768px` 溢出，先查共享组件和 CSS 级联的共同根因（例如未设 `min-width: 0` 的 Flex 子项、无滚动包裹的宽表格、写死宽度的输入框），绝不用在 `body` 上强行加 `overflow-x: hidden` 掩盖裁切。

---

## 8.2 Chrome Manifest V3 侧边栏扩展实战（含内置 AI 降级策略）

Chrome 扩展是独立开发者冷启动最快的载体之一，但 **Manifest V3** 有三条铁律踩中一条就会被 Chrome Web Store 拒审或线上失灵：
- 禁止远程托管 JS 代码与 `eval()`；
- 后台 `service_worker` 随时会被浏览器休眠，状态必须落盘到 `chrome.storage.local` / `session`，不能存全局变量；
- 权限最小化：能用 `activeTab` 就绝不申请 `<all_urls>`。

下面是一个完整可加载、零违规权限的 Chrome Side Panel 扩展清单（`manifest.json`）：

```json
{
  "manifest_version": 3,
  "name": "Page Audit Sidekick",
  "version": "1.0.0",
  "description": "Summarize the active tab locally with Chrome Built-in AI or your Cloud Run Gemini 4 gateway.",
  "permissions": ["sidePanel", "activeTab", "storage"],
  "host_permissions": ["https://api.yourdomain.com/*"],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "action": {
    "default_title": "Open Page Audit Sidekick"
  }
}
```

在 `sidepanel.js` 中，优先尝试 Chrome 浏览器端本地 **Built-in AI（Prompt API / Summarizer API）** 实现零延迟、零 API 成本处理简单摘要；当设备不支持或需要深度跨页分析时，平滑降级到你的 Cloud Run Gemini 4 接口：

```javascript
// sidepanel.js — 本地 Built-in AI 优先，云端 Gemini 4 兜底
async function summarizePageText(pageText, userToken) {
  if ("Summarizer" in self) {
    const availability = await self.Summarizer.availability();
    if (availability === "available") {
      const summarizer = await self.Summarizer.create({ type: "key-points", length: "medium" });
      try {
        return { engine: "chrome-built-in", summary: await summarizer.summarize(pageText) };
      } finally {
        summarizer.destroy();
      }
    }
  }

  const res = await fetch("https://api.yourdomain.com/v1/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`
    },
    body: JSON.stringify({ text: pageText.slice(0, 40000) })
  });
  if (!res.ok) throw new Error(`Cloud fallback failed: ${res.status}`);
  const data = await res.json();
  return { engine: "gemini-4-hydrogen", summary: data.summary };
}
```

---

## 8.3 Firebase + Cloud Run 极速全栈交付与线上验活

对多模态 Web / 扩展后端来说，**Firebase Hosting（全球静态 CDN + Firebase Auth / Firestore）+ Cloud Run（按请求秒级扩缩容、支持长超时 WebSocket 与 FFmpeg 视频转码）** 是最省心的 Google 原生部署组合：

- 静态前端走 Firebase Hosting，无需操心 SSL 与缓存头；
- 需要大内存视频抽帧、Live API 短效 Token 签发或 Playwright 巡检的接口走 Cloud Run，闲时缩容到 0 不花钱；
- 生产密钥统一放 **Google Secret Manager**，在部署时挂载为运行时环境变量。

```bash
# 1. 构建并部署多模态后端到 Cloud Run（注入 Secret Manager 中的 GEMINI_API_KEY）
gcloud run deploy multimodal-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --timeout 120 \
  --set-secrets="GEMINI_API_KEY=gemini-api-key:latest"

# 2. 部署前端静态站点与 /api/** 反向代理重写规则
firebase deploy --only hosting

# 3. 线上生效独立核验（构建通过 ≠ 线上生效）
curl -fsS -I https://your-app.web.app/ | head -n 5
curl -fsS https://your-app.web.app/api/health
```

---

## 新手极速上手 3 步走

1. **跑一次三视口探针**：在本地项目启动预览服务，让 Antigravity 浏览器子代理依次在 `390px / 768px / 1440px` 执行 8.1 节探针，先清零所有溢出与 `<12px` 字号。
2. **加载本地 MV3 骨架**：将 `manifest.json` + `sidepanel.html` + `sidepanel.js` 放入目录，在 `chrome://extensions` 打开开发者模式点击“加载已解压的扩展程序”，验证侧边栏正常打开且零控制台 CSP 报错。
3. **验证部署与生效分离**：首次部署 Cloud Run 后，不要只看终端的 `Service URL`，务必真实 `curl` 健康检查接口并在隐身窗口打开正式域名确认鉴权与资源加载全部正常。

---

## 翻车自救与避坑速查表

| 故障现象 | 致命根因 | 即刻自救方案 |
| :--- | :--- | :--- |
| Chrome 扩展放后台 30 秒后登录态或定时器全丢 | MV3 `service_worker` 空闲自动销毁，状态错存在内存变量或 `setInterval` 里 | 所有状态改存 `chrome.storage.session` / `local`，定时任务改用 `chrome.alarms` API |
| Cloud Run 处理 2 分钟视频上传时在 60 秒被直接掐断 | Cloud Run 默认请求超时或前端反向代理超时偏短，且直接同步阻塞处理长视频 | 将 `--timeout` 调至 `120–300`，更长视频改为直传 GCS 后通过异步队列处理并轮询状态 |
| 移动端实测文字换行把按钮挤出屏幕，桌面端却一切正常 | Flex 容器子元素未设 `min-width: 0` 或长 URL 缺少 `overflow-wrap: anywhere` | 在共享布局样式补充 `min-width: 0; overflow-wrap: anywhere;`，再重跑 `390px` 视口探针复验 | ---

[返回 Gemini 专页](/gemini/) | [上一章：多智能体协作架构与 Alpine Peak 复盘](/gemini/ch07_swarm_alpine_peak) | [下一章：多模态商业化闭环实战](/gemini/ch09_multimodal_commercial_saas)
