import express from "express";
import cors from "cors";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { slidevKnowledge, generateSlidevGuidance } from "./slidev-knowledge.js";

const app = express();
app.use(cors());
app.use(express.json());

let currentPresentationMarkdown = "";
let presentationName = "";

// REST API endpoints that n8n can easily call

app.post("/presentation/create", (req, res) => {
  const { name, theme, title, author, info } = req.body;
  presentationName = name;

  // Build frontmatter
  let frontmatter = "---\n";
  if (theme) frontmatter += `theme: ${theme}\n`;
  if (title) frontmatter += `title: "${title}"\n`;
  if (author) frontmatter += `author: "${author}"\n`;
  if (info) frontmatter += `info: "${info}"\n`;
  frontmatter += "---\n";

  currentPresentationMarkdown = frontmatter;

  res.json({
    success: true,
    message: `Slidev presentation '${name}' created with ${theme || 'default'} theme.`,
    name: presentationName
  });
});

app.post("/presentation/slide", (req, res) => {
  currentPresentationMarkdown += "\n---\n";
  res.json({ success: true, message: "New slide added." });
});

app.post("/presentation/slide-layout", (req, res) => {
  const { layout } = req.body;
  if (!layout) {
    return res.status(400).json({ success: false, message: "Layout is required" });
  }

  currentPresentationMarkdown += `\n---\nlayout: ${layout}\n---\n`;
  res.json({ success: true, message: `New slide added with '${layout}' layout.` });
});

app.post("/presentation/title", (req, res) => {
  const { text, level = 1 } = req.body;
  const hashes = "#".repeat(level);
  currentPresentationMarkdown += `\n${hashes} ${text}\n`;

  res.json({
    success: true,
    message: `Title '${text}' added with level ${level}.`
  });
});

app.post("/presentation/text", (req, res) => {
  const { content } = req.body;
  currentPresentationMarkdown += `\n${content}\n`;

  res.json({ success: true, message: "Text content added." });
});

app.post("/presentation/code", (req, res) => {
  const { language, code } = req.body;
  currentPresentationMarkdown += `\n\`\`\`${language}\n${code}\n\`\`\`\n`;

  res.json({
    success: true,
    message: `Code block in ${language} added.`
  });
});

app.post("/presentation/image", (req, res) => {
  const { src, alt = "", width, height } = req.body;
  let imageMarkdown = `![${alt}](${src})`;

  if (width || height) {
    const widthAttr = width ? ` width="${width}"` : '';
    const heightAttr = height ? ` height="${height}"` : '';
    imageMarkdown = `<img src="${src}" alt="${alt}"${widthAttr}${heightAttr} />`;
  }

  currentPresentationMarkdown += `\n${imageMarkdown}\n`;
  res.json({ success: true, message: `Image added from ${src}.` });
});

app.post("/presentation/save", (req, res) => {
  if (!presentationName) {
    return res.status(400).json({
      success: false,
      message: "No presentation name set. Create a presentation first."
    });
  }

  const presentationsDir = "./presentations";
  if (!existsSync(presentationsDir)) {
    mkdirSync(presentationsDir, { recursive: true });
  }

  const fileName = `${presentationName}.md`;
  const filePath = join(presentationsDir, fileName);

  try {
    writeFileSync(filePath, currentPresentationMarkdown, 'utf8');

    res.json({
      success: true,
      message: `Presentation saved successfully to ${filePath}`,
      filePath: filePath
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to save presentation: ${error.message}`
    });
  }
});

app.get("/presentation/state", (req, res) => {
  const slideCount = (currentPresentationMarkdown.match(/^---$/gm) || []).length;

  res.json({
    name: presentationName || "Untitled",
    markdown: currentPresentationMarkdown,
    slideCount: Math.max(1, slideCount - 1)
  });
});

// Reset presentation
app.post("/presentation/reset", (req, res) => {
  currentPresentationMarkdown = "";
  presentationName = "";
  res.json({ success: true, message: "Presentation reset." });
});

// Slidev guidance endpoints
app.get("/slidev/guidance", (req, res) => {
  const { type = "technical" } = req.query;
  const guidance = generateSlidevGuidance(type);

  res.json({
    guidance,
    overview: slidevKnowledge.overview,
    website: "https://sli.dev/guide/"
  });
});

app.get("/slidev/themes", (req, res) => {
  res.json({
    allThemes: slidevKnowledge.themes,
    businessThemes: ["apple-basic", "minimal", "seriph", "academic", "border"],
    technicalThemes: ["default", "vitesse", "carbon", "dracula", "geist"],
    recommendation: "Choose themes based on audience: business presentations should use clean, professional themes while technical presentations can use developer-focused themes."
  });
});

app.get("/slidev/layouts", (req, res) => {
  res.json({
    layouts: slidevKnowledge.layouts,
    usage: {
      "cover": "Use for title slides - includes title, subtitle, author",
      "intro": "Use for introduction slides with key points",
      "section": "Use to separate major sections of presentation",
      "two-cols": "Use for side-by-side content like code + explanation",
      "image": "Use for full-screen images with overlay text",
      "image-left/right": "Use for content with supporting images",
      "quote": "Use for testimonials, quotes, or key statements",
      "fact": "Use for statistics and important numbers",
      "statement": "Use for bold statements or value propositions",
      "end": "Use for conclusion, thank you, and Q&A slides"
    },
    examples: slidevKnowledge.exampleStructures
  });
});

app.get("/slidev/best-practices", (req, res) => {
  res.json(slidevKnowledge.bestPractices);
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", server: "slidev-simple-api" });
});

const PORT = process.env.PORT || 3001;

// Ensure presentations directory exists at startup
const presentationsDir = "./presentations";
if (!existsSync(presentationsDir)) {
  mkdirSync(presentationsDir, { recursive: true });
  console.log("Created presentations directory");
}

app.listen(PORT, () => {
  console.log(`Slidev Simple API server running on port ${PORT}`);
  console.log(`\nPresentation endpoints:`);
  console.log(`POST /presentation/create - Create presentation`);
  console.log(`POST /presentation/slide - Add slide`);
  console.log(`POST /presentation/slide-layout - Add slide with layout`);
  console.log(`POST /presentation/title - Add title`);
  console.log(`POST /presentation/text - Add text`);
  console.log(`POST /presentation/code - Add code block`);
  console.log(`POST /presentation/image - Add image`);
  console.log(`POST /presentation/save - Save presentation`);
  console.log(`GET  /presentation/state - Get current state`);
  console.log(`POST /presentation/reset - Reset presentation`);
  console.log(`\nSlidev guidance endpoints:`);
  console.log(`GET  /slidev/guidance?type=technical|business - Get guidance`);
  console.log(`GET  /slidev/themes - Available themes`);
  console.log(`GET  /slidev/layouts - Available layouts`);
  console.log(`GET  /slidev/best-practices - Best practices`);
  console.log(`GET  /health - Health check`);
  console.log(`\nBased on Slidev documentation: https://sli.dev/guide/`);
});