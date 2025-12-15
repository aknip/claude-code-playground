
=> for details see CLAUDE.md

# shadcn/ui

This is a React + TypeScript + Vite frontend project used as a playground for testing Claude Code's frontend design capabilities. It uses shadcn/ui components (some of them based on Radix UI primitives) and Tailwind CSS 4.1 for styling.


## Quickstart
pnpm dev
http://localhost:5173



# NOTES

## Agents
.claude/agents/design-review.md
=> uses documentation in folder `_specs`

## Commands
.claude/commands/design-review.md
=> uses documentation in folder `_specs`

## Skills
.claude/skills/frontend-design

## MCP Configuration
add github key to shadcn MCP in `.mcp.json`
```
"shadcn-ui": {
    "command": "npx",
    "args": ["@jpisnice/shadcn-ui-mcp-server", "--github-api-key", "YOUR KEY ghp_"]
}
```


## How was this built 

- Installation: https://ui.shadcn.com/docs/installation/vite
- Add all components: `npx shadcn@latest add --all``
