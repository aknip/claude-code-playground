# Command für Powerpoint Präsentation


Libraries: 

- https://sli.dev/guide
- MCP:
    - https://github.com/raykuonz/slidev-mcp-server
    - https://github.com/LSTM-Kirigaya/slidev-mcp
    - https://github.com/adolfosalasgomez3011/slidev-builder-mcp

- https://gitbrent.github.io/PptxGenJS/


## Slidev

To start the slide show:

- install `pnpm install`
- start server `pnpm dev`
- visit `http://localhost:3030`

Edit the [slides.md](./slides.md) to see the changes.


## Slidev Skills

- Copied from https://github.com/slidevjs/slidev/tree/main/skills


## Sliedev MCP Server

** Setup / Install **
- https://github.com/raykuonz/slidev-mcp-server
- git clone https://github.com/raykuonz/slidev-mcp-server.git
- cd slidev-mcp-server
- npm install
- npm run setup  # Auto-installs PDF dependencies
- Add to Claude Desktop config (~/Library/Application Support/Claude/claude_desktop_config.json on macOS):
```
{
  "mcpServers": {
    "slidev": {
      "command": "node",
      "args": ["/full/path/to/slidev-mcp-server/src/index.js"]
    }
  }
}
```

