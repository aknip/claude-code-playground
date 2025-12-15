# Install


## Install Playwright MCP Server (globally)
1. Install globally (needed for MCP)
npm install -g @playwright/mcp@latest
2. Add browser binaries
npx playwright install
3. Add to config
claude mcp add playwright npx @playwright/mcp@latest



## Check Playwright MCP Server
1. Start Claude
claude
2. Within Claude: Check status
/mcp
3. When not connecting, ask Claude Code for help to fix it. Its often related to version conflicts / outdated versions of the globally installed Playwright


## In Claude: Execute a test
```
Navigate into this website "https://www.saucedemo.com/"
Login with user name as "standard_user" and password as "secret_sauce"
Verify that product page is loaded with products.
```


## Use the three Playwright Agents:
https://medium.com/@hbsasithadilshan/supercharge-playwright-automation-mcp-servers-playwright-ai-agents-github-copilot-in-action-6521a25ae61e





Optional: Konfiguration anpassen
Wenn du Feinheiten wie Headless/Browser-Typ etc. setzen willst, kannst du zusätzliche Args hinter  @playwright/mcp@latest  hängen, z.B.:
claude mcp add playwright \
  npx @playwright/mcp@latest --browser=chrome --headless




## Install Playwright (locally in project folder)
npm init playwright@latest



# Quick Start Playwright
npx playwright test
npx playwright test --headed
npx playwright test --ui
npx playwright show-report


# Test specidifications
- ./tests/example.spec.ts - Example end-to-end test
- ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
- ./playwright.config.ts - Playwright Test configuration

# Commands

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.



# Sources:

Tutorial:
https://medium.com/@hbsasithadilshan/supercharge-playwright-automation-mcp-servers-playwright-ai-agents-github-copilot-in-action-6521a25ae61e


https://playwright.dev/docs/intro

Claude Code + Playwright: 
https://www.youtube.com/watch?v=xOO8Wt_i72s


Browser-Use
https://medium.com/data-and-beyond/browser-use-explained-the-open-source-ai-agent-that-clicks-reads-and-automates-the-web-d4689f3ef012
