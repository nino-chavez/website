# Agents Index (Project + Home)

This document helps orient development by listing agents available both in this project and in your home directory (if accessible).

- Project-embedded agents live in:
  - `.claude/agents/`
  - `.agent-os/agents/`
- Home agents live in: `~/.claude/agents/` (not checked into this repo)

To regenerate a list quickly:

```bash
pnpm agents:list
```

Notes:
- Home directory agents are not part of the repository and may differ per machine.
- Consider copying or adapting critical home agents into `.claude/agents/` to ensure collaborators have consistent capabilities.
