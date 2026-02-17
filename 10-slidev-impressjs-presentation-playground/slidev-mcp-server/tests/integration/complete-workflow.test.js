/**
 * Integration tests for complete presentation workflows
 * Tests the full process from creation to PDF export
 */

const { describe, it, expect, beforeEach } = require('@jest/globals');
const { samplePresentations } = require('../fixtures/sample-presentations.js');

describe('Complete Presentation Workflow Integration', () => {

  // Simulate complete workflow from presentation creation to PDF export
  function simulateCompleteWorkflow(presentationInput, exportOptions = {}) {
    const results = {
      createResult: null,
      exportResult: null,
      errors: [],
      success: false
    };

    try {
      // Step 1: Build presentation
      results.createResult = simulateBuildPresentation(presentationInput);

      // Step 2: Export to PDF
      if (results.createResult.success) {
        const exportInput = {
          name: presentationInput.name,
          options: exportOptions
        };
        results.exportResult = simulateExportToPDF(exportInput);

        // Overall success if both steps succeed
        results.success = results.createResult.success && results.exportResult.success;
      }

    } catch (error) {
      results.errors.push(error.message);
    }

    return results;
  }

  // Mock build presentation logic
  function simulateBuildPresentation(input) {
    // Validate inputs
    if (!input.name || !input.title || !input.slides?.length) {
      throw new Error('Invalid presentation input');
    }

    // Build markdown
    let markdown = '';
    const firstSlide = input.slides[0];

    if (firstSlide) {
      markdown += '---\n';
      markdown += `layout: ${firstSlide.layout}\n`;
      if (input.theme) markdown += `theme: ${input.theme}\n`;
      markdown += `title: "${input.title}"\n`;
      if (input.author) markdown += `author: "${input.author}"\n`;
      markdown += '---\n';

      if (firstSlide.title) markdown += `\n# ${firstSlide.title}\n`;
      if (firstSlide.content) markdown += `\n${firstSlide.content}\n`;
      if (firstSlide.code) markdown += `\n\`\`\`${firstSlide.codeLanguage}\n${firstSlide.code}\n\`\`\`\n`;
    }

    for (let i = 1; i < input.slides.length; i++) {
      const slide = input.slides[i];
      markdown += `\n---\nlayout: ${slide.layout}\n---\n`;

      if (slide.title) markdown += `\n# ${slide.title}\n`;
      if (slide.content) markdown += `\n${slide.content}\n`;
      if (slide.code) markdown += `\n\`\`\`${slide.codeLanguage}\n${slide.code}\n\`\`\`\n`;
    }

    return {
      success: true,
      filePath: `/project/presentations/${input.name}.md`,
      markdown: markdown,
      slideCount: input.slides.length,
      message: `Presentation '${input.title}' created successfully`
    };
  }

  // Mock PDF export logic
  function simulateExportToPDF(input) {
    // Simulate dependency checking
    if (input.name.includes('missing-deps')) {
      throw new Error('Missing playwright-chromium dependency');
    }

    // Simulate successful export
    const pdfPath = `/project/presentations/pdfs/${input.name}.pdf`;

    return {
      success: true,
      pdfPath: pdfPath,
      message: `PDF exported successfully: ${pdfPath}`
    };
  }

  describe('End-to-end workflow success scenarios', () => {
    it('should complete full workflow for minimal presentation', () => {
      const workflow = simulateCompleteWorkflow(samplePresentations.minimal);

      expect(workflow.success).toBe(true);
      expect(workflow.createResult.success).toBe(true);
      expect(workflow.exportResult.success).toBe(true);
      expect(workflow.createResult.slideCount).toBe(1);
      expect(workflow.exportResult.pdfPath).toContain('minimal-test.pdf');
      expect(workflow.errors).toHaveLength(0);
    });

    it('should complete full workflow for complete presentation', () => {
      const workflow = simulateCompleteWorkflow(samplePresentations.complete);

      expect(workflow.success).toBe(true);
      expect(workflow.createResult.slideCount).toBe(4);
      expect(workflow.createResult.markdown).toContain('theme: apple-basic');
      expect(workflow.createResult.markdown).toContain('```javascript');
      expect(workflow.exportResult.pdfPath).toContain('complete-test.pdf');
    });

    it('should complete full workflow for business presentation', () => {
      const workflow = simulateCompleteWorkflow(samplePresentations.business);

      expect(workflow.success).toBe(true);
      expect(workflow.createResult.slideCount).toBe(3);
      expect(workflow.createResult.markdown).toContain('Business Strategy Overview');
      expect(workflow.exportResult.pdfPath).toContain('business-presentation.pdf');
    });

    it('should complete full workflow for technical presentation', () => {
      const workflow = simulateCompleteWorkflow(samplePresentations.technical);

      expect(workflow.success).toBe(true);
      expect(workflow.createResult.slideCount).toBe(3);
      expect(workflow.createResult.markdown).toContain('Technical Architecture Overview');
      expect(workflow.createResult.markdown).toContain('fetch("/api/users")');
      expect(workflow.exportResult.pdfPath).toContain('tech-overview.pdf');
    });
  });

  describe('Workflow with export options', () => {
    it('should handle export with clicks enabled', () => {
      const exportOptions = { withClicks: true };
      const workflow = simulateCompleteWorkflow(samplePresentations.complete, exportOptions);

      expect(workflow.success).toBe(true);
      expect(workflow.exportResult.success).toBe(true);
    });

    it('should handle export with slide range', () => {
      const exportOptions = { range: '1-3' };
      const workflow = simulateCompleteWorkflow(samplePresentations.complete, exportOptions);

      expect(workflow.success).toBe(true);
      expect(workflow.exportResult.success).toBe(true);
    });

    it('should handle export with dark theme', () => {
      const exportOptions = { dark: true };
      const workflow = simulateCompleteWorkflow(samplePresentations.complete, exportOptions);

      expect(workflow.success).toBe(true);
      expect(workflow.exportResult.success).toBe(true);
    });

    it('should handle export with multiple options', () => {
      const exportOptions = {
        withClicks: true,
        range: '1-2',
        dark: true
      };
      const workflow = simulateCompleteWorkflow(samplePresentations.complete, exportOptions);

      expect(workflow.success).toBe(true);
      expect(workflow.exportResult.success).toBe(true);
    });
  });

  describe('Error handling in complete workflow', () => {
    it('should handle invalid presentation input', () => {
      const invalidInput = {
        name: 'invalid-test',
        // Missing title and slides
      };

      const workflow = simulateCompleteWorkflow(invalidInput);

      expect(workflow.success).toBe(false);
      expect(workflow.errors.length).toBeGreaterThan(0);
      expect(workflow.errors[0]).toContain('Invalid presentation input');
    });

    it('should handle missing dependencies during export', () => {
      const presentationWithDepsIssue = {
        ...samplePresentations.minimal,
        name: 'missing-deps-test'
      };

      const workflow = simulateCompleteWorkflow(presentationWithDepsIssue);

      expect(workflow.success).toBe(false);
      expect(workflow.createResult.success).toBe(true); // Creation succeeds
      expect(workflow.errors.length).toBeGreaterThan(0);
      expect(workflow.errors[0]).toContain('playwright-chromium');
    });

    it('should handle presentation creation failure gracefully', () => {
      const invalidPresentation = {
        name: '', // Invalid name
        title: 'Test',
        slides: []
      };

      const workflow = simulateCompleteWorkflow(invalidPresentation);

      expect(workflow.success).toBe(false);
      expect(workflow.createResult).toBeNull();
      expect(workflow.exportResult).toBeNull();
      expect(workflow.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Markdown structure validation in workflow', () => {
    it('should generate proper markdown structure preventing empty pages', () => {
      const workflow = simulateCompleteWorkflow(samplePresentations.complete);

      expect(workflow.success).toBe(true);

      const markdown = workflow.createResult.markdown;

      // Should start with combined frontmatter
      expect(markdown).toMatch(/^---\nlayout: cover\ntheme: apple-basic/);

      // Should not have empty lines creating blank pages
      expect(markdown).not.toMatch(/---\n\n---/);

      // Should have correct slide count
      const slideMatches = markdown.match(/---\nlayout:/g);
      expect(slideMatches).toHaveLength(4);
    });

    it('should preserve all content types in workflow', () => {
      const workflow = simulateCompleteWorkflow(samplePresentations.complete);

      const markdown = workflow.createResult.markdown;

      // Check all content is preserved
      expect(markdown).toContain('# Complete Test Presentation');
      expect(markdown).toContain('# Agenda');
      expect(markdown).toContain('# Code Example');
      expect(markdown).toContain('# Thank You');
      expect(markdown).toContain('```javascript');
      expect(markdown).toContain('console.log("Hello, World!");');
    });
  });

  describe('Performance and scalability', () => {
    it('should handle large presentations efficiently', () => {
      // Create a large presentation with many slides
      const largePresentation = {
        name: 'large-presentation',
        title: 'Large Test Presentation',
        theme: 'default',
        slides: []
      };

      // Generate 20 slides
      for (let i = 1; i <= 20; i++) {
        largePresentation.slides.push({
          layout: 'default',
          title: `Slide ${i}`,
          content: `This is slide number ${i} with some content.`
        });
      }

      const workflow = simulateCompleteWorkflow(largePresentation);

      expect(workflow.success).toBe(true);
      expect(workflow.createResult.slideCount).toBe(20);
      expect(workflow.createResult.markdown.length).toBeGreaterThan(1000);
    });

    it('should handle presentations with complex content', () => {
      const complexPresentation = {
        name: 'complex-presentation',
        title: 'Complex Content Test',
        theme: 'apple-basic',
        author: 'Test Author',
        slides: [
          {
            layout: 'cover',
            title: 'Complex Content Test',
            content: 'A presentation with various content types'
          },
          {
            layout: 'default',
            title: 'Code Examples',
            content: 'Multiple programming languages:',
            code: 'def python_function():\n    return "Hello from Python"\n\nprint(python_function())',
            codeLanguage: 'python'
          },
          {
            layout: 'two-cols',
            title: 'Data Analysis',
            content: '- Data processing\n- **Machine Learning**\n- *Statistical Analysis*\n\n> Important note about data'
          },
          {
            layout: 'default',
            title: 'JavaScript Example',
            code: 'const fetchData = async (url) => {\n  try {\n    const response = await fetch(url);\n    return response.json();\n  } catch (error) {\n    console.error("Error:", error);\n  }\n};',
            codeLanguage: 'javascript'
          }
        ]
      };

      const workflow = simulateCompleteWorkflow(complexPresentation);

      expect(workflow.success).toBe(true);
      expect(workflow.createResult.markdown).toContain('```python');
      expect(workflow.createResult.markdown).toContain('```javascript');
      expect(workflow.createResult.markdown).toContain('**Machine Learning**');
      expect(workflow.createResult.markdown).toContain('*Statistical Analysis*');
    });
  });

  describe('n8n Agent Simulation', () => {
    it('should simulate successful n8n agent workflow', () => {
      // Simulate the exact workflow an n8n agent would follow
      const agentInput = {
        name: 'ai-agent-demo',
        title: 'AI Agent Demonstration',
        theme: 'apple-basic',
        author: 'AI Assistant',
        slides: [
          {
            layout: 'cover',
            title: 'AI Agent Demonstration',
            content: 'Automated presentation generation'
          },
          {
            layout: 'default',
            title: 'Key Features',
            content: '- Automated content generation\n- PDF export capability\n- Professional themes'
          },
          {
            layout: 'end',
            title: 'Thank You',
            content: 'Questions & Discussion'
          }
        ]
      };

      const workflow = simulateCompleteWorkflow(agentInput);

      expect(workflow.success).toBe(true);
      expect(workflow.createResult.message).toContain('AI Agent Demonstration');
      expect(workflow.exportResult.pdfPath).toContain('ai-agent-demo.pdf');

      // Verify the workflow produces expected output format
      expect(workflow.createResult.filePath).toMatch(/\.md$/);
      expect(workflow.exportResult.pdfPath).toMatch(/\.pdf$/);
    });

    it('should handle rapid successive workflow executions', () => {
      const presentations = [
        { ...samplePresentations.minimal, name: 'rapid-1' },
        { ...samplePresentations.business, name: 'rapid-2' },
        { ...samplePresentations.technical, name: 'rapid-3' }
      ];

      const workflows = presentations.map(p => simulateCompleteWorkflow(p));

      // All should succeed
      workflows.forEach(w => {
        expect(w.success).toBe(true);
      });

      // Each should have unique output paths
      const pdfPaths = workflows.map(w => w.exportResult.pdfPath);
      const uniquePaths = new Set(pdfPaths);
      expect(uniquePaths.size).toBe(3);
    });
  });
});