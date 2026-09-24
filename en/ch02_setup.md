[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.01) ](./ch01_mindset.md) | [ ➡️ Next (Ch.03) ](./ch03_sandbox.md) | [ 🌐 中文版 ](../chapters/ch02_setup.md)

# Ch.02 Install Codex and Check Your Environment

> **Problem**: CLI, dependencies, or permissions can fail before a task starts.
>
> **Practice**: Install the CLI, verify its version and sign-in, then check desktop and mobile availability.

To do a good job, one must first sharpen one's tools. In "Real-World Product Talk", I often emphasize a core principle: **The first step of AI-Native development is configuring your "cockpit" to be sufficiently stable.** Many beginners rush into prompting or writing code with AI, only to end up with AI screaming errors in the terminal and wasting tokens because of local environment mismatches or incorrect permission settings.

This chapter will guide you step-by-step through configuring Codex's multi-device productivity matrix, including the Codex CLI, the unified ChatGPT Desktop App (Code Mode), and mobile alerts when a notification workflow is configured.

---

## A Way to Think About It: Your Three-Surface Mission Cockpit

Do not think of these surfaces as disconnected programs. Imagine commanding a space exploration ship:

```text
【Codex CLI】                ──> Main Engine Room: Mounted in your terminal, handling high-throughput batching, tests, and CI builds.
【ChatGPT Desktop Code Mode】──> Bridge Tactical Screen: Multi-repo diff reviews, Sites in-place preview, and visual audits.
【ChatGPT Mobile App】       ──> Commander's Pager: Monitoring build statuses away from your desk, approving actions via Guardian.
```

Each surface handles its specialized duty, freeing you from being chained to a keyboard.

---

## Practice: Start with Three Steps

You do not need complex network tunneling on day one. Follow these 3 steps to run your first task in 5 minutes:

1. **Step 1: Install the CLI and Authenticate**  
   Check that Node.js and npm are installed, then run:
   ```bash
   npm install -g @openai/codex@latest
   codex
   ```
   A browser window will open automatically. Sign in with your ChatGPT account to bind.
2. **Step 2: Check the Version and Choose a Current Model**
   Run `codex --version` first. At this edition's September 24, 2026 cutoff, the official changelog lists CLI `0.156.1`; your local version may differ. [Changelog](https://learn.chatgpt.com/docs/changelog)
   If your account has access, start with GPT-6 Sol without overwriting an existing `~/.codex/config.toml`:
   ```bash
   codex --version
   codex --model gpt-6-sol
   ```
   To make it the local default, set this key in your existing `~/.codex/config.toml`:
   ```toml
   model = "gpt-6-sol"
   ```
3. **Step 3: Run Your First Safe Sandbox Task**  
   Navigate to your project directory and execute:
   ```bash
   codex exec --sandbox workspace-write "Inspect current code quality and suggest improvements"
   ```

---

## 2.1 CLI Setup & Version Checks

The core of Codex CLI is written in Rust (`codex-rs`), but OpenAI distributes it via npm. **As a user, you do NOT need a Rust compiler**, check the current package requirement with `npm view @openai/codex@latest engines`.

### 1. Installation & Environment Check

Run in your terminal:

```bash
# 1. Check Node.js and the current npm package requirement
node --version
npm view @openai/codex@latest engines

# 2. Install the current stable CLI; check the official changelog for its version
npm install -g @openai/codex@latest

# Or use the official install script (macOS / Linux)
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Windows users can install via PowerShell:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

Verify the installation:

```bash
codex --version
```

### 2. Authentication: ChatGPT Account vs. API Key

Codex CLI offers two authentication paths:

- **Option A (Recommended / Default)**: Run `codex` directly to log in via browser. **ChatGPT Plus ($20/mo), Pro, Team, Business, Edu, and Enterprise plans all include Codex quotas**, offering the highest ROI for solo developers.
- **Option B (Pay-as-you-go / CI)**: Use an OpenAI API Key for CI/CD pipelines or headless servers.

For API-key login, follow the [Codex CLI documentation](https://learn.chatgpt.com/docs/codex/cli) and load the secret from secure storage. Do not put a real key in the repository or a tutorial.

### 3. Billing Guardrails & Overrun Protection

1. **OpenAI Platform Hard Limit (Crucial)**: Set a monthly Usage Limit (e.g., $50 for beginners) in your OpenAI dashboard. Even in an infinite loop, your budget is safeguarded.
2. **Match model to task**: Select a model available in Codex; start complex daily coding with `gpt-6-sol` when available. Check API bills separately from Codex subscription usage.
3. **Sandbox and automatic review**: Use `--sandbox workspace-write` for new non-interactive calls. `--approve-for-me` is a separate review mode; it does not guarantee approval or have a documented fixed Luna reviewer. [Permissions](https://learn.chatgpt.com/docs/permission-modes)

### 4. Optional: Evaluate a Third-Party Provider Switcher

Before switching model providers, check the target API compatibility and how local data is handled. **[Codex Switch](https://github.com/aipmer/codex-switch)** is a separate open-source tool maintained by this book's author, not an official OpenAI CLI feature. Its README documents supported versions, setup, and changes to local session files. Cross-provider resume is not guaranteed for future versions.

The current repository uses `codex-switch.sh`; it does not provide the `install.sh` or `codex-switch --to` commands previously shown here. Read the README and back up local sessions and configuration before setting up a provider. This command only checks the entry script after cloning; it does not switch providers:

```bash
git clone https://github.com/aipmer/codex-switch.git
cd codex-switch
test -f codex-switch.sh && sed -n '1,35p' README.md
```

---

## 2.2 Desktop Surface: ChatGPT Desktop App (Codex Code Mode)

> ⚠️ **Major Ecosystem Milestone**: In late 2026, the standalone Codex Desktop App was officially retired and merged directly into the **ChatGPT Desktop App**.

### 1. Installation & Accessing Code Mode

```bash
# macOS: Download ChatGPT.dmg and move to Applications
# Windows: Install via winget
winget install OpenAI.ChatGPT
```

Log in and click the **Codex** tab in the left sidebar to enter "Codex Code Mode".

**New Productivity Capabilities:**
- **Sites Hosting**: In-place web project creation, deployment, and preview with Annotations for point-and-click editing.
- **Multi-repo Review**: Inspect diffs across multiple folders in a single unified view.
- **Enhanced Browser**: Search browsing history directly and reference active Chrome tabs.

### 2. Computer Use Permissions (macOS)

To allow the agent to visually inspect your screen, grant two permissions under macOS "System Settings -> Privacy & Security":

```text
[macOS System Settings] -> [Privacy & Security]
  ├─ Accessibility  ────> Check [ChatGPT] (Allows simulating clicks/keystrokes)
  └─ Screen Recording ──> Check [ChatGPT] (Allows screenshot capture & Vision analysis)
```

**Security Boundaries**:
- You must explicitly approve each third-party application on first launch.
- ChatGPT cannot interact with Terminal itself, its own window, or `sudo` credential dialogs.

---

## 2.3 Mobile Sentinel: 24/7 Remote Oversight

1. **Native Task Syncing**: Signing into Codex with your ChatGPT account automatically mirrors running tasks to the ChatGPT Mobile App.
2. **Guardian Approvals & Alerts**: With Ch.08's mobile gateway, critical deployment gates trigger rich cards in Feishu or WeChat, enabling one-tap mobile approvals.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| `--full-auto` prints a deprecation warning | The old call remains a compatibility path | Use `--sandbox workspace-write` for new non-interactive runs |
| `SyntaxError: Unexpected token ...` (Node error) | Node.js version is older than 20 | Run `node -v`; upgrade using `nvm use 20` or `nvm install 20` |
| `Permission denied: Screen Recording` | Missing macOS screen permissions | Toggle ChatGPT under "System Settings -> Privacy & Security -> Screen Recording" and restart |
| `gpt-5.4` is unavailable with Codex sign-in | It retired from Codex with ChatGPT sign-in on August 31, 2026 | Select `gpt-6-sol` when your account has access |

---

[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.01) ](./ch01_mindset.md) | [ ➡️ Next (Ch.03) ](./ch03_sandbox.md) | [ 🌐 中文版 ](../chapters/ch02_setup.md)
