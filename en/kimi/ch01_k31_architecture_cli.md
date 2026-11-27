---
title: "Ch.01 The 2.8T Open-Weight Generation: Kimi K3.1 Pro & Kimi Code CLI"
description: "Understand Kimi K3.1 Pro (~2.8T MoE, 104B active, 1M Gated DSA context, MoonViT-V2), compare K3/K2.5 API economics ($2/$0.20/$10), and deploy TypeScript Kimi Code CLI and kimi web."
lastUpdated: 2026-11-26
---

[Back to Kimi Hub](/en/kimi/) | [Next: config.toml, kimi acp & Failover](/en/kimi/ch02_acp_config_failover)

# Ch.01 The 2.8T Open-Weight Generation: Kimi K3.1 Pro & Kimi Code CLI

> **Engineering pain solved**: Treating Kimi as a consumer web chat tool misses its real engineering leverage—an open-weight ~2.8T MoE model priced at \$2/\$10 (\$0.20 cached) paired with a fast TypeScript **Kimi Code CLI** (`kimi` / `kimi web` / `kimi acp`).
>
> **What you ship**: A verified November 26, 2026 architecture and pricing ledger comparing `kimi-k3.1-pro`, `kimi-k3`, and `kimi-k2.5`, plus a working local `kimi` TUI and `kimi web` setup.
>
> **Bottom line**: Kimi pairs flagship open weights, 90%-discounted 1M-token caching, cross-IDE ACP, and native Slides/3D pipelines inside one cost-efficient stack.

---

## 1.1 Three Architectural Pillars of Kimi K3.1 Pro

1. **Sparse MoE capacity (~2.8T total / ~104B active)**: Holds deep coding, financial, legal, and 3D CAD priors while activating only ~104B parameters per pass.
2. **1,048,576 (1M) native context via Gated DSA**: Gated DeepSeek Sparse Attention keeps KV-cache overhead and attention decay under control when ingesting multi-year filings or medium-sized codebases whole.
3. **MoonViT-V2 native-resolution vision encoder**: Encodes high-density UI screenshots and video recordings directly into multimodal space without destructive downscaling.

---

## 1.2 Generation & Pricing Ledger (Verified November 26, 2026)

| Model / Tier | Architecture & Weights | Input (/1M) | Cached Read (/1M) | Output (/1M) | Best Engineering Fit |
| :--- | :--- | ---: | ---: | ---: | :--- |
| **`kimi-k3.1-pro`** | ~2.8T MoE (104B active), 1M context, **Open Weights** | **\$2.00** | **\$0.20** (90% off) | **\$10.00** | Default for coding, `/swarm`, finance/legal audits, and 3D spatial coding |
| `kimi-k3.1-pro-highspeed` | Low-latency tier | ~\$4.00 | Discounted | ~\$20.00 | Latency-critical interactive coding and live demos |
| `kimi-k3` (predecessor) | 1M context, Open Weights | \$3.00 | \$0.30 | \$15.00 | Legacy benchmark comparisons and narrow exact-recall pipelines |
| `kimi-k2.5` | Lighter open weights | Lower GPU floor | Supported | Self-hosted | Department-scale offline clusters and domain LoRA fine-tuning | > **Immediate savings**: Any pipeline still pinned to `kimi-k3` (\$3/\$15) should evaluate upgrading to `kimi-k3.1-pro` (\$2/\$10, \$0.20 cached)—cutting cost by a third while upgrading sparse attention and coding/spatial capability.

---

## 1.3 Installing TypeScript Kimi Code CLI (`kimi` & `kimi web`)

Rewritten in TypeScript for fast startup and isolated subagent orchestration, **Kimi Code** runs in three modes—interactive terminal (`kimi`), local browser dashboard (`kimi web`), and editor protocol daemon (`kimi acp`):

```bash
# 1. Install TypeScript Kimi Code CLI (Node.js >= 20)
npm install -g @moonshot-ai/kimi-code

# 2. Export API key from your local secrets environment
export MOONSHOT_API_KEY="sk-your-moonshot-key"

# 3. Verify installation and launch in a repository root
kimi --version
cd /path/to/your-repo
kimi

# 4. Or launch the local visual session dashboard (loopback only)
kimi web --port 4310
```

---

## 3-Step Quickstart

1. **Verify CLI & caching**: Run `kimi --version` and execute one read-only architecture summary in a test repo.
2. **Try `kimi web`**: Launch `kimi web` to inspect side-by-side diffs and tool timelines in your browser.
3. **Apply the baseline config**: Copy [examples/kimi-k3-kit/config.toml](https://github.com/aipmer/codex-blue-book/blob/main/examples/kimi-k3-kit/config.toml) to `~/.kimi-code/config.toml` with `prompt_caching = true`.

---

## Pitfall Recovery Table

| Failure Mode | Root Cause | Immediate Fix |
| :--- | :--- | :--- |
| `kimi` throws Python traceback or lacks `acp` subcommand | Legacy Python `kimi-cli` precedes TypeScript CLI in `PATH` | Run `which -a kimi`, uninstall the legacy pip binary, and keep the npm/official TS binary |
| Multi-turn bill misses the \$0.20 cached read tier | Dynamic timestamps or random IDs injected at the top of system prompts bust prefix cache | Keep static `AGENTS.md` and reference docs at the prompt prefix; append dynamic queries at the end |
| `kimi web` unreachable from another device | Binds to `127.0.0.1` by default for safety | Never expose `0.0.0.0` directly; tunnel securely via `ssh -L 4310:127.0.0.1:4310` | ---

[Back to Kimi Hub](/en/kimi/) | [Next: config.toml, kimi acp & Failover](/en/kimi/ch02_acp_config_failover)
