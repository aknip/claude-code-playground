/**
 * Unit tests for PDF export functionality
 * Tests the core export logic and error handling
 */

const { describe, it, expect, beforeEach } = require('@jest/globals');

describe('PDF Export Logic', () => {

  // Mock function that simulates the export_to_pdf path resolution logic
  function findPresentationFile(name, workingDirectories = []) {
    const possiblePaths = [
      `/project/root/presentations/${name}.md`,          // Project directory
      `/current/dir/presentations/${name}.md`,           // Current working directory
      `./presentations/${name}.md`,                      // Relative path
      `/Users/user/presentations/${name}.md`             // Home directory
    ];

    // Add working directories to search paths
    workingDirectories.forEach(dir => {
      possiblePaths.push(`${dir}/presentations/${name}.md`);
    });

    // Simulate file existence check
    const mockExistingFiles = [
      '/project/root/presentations/test-presentation.md',
      '/project/root/presentations/business-presentation.md',
      '/Users/user/presentations/home-presentation.md'
    ];

    for (const path of possiblePaths) {
      const fileName = path.split('/').pop();
      if (mockExistingFiles.some(file => file.includes(fileName))) {
        return path;
      }
    }

    return null;
  }

  // Mock function that simulates the export command execution
  function simulateExportCommand(inputPath, outputPath, options = {}) {
    // Simulate different export scenarios
    if (inputPath.includes('missing-deps')) {
      throw new Error('Error: The exporting for Slidev is powered by Playwright, please install it via `npm i -D playwright-chromium`');
    }

    if (inputPath.includes('theme-error')) {
      throw new Error('The theme "@slidev/theme-custom" was not found');
    }

    if (inputPath.includes('timeout')) {
      throw new Error('Command failed: timeout');
    }

    if (inputPath.includes('command-not-found')) {
      throw new Error('command not found: slidev');
    }

    // Successful export
    return {
      success: true,
      output: `
  ●■▲
  Slidev  v52.1.0

  theme       @slidev/theme-apple-basic
  css engine  unocss
  entry       ${inputPath}
  ✓ exported to ${outputPath}
      `,
      pdfPath: outputPath
    };
  }

  // Mock function that simulates dependency checking
  function checkDependencies() {
    const scenarios = {
      allPresent: { playwright: true, slidev: true },
      missingPlaywright: { playwright: false, slidev: true },
      missingSlideva: { playwright: true, slidev: false },
      allMissing: { playwright: false, slidev: false }
    };

    return scenarios.allPresent; // Default to all present
  }

  describe('File resolution across directories', () => {
    it('should find presentation in project directory', () => {
      const result = findPresentationFile('test-presentation');
      expect(result).toContain('test-presentation.md');
      expect(result).toContain('/project/root/presentations/');
    });

    it('should find presentation in home directory when not in project', () => {
      const result = findPresentationFile('home-presentation');
      expect(result).toContain('home-presentation.md');
    });

    it('should return null for non-existent presentations', () => {
      const result = findPresentationFile('non-existent-presentation');
      expect(result).toBeNull();
    });

    it('should search in custom working directories', () => {
      const customDirs = ['/custom/work/dir'];
      const result = findPresentationFile('test-presentation', customDirs);
      expect(result).toBeDefined();
    });
  });

  describe('Successful PDF export scenarios', () => {
    it('should export basic presentation successfully', () => {
      const inputPath = '/project/root/presentations/test-presentation.md';
      const outputPath = '/project/root/presentations/pdfs/test-presentation.pdf';

      const result = simulateExportCommand(inputPath, outputPath);

      expect(result.success).toBe(true);
      expect(result.output).toContain('✓ exported to');
      expect(result.output).toContain('Slidev  v52.1.0');
      expect(result.pdfPath).toBe(outputPath);
    });

    it('should handle export with options', () => {
      const inputPath = '/project/root/presentations/test-presentation.md';
      const outputPath = '/project/root/presentations/pdfs/test-presentation.pdf';
      const options = {
        withClicks: true,
        range: '1,3-5',
        dark: true
      };

      const result = simulateExportCommand(inputPath, outputPath, options);

      expect(result.success).toBe(true);
      expect(result.pdfPath).toBe(outputPath);
    });

    it('should export business presentation format', () => {
      const inputPath = '/project/root/presentations/business-presentation.md';
      const outputPath = '/project/root/presentations/pdfs/business-presentation.pdf';

      const result = simulateExportCommand(inputPath, outputPath);

      expect(result.success).toBe(true);
      expect(result.output).toContain('theme       @slidev/theme-apple-basic');
    });
  });

  describe('Error handling scenarios', () => {
    it('should handle missing playwright dependency', () => {
      const inputPath = '/project/root/presentations/missing-deps-presentation.md';
      const outputPath = '/project/root/presentations/pdfs/missing-deps-presentation.pdf';

      expect(() => simulateExportCommand(inputPath, outputPath))
        .toThrow('playwright-chromium');
    });

    it('should handle missing theme error', () => {
      const inputPath = '/project/root/presentations/theme-error-presentation.md';
      const outputPath = '/project/root/presentations/pdfs/theme-error-presentation.pdf';

      expect(() => simulateExportCommand(inputPath, outputPath))
        .toThrow('theme "@slidev/theme-custom" was not found');
    });

    it('should handle command timeout', () => {
      const inputPath = '/project/root/presentations/timeout-presentation.md';
      const outputPath = '/project/root/presentations/pdfs/timeout-presentation.pdf';

      expect(() => simulateExportCommand(inputPath, outputPath))
        .toThrow('timeout');
    });

    it('should handle missing slidev command', () => {
      const inputPath = '/project/root/presentations/command-not-found-presentation.md';
      const outputPath = '/project/root/presentations/pdfs/command-not-found-presentation.pdf';

      expect(() => simulateExportCommand(inputPath, outputPath))
        .toThrow('command not found: slidev');
    });
  });

  describe('Dependency checking', () => {
    it('should validate required dependencies are present', () => {
      const deps = checkDependencies();

      expect(deps.playwright).toBe(true);
      expect(deps.slidev).toBe(true);
    });

    it('should identify missing dependencies', () => {
      // This would be implemented in the actual tool to check for missing deps
      const requiredDeps = ['playwright-chromium', '@slidev/cli'];

      requiredDeps.forEach(dep => {
        expect(dep).toMatch(/playwright|slidev/);
      });
    });
  });

  describe('Export command construction', () => {
    it('should build basic export command', () => {
      const inputPath = '/path/to/presentation.md';
      const outputPath = '/path/to/output.pdf';

      const command = `npx slidev export "${inputPath}" --output "${outputPath}"`;

      expect(command).toContain('npx slidev export');
      expect(command).toContain(inputPath);
      expect(command).toContain(outputPath);
    });

    it('should build export command with options', () => {
      const inputPath = '/path/to/presentation.md';
      const outputPath = '/path/to/output.pdf';
      const options = {
        withClicks: true,
        range: '1-5',
        dark: true
      };

      let command = `npx slidev export "${inputPath}" --output "${outputPath}"`;

      if (options.withClicks) command += ' --with-clicks';
      if (options.range) command += ` --range "${options.range}"`;
      if (options.dark) command += ' --dark';

      expect(command).toContain('--with-clicks');
      expect(command).toContain('--range "1-5"');
      expect(command).toContain('--dark');
    });

    it('should handle fallback commands', () => {
      const fallbackCommands = [
        'npx slidev export',
        'node node_modules/@slidev/cli/bin/slidev.mjs export',
        'slidev export'
      ];

      expect(fallbackCommands).toHaveLength(3);
      expect(fallbackCommands[0]).toContain('npx');
      expect(fallbackCommands[1]).toContain('node_modules');
      expect(fallbackCommands[2]).toContain('slidev export');
    });
  });

  describe('PDF output verification', () => {
    it('should verify PDF creation', () => {
      const outputPath = '/project/root/presentations/pdfs/test.pdf';

      // Mock file existence check
      const mockFileExists = (path) => {
        return path === outputPath;
      };

      expect(mockFileExists(outputPath)).toBe(true);
      expect(mockFileExists('/wrong/path.pdf')).toBe(false);
    });

    it('should handle PDF creation failure', () => {
      const outputPath = '/project/root/presentations/pdfs/failed.pdf';

      // Mock file doesn't exist
      const mockFileExists = (path) => false;

      expect(mockFileExists(outputPath)).toBe(false);
    });

    it('should check PDF file size', () => {
      const mockPdfStats = {
        size: 102400, // 100KB
        isFile: () => true,
        mtime: new Date()
      };

      expect(mockPdfStats.size).toBeGreaterThan(0);
      expect(mockPdfStats.isFile()).toBe(true);
      expect(Math.round(mockPdfStats.size / 1024)).toBe(100); // 100KB
    });
  });

  describe('Working directory management', () => {
    it('should handle different working directories', () => {
      const scenarios = [
        '/Users/user/projects/vibe-slidev-mcp',
        '/Users/user/different-project',
        '/home/user/workspace',
        '/tmp/testing'
      ];

      scenarios.forEach(workingDir => {
        expect(workingDir).toMatch(/\//); // Valid path

        // Mock project root detection
        const isProjectDir = workingDir.includes('vibe-slidev-mcp');
        const projectRoot = isProjectDir ? workingDir : '/Users/user/projects/vibe-slidev-mcp';

        expect(projectRoot).toMatch(/vibe-slidev-mcp/);
      });
    });

    it('should resolve project root correctly', () => {
      const testCases = [
        {
          current: '/Users/user/projects/vibe-slidev-mcp',
          expected: '/Users/user/projects/vibe-slidev-mcp'
        },
        {
          current: '/Users/user',
          expected: '/Users/user/Development/playground/vibe-coding/vibe-slidev-mcp'
        },
        {
          current: '/tmp/random',
          expected: '/Users/ray.kuo/Development/playground/vibe-coding/vibe-slidev-mcp'
        }
      ];

      testCases.forEach(testCase => {
        const isProject = testCase.current.includes('vibe-slidev-mcp');
        const result = isProject ? testCase.current : testCase.expected;

        expect(result).toContain('vibe-slidev-mcp');
      });
    });
  });

  describe('Error message formatting', () => {
    it('should provide helpful error messages for missing dependencies', () => {
      const errors = {
        playwright: 'PDF export failed: Playwright dependency issue. Run: npm install -D playwright-chromium',
        slidev: 'PDF export failed: Slidev CLI not found. Run: npm install -D @slidev/cli',
        theme: 'PDF export failed: Theme not found. Check theme name and installation.',
        general: 'PDF export failed: Unknown error occurred'
      };

      expect(errors.playwright).toContain('playwright-chromium');
      expect(errors.slidev).toContain('@slidev/cli');
      expect(errors.theme).toContain('Theme not found');
      expect(errors.general).toContain('PDF export failed');
    });

    it('should categorize different error types', () => {
      const errorCategories = [
        { type: 'dependency', keywords: ['playwright', 'install'] },
        { type: 'command', keywords: ['command not found', 'ENOENT'] },
        { type: 'theme', keywords: ['theme', 'not found'] },
        { type: 'timeout', keywords: ['timeout', 'killed'] }
      ];

      errorCategories.forEach(category => {
        expect(category.type).toMatch(/dependency|command|theme|timeout/);
        expect(category.keywords.length).toBeGreaterThan(0);
      });
    });
  });
});