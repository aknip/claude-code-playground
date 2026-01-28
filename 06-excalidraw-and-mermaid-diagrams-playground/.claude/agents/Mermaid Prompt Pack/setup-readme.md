# Mermaid.js Diagram Assistant - Setup Guide

## 🎥 Video Tutorial

**New to this setup?** Watch the complete step-by-step video tutorial on YouTube:  
👉 [Watch the Full Setup Guide](https://www.youtube.com/watch?v=0pzu6bSvB7A)

The video walks through the entire process from download to creating your first diagram.

---

## 📦 What's Included

This package contains everything you need to set up your own professional Mermaid.js diagram creation assistant powered by Claude AI.

### Package Contents:
1. **project-instructions.md** - Core system instructions and workflow
2. **mermaid-diagram-types.md** - Comprehensive diagram type reference
3. **style-templates.md** - Pre-built styling for different outputs
4. **troubleshooting-guide.md** - Common issues and solutions
5. **accessible-design.md** - Accessibility best practices
6. **universal-prompt-template.md** - Detailed requirements template
7. **mermaid-master-prompt.md** - Quick request format
8. **README.md** - This setup guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Claude AI account (claude.ai)
- Your brand guidelines (colors, fonts, personality)

### Step 1: Create a New Claude Project
1. Log into Claude at [claude.ai](https://claude.ai)
2. Click **"Projects"** in the left sidebar
3. Click **"Create Project"**
4. Name it: "Mermaid Diagram Assistant" (or your preferred name)

### Step 2: Upload Project Knowledge
1. In your new project, click **"Add content"** or the **"+"** button
2. Upload all the `.md` files from this package:
   - mermaid-diagram-types.md
   - style-templates.md
   - troubleshooting-guide.md
   - accessible-design.md
   - universal-prompt-template.md
   - mermaid-master-prompt.md

### Step 3: Set Custom Instructions
1. Click **"Project Settings"** or the gear icon
2. Find the **"Custom Instructions"** section
3. Copy the entire contents of **project-instructions.md**
4. Paste it into the Custom Instructions field
5. Click **"Save"**

### Step 4: Add Your Brand Guidelines
Create a new file called `brand-guidelines.md` with your brand information:

```markdown
# [Your Company Name] Brand Guidelines

## Typography:
- **Heading Font**: [Your heading font - e.g., "Roboto Bold"]
- **Body Font**: [Your body font - e.g., "Open Sans"]

## Brand Colors:
- **Primary**: #XXXXXX ([Description - e.g., "Corporate Blue"])
- **Secondary**: #XXXXXX ([Description - e.g., "Accent Orange"])
- **Accent**: #XXXXXX ([Description - e.g., "Highlight Yellow"])

## Complementary Palette:
- [Color Category]: #XXXXXX, #XXXXXX
- [Color Category]: #XXXXXX, #XXXXXX

## Brand Personality:
- [Trait 1 - e.g., "Professional and trustworthy"]
- [Trait 2 - e.g., "Modern and innovative"]
- [Trait 3 - e.g., "Approachable and friendly"]
```

Upload this file to your project knowledge.

### Step 5: Test Your Setup
Start a new chat in your project and try:

**Simple Test:**
```
Create a basic user login flowchart
```

**Detailed Test:**
```
Project: I need to visualize our customer onboarding process for a presentation to executives.

Brand Guidelines: Use my uploaded brand guidelines.

Output Goal: Simple overview, optimized for PowerPoint presentation.
```

## 📋 How to Use

### For Quick Diagrams
Just describe what you need:
- "Create a flowchart showing the checkout process"
- "Make a Gantt chart for a 3-month project"
- "Design a sequence diagram for API authentication"

### For Complex Diagrams
Use the **Mermaid Master Prompt** format:

```
Project: [Describe what you want to visualize]

Brand Guidelines: [Use my brand guidelines / or specify colors]

Output Goal: [Simple/detailed, for presentation/docs/web]
```

### For Maximum Detail
Reference the **Universal Prompt Template** and fill in all sections for comprehensive diagram creation.

## 🎨 Customization Options

### Modify Brand Guidelines
Update your `brand-guidelines.md` file anytime to change:
- Color palette
- Typography preferences
- Brand personality traits

### Add Industry-Specific Templates
Create additional `.md` files for specialized use cases:
- `software-architecture-patterns.md`
- `business-process-templates.md`
- `data-flow-conventions.md`

### Extend Diagram Types
Add custom diagram type guides based on your needs:
- Industry-specific visualizations
- Company-standard formats
- Team conventions

## 🔧 Troubleshooting

### Assistant Doesn't Follow Brand Guidelines
- Verify `brand-guidelines.md` is uploaded to project knowledge
- Explicitly mention "use my brand guidelines" in your request
- Check that color codes include the `#` symbol

### Diagrams Don't Render Correctly
- Test the Mermaid code at [mermaid.live](https://mermaid.live)
- Check for syntax errors in the troubleshooting guide
- Ask the assistant to simplify the diagram

### Custom Instructions Not Applied
- Ensure you pasted the full `project-instructions.md` content
- Save and refresh your browser
- Create a new chat in the project

### Diagrams Too Complex/Simple
- Specify complexity level: "simple overview", "medium detail", or "comprehensive technical"
- Reference the style templates for your intended use case
- Ask for alternative complexity levels

## 📚 Best Practices

### For Presentations
- Request "large fonts for presentation"
- Specify "high contrast colors"
- Use "simple, executive-friendly language"

### For Technical Documentation
- Request "detailed technical workflow"
- Include "technical terminology OK"
- Specify "comprehensive detail level"

### For Web/Digital Use
- Request "web-optimized styling"
- Specify "SVG format preferred"
- Use "compact, responsive layout"

### For Print Materials
- Request "print-optimized design"
- Specify "high contrast for B&W printing"
- Use "clear borders and readable fonts"

## 🔄 Updating Your Assistant

### Adding New Knowledge
1. Create new `.md` files with additional reference material
2. Upload to project knowledge
3. Reference in your requests: "Check the [filename] guide"

### Modifying Instructions
1. Edit the custom instructions in project settings
2. Add new capabilities or constraints
3. Save changes (existing chats won't update automatically)

### Version Control
- Keep backup copies of your configuration
- Document any modifications you make
- Share successful patterns with your team

## 🤝 Sharing with Your Team

### Share the Project
1. Click "Share" in your Claude project
2. Add team members by email
3. Set permissions (view/edit)

### Share Individual Diagrams
- Copy the Mermaid code from the assistant's response
- Paste into any Mermaid-compatible tool
- Export as PNG, SVG, or PDF

### Create Team Templates
- Document successful diagram patterns
- Add to project knowledge as new `.md` files
- Create standardized request formats

## 💡 Tips for Best Results

1. **Be Specific**: The more context you provide, the better the output
2. **Iterate**: Ask for modifications rather than starting over
3. **Save Good Examples**: Keep working prompts for future reference
4. **Use Templates**: The universal template ensures comprehensive results
5. **Test Exports**: Always verify diagrams export correctly for your intended use

## 📞 Support Resources

### Mermaid.js Documentation
- Official docs: [mermaid.js.org](https://mermaid.js.org)
- Live editor: [mermaid.live](https://mermaid.live)

### Claude AI Help
- Support: [support.claude.com](https://support.claude.com)
- Documentation: [docs.claude.com](https://docs.claude.com)

### This Project
- Review the troubleshooting guide for common issues
- Check accessible design guidelines for best practices
- Reference diagram types guide for selection help

## 📄 License & Credits

This Mermaid.js Diagram Assistant package is provided as-is for creating professional diagrams using Claude AI and Mermaid.js.

- **Mermaid.js**: [GitHub](https://github.com/mermaid-js/mermaid)
- **Claude AI**: [Anthropic](https://www.anthropic.com)

---

## ✅ Setup Checklist

- [ ] Created Claude project
- [ ] Uploaded all 6 `.md` knowledge files
- [ ] Added custom instructions from project-instructions.md
- [ ] Created and uploaded brand-guidelines.md
- [ ] Tested with simple diagram request
- [ ] Tested with detailed diagram request
- [ ] Verified brand colors appear correctly
- [ ] Bookmarked project for easy access

---

**Ready to create professional diagrams!** 🎉

Start your first chat with: "Create a flowchart showing [your process] using my brand guidelines."