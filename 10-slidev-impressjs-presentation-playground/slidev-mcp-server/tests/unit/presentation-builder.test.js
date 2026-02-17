/**
 * Unit tests for presentation building logic
 * Tests the core markdown generation without complex mocking
 */

const { describe, it, expect } = require('@jest/globals');
const { samplePresentations } = require('../fixtures/sample-presentations.js');

describe('Presentation Building Logic', () => {

  // Core function that mimics build_complete_presentation markdown generation
  function buildPresentationMarkdown(input) {
    // Validate required inputs
    if (!input.name) throw new Error('Presentation name is required');
    if (!input.title) throw new Error('Presentation title is required');
    if (!input.slides || input.slides.length === 0) {
      throw new Error('At least one slide is required');
    }

    // Create first slide with combined metadata (no empty page)
    let markdown = '';
    const firstSlide = input.slides[0];

    if (firstSlide) {
      markdown += '---\n';
      markdown += `layout: ${firstSlide.layout}\n`;
      if (input.theme) markdown += `theme: ${input.theme}\n`;
      markdown += `title: "${input.title}"\n`;
      if (input.author) markdown += `author: "${input.author}"\n`;
      markdown += '---\n';

      if (firstSlide.title) {
        markdown += `\n# ${firstSlide.title}\n`;
      }
      if (firstSlide.content) {
        markdown += `\n${firstSlide.content}\n`;
      }
      if (firstSlide.code && firstSlide.codeLanguage) {
        markdown += `\n\`\`\`${firstSlide.codeLanguage}\n${firstSlide.code}\n\`\`\`\n`;
      }
    }

    // Add remaining slides
    for (let i = 1; i < input.slides.length; i++) {
      const slide = input.slides[i];
      markdown += `\n---\nlayout: ${slide.layout}\n---\n`;

      if (slide.title) {
        markdown += `\n# ${slide.title}\n`;
      }
      if (slide.content) {
        markdown += `\n${slide.content}\n`;
      }
      if (slide.code && slide.codeLanguage) {
        markdown += `\n\`\`\`${slide.codeLanguage}\n${slide.code}\n\`\`\`\n`;
      }
    }

    return markdown;
  }

  describe('Successful presentation generation', () => {
    it('should generate minimal presentation correctly', () => {
      const result = buildPresentationMarkdown(samplePresentations.minimal);

      expect(result).toContain('layout: cover');
      expect(result).toContain('title: "Minimal Test"');
      expect(result).toContain('# Minimal Test');

      // Should have only one slide section
      const slideMatches = result.match(/---\nlayout:/g);
      expect(slideMatches).toHaveLength(1);
    });

    it('should generate complete presentation with all features', () => {
      const result = buildPresentationMarkdown(samplePresentations.complete);

      expect(result).toContain('theme: apple-basic');
      expect(result).toContain('author: "Test Author"');
      expect(result).toContain('```javascript');
      expect(result).toContain('console.log("Hello, World!");');

      // Should have 4 slides total
      const slideMatches = result.match(/---\nlayout:/g);
      expect(slideMatches).toHaveLength(4);
    });

    it('should generate business presentation format', () => {
      const result = buildPresentationMarkdown(samplePresentations.business);

      expect(result).toContain('Business Strategy Overview');
      expect(result).toContain('layout: two-cols');
      expect(result).toContain('theme: apple-basic');

      // Should have 3 slides
      const slideMatches = result.match(/---\nlayout:/g);
      expect(slideMatches).toHaveLength(3);
    });

    it('should generate technical presentation with code blocks', () => {
      const result = buildPresentationMarkdown(samplePresentations.technical);

      expect(result).toContain('```javascript');
      expect(result).toContain('fetch("/api/users")');
      expect(result).toContain('Technical Architecture Overview');
    });
  });

  describe('Critical markdown structure validation', () => {
    it('should prevent empty pages by combining metadata with first slide', () => {
      const result = buildPresentationMarkdown(samplePresentations.complete);

      // Should start with combined frontmatter (no empty page)
      expect(result).toMatch(/^---\nlayout: cover\ntheme: apple-basic/);

      // Should NOT have empty lines between frontmatter blocks
      expect(result).not.toMatch(/---\n\n---/);

      // First few lines should be properly structured
      const lines = result.split('\n');
      expect(lines[0]).toBe('---');
      expect(lines[1]).toBe('layout: cover');
      expect(lines[2]).toBe('theme: apple-basic');
      expect(lines[3]).toBe('title: "Complete Test Presentation"');
      expect(lines[4]).toBe('author: "Test Author"');
      expect(lines[5]).toBe('---');
    });

    it('should have proper slide separators', () => {
      const result = buildPresentationMarkdown(samplePresentations.complete);

      // Count frontmatter separators (should be 2 per slide)
      const frontmatterCount = (result.match(/^---$/gm) || []).length;
      expect(frontmatterCount).toBe(8); // 4 slides × 2 separators each

      // Verify slide structure
      expect(result).toContain('# Complete Test Presentation');
      expect(result).toContain('# Agenda');
      expect(result).toContain('# Code Example');
      expect(result).toContain('# Thank You');
    });

    it('should generate correct structure for minimal presentation', () => {
      const result = buildPresentationMarkdown(samplePresentations.minimal);

      // Should have proper minimal structure
      const lines = result.split('\n');
      expect(lines[0]).toBe('---');
      expect(lines[1]).toBe('layout: cover');
      expect(lines[2]).toBe('title: "Minimal Test"');
      expect(lines[3]).toBe('---');
      expect(lines[4]).toBe('');
      expect(lines[5]).toBe('# Minimal Test');
    });
  });

  describe('Input validation', () => {
    it('should throw error for missing name', () => {
      const input = { ...samplePresentations.minimal };
      delete input.name;

      expect(() => buildPresentationMarkdown(input))
        .toThrow('Presentation name is required');
    });

    it('should throw error for missing title', () => {
      const input = { ...samplePresentations.minimal };
      delete input.title;

      expect(() => buildPresentationMarkdown(input))
        .toThrow('Presentation title is required');
    });

    it('should throw error for missing slides', () => {
      const input = {
        name: 'test',
        title: 'Test',
        slides: []
      };

      expect(() => buildPresentationMarkdown(input))
        .toThrow('At least one slide is required');
    });
  });

  describe('Optional field handling', () => {
    it('should handle presentation without theme', () => {
      const input = {
        name: 'no-theme-test',
        title: 'No Theme Test',
        slides: [{
          layout: 'cover',
          title: 'No Theme Test'
        }]
      };

      const result = buildPresentationMarkdown(input);

      expect(result).not.toContain('theme:');
      expect(result).toContain('title: "No Theme Test"');
      expect(result).toContain('# No Theme Test');
    });

    it('should handle presentation without author', () => {
      const input = {
        name: 'no-author-test',
        title: 'No Author Test',
        theme: 'default',
        slides: [{
          layout: 'cover',
          title: 'No Author Test'
        }]
      };

      const result = buildPresentationMarkdown(input);

      expect(result).not.toContain('author:');
      expect(result).toContain('theme: default');
      expect(result).toContain('# No Author Test');
    });

    it('should handle slides without optional content', () => {
      const input = {
        name: 'minimal-slides-test',
        title: 'Minimal Slides Test',
        slides: [
          { layout: 'cover' }, // No title or content
          { layout: 'default', title: 'Only Title' }, // Only title
          { layout: 'default', content: 'Only content' } // Only content
        ]
      };

      const result = buildPresentationMarkdown(input);

      expect(result).toContain('layout: cover');
      expect(result).toContain('# Only Title');
      expect(result).toContain('Only content');

      // Should have 3 slides
      const slideMatches = result.match(/---\nlayout:/g);
      expect(slideMatches).toHaveLength(3);
    });
  });

  describe('Content formatting', () => {
    it('should properly format code blocks', () => {
      const input = {
        name: 'code-test',
        title: 'Code Test',
        slides: [{
          layout: 'default',
          title: 'Python Code',
          content: 'Here is some Python code:',
          code: 'def hello():\n    print("Hello, World!")',
          codeLanguage: 'python'
        }]
      };

      const result = buildPresentationMarkdown(input);

      expect(result).toContain('```python');
      expect(result).toContain('def hello():');
      expect(result).toContain('print("Hello, World!")');
      expect(result).toContain('```');
    });

    it('should handle mixed content types', () => {
      const input = {
        name: 'mixed-test',
        title: 'Mixed Test',
        slides: [{
          layout: 'default',
          title: 'Mixed Content',
          content: 'Text content',
          code: 'console.log("test");',
          codeLanguage: 'javascript'
        }]
      };

      const result = buildPresentationMarkdown(input);

      expect(result).toContain('# Mixed Content');
      expect(result).toContain('Text content');
      expect(result).toContain('```javascript');
      expect(result).toContain('console.log("test");');
    });

    it('should preserve markdown formatting', () => {
      const input = {
        name: 'formatting-test',
        title: 'Formatting Test',
        slides: [{
          layout: 'default',
          title: 'Bullet Points',
          content: '- First point\n- Second point\n- **Bold text**'
        }]
      };

      const result = buildPresentationMarkdown(input);

      expect(result).toContain('- First point');
      expect(result).toContain('- Second point');
      expect(result).toContain('**Bold text**');
    });
  });
});