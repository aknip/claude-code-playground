# Test project for Claude Code Frontend design


https://www.claude.com/blog/improving-frontend-design-through-skills


#   Quickstart
cd mockup
pnpm dev
http://localhost:5173


#   To start developing:
Import components like:
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from
'@/components/ui/card'




# Initial Setup
- just the ./claude/skills folder with the two skills: frontend-design and web-artifacts-builder (from Anthropic Repo)


# What i have done within Claude:
- @.claude/skills/web-artifacts-builder/ erstelle ein frontend repo "mockup"
- @.claude/skills/web-artifacts-builder/ erstelle eine Landing page in einem modernen, reduziereten design für eine
 KFZ-Versicherung 
- @.claude/skills/web-artifacts-builder/ Lies die folgende Spezifikation und erstelle eine Mockup-Version der beschriebenen Anwendung im Verzeichnis "mockup"  @Spezifikation-Howden-KFZ-Marktplatz.md 



# How was this installed?
- Installation nach https://ui.shadcn.com/docs/installation/vite
- Alle Komponenten hinzufügen: `npx shadcn@latest add --all``
- Playwright MCP added

## In progress...
npx @jpisnice/shadcn-ui-mcp-server --github-api-key YOURKEY_ghp_xxx
