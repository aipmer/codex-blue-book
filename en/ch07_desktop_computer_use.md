---
title: "Ch.07 Desktop Computer Use & GPT-6.1 Terra Visual UI Auditing | Codex Blue Book"
description: "Use ChatGPT Desktop Code Mode with GPT-6.1 Terra and GPT-6.2 Astra to inspect live Chrome UIs, fix Figma spacing gaps, and automate Blender viewport checks."
lastUpdated: 2026-11-26
---

[Index](/en/) | [Prev (Ch.06)](./ch06_reasoning_steer.md) | [Next (Ch.08)](./ch08_mobile_workflow.md) | [中文版](../chapters/ch07_desktop_computer_use.md)

# Ch.07 Closing the Visual Loop: Automated Inspection and Design Fidelity with Desktop Computer Use

> **The Real Problem**: Manual pixel-peeping for UI styling, responsive layouts missing hidden modals, and headless CLI tests incapable of verifying real browser rendering and clicks.  
> **Tangible Output & Takeaway**: ChatGPT Desktop Code Mode setup; automated Figma-to-DOM screenshot visual diff workflows; and UI visual telemetry reproductions.  
> **Viral Screenshot Quote**: *"Still squinting at pixels to verify responsive UI? Let AI open the browser, measure dimensions, click buttons, and annotate visual discrepancies."*

Manual UI QA drains hours: a button sits 4 pixels off, a modal hides behind the mobile keyboard, and every CSS tweak forces another browser reload.

In the November 2026 Codex stack, pairing **ChatGPT Desktop (Code Mode)** with **GPT-6.1 Terra** for visual reasoning or **GPT-6.2 Astra** lets the agent open Chrome on macOS, switch viewports, inspect screenshots, and patch Tailwind styles directly.

This chapter covers safe Computer Use permissions and automated design-fidelity checks.

---

## Intuitive Metaphor: A 24/7 Tireless "Pixel Quality Inspector"

Think of Computer Use as hiring a dedicated UI QA inspector sitting right beside your desk:

```Plaintext
[Manual UI Inspection] ──> Holding Figma mockups in one hand, switching Chrome tabs with the other,
                           squinting to verify font sizes, resizing windows manually for breakpoints,
                           and manually refreshing pages after every CSS tweak (slow and exhausting).
[Computer Use Mode] ──> You hand the inspector a task card: "Review /auth/login against design mockup."
                           The inspector puts on blue-light glasses (screenshot analysis),
                           takes the mouse (simulated clicks), measures a 16px offset,
                           updates the Tailwind classes in the editor, refreshes the browser,
                           and captures a clean screenshot to report completion.
```

You never need to act as a human pixel-comparison machine again, freeing your energy for interaction design and core business logic.

---

## Beginner Quickstart (3 Easy Steps)

Run your first AI visual inspection in 3 simple steps:

1. **Step 1: Verify ChatGPT Desktop Permissions**  
   In macOS **System Settings → Privacy & Security**, ensure that **ChatGPT** is granted **Accessibility** and **Screen Recording** permissions.
2. **Step 2: Start Your Local Frontend Server**  
   Start your development server in the terminal (confirming it opens in your browser):
   ```bash
   npm run dev
   # Verify http://localhost:3000 is accessible
   ```
3. **Step 3: Summon `@Chrome` in Code Mode with an Inspection Task**  
   In the ChatGPT Desktop Codex mode prompt, enter:
   ```markdown
   @Chrome Open http://localhost:3000/auth/login, capture the main card area, check for horizontal viewport overflow, and adjust padding.
   ```

---

## 7.1 Safety First: Sandbox Boundaries and Application Whitelisting

Allowing an AI to operate your physical screen requires strict security fencing. To prevent the agent from accidentally clicking personal messaging apps or altering system files due to misrecognition, establish **application-level whitelisting**.

### 1. GUI Permission Whitelist

In the ChatGPT Desktop client:
- The first time Computer Use interacts with a specific application (e.g., Google Chrome), a system prompt will ask for confirmation;
- You can choose **“Just this once”** or **“Always allow”**;
- Strictly avoid whitelisting personal apps (e.g., WeChat, Slack, Mail, or the terminal itself);
- **Factory Hard Bounds**: Codex cannot operate the terminal, the ChatGPT client itself, or system administrative privilege dialogs (`sudo`), forming an OS-level hard isolation barrier.

### 2. Coordinate Positioning and Visual Perception

Computer Use operates via a robust perceptual feedback loop:

```Plaintext
[Viewport Screenshot] ──> [GPT-6.1 Terra / Astra Vision Analysis] ──> [Compute Pixel Coordinates (x:450, y:230)] ──> [Execute Mouse Click/Drag]
```

Combined with the 2026 **Appshots** feature (double-tap shortcut), visual snapshots and text contexts of the focused foreground window can be instantly injected into the conversation without manual screenshot uploads.

---

## 7.2 Practical Visual-Driven UI Review: Figma Mockup Alignment

This is the most practical automated scenario: **having Codex autonomously compare design mockups with local web rendering, auto-tuning styles.**

### Goal
Compare local page `/auth/login` with design mockup screenshot `figma_login_mockup.png`, eliminating spacing discrepancies.

### Constraints
- Only Tailwind utility class adjustments in `src/app/login/page.tsx` are permitted.
- Modifying existing DOM trees or semantic tags is prohibited.

### Automated Execution Specs

Submit this prompt in the ChatGPT Desktop client:

```markdown
@Chrome Complete the UI visual inspection following these steps:

# Goal
Compare and align browser rendering with figma_login_mockup.png.

# Constraints
- Only use Tailwind utility classes in src/app/login/page.tsx.
- Do not change the DOM structure.

# Execution Steps
1. Open Google Chrome and navigate to http://localhost:3000/auth/login.
2. Capture screenshot of the login form container.
3. Compare against assets/figma_login_mockup.png and identify padding discrepancies.
4. Update Tailwind classes in src/app/login/page.tsx to match spacing.
5. Reload page and confirm visual alignment within 2% delta.
```

---

## 7.3 Conceptual Execution Flow of Codex Automated Auditing

```bash
> Running visual review for /auth/login
> Step 1: Opening Google Chrome on http://localhost:3000/auth/login...
> Step 2: Taking screenshot. Saved to /tmp/screenshot_v1.png
> Step 3: Calling vision model for image comparison.
    Analysis: "Login card padding-top is 16px (pt-4), but mockup requires 32px (pt-8). Font size is text-base, needs text-xl."
> Step 4: Updating src/app/login/page.tsx via apply_patch...
> Step 5: Reloading Chrome tab and taking validation screenshot...
> Step 6: Vision check: "Visual delta is within 1.2% tolerance. Perfectly aligned."
> Task completed successfully.
```

---

## 7.4 Advanced: Sites In-Place Preview and Multi-Device Responsive Auditing

Leveraging the 2026 ChatGPT Desktop **Sites** feature alongside mobile breakpoint audits:

```markdown
@Chrome
# Mobile Viewport Inspection
1. Open Chrome DevTools.
2. Toggle Device Toolbar and select iPhone 15 Pro (393 x 852).
3. Verify the submit button does not drop below the first screen fold.
4. If obscured, reduce hero section padding to keep the CTA button immediately clickable.
```

Solo developers no longer need to resize browser windows back and forth, letting the AI handle 90% of visual inspection heavy lifting.

---

## 7.5 Cross-Domain Extension: From Web Audits to Autonomous 3D Software Control (Blender Integration)

GPT-6 Astra can participate in desktop workflows when the client and tools support them. The Blender steps below are this book’s practice example and require checking actual permissions and application state; they do not rely on an unverified 3D benchmark figure. [Official GPT-6 guide](https://developers.openai.com/api/docs/guides/latest-model)

In a desktop environment, agents can autonomously interact with professional 3D creative suites like **Blender**:
- **Viewport Operations & Shading Checks**: The agent uses Computer Use to toggle viewports between Shading material preview and Rendered modes;
- **Inspecting Geometry & Shader Artifacts**: The agent takes viewport screenshots to identify inverted surface normals, missing UV maps, or washed-out lighting;
- **Spatial Pipeline Synergy**: Pairs seamlessly with the **Tripo3D + Blender + Astra** 3D automation pipeline detailed in Ch.13, linking prompts, geometry generation, and render checks in an inspectable workflow.

---

## Troubleshooting & Pitfall Cheat Sheet

| Common Pitfall | Root Cause | Rapid Diagnosis & Fix Guide |
| :--- | :--- | :--- |
| `Computer Use is not supported on this platform` | OS is not macOS or user is in an unsupported region | Ensure macOS client is used, or switch to a Headless Puppeteer script approach as an alternative |
| `Failed to capture window: Permission denied` | macOS Screen Recording permissions missing or needs refresh | Open System Settings, toggle ChatGPT's "Screen Recording" permission off and on, and restart the client |
| **AI mouse clicks wild coordinates off target** | Browser zoom is not 100% or multi-display DPI scaling mismatch | Reset Chrome zoom to standard 100%, and position the target test window in the center of the primary display | ---

[Index](/en/) | [Prev (Ch.06)](./ch06_reasoning_steer.md) | [Next (Ch.08)](./ch08_mobile_workflow.md) | [中文版](../chapters/ch07_desktop_computer_use.md)
