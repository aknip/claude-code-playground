import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import express from "express";
import cors from "cors";
import { slidevKnowledge, generateSlidevGuidance } from "./slidev-knowledge.js";

let currentPresentationMarkdown = "";
let presentationName = "";

const server = new McpServer(
  { name: "slidev-mcp", version: "1.0.0" }
);

// Register all tools (simplified versions for HTTP)
const tools = new Map();

tools.set("create_presentation", async (params) => {
  presentationName = params.name;

  let frontmatter = "---\n";
  if (params.theme) frontmatter += `theme: ${params.theme}\n`;
  if (params.title) frontmatter += `title: "${params.title}"\n`;
  if (params.author) frontmatter += `author: "${params.author}"\n`;
  if (params.info) frontmatter += `info: "${params.info}"\n`;
  frontmatter += "---\n";

  currentPresentationMarkdown = frontmatter;
  return { message: `Slidev presentation '${params.name}' created with ${params.theme || 'default'} theme.` };
});

tools.set("add_slide_layout", async (params) => {
  currentPresentationMarkdown += `\n---\nlayout: ${params.layout}\n---\n`;
  return { message: `New slide added with '${params.layout}' layout.` };
});

tools.set("add_slide", async (params) => {
  currentPresentationMarkdown += "\n---\n";
  return { message: "New slide added." };
});

tools.set("add_slide_title", async (params) => {
  const hashes = "#".repeat(params.level);
  currentPresentationMarkdown += `\n${hashes} ${params.text}\n`;
  return { message: `Title '${params.text}' added with level ${params.level}.` };
});

tools.set("add_text", async (params) => {
  currentPresentationMarkdown += `\n${params.content}\n`;
  return { message: "Text content added." };
});

tools.set("add_code_block", async (params) => {
  currentPresentationMarkdown += `\n\`\`\`${params.language}\n${params.code}\n\`\`\`\n`;
  return { message: `Code block in ${params.language} added.` };
});

tools.set("save_presentation", async (params) => {
  if (!presentationName) {
    throw new Error("No presentation name set. Create a presentation first.");
  }

  const presentationsDir = "./presentations";
  if (!existsSync(presentationsDir)) {
    mkdirSync(presentationsDir, { recursive: true });
  }

  const fileName = `${presentationName}.md`;
  const filePath = join(presentationsDir, fileName);
  writeFileSync(filePath, currentPresentationMarkdown, 'utf8');

  return {
    message: `Presentation saved successfully to ${filePath}`,
    filePath: filePath
  };
});

tools.set("get_slidev_guidance", async (params) => {
  const type = params.presentationType || "technical";
  const guidance = generateSlidevGuidance(type);

  return {
    guidance,
    overview: `${slidevKnowledge.overview.description} Visit ${slidevKnowledge.overview.website} for full documentation.`
  };
});

// Setup Express server for simplified HTTP MCP
const app = express();
app.use(cors());
app.use(express.json());

// Simple MCP-like endpoint for tool calls
app.post("/call/:toolName", async (req, res) => {
  try {
    const toolName = req.params.toolName;
    const params = req.body;

    if (!tools.has(toolName)) {
      return res.status(404).json({
        error: `Tool '${toolName}' not found`,
        availableTools: Array.from(tools.keys())
      });
    }

    const tool = tools.get(toolName);
    const result = await tool(params);

    res.json({
      success: true,
      tool: toolName,
      result: result
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// List available tools
app.get("/tools", (req, res) => {
  res.json({
    server: "slidev-mcp-http",
    version: "1.0.0",
    tools: Array.from(tools.keys()),
    usage: "POST /call/{toolName} with parameters in request body"
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", server: "slidev-mcp-http" });
});

// Simplified guidance endpoints
app.get("/guidance/:type?", (req, res) => {
  const type = req.params.type || "technical";
  const guidance = generateSlidevGuidance(type);
  res.json({
    guidance,
    overview: slidevKnowledge.overview
  });
});

const PORT = process.env.PORT || 3000;

// Ensure presentations directory exists at startup
const presentationsDir = "./presentations";
if (!existsSync(presentationsDir)) {
  mkdirSync(presentationsDir, { recursive: true });
  console.log("Created presentations directory");
}

app.listen(PORT, () => {
  console.log(`Slidev MCP HTTP server running on port ${PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`GET  /tools - List available tools`);
  console.log(`POST /call/{toolName} - Call a specific tool`);
  console.log(`GET  /guidance/{type} - Get Slidev guidance`);
  console.log(`GET  /health - Health check`);
  console.log(`\nExample usage:`);
  console.log(`curl -X POST http://localhost:${PORT}/call/create_presentation \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{"name": "my-talk", "theme": "apple-basic"}'`);
  console.log(`\nFor n8n: Use Simple API server instead (npm run start:simple)`);
});