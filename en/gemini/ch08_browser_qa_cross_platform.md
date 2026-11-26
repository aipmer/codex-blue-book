---
title: "Ch.08 Automated Browser Visual QA, Chrome MV3 & Firebase / Cloud Run Delivery"
description: "Automate 3-viewport computed-CSS visual audits, ship compliant Chrome Manifest V3 side-panel extensions with Built-in AI fallback, and deploy globally on Firebase Hosting and Cloud Run."
lastUpdated: 2026-11-26
---

[Back to Gemini Hub](/en/gemini/) | [Prev: /swarm & Alpine Peak Case Study](/en/gemini/ch07_swarm_alpine_peak) | [Next: Commercial Multimodal SaaS](/en/gemini/ch09_multimodal_commercial_saas)

# Ch.08 Automated Browser Visual QA, Chrome MV3 & Firebase / Cloud Run Delivery

> 🎯 **Engineering pain solved**: Desktop layouts ship with hidden 390px mobile overflows and sub-12px labels, Chrome MV3 extensions break on service-worker sleep or fail Web Store review, and deployments skip real post-deploy health verification.
>
> 💡 **What you ship**: A copy-paste 3-viewport browser audit probe, a compliant Chrome MV3 Side Panel extension using local Chrome Built-in AI with Gemini 4 cloud fallback, and a Secret-Manager-backed Firebase + Cloud Run deploy flow.
>
> ⚡ **Bottom line**: A green build is not visual sign-off—wire computed browser measurements, minimal extension scopes, and live HTTP checks into every release.

---

## 8.1 Computed-CSS Browser Audits Across Three Viewports

Run this zero-dependency probe inside your Antigravity browser subagent across `390x844` (mobile), `768x1024` (tablet), and `1440x900` (desktop) to verify `overflow === 0`, `minFont >= 12`, and zero broken images:

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

  return { overflow, minFont: Number(minFont.toFixed(2)), minFontTarget, brokenImages };
})();
```

Fix shared container root causes (`min-width: 0`, `overflow-wrap: anywhere`, scrollable table wrappers)—never slap `overflow-x: hidden` on `body` to hide clipped text.

---

## 8.2 Chrome Manifest V3 Side Panel + Built-in AI Fallback

Follow MV3 rules strictly: no remote JS/`eval()`, persist state in `chrome.storage` (never global variables in ephemeral service workers), and request `activeTab` instead of `<all_urls>`:

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

Use Chrome's on-device **Built-in AI (`Summarizer`)** when available for zero-cost local inference, falling back seamlessly to your Cloud Run `gemini-4-hydrogen` endpoint:

```javascript
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
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken}` },
    body: JSON.stringify({ text: pageText.slice(0, 40000) })
  });
  if (!res.ok) throw new Error(`Cloud fallback failed: ${res.status}`);
  const data = await res.json();
  return { engine: "gemini-4-hydrogen", summary: data.summary };
}
```

---

## 8.3 Global Delivery with Firebase Hosting + Cloud Run

Serve static frontend assets from Firebase Hosting and run memory-intensive video transcoding or Live token minting on scale-to-zero Cloud Run backed by Secret Manager:

```bash
gcloud run deploy multimodal-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --timeout 120 \
  --set-secrets="GEMINI_API_KEY=gemini-api-key:latest"

firebase deploy --only hosting

# Independently verify production live status after deployment
curl -fsS -I https://your-app.web.app/ | head -n 5
curl -fsS https://your-app.web.app/api/health
```

---

## 🚀 3-Step Quickstart

1. **Run the 3-viewport probe**: Verify `overflow === 0` and `minFont >= 12` at `390/768/1440px` locally before deploying.
2. **Load unpacked MV3 extension**: Load `manifest.json` in `chrome://extensions` with Developer Mode enabled and confirm zero CSP console warnings.
3. **Verify live production**: After `gcloud run deploy` and `firebase deploy`, confirm HTTP 200 on both `/` and `/api/health` in an incognito browser session.

---

## 🛡️ Pitfall Recovery Table

| Failure Mode | Root Cause | Immediate Fix |
| :--- | :--- | :--- |
| Extension drops auth state after 30s idle | MV3 service worker terminated in-memory variables | Persist tokens in `chrome.storage.session` / `local` and replace `setInterval` with `chrome.alarms` |
| 2-minute video request fails at 60s on Cloud Run | Default request timeout too short for synchronous media work | Raise `--timeout 120`, or upload directly to GCS and process asynchronously via queue |
| Mobile flex row pushes CTA button off-screen | Missing `min-width: 0` or `overflow-wrap: anywhere` on flex children | Fix shared flex CSS and re-run the `390px` viewport probe |

---

[Back to Gemini Hub](/en/gemini/) | [Prev: /swarm & Alpine Peak Case Study](/en/gemini/ch07_swarm_alpine_peak) | [Next: Commercial Multimodal SaaS](/en/gemini/ch09_multimodal_commercial_saas)
