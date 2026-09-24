[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.07) ](./ch07_desktop_computer_use.md) | [ ➡️ Next (Ch.09) ](./ch09_legacy_code.md) | [ 🌐 中文版 ](../chapters/ch08_mobile_workflow.md)

# Ch.08 Route Build Alerts and Approvals to Mobile

> **Problem**: Build failures or pending approvals can go unnoticed away from the desk.
>
> **Practice**: Set up an alert and human approval flow, then verify delivery, identity, and outcomes.

Build outcomes and pending approvals still need attention when you leave your computer. This chapter connects alerts and separates automatic review from human decisions.

The example sends GitHub Actions failures to Feishu and demonstrates a local decision relay. `--approve-for-me` reviews eligible permission requests; production releases still require separate checks of project, version, and deployment result.

---

## A Way to Think About It: Alerts and Approvals Are Separate Flows

Automatic checks find failures, notifications bring results to your phone, and an authorized system must handle approvals:

```text
GitHub Actions check fails ──> Feishu alert ──> Review the run log on mobile
Codex permission request ──> Current sandbox and approval policy ──> Human review if required
Production deploy request ──> Verify project, version and approver ──> Separate deploy and result check
```

Configure and verify each flow separately. Receiving an alert or recording approval does not mean a deployment succeeded.

---

## Practice: Start with Three Steps

Set up your mobile alert notification channel in 3 simple steps:

1. **Step 1: Create a Feishu Custom Bot**
   Add a bot in your group chat settings and copy its incoming Webhook URL.
2. **Step 2: Send a Test Alert Card from Terminal**  
   Set `FEISHU_WEBHOOK_URL` in your terminal, then use curl to test notification delivery:
   ```bash
   curl -X POST -H "Content-Type: application/json" \
     -d '{"msg_type":"text","content":{"text":"Codex test alert: please confirm this message reaches your phone."}}' \
     "$FEISHU_WEBHOOK_URL"
   ```
3. **Step 3: Run a Check in the Sandbox**
   After confirming the tests do not modify production data, run the task in a workspace sandbox:
   ```bash
   codex exec --sandbox workspace-write --approve-for-me "Run full regression suite and refactor legacy types"
   ```

---

## 8.1 Two-Tier Sentinel Dispatch Architecture

The diagram shows a suggested routing pattern. Automatic review depends on the actual permission policy; a phone notification does not itself grant deployment permission:

```text
[Project checks] ──(failure)──> [Feishu alert] ──> [Review logs on mobile]
[Codex permission request] ──> [Current sandbox and approval policy] ──> [Human handles pending requests]
[Deployment request] ──> [Identity and task checks] ──> [Human approval] ──> [Separate deployment verification]
```

Companion open-source references:
- Related reference project: [plugins-codex-feishu](https://github.com/aipmer/plugins-codex-feishu)
- Minimal Local Tunnel Gateway: [scripts/codex-watchdog](../scripts/codex-watchdog/README.md)

---

## 8.2 Practice: GitHub Actions Build Failures and Webhook Setup

In a Node.js project with an `npm test` script, create `.github/workflows/codex-watchdog.yml`. Save the Feishu bot URL as a repository secret named `FEISHU_WEBHOOK_URL`. This sends a short alert when checks fail and keeps the run marked as failed; inspect Actions logs for details:

```yaml
name: Codex Agent Watchdog

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  agent-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Run Project Checks
        id: check
        continue-on-error: true
        run: |
          npm ci
          npm test

      - name: Push Fail Notice to Mobile
        if: steps.check.outcome == 'failure'
        env:
          FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}
        run: |
          curl -fsS -X POST -H 'Content-Type: application/json' \
            -d '{"msg_type":"text","content":{"text":"Project checks failed: open GitHub Actions to review this run."}}' \
            "$FEISHU_WEBHOOK_URL"

      - name: Keep Check Failure Visible
        if: steps.check.outcome == 'failure'
        run: exit 1
```

---

## 8.3 Mobile Bidirectional Interaction and Remote Approval

### 1. Scenario: Production Deployment Approval Gate

This illustrates a notification that would require a separate approval system. The preceding Actions alert and local relay do not send this card automatically:

```text
🚨 [Codex Auth Requested]
Project: pmer-cn-saas
Action: Deploy to production (Vercel)
Change summary: Implemented Stripe subscription webhook in /api/stripe.
Tests: 12 passed, 0 failed.
[Directive Command]: Reply "1" to approve deployment, "0" to record a denial; review any further action manually.
```

### 2. Check the Local Decision Relay

The companion `scripts/codex-watchdog/lib/gateway.js` only records a decision in a temporary signal file. **It does not deploy, terminate Codex, or roll back Git.** It binds to `127.0.0.1` and requires a random token. A Feishu integration needs an authenticated forwarding layer; the deployment controller must also validate project, task, and decision age.

```bash
cd scripts/codex-watchdog
npm ci
export CODEX_WATCHDOG_TOKEN="$(openssl rand -hex 32)"
node bin/cli.js gateway --port 8080 &
gateway_pid=$!
```

In the same terminal, send a local test request. A `denied` response means the decision was recorded; no files are deleted. Stop the relay after the check:

```bash
curl -fsS http://127.0.0.1:8080/api/mobile-reply \
  -H "Authorization: Bearer $CODEX_WATCHDOG_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"userMessage":"0"}'
kill "$gateway_pid"
```

---

## 8.4 Related Reference Project: Codex Feishu Sentinel

The author-maintained **[plugins-codex-feishu (Feishu Assistant)](https://github.com/aipmer/plugins-codex-feishu)** repository offers a reference for Feishu notifications and approvals. Check its current README, required permissions, and test results before use.

Check these capabilities separately when relevant:

1. **Daily Inspection & Sentinel Reports (Quick Start)**:
   - Check the report's data source, recipient, and schedule, then send it to a test chat.
2. **Mobile Alerts & Two-Way Approval (Offline Orchestration)**:
   - Check what triggers alerts, whether they arrive, and how mobile replies are received.
   - Submit a decision on mobile; the deployment controller must check identity, project, task, and expiration. Denial does not automatically roll back code.
3. **Knowledge Base Persistence (Team Collaboration)**:
   - If you need Feishu documents or Bitable, verify app scopes and actual writes first.

> **Before setup**: If the companion project provides a Feishu app manifest, still check its scopes, event subscriptions, and connection settings in the Feishu Open Platform, then test the alert in a non-production chat.

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Common Pitfall | Root Cause | Rapid Diagnosis & Fix Guide |
| :--- | :--- | :--- |
| **Phone does not receive Webhook messages** | Bot security settings require keyword or IP whitelist | In bot settings under "Security", add matching keyword (e.g., `Codex`) or configure request signature |
| **Replied "1" but nothing deployed** | Local relay only records a decision | Check the authenticated forwarding layer, task validation, and separate deployment controller |
| **Phone receives repeated approval messages** | The same request is sent again | Give requests unique IDs, deduplicate them, and set an expiration time |

---

## 8.5 Keep Notifications and Confirmation Human

Running repeatable checks in CI and sending failures to a phone can reduce time spent waiting at a desk. Production releases and data changes still need an authorized person to review the specific request and verify the outcome.

---

[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.07) ](./ch07_desktop_computer_use.md) | [ ➡️ Next (Ch.09) ](./ch09_legacy_code.md) | [ 🌐 中文版 ](../chapters/ch08_mobile_workflow.md)
