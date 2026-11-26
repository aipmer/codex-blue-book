# Kimi K3.1 Pro & Kimi Code Starter Kit

Companion runnable kit for **Kimi Practical Blue Book (v1.0.0)** on [book.pmer.cn/kimi/](https://book.pmer.cn/kimi/).

## What Is Inside

- `config.toml`: Ready-to-use `~/.kimi-code/config.toml` template for `kimi-k3.1-pro`, tiered subagents (`explore` / `plan` / `coder`), swarm concurrency throttling, and MCP servers.
- `scripts/verify_citations.py`: Zero-dependency Python verifier for regulated Finance / Legal / Medical pipelines. Verifies every quoted excerpt in an LLM JSON report verbatim against the source filing and exits with code `2` on any hallucinated citation.
- `scripts/freecad_turbine_blade.py`: Parametric turbine rotor hub & blade CAD generator for `freecadcmd` (includes `--dry-run` geometry math check usable with standard Python 3).

## Quick Verification

```bash
# 1. Run built-in self-test for citation verification (passes valid quotes, catches hallucinated quotes)
python3 scripts/verify_citations.py --self-test

# 2. Validate parametric turbine blade geometry math without FreeCAD installed
python3 scripts/freecad_turbine_blade.py --dry-run --blades 12 --outer-radius 85
```
