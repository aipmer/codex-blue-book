[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.06) ](./ch06_reasoning_steer.md) | [ ➡️ Next (Ch.08) ](./ch08_mobile_workflow.md) | [ 🌐 中文版 ](../chapters/ch07_desktop_computer_use.md)

# Ch.07 Validate Frontends in a Real UI

> **Problem**: Builds and unit tests cannot catch every overlap, overflow, or click failure.
>
> **Practice**: With the required tools and permissions, check viewport sizes, interactions, and screenshots.

In traditional UI fidelity reviews, the most time-consuming task for product managers and frontend developers is "pixel-eye" alignment verification:

“This button seems shifted 4 pixels to the left.”  
“This popup gets obscured by the virtual keyboard on mobile dimensions.”

In the 2026 Codex ecosystem, combining **ChatGPT Desktop (Codex Code Mode)** with OpenAI's latest frontier flagship **GPT-6 Astra** (which supports Computer Use workflows through tools), the agent can not only write code but also "use eyes and hands" to directly operate your macOS desktop: launching browsers, adjusting developer tool resolutions, and performing high-fidelity visual audits.

This chapter teaches you how to orchestrate Computer Use to automate design-fidelity inspection for frontend UI.

---

## A Way to Think About It: A 24/7 Tireless "Pixel Quality Inspector"

Think of Computer Use as hiring a dedicated UI QA inspector sitting right beside your desk:

```text
[Manual UI Inspection] ──> Holding Figma mockups in one hand, switching Chrome tabs with the other,
                           squinting to verify font sizes, resizing windows manually for breakpoints,
                           and manually refreshing pages after every CSS tweak (slow and exhausting).
[Computer Use Mode]    ──> You hand the inspector a task card: "Review /auth/login against design mockup."
                           The inspector puts on blue-light glasses (screenshot analysis),
                           takes the mouse (simulated clicks), measures a 16px offset,
                           updates the Tailwind classes in the editor, refreshes the browser,
                           and captures a clean screenshot to report completion.
```

Automated checks help locate UI problems; people still judge interaction quality and the final design.

---

## Practice: Start with Three Steps

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

```text
[Viewport Screenshot] ──> [GPT-5.6 Vision Analysis] ──> [Compute Pixel Coordinates (x:450, y:230)] ──> [Execute Mouse Click/Drag]
```

Combined with the 2026 **Appshots** feature (double-tap shortcut), visual snapshots and text contexts of the focused foreground window can be instantly injected into the conversation without manual screenshot uploads.

---

## 7.2 Practical Visual-Driven UI Review: Figma Mockup Alignment

This is the most practical automated scenario: **having Codex autonomously compare design mockups with local web rendering, auto-tuning styles.**

### 🎯 Goal
Compare local page `/auth/login` with design mockup screenshot `figma_login_mockup.png`, eliminating spacing discrepancies.

### 🛑 Constraints
- Only Tailwind utility class adjustments in `src/app/login/page.tsx` are permitted.
- Modifying existing DOM trees or semantic tags is prohibited.

### 🧪 Automated Execution Specs

Submit this prompt in the ChatGPT Desktop client:

```markdown
@Chrome Complete the UI visual inspection following these steps:

# 🎯 Goal
Compare and align browser rendering with figma_login_mockup.png.

# 🛑 Constraints
- Only use Tailwind utility classes in src/app/login/page.tsx.
- Do not change the DOM structure.

# 🚀 Execution Steps
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
# 📱 Mobile Viewport Inspection
1. Open Chrome DevTools.
2. Toggle Device Toolbar and select iPhone 15 Pro (393 x 852).
3. Verify the submit button does not drop below the first screen fold.
4. If obscured, reduce hero section padding to keep the CTA button immediately clickable.
```

Check pages at several viewport sizes and through real interactions. Record layout and usability issues, then adjust the styles based on what you observed.

---

## 7.5 Cross-Domain Extension: From Web Audits to Autonomous 3D Software Control (Blender Integration)

GPT-6 Astra can participate in desktop workflows when the client and tools support them. The Blender steps below are this book’s practice example and require checking actual permissions and application state; they do not rely on an unverified 3D benchmark figure. [Official GPT-6 guide](https://developers.openai.com/api/docs/guides/latest-model)

In a desktop environment, agents can autonomously interact with professional 3D creative suites like **Blender**:
- **Viewport Operations & Shading Checks**: The agent uses Computer Use to toggle viewports between Shading material preview and Rendered modes;
- **Inspecting Geometry & Shader Artifacts**: The agent takes viewport screenshots to identify inverted surface normals, missing UV maps, or washed-out lighting;
- **Spatial Pipeline Synergy**: Can be combined with the **Tripo3D + Blender + Astra** example workflow detailed in Ch.13, linking prompts, geometry generation, and render checks in an inspectable workflow.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Common Pitfall | Root Cause | Rapid Diagnosis & Fix Guide |
| :--- | :--- | :--- |
| `Computer Use is not supported on this platform` | OS is not macOS or user is in an unsupported region | Ensure macOS client is used, or switch to a Headless Puppeteer script approach as an alternative |
| `Failed to capture window: Permission denied` | macOS Screen Recording permissions missing or needs refresh | Open System Settings, toggle ChatGPT's "Screen Recording" permission off and on, and restart the client |
| **AI mouse clicks wild coordinates off target** | Browser zoom is not 100% or multi-display DPI scaling mismatch | Reset Chrome zoom to standard 100%, and position the target test window in the center of the primary display |

---

[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.06) ](./ch06_reasoning_steer.md) | [ ➡️ Next (Ch.08) ](./ch08_mobile_workflow.md) | [ 🌐 中文版 ](../chapters/ch07_desktop_computer_use.md)
