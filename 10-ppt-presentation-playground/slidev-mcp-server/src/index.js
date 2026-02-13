import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { slidevKnowledge, generateSlidevGuidance } from "./slidev-knowledge.js";

let currentPresentationMarkdown = "";
let presentationName = "";

const server = new McpServer(
  { name: "slidev-mcp", version: "1.0.0" }
);

// Register guidance tools
server.registerTool(
  "get_slidev_guidance",
  {
    description: "Get Slidev-specific guidance and recommendations for creating presentations. Essential for AI agents to understand Slidev best practices.",
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

server.registerTool(
  "list_slidev_themes",
  {
    description: "Get list of available Slidev themes with recommendations for different presentation types.",
    inputSchema: {},
    outputSchema: {
      allThemes: z.array(z.string()),
      businessThemes: z.array(z.string()),
      technicalThemes: z.array(z.string()),
      recommendation: z.string(),
    },
  },
  async () => {
    return {
      structuredContent: {
        allThemes: slidevKnowledge.themes,
        businessThemes: ["apple-basic", "minimal", "seriph", "academic", "border"],
        technicalThemes: ["default", "vitesse", "carbon", "dracula", "geist"],
        recommendation: "Choose themes based on audience: business presentations should use clean, professional themes while technical presentations can use developer-focused themes."
      }
    };
  }
);

server.registerTool(
  "get_slidev_layout_guide",
  {
    description: "Get guidance on Slidev layouts and when to use each layout type for optimal presentation structure.",
    inputSchema: {},
    outputSchema: {
      layouts: z.array(z.string()),
      usage: z.record(z.string()),
      examples: z.record(z.any()),
    },
  },
  async () => {
    return {
      structuredContent: {
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
      }
    };
  }
);

// Register the create_presentation tool
server.registerTool(
  "create_presentation",
  {
    description: "Creates a new Slidev presentation with frontmatter configuration. Slidev is a web-based presentation framework for developers. Choose appropriate themes: business presentations use 'apple-basic', 'minimal', or 'seriph'; technical presentations use 'default', 'vitesse', or 'carbon'.",
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

    // Build frontmatter
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

// Register the add_slide_layout tool
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

// Register the add_slide tool
server.registerTool(
  "add_slide",
  {
    description: "Adds a new slide separator to the current presentation. Use add_slide_layout instead if you want to specify a particular Slidev layout for the slide.",
    inputSchema: {},
    outputSchema: {
      message: z.string(),
    },
  },
  async () => {
    currentPresentationMarkdown += "\n---\n";
    return { structuredContent: { message: "New slide added." } };
  }
);

// Register the add_slide_title tool
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

// Register the add_text tool
server.registerTool(
  "add_text",
  {
    description: "Adds general text content to the current slide.",
    inputSchema: {
      content: z.string().describe("The text content to add."),
    },
    outputSchema: {
      message: z.string(),
    },
  },
  async (input) => {
    currentPresentationMarkdown += `\n${input.content}\n`;
    return { structuredContent: { message: "Text content added." } };
  }
);

// Register the add_code_block tool
server.registerTool(
  "add_code_block",
  {
    description: "Adds a code block to the current slide.",
    inputSchema: {
      language: z.string().describe("The programming language for syntax highlighting."),
      code: z.string().describe("The code content."),
    },
    outputSchema: {
      message: z.string(),
    },
  },
  async (input) => {
    currentPresentationMarkdown += `\n\`\`\`${input.language}\n${input.code}\n\`\`\`\n`;
    return { structuredContent: { message: `Code block in ${input.language} added.` } };
  }
);

// Register the add_image tool
server.registerTool(
  "add_image",
  {
    description: "Adds an image to the current slide.",
    inputSchema: {
      src: z.string().describe("The image URL or file path."),
      alt: z.string().optional().describe("Alternative text for the image."),
      width: z.string().optional().describe("Image width (e.g., '400px', '50%')."),
      height: z.string().optional().describe("Image height (e.g., '300px', '50%')."),
    },
    outputSchema: {
      message: z.string(),
    },
  },
  async (input) => {
    let imageMarkdown = `![${input.alt || ''}](${input.src})`;

    if (input.width || input.height) {
      const widthAttr = input.width ? ` width="${input.width}"` : '';
      const heightAttr = input.height ? ` height="${input.height}"` : '';
      imageMarkdown = `<img src="${input.src}" alt="${input.alt || ''}"${widthAttr}${heightAttr} />`;
    }

    currentPresentationMarkdown += `\n${imageMarkdown}\n`;
    return { structuredContent: { message: `Image added from ${input.src}.` } };
  }
);

// Register the save_presentation tool
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

// Register the get_presentation_state tool
server.registerTool(
  "get_presentation_state",
  {
    description: "Gets the current presentation markdown content and metadata.",
    inputSchema: {},
    outputSchema: {
      name: z.string(),
      markdown: z.string(),
      slideCount: z.number(),
    },
  },
  async () => {
    const slideCount = (currentPresentationMarkdown.match(/^---$/gm) || []).length;

    return {
      structuredContent: {
        name: presentationName || "Untitled",
        markdown: currentPresentationMarkdown,
        slideCount: Math.max(1, slideCount - 1)
      }
    };
  }
);

// Register atomic slide creation tool - NEW!
server.registerTool(
  "create_complete_slide",
  {
    description: "Create a complete slide with layout, title, and content in one atomic operation. This is more efficient than using multiple separate tools.",
    inputSchema: {
      layout: z.string().describe("Slidev layout: 'cover', 'default', 'two-cols', 'center', 'section', 'image-left', 'image-right', 'quote', 'fact', 'statement', 'end'"),
      title: z.string().optional().describe("Slide title/heading"),
      titleLevel: z.number().optional().describe("Title heading level (1-6), default: 1"),
      content: z.string().optional().describe("Main slide content (text, bullet points, etc.)"),
      code: z.string().optional().describe("Code block content"),
      codeLanguage: z.string().optional().describe("Programming language for syntax highlighting"),
      image: z.object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional()
      }).optional().describe("Image with optional caption")
    },
    outputSchema: {
      message: z.string(),
      slideNumber: z.number(),
      success: z.boolean()
    },
  },
  async (input) => {
    // Check if this is the first slide (only frontmatter exists)
    const isFirstSlide = !currentPresentationMarkdown.includes('layout:');

    // Start new slide with layout (avoid leading newline for first slide)
    if (isFirstSlide) {
      currentPresentationMarkdown += `---\nlayout: ${input.layout}\n---\n`;
    } else {
      currentPresentationMarkdown += `\n---\nlayout: ${input.layout}\n---\n`;
    }

    // Count current slides for feedback
    const slideCount = (currentPresentationMarkdown.match(/---\nlayout:/g) || []).length;

    // Add title if provided
    if (input.title) {
      const level = input.titleLevel || 1;
      const prefix = '#'.repeat(level);
      currentPresentationMarkdown += `\n${prefix} ${input.title}\n`;
    }

    // Add content if provided
    if (input.content) {
      currentPresentationMarkdown += `\n${input.content}\n`;
    }

    // Add code block if provided
    if (input.code) {
      const language = input.codeLanguage || '';
      currentPresentationMarkdown += `\n\`\`\`${language}\n${input.code}\n\`\`\`\n`;
    }

    // Add image if provided
    if (input.image) {
      currentPresentationMarkdown += `\n![${input.image.alt || ''}](${input.image.src})`;
      if (input.image.caption) {
        currentPresentationMarkdown += `\n*${input.image.caption}*`;
      }
      currentPresentationMarkdown += '\n';
    }

    return {
      structuredContent: {
        message: `Complete slide #${slideCount} created with '${input.layout}' layout${input.title ? ` and title '${input.title}'` : ''}.`,
        slideNumber: slideCount,
        success: true
      }
    };
  }
);

// Register a simplified presentation builder - NEW!
server.registerTool(
  "build_complete_presentation",
  {
    description: "Build a complete presentation with multiple slides in one operation. Much more efficient for agents than calling individual tools.",
    inputSchema: {
      name: z.string().describe("Presentation file name"),
      theme: z.string().optional().describe("Slidev theme (apple-basic, minimal, seriph for business)"),
      title: z.string().describe("Presentation title"),
      author: z.string().optional().describe("Author name"),
      slides: z.array(z.object({
        layout: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
        code: z.string().optional(),
        codeLanguage: z.string().optional()
      })).describe("Array of slide objects to create")
    },
    outputSchema: {
      message: z.string(),
      slideCount: z.number(),
      filePath: z.string(),
      success: z.boolean()
    },
  },
  async (input) => {
        // Initialize presentation
    presentationName = input.name;

    // Create all slides (combine frontmatter with first slide to avoid empty pages)
    for (let i = 0; i < input.slides.length; i++) {
      const slide = input.slides[i];

      if (i === 0) {
        // First slide: combine presentation metadata with slide layout
        let firstSlideHeader = "---\n";
        firstSlideHeader += `layout: ${slide.layout}\n`;
        if (input.theme) firstSlideHeader += `theme: ${input.theme}\n`;
        firstSlideHeader += `title: "${input.title}"\n`;
        if (input.author) firstSlideHeader += `author: "${input.author}"\n`;
        firstSlideHeader += "---\n";

        currentPresentationMarkdown = firstSlideHeader;
      } else {
        currentPresentationMarkdown += `\n---\nlayout: ${slide.layout}\n---\n`;
      }

      if (slide.title) {
        currentPresentationMarkdown += `\n# ${slide.title}\n`;
      }

      if (slide.content) {
        currentPresentationMarkdown += `\n${slide.content}\n`;
      }

      if (slide.code && slide.codeLanguage) {
        currentPresentationMarkdown += `\n\`\`\`${slide.codeLanguage}\n${slide.code}\n\`\`\`\n`;
      }
    }

    // Save automatically to project directory
    // Find the project root directory
    const currentDir = process.cwd();
    const projectRoot = currentDir.includes('vibe-slidev-mcp')
      ? currentDir
      : '/Users/ray.kuo/Development/playground/vibe-coding/vibe-slidev-mcp';

    const presentationsDir = join(projectRoot, "presentations");
    if (!existsSync(presentationsDir)) {
      mkdirSync(presentationsDir, { recursive: true });
    }

    const filePath = join(presentationsDir, `${presentationName}.md`);
    writeFileSync(filePath, currentPresentationMarkdown);

    console.error(`📁 Saved presentation to: ${filePath}`);

    return {
      structuredContent: {
        message: `Complete presentation '${input.title}' with ${input.slides.length} slides created and saved successfully!`,
        slideCount: input.slides.length,
        filePath: filePath,
        success: true
      }
    };
  }
);

// Register PDF export tool - ESSENTIAL!
server.registerTool(
  "export_to_pdf",
  {
    description: "Export the current presentation to PDF using Slidev's built-in export. Requires playwright-chromium to be installed.",
    inputSchema: {
      name: z.string().optional().describe("Presentation name to export (defaults to current presentation)"),
      outputPath: z.string().optional().describe("Output PDF file path (default: presentations/[name].pdf)"),
      withClicks: z.boolean().optional().describe("Export with click animations as separate pages"),
      range: z.string().optional().describe("Export specific slides (e.g., '1,3-5,8')"),
      dark: z.boolean().optional().describe("Export using dark theme")
    },
    outputSchema: {
      message: z.string(),
      pdfPath: z.string(),
      slideCount: z.number(),
      success: z.boolean()
    },
  },
    async (input) => {
    const { execSync } = await import('child_process');
    const { existsSync } = await import('fs');

    try {
      const name = input.name || presentationName;
      if (!name) {
        throw new Error("No presentation name provided and no current presentation");
      }

            // Find the presentation file using the same logic as build_complete_presentation
      const exportCurrentDir = process.cwd();
      const exportProjectRoot = exportCurrentDir.includes('vibe-slidev-mcp')
        ? exportCurrentDir
        : '/Users/ray.kuo/Development/playground/vibe-coding/vibe-slidev-mcp';

      // Try multiple possible locations for the markdown file
      const possibleMdPaths = [
        join(exportProjectRoot, "presentations", `${name}.md`),     // Project directory
        join(exportCurrentDir, "presentations", `${name}.md`),      // Current working directory
        join("./presentations", `${name}.md`),                      // Relative path
        join(process.env.HOME, "presentations", `${name}.md`)       // Home directory
      ];

      let mdPath = null;
      for (const possiblePath of possibleMdPaths) {
        if (existsSync(possiblePath)) {
          mdPath = possiblePath;
          console.error(`✅ Found presentation file: ${mdPath}`);
          break;
        }
      }

      if (!mdPath) {
        console.error(`❌ Presentation file not found in any of these locations:`);
        possibleMdPaths.forEach(path => console.error(`   - ${path}`));
        throw new Error(`Presentation file not found: ${name}.md`);
      }

                        // Use the robust export wrapper
      const { default: exportToPDF } = await import('../export-wrapper.js');

            // Prepare paths relative to export project root (reuse from above)
      const outputDir = join(exportProjectRoot, "presentations/pdfs");
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = input.outputPath || join(outputDir, `${name}.pdf`);

      // Prepare options
      const exportOptions = {
        withClicks: input.withClicks || false,
        range: input.range || null,
        dark: input.dark || false
      };

      console.error(`🚀 Using export wrapper for PDF generation...`);

      // Call the wrapper
      const result = await exportToPDF(mdPath, outputPath, exportOptions);

      if (!result.success) {
        throw new Error(result.message);
      }

      const outputPathResolved = result.pdfPath;

      // Count slides in markdown for feedback
      const slideCount = (currentPresentationMarkdown.match(/---\nlayout:/g) || []).length;

      return {
        structuredContent: {
          message: `PDF exported successfully! Use 'open "${outputPathResolved}"' to view.`,
          pdfPath: outputPathResolved,
          slideCount: slideCount,
          success: true
        }
      };

    } catch (error) {
      // Enhanced error handling for common issues
      if (error.message.includes('playwright') || error.message.includes('Playwright')) {
        return {
          structuredContent: {
            message: "PDF export failed: Playwright dependency issue. Run: npm install -D playwright-chromium",
            pdfPath: "",
            slideCount: 0,
            success: false
          }
        };
      }

      if (error.message.includes('ENOENT') || error.message.includes('command not found')) {
        return {
          structuredContent: {
            message: "PDF export failed: Slidev CLI not found. Run: npm install -g @slidev/cli",
            pdfPath: "",
            slideCount: 0,
            success: false
          }
        };
      }

      return {
        structuredContent: {
          message: `PDF export failed: ${error.message}`,
          pdfPath: "",
          slideCount: 0,
          success: false
        }
      };
    }
  }
);

// Register presentation listing tool - ESSENTIAL for file management!
server.registerTool(
  "list_presentations",
  {
    description: "List all available Slidev presentations in the presentations directory.",
    inputSchema: {},
    outputSchema: {
      presentations: z.array(z.object({
        name: z.string(),
        path: z.string(),
        lastModified: z.string(),
        hasMarkdown: z.boolean(),
        hasPdf: z.boolean()
      })),
      count: z.number()
    },
  },
  async () => {
    const { readdirSync, statSync, existsSync } = await import('fs');
    const { join } = await import('path');

    try {
      const presentationsDir = "./presentations";
      const pdfsDir = "./presentations/pdfs";

      if (!existsSync(presentationsDir)) {
        mkdirSync(presentationsDir, { recursive: true });
        return {
          structuredContent: {
            presentations: [],
            count: 0
          }
        };
      }

      const files = readdirSync(presentationsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => {
          const name = file.replace('.md', '');
          const mdPath = join(presentationsDir, file);
          const pdfPath = join(pdfsDir, `${name}.pdf`);
          const stats = statSync(mdPath);

          return {
            name,
            path: mdPath,
            lastModified: stats.mtime.toISOString(),
            hasMarkdown: true,
            hasPdf: existsSync(pdfPath)
          };
        });

      return {
        structuredContent: {
          presentations: files,
          count: files.length
        }
      };

    } catch (error) {
      return {
        structuredContent: {
          presentations: [],
          count: 0
        }
      };
    }
  }
);

// Register table creation tool - VERY common need!
server.registerTool(
  "add_table",
  {
    description: "Add a markdown table to the current presentation. Essential for business presentations with data.",
    inputSchema: {
      headers: z.array(z.string()).describe("Table column headers"),
      rows: z.array(z.array(z.string())).describe("Table data rows (array of arrays)"),
      caption: z.string().optional().describe("Optional table caption")
    },
    outputSchema: {
      message: z.string(),
      success: z.boolean()
    },
  },
  async (input) => {
    try {
      let tableMarkdown = "\n";

      if (input.caption) {
        tableMarkdown += `*${input.caption}*\n\n`;
      }

      // Create header row
      tableMarkdown += "| " + input.headers.join(" | ") + " |\n";

      // Create separator row
      tableMarkdown += "| " + input.headers.map(() => "---").join(" | ") + " |\n";

      // Create data rows
      for (const row of input.rows) {
        tableMarkdown += "| " + row.join(" | ") + " |\n";
      }

      tableMarkdown += "\n";

      currentPresentationMarkdown += tableMarkdown;

      return {
        structuredContent: {
          message: `Table added with ${input.headers.length} columns and ${input.rows.length} rows.`,
          success: true
        }
      };

    } catch (error) {
      return {
        structuredContent: {
          message: `Failed to add table: ${error.message}`,
          success: false
        }
      };
    }
  }
);

// Register presentation preview/serve tool - ESSENTIAL for development!
server.registerTool(
  "serve_presentation",
  {
    description: "Start a local Slidev development server to preview the presentation in browser. Essential for reviewing presentations.",
    inputSchema: {
      name: z.string().optional().describe("Presentation name to serve (defaults to current presentation)"),
      port: z.number().optional().describe("Port number (default: 3030)"),
      open: z.boolean().optional().describe("Automatically open browser (default: true)")
    },
    outputSchema: {
      message: z.string(),
      url: z.string(),
      port: z.number(),
      success: z.boolean()
    },
  },
  async (input) => {
    const { spawn } = await import('child_process');
    const { existsSync } = await import('fs');

    try {
      const name = input.name || presentationName;
      if (!name) {
        throw new Error("No presentation name provided and no current presentation");
      }

      const mdPath = join("./presentations", `${name}.md`);
      if (!existsSync(mdPath)) {
        throw new Error(`Presentation file not found: ${mdPath}`);
      }

      const port = input.port || 3030;
      const shouldOpen = input.open !== false;

      // Start Slidev dev server in background
      let command = `npx slidev ${mdPath} --port ${port}`;
      if (shouldOpen) command += " --open";

      // Note: This starts the server but doesn't wait for it
      spawn('npx', ['slidev', mdPath, '--port', port.toString(), shouldOpen ? '--open' : '--no-open'], {
        detached: true,
        stdio: 'ignore'
      });

      const url = `http://localhost:${port}`;

      return {
        structuredContent: {
          message: `Slidev server starting at ${url}. Check your browser!`,
          url: url,
          port: port,
          success: true
        }
      };

    } catch (error) {
      return {
        structuredContent: {
          message: `Failed to start server: ${error.message}`,
          url: "",
          port: 0,
          success: false
        }
      };
    }
  }
);

const transport = new StdioServerTransport();
server.connect(transport);

// Ensure presentations directory exists at startup
const presentationsDir = "./presentations";
if (!existsSync(presentationsDir)) {
  mkdirSync(presentationsDir, { recursive: true });
  console.error("Created presentations directory");
}

console.error("Slidev MCP STDIO server started with the following tools:");
console.error("🚀 ATOMIC TOOLS (Recommended for AI Agents):");
console.error("- build_complete_presentation: ⭐ Create entire presentation in ONE call");
console.error("- create_complete_slide: ⭐ Create complete slide in ONE call");
console.error("📋 ESSENTIAL TOOLS (Must-have features):");
console.error("- export_to_pdf: 📄 Export presentation to PDF using Slidev CLI");
console.error("- list_presentations: 📂 Browse all presentation files");
console.error("- add_table: 📊 Add markdown tables for data");
console.error("- serve_presentation: 🌐 Preview presentation in browser");
console.error("Legacy tools (avoid for AI agents to prevent max iterations):");
console.error("- create_presentation: Initialize a new Slidev presentation");
console.error("- add_slide: Add slide separators");
console.error("- add_slide_layout: Add slides with specific Slidev layouts");
console.error("- add_slide_title: Add headings to slides");
console.error("- add_text: Add text content");
console.error("- add_code_block: Add syntax-highlighted code");
console.error("- add_image: Add images to slides");
console.error("- save_presentation: Save presentation to file");
console.error("- get_presentation_state: View current presentation state");
console.error("Slidev guidance tools:");
console.error("- get_slidev_guidance: Get Slidev best practices and recommendations");
console.error("- list_slidev_themes: Get available themes with recommendations");
console.error("- get_slidev_layout_guide: Get layout guidance and usage examples");
console.error("Documentation: https://sli.dev/guide/");
console.error("Ready to accept MCP connections via stdio...");
