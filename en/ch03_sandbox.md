[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.02) ](./ch02_setup.md) | [ ➡️ Next (Ch.04) ](./ch04_goal_driven.md) | [ 🌐 中文版 ](../chapters/ch03_sandbox.md)

# Ch.03 Diagnose Sandbox Access to Local Services

> **Problem**: localhost inside an isolated environment may not refer to the host database.
>
> **Practice**: Locate the network boundary with a connection test, then configure a controlled tunnel if needed.

When running database tests with Codex, the most frequent surprise for beginners is: while PostgreSQL runs perfectly in local Docker, the AI shouts `Connection refused to localhost:5432` in the terminal.

First identify whether the command runs on your host, in a container, or on a remote machine: `localhost` refers to a different machine in each case. This chapter tests the connection and adds controlled access only when needed.

---

## A Way to Think About It: The Cleanroom Containment and Umbilical Pipeline

Think of Codex's runtime environment as a "high-level sterile containment cleanroom":

```text
【Host Mac/PC】       ──> The Outside World: Holding your actual local database, secret keys, personal tools, and files.
【Codex Sandbox】     ──> The Sterile Cleanroom: Where the AI builds code and runs tests. Even if the code crashes, your host system is untouched.
【Reverse Tunneling】 ──> Umbilical Feed Pipeline: When the AI in the cleanroom needs to talk to the local host DB, you must bridge a dedicated pipe.
```

Without this pipe, the AI calling `localhost` inside the cleanroom reaches only bare walls, naturally throwing `Connection refused`.

---

## Practice: Start with Three Steps

Follow these 3 steps to connect the sandbox with your local database:

1. **Step 1: Confirm Local Service is Actively Listening**  
   Verify in terminal that Postgres is running locally on 5432:
   ```bash
   lsof -i :5432
   ```
2. **Step 2: Launch a Quick Port Tunnel (Ngrok or SSH)**  
   Open a temporary public tunnel for port 5432:
   ```bash
   ngrok tcp 5432
   # Output: tcp://0.tcp.ngrok.io:12345
   ```
3. **Step 3: Inject the Tunnel URL into Codex Task**  
   Pass the tunnel address into the environment and run:
   ```bash
   export DATABASE_URL="postgresql://postgres:password@0.tcp.ngrok.io:12345/dev_db"
   codex exec --sandbox workspace-write "npm run test:db"
   ```

---

## 3.1 Sandbox Network Barriers: Why Can't `localhost` Connect?

By default, the sandbox and your host machine are network-isolated:

```text
+───────────────────────────+                  +───────────────────────────+
|     Cloud Sandbox         |                  |    Local Machine (Mac)    |
| - App Code                |    (Isolated)    | - Docker container        |
| - localhost:5432 (Empty)  ───[ X ]─────────> | - PostgreSQL (port: 5432) |
+───────────────────────────+                  +───────────────────────────+
```

In current Codex CLI, sandbox boundaries are defined by the permission settings:
- `--sandbox read-only`: Analysis only, zero write permissions.
- `--sandbox workspace-write`: Recommended default; allows edits within the project workspace while protecting the host OS.

To connect with host databases or microservices, you must establish **port mapping and reverse tunneling**.

---

## 3.2 Practice: Setting Up Reverse Tunnels via SSH / Ngrok

### Method 1: SSH Reverse Port Forwarding (Recommended for Long Term)

```bash
# Forward local port 5432 to port 54320 on your public VPS
ssh -R 54320:localhost:5432 user@your-public-vps.com -N
```

Then configure the sandbox:

```bash
export DATABASE_URL="postgresql://postgres:password@your-public-vps.com:54320/dev_db"
```

### Method 2: Ngrok for Instant Tunneling (Zero-Server Option)

Run on host:

```bash
ngrok tcp 5432
```

Inject the printed `tcp://0.tcp.ngrok.io:12345` into Codex session.

---

## 3.3 Directory Mapping and Env Syncing

### 1. Security Isolation for Secrets

Never allow AI to commit raw `.env` files. Enforce in `.gitignore` and [AGENTS.md](../AGENTS.md):

```markdown
## 🛑 Hard Constraints
- Never sync, copy, or commit files matching *.env.
- Always use `src/config.ts` or environment variables for secret injection.
```

### 2. Sandbox Cache Clearing

To avoid ghost build bugs, define clean run commands in [AGENTS.md](../AGENTS.md):

```markdown
## 💻 Developer Commands
- **Clean Run**: `rm -rf node_modules/.cache .next/cache && npm run test`
```

---

## 🛡️ Troubleshooting & Pitfall Cheat Sheet

| Symptom | Root Cause | Instant Fix |
| :--- | :--- | :--- |
| `Connection refused to 127.0.0.1:5432` | Sandbox attempted to query localhost inside cleanroom | Confirm tunnel is active; use the reverse tunnel address instead of `localhost` |
| `ngrok session expired / reconnecting` | Free ngrok tunnel timed out or changed port | Restart ngrok and copy new address, or use `scripts/codex-watchdog` helper |
| `EACCES: permission denied` | Agent tried to write to protected system directories | Ensure `--sandbox workspace-write` is used and edits stay within project root |

---

[ 🏠 Index ](/en/) | [ ⬅️ Prev (Ch.02) ](./ch02_setup.md) | [ ➡️ Next (Ch.04) ](./ch04_goal_driven.md) | [ 🌐 中文版 ](../chapters/ch03_sandbox.md)
