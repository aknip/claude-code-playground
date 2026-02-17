import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import express from "express";
import cors from "cors";
import { slidevKnowledge, generateSlidevGuidance } from "./slidev-knowledge.js";

let currentPresentationMarkdown = "";
let presentationName = "";

const server = new McpServer(
  { name: "slidev-mcp", version: "1.0.0" },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Register all the same tools as the stdio version
server.registerTool(
  "create_presentation",
  {
    description: "Creates a new Slidev presentation with frontmatter configuration. Slidev is a web-based presentation framework for developers.",
    inputSchema: {
      name: z.string().describe("The name of the presentation file."),
      theme: z.string().optional().describe("Slidev theme name. Popular options: 'default', 'apple-basic', 'minimal', 'vitesse', 'carbon', 'dracula', 'academic'"),
      title: z.string().optional().describe("Presentation title for frontmatter"),
      author: z.string().optional().describe("Author name for frontmatter"),
      info: z.string().optional().describe("Presentation description"),
    },
    outputSchema: {
      message: z.string(),
    },
  },
  async (input) => {
    presentationName = input.name;

    let frontmatter = "---\n";
    if (input.theme) frontmatter += `theme: ${input.theme}\n`;
    if (input.title) frontmatter += `title: "${input.title}"\n`;
    if (input.author) frontmatter += `author: "${input.author}"\n`;
    if (input.info) frontmatter += `info: "${input.info}"\n`;
    frontmatter += "---\n";

    currentPresentationMarkdown = frontmatter;
    return { structuredContent: { message: `Slidev presentation '${input.name}' created with ${input.theme || 'default'} theme.` } };
  }
);

server.registerTool(
  "add_slide_layout",
  {
    description: "Add a slide with a specific Slidev layout. Layouts control the visual structure and positioning of content on slides.",
    inputSchema: {
      layout: z.string().describe("Slidev layout name: 'cover', 'intro', 'section', 'two-cols', 'image', 'quote', 'fact', 'statement', 'end', etc."),
    },
    outputSchema: {
      message: z.string(),
    },
  },
  async (input) => {
    currentPresentationMarkdown += `\n---\nlayout: ${input.layout}\n---\n`;
    return { structuredContent: { message: `New slide added with '${input.layout}' layout.` } };
  }
);

server.registerTool(
  "add_slide_title",
  {
    description: "Adds a title to the current slide.",
    inputSchema: {
      text: z.string().describe("The title content."),
      level: z.number().int().min(1).max(6).describe("The Markdown heading level (1-6)."),
    },
    outputSchema: {
      message: z.string(),
    },
  },
  async (input) => {
    const hashes = "#".repeat(input.level);
    currentPresentationMarkdown += `\n${hashes} ${input.text}\n`;
    return { structuredContent: { message: `Title '${input.text}' added with level ${input.level}.` } };
  }
);

server.registerTool(
  "save_presentation",
  {
    description: "Saves the current presentation to a markdown file in the presentations directory.",
    inputSchema: {},
    outputSchema: {
      message: z.string(),
      filePath: z.string(),
    },
  },
  async () => {
    if (!presentationName) {
      return {
        structuredContent: {
          message: "No presentation name set. Create a presentation first using create_presentation.",
          filePath: ""
        }
      };
    }

    const presentationsDir = "./presentations";
    if (!existsSync(presentationsDir)) {
      mkdirSync(presentationsDir, { recursive: true });
    }

    const fileName = `${presentationName}.md`;
    const filePath = join(presentationsDir, fileName);

    try {
      writeFileSync(filePath, currentPresentationMarkdown, 'utf8');

      return {
        structuredContent: {
          message: `Presentation saved successfully to ${filePath}`,
          filePath: filePath
        }
      };
    } catch (error) {
      return {
        structuredContent: {
          message: `Failed to save presentation: ${error.message}`,
          filePath: ""
        }
      };
    }
  }
);

server.registerTool(
  "get_slidev_guidance",
  {
    description: "Get Slidev-specific guidance and recommendations for creating presentations.",
    inputSchema: {
      presentationType: z.string().optional().describe("Type of presentation: 'technical', 'business', or 'academic'"),
    },
    outputSchema: {
      guidance: z.object({
        recommendedThemes: z.array(z.string()),
        structure: z.array(z.any()),
        tips: z.array(z.string())
      }),
      overview: z.string(),
    },
  },
  async (input) => {
    const type = input.presentationType || "technical";
    const guidance = generateSlidevGuidance(type);

    return {
      structuredContent: {
        guidance,
        overview: `${slidevKnowledge.overview.description} Visit ${slidevKnowledge.overview.website} for full documentation.`
      }
    };
  }
);

// Create Express app for SSE endpoint
const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
}));

// Home page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Slidev MCP SSE Server</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .endpoint { background: #f5f5f5; padding: 15px; margin: 15px 0; border-radius: 8px; }
            code { background: #e8e8e8; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
            .status { color: #28a745; font-weight: bold; }
        </style>
    </head>
    <body>
        <h1>🎯 Slidev MCP SSE Server</h1>
        <p class="status">✅ Server is running and ready for MCP connections!</p>

        <div class="endpoint">
            <h3>📡 SSE MCP Endpoint</h3>
            <code>GET /sse</code><br>
            <small>Server-Sent Events endpoint for real-time MCP communication</small>
        </div>

        <div class="endpoint">
            <h3>💚 Health Check</h3>
            <code>GET /health</code><br>
            <small>Server status and available tools</small>
        </div>

        <h2>🔧 Available MCP Tools:</h2>
        <ul>
            <li><code>create_presentation</code> - Create new Slidev presentation with themes</li>
            <li><code>add_slide_layout</code> - Add slides with specific Slidev layouts</li>
            <li><code>add_slide_title</code> - Add headings to slides</li>
            <li><code>save_presentation</code> - Save presentation to file system</li>
            <li><code>get_slidev_guidance</code> - Get Slidev best practices and recommendations</li>
        </ul>

        <h2>🚀 Usage:</h2>
        <p>Connect MCP clients to <code>http://localhost:3002/sse</code> for Server-Sent Events communication.</p>
        <p>This server implements the full <a href="https://modelcontextprotocol.io/" target="_blank">Model Context Protocol</a>
        with <a href="https://sli.dev/guide/" target="_blank">Slidev</a> presentation generation capabilities.</p>

        <p><small><strong>For n8n users:</strong> Use <code>npm run start:simple</code> for easier HTTP API integration.</small></p>
    </body>
    </html>
  `);
});

// SSE endpoint for MCP communication
app.get('/sse', async (req, res) => {
  console.log('New SSE connection established');

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control, Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  });

  try {
    // Create SSE transport for this connection
    const transport = new SSEServerTransport("/sse", server);

    // Send initial connection message
    res.write(`data: ${JSON.stringify({
      type: "connection",
      message: "Connected to Slidev MCP SSE Server",
      capabilities: ["tools", "slidev_guidance"],
      timestamp: new Date().toISOString()
    })}\n\n`);

    // Handle client disconnect
    req.on('close', () => {
      console.log('SSE connection closed');
      transport.close();
    });

    req.on('error', (err) => {
      console.error('SSE connection error:', err);
      transport.close();
    });

  } catch (error) {
    console.error('Error setting up SSE transport:', error);
    res.write(`data: ${JSON.stringify({
      type: "error",
      message: error.message
    })}\n\n`);
    res.end();
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'slidev-mcp-sse',
    version: '1.0.0',
    endpoints: {
      sse: '/sse',
      health: '/health',
      home: '/'
    },
    tools: [
      'create_presentation',
      'add_slide_layout',
      'add_slide_title',
      'save_presentation',
      'get_slidev_guidance'
    ],
    slidevIntegration: 'https://sli.dev/guide/',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3002;

// Ensure presentations directory exists at startup
const presentationsDir = "./presentations";
if (!existsSync(presentationsDir)) {
  mkdirSync(presentationsDir, { recursive: true });
  console.log("Created presentations directory");
}

app.listen(PORT, () => {
  console.log(`🎯 Slidev MCP SSE Server running on port ${PORT}`);
  console.log(`📡 SSE Endpoint: http://localhost:${PORT}/sse`);
  console.log(`🏠 Web Interface: http://localhost:${PORT}/`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`\n🔧 MCP Protocol Support via Server-Sent Events`);
  console.log(`🎨 Slidev presentation generation with guidance from https://sli.dev/guide/`);
  console.log(`\n📋 For n8n integration: Use 'npm run start:simple' instead`);
});