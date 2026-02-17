# 🎨 Slidev MCP Server

**AI-powered presentation creation and PDF export via Model Context Protocol**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Model Context Protocol](https://img.shields.io/badge/MCP-Compatible-orange)](https://modelcontextprotocol.io/)
[![Tests](https://img.shields.io/badge/Tests-59%20Passing-brightgreen)](#testing)

> Transform ideas into professional presentations instantly. Create beautiful Slidev presentations and export to PDF through AI agents like Claude Desktop, n8n workflows, and any MCP-compatible client.

---

## 🎬 Demo

### What it looks like in action:

<!-- TODO: Add demo GIF showing:
- Creating a presentation in Claude Desktop
- The resulting Slidev presentation
- PDF export process
-->
*Demo GIF coming soon - showing complete workflow from AI chat to PDF*

### Real-world examples:
- **Business presentation** → Create "Q4 Results" in 30 seconds
- **Technical documentation** → GraphQL API Guide with code blocks
- **Educational content** → JavaScript Fundamentals course slides

**Try it live:** [Claude Desktop Setup](#claude-desktop) | [n8n Workflows](#n8n-integration)

---

## 🎯 Why Slidev MCP Server?

**The Problem:**
Creating professional presentations is time-consuming. Switching between AI chat and presentation tools breaks workflow. Existing solutions lack AI integration.

**The Solution:**
- ✅ **Create presentations directly in AI chat** (Claude, n8n workflows, custom clients)
- ✅ **Instant PDF export** with professional quality
- ✅ **Professional themes** (Apple Basic, Default, and custom)
- ✅ **Code syntax highlighting** for technical content
- ✅ **No context switching** - everything in your AI workflow

**Perfect for:**
- 📊 Business professionals creating client presentations
- 👩‍💻 Developers documenting technical concepts
- 🎓 Educators preparing course materials
- 🤖 AI workflow automation (n8n, Zapier, etc.)

---

## 🚀 Quick Start

### Option 1: Claude Desktop (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/raykuonz/slidev-mcp-server.git
   cd slidev-mcp-server
   npm install
   npm run setup  # Auto-installs PDF dependencies
   ```

2. **Add to Claude Desktop config** (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):
   ```json
   {
     "mcpServers": {
       "slidev": {
         "command": "node",
         "args": ["/full/path/to/slidev-mcp-server/src/index.js"]
       }
     }
   }
   ```

3. **Restart Claude Desktop** and start creating:
   ```
   "Create a 5-slide presentation about AI trends in 2024 with apple-basic theme"
   ```

### Option 2: Development Setup

```bash
git clone https://github.com/raykuonz/slidev-mcp-server.git
cd slidev-mcp-server
npm install
npm run setup  # Auto-installs PDF dependencies
npm start      # Start STDIO server
```

**Dependencies auto-installed:**
- Node.js 18+ ✅
- Playwright (for PDF export) ✅
- Slidev CLI ✅

### Test it works:
```bash
npm test
# ✅ 59 tests passing in ~0.232 seconds
```

---

## ✨ Features

### 🎨 **Presentation Creation**
- **Atomic Operations**: Build complete presentations in one command
- **Smart Templates**: Business, technical, educational layouts
- **Theme Support**: Apple Basic, Default, and custom themes
- **Content Types**: Text, code blocks, images, tables, math equations

### 📄 **PDF Export**
- **Cross-directory support**: Works from any execution context
- **Dependency auto-detection**: Handles missing Playwright/Slidev automatically
- **Export options**: Slide ranges, click animations, dark mode
- **High-quality output**: Vector graphics and sharp text rendering

### 🤖 **AI Integration**
- **Claude Desktop**: Native MCP integration
- **n8n Workflows**: Automated presentation generation
- **VS Code**: Direct integration via MCP extension
- **Custom Clients**: Standard MCP protocol support

### 🛡️ **Production Ready**
- **59 comprehensive tests**: Unit, integration, and workflow testing
- **Error handling**: Graceful degradation with helpful messages
- **Performance**: Optimized for large presentations (20+ slides)
- **Cross-platform**: Windows, macOS, Linux support

---

## 📦 Installation

### Method 1: Git Clone (Current)
```bash
git clone https://github.com/raykuonz/slidev-mcp-server.git
cd slidev-mcp-server
npm install
npm run setup  # Auto-installs PDF dependencies
```

### Method 2: NPM (Coming Soon)
```bash
npm install -g slidev-mcp-server
```

### Dependencies
- **Node.js 18+** (Required)
- **Playwright** (Auto-installed for PDF export)
- **@slidev/cli** (Auto-installed)
- **@slidev/theme-apple-basic** (Auto-installed)

### Verify Installation
```bash
node src/index.js  # Should start the MCP server
npm test          # Run comprehensive test suite
```

---

## 🛠 Usage

### Basic Presentation Creation

**In Claude Desktop:**
```
Create a technical presentation about GraphQL with:
- Cover slide with title "GraphQL Fundamentals"
- What is GraphQL slide
- Benefits vs REST API slide
- Code example showing a query
- Conclusion slide

Use the apple-basic theme and export to PDF.
```

**Result:** Complete presentation with PDF in seconds ✨

### Advanced Features

**Business Presentation with Data:**
```json
{
  "name": "Q4-results-2024",
  "theme": "apple-basic",
  "title": "Q4 2024 Results",
  "author": "Your Name",
  "slides": [
    {
      "layout": "cover",
      "title": "Q4 2024 Results",
      "content": "Record-breaking quarter"
    },
    {
      "layout": "two-cols",
      "title": "Key Metrics",
      "content": "Revenue growth and market expansion"
    }
  ]
}
```

### n8n Workflow Integration

```javascript
// n8n HTTP Request Node - MCP Tool Call
{
  "method": "POST",
  "url": "http://localhost:3002/mcp/tool/build_complete_presentation",
  "body": {
    "name": "automated-report",
    "title": "Weekly Analytics Report",
    "slides": [/* dynamic content from previous nodes */]
  }
}
```

### Available Tools

| Tool | Description | Use Case |
|------|-------------|----------|
| `build_complete_presentation` | Create full presentation | Complete slide decks |
| `create_complete_slide` | Add single slide | Incremental building |
| `export_to_pdf` | Generate PDF | Final deliverable |
| `get_presentation_state` | View current status | Debugging/workflow |

### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **STDIO Server** | `npm start` | For Claude Desktop integration |
| **HTTP Server** | `npm run start:http` | For web-based clients |
| **SSE Server** | `npm run start:sse` | For real-time streaming |
| **Simple API** | `npm run start:simple` | Basic HTTP API |
| **MCP Inspector** | `npm run test:inspector` | Debug MCP tools |

---

## ⚙️ Configuration

### MCP Client Setup

#### Claude Desktop
```json
{
  "mcpServers": {
    "slidev": {
      "command": "node",
      "args": ["/full/path/to/slidev-mcp-server/src/index.js"],
      "env": {
        "SLIDEV_THEME": "apple-basic",
        "EXPORT_QUALITY": "high"
      }
    }
  }
}
```

#### VS Code MCP Extension
```json
{
  "mcp.servers": {
    "slidev": {
      "command": "node",
      "args": ["/full/path/to/slidev-mcp-server/src/index.js"]
    }
  }
}
```

### Environment Variables
```bash
SLIDEV_THEME=apple-basic              # Default theme
EXPORT_FORMAT=pdf                     # Export format
LOG_LEVEL=info                        # Logging level
PRESENTATIONS_DIR=./presentations     # Output directory
```

### Custom Themes
1. Install theme: `npm install @slidev/theme-your-theme`
2. Use in presentations: `"theme": "your-theme"`
3. Available themes: [Slidev Theme Gallery](https://sli.dev/themes/gallery.html)

---

## 🔧 Troubleshooting

### Common Issues

#### "playwright-chromium not found"
```bash
# Solution: Install PDF dependencies
npm run install-pdf
# or manually:
npm install -D playwright-chromium
```

#### "Command not found: slidev"
```bash
# Solution: Install Slidev CLI
npm install -D @slidev/cli
# or use the setup script:
npm run setup
```

#### "Cannot find presentation file"
The server looks for presentations in multiple locations:
- `./presentations/` (project directory)
- `~/presentations/` (home directory)
- Current working directory

#### PDF export fails in n8n
n8n runs in a different environment. The server handles this automatically by:
- Detecting execution context
- Using absolute paths
- Installing dependencies in the correct location

#### MCP Server not connecting to Claude Desktop
1. Check the path in your Claude Desktop config is absolute
2. Restart Claude Desktop after config changes
3. Test the server runs manually: `node src/index.js`

### Performance Tips
- Use `build_complete_presentation` instead of individual slides
- Limit presentations to <50 slides for optimal performance
- Use standard themes for faster rendering

### Testing
```bash
npm test              # Run all 59 tests
npm run test:watch    # Development mode
npm run test:coverage # Generate coverage report
```

### Getting Help
- 🐛 **[Issues](https://github.com/raykuonz/slidev-mcp-server/issues)** - Bug reports and feature requests
- 💬 **[Discussions](https://github.com/raykuonz/slidev-mcp-server/discussions)** - Community support
- 📖 **[Documentation](docs/)** - Complete guides and API reference

---

## 🤝 Contributing

We welcome contributions! This project thrives because of community involvement.

### Quick Start for Contributors
```bash
git clone https://github.com/raykuonz/slidev-mcp-server.git
cd slidev-mcp-server
npm install
npm test          # Run test suite (59 tests)
npm run test:watch  # Development mode
```

### How to Contribute
- 🐛 **Bug Reports**: [Open an issue](https://github.com/raykuonz/slidev-mcp-server/issues/new)
- ✨ **Feature Requests**: [Start a discussion](https://github.com/raykuonz/slidev-mcp-server/discussions/new)
- 📝 **Documentation**: Help improve our docs
- 🧪 **Testing**: Add test cases or improve coverage
- 🎨 **Themes**: Create new Slidev themes

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Run tests: `npm test`
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code of Conduct
We follow the [Contributor Covenant](CODE_OF_CONDUCT.md). Please be respectful and inclusive.

---

## 🧰 Tech Stack

### Core Technologies
- **Node.js 18+** - Runtime environment
- **JavaScript ES Modules** - Modern module system
- **Model Context Protocol** - AI integration standard
- **Slidev** - Presentation framework by [Anthony Fu](https://github.com/antfu)
- **Playwright** - PDF export engine

### MCP Integration
- **@modelcontextprotocol/sdk ^1.17.1** - Official MCP SDK
- **Zod ^3.25.76** - Schema validation
- **Express ^4.18.2** - HTTP server framework
- **Transport Protocols**: STDIO, HTTP, SSE

### Testing Framework
- **Jest** - Testing framework
- **59 comprehensive tests** - Unit, integration, and workflow
- **Mock infrastructure** - Isolated, fast testing
- **0.232s execution time** - Lightning fast feedback

### Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   MCP Client    │    │  Slidev MCP      │    │   Slidev CLI    │
│ (Claude/n8n/VS)│◄──►│     Server       │◄──►│   + Playwright  │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  File System     │
                       │ (presentations/) │
                       └──────────────────┘
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ **Commercial use** allowed
- ✅ **Modification** allowed
- ✅ **Distribution** allowed
- ✅ **Private use** allowed
- ❌ **No liability** or warranty

---

## 🙌 Credits & Acknowledgments

### Built With
- **[Slidev](https://sli.dev/)** - Amazing presentation framework by [Anthony Fu](https://github.com/antfu)
- **[Model Context Protocol](https://modelcontextprotocol.io/)** - By [Anthropic](https://anthropic.com)
- **[Playwright](https://playwright.dev/)** - Reliable browser automation

### Inspiration
This project was inspired by the need for seamless AI-powered presentation creation and the amazing possibilities of the Model Context Protocol ecosystem.

### Special Thanks
- **[@antfu](https://github.com/antfu)** for creating the incredible Slidev framework
- **[Anthropic](https://anthropic.com)** for developing the Model Context Protocol
- **The MCP Community** for inspiration, feedback, and collaboration

---

**Made with ❤️ for the AI and presentation community**

*If this project helped you, please consider giving it a ⭐ star on GitHub!*