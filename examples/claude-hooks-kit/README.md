# Claude Hooks & Subagents Starter Kit (`examples/claude-hooks-kit`)

配套《Claude 实战蓝皮书》Ch.02 / Ch.03 / Ch.07 的开箱即用工程护栏套件，包含：

- `.claude/settings.json`：`PreToolUse`、`PostToolUse` 与 `PreSkillShellCommand` 确定性门禁配置
- `.claude/hooks/block-dangerous-bash.sh`：拦截 `rm -rf`、`git push --force`、`git reset --hard`、`DROP TABLE` 与 `curl | sh`
- `.claude/hooks/protect-secrets.sh`：拦截直接读取或写入 `.env`、`credentials.env`、`.pem`、`.key`（允许 `.env.example`）
- `.claude/agents/arch-reviewer.md`：只读隔离上下文架构审查子代理模板

## 本地自测（无需安装额外依赖）

```bash
cd examples/claude-hooks-kit
chmod +x .claude/hooks/*.sh

# 1. 验证危险命令被确定性拦截（应返回退出码 2）
echo '{"tool_input":{"command":"git push --force origin main"}}' | .claude/hooks/block-dangerous-bash.sh; echo "exit=$?"

# 2. 验证正常测试命令放行（应返回退出码 0）
echo '{"tool_input":{"command":"npm test"}}' | .claude/hooks/block-dangerous-bash.sh; echo "exit=$?"

# 3. 验证敏感凭据文件读取被拦截（应返回退出码 2）
echo '{"tool_input":{"file_path":".env.local"}}' | .claude/hooks/protect-secrets.sh; echo "exit=$?"
```
