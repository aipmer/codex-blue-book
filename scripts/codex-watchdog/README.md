# 📡 Codex Watchdog CLI Tool

`codex-watchdog` 是一个伴随《Codex 蓝皮书》电子书配套的极简命令行工具包，旨在帮助独立开发者快速打通本地开发宿主机与云端沙盒的网络穿透（Ch.03）和户外移动看护网关（Ch.08）。

---

## 📦 安装 (Installation)

由于目前该工具包处于项目内部，您可以在本地克隆本仓库后，直接通过 `npm link` 进行全局注册使用：

```bash
# 进入工具目录
cd scripts/codex-watchdog

# 安装依赖
npm install

# 本地链接为全局命令
npm link
```

---

## 🧭 指令说明 (Usage)

安装完成后，您可以在系统任意终端运行 `codex-watchdog` 触发以下子指令：

### 0. 交互式安装向导 (Interactive Onboarding)
首次使用推荐运行向导：自检环境（Node 版本、ngrok/ssh 可用性）→ 选择能力（网关/隧道）→ 收集参数 → 生成 `watchdog.config.json`，后续运行 `gateway`/`tunnel` 时自动读取该配置作为缺省值（命令行显式参数优先）：

```bash
codex-watchdog install
```

> ⚠️ `watchdog.config.json` 可能包含 VPS 地址等敏感信息，已加入根目录 `.gitignore`，请勿提交公共仓库。

### 1. 启动移动审批中转网关 (Sentinel Webhook Gateway)
本机中转网关只记录“批准 / 拒绝”决策，不直接部署、终止任务或回滚文件。默认仅监听 `127.0.0.1`；接入外部消息前需另配经过鉴权的转发层和独立的部署检查：

```bash
export CODEX_WATCHDOG_TOKEN="$(openssl rand -hex 32)"
codex-watchdog gateway --port 8080
```

### 2. 建立本地反向穿透隧道 (Reverse Tunneling Helper)
用于打通云端 Sandbox 与本地数据库（如 PostgreSQL）或微服务的链接通道：

#### 方案 A：使用 Ngrok 零配置穿透
```bash
# 穿透本地 5432 数据库端口
codex-watchdog tunnel --type ngrok --port 5432
```

#### 方案 B：使用 SSH 反向端口转发 (需要公网 VPS 中转)
```bash
# 将本地 5432 端口转发至公网机器上的 54320 端口
codex-watchdog tunnel --type ssh --port 5432 --vps user@your-public-vps.com --vps-port 54320
```

---

## 🔒 安全建议
* 网关只监听本机。外部消息须先经过 HTTPS、身份验证、任务绑定和有效期检查，再转发到本机。
* 严禁将含有敏感中转 Token 或账户秘钥的命令或配置文件上传到公共版本控制系统。

---

## 🌐 English Version

# 📡 Codex Watchdog CLI Tool

`codex-watchdog` is a lightweight command-line companion tool developed alongside the *Codex Blue Book* repository. It is designed to assist indie hackers and developers in establishing reverse network tunneling between local workstations and remote cloud sandboxes (Ch.03), and deploying a remote mobile webhook sentinel gateway (Ch.08).

---

## 📦 Installation

Since this package is currently located in the sub-repository folder, you can register and use it globally on your local machine using `npm link` after cloning this project:

```bash
# Navigate to the package directory
cd scripts/codex-watchdog

# Install package dependencies
npm install

# Link the package globally
npm link
```

---

## 🧭 Usage

Once linked, you can execute the `codex-watchdog` command from any terminal directory on your workstation:

### 0. Interactive Onboarding Wizard
For first-time setup, run the wizard: it checks your environment (Node version, ngrok/ssh availability), lets you pick capabilities (gateway/tunnel), collects parameters, and writes `watchdog.config.json`. Later `gateway`/`tunnel` runs read this file for defaults (explicit CLI flags always win):

```bash
codex-watchdog install
```

> ⚠️ `watchdog.config.json` may contain sensitive values like your VPS address. It is listed in the root `.gitignore` — never commit it to a public repository.

### 1. Launch Mobile Watchdog Webhook Gateway
The local relay only records approve or deny decisions; it does not deploy, stop an agent, or roll back files. It binds to `127.0.0.1`. External messages need a separately authenticated forwarding layer and deployment checks:

```bash
export CODEX_WATCHDOG_TOKEN="$(openssl rand -hex 32)"
codex-watchdog gateway --port 8080
```

### 2. Launch Reverse Tunneling Helper
Bridges the network barrier between a remote Codex Cloud Sandbox and your local infrastructure (e.g. database, microservices):

#### Option A: Zero-Config Tunneling via Ngrok
```bash
# Tunnel to local PostgreSQL port 5432
codex-watchdog tunnel --type ngrok --port 5432
```

#### Option B: SSH Reverse Port Forwarding (Requires Public VPS)
```bash
# Forward local port 5432 to port 54320 on your public VPS server
codex-watchdog tunnel --type ssh --port 5432 --vps user@your-public-vps.com --vps-port 54320
```

---

## 🔒 Security Practices
* The relay listens locally. External messages require HTTPS, authentication, task binding, and expiration checks before forwarding.
* Never commit raw access tokens, API credentials, or private keys to public version control.
