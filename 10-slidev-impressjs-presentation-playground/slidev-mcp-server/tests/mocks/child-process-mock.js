/**
 * Child process mocks for testing command execution
 */

const { jest } = require('@jest/globals');

const createExecSyncMock = () => {
  const mockExecSync = jest.fn();

  // Default successful responses
  mockExecSync.mockImplementation((command) => {
    if (command.includes('slidev export')) {
      return `
  ●■▲
  Slidev  v52.1.0

  theme       @slidev/theme-apple-basic
  css engine  unocss
  entry       /mock/path/presentation.md
  ✓ exported to ./presentations/pdfs/test.pdf
      `;
    }

    if (command.includes('slidev --version')) {
      return '52.1.0';
    }

    if (command.includes('npm list playwright-chromium')) {
      return 'playwright-chromium@1.54.2';
    }

    if (command.includes('npm install')) {
      return 'mock install output';
    }

    return 'mock command output';
  });

  return mockExecSync;
};

const createMockScenarios = () => ({
  // Successful PDF export
  successfulExport: () => {
    const mockExecSync = createExecSyncMock();
    mockExecSync.mockReturnValue(`
  ●■▲
  Slidev  v52.1.0
  ✓ exported to ./presentations/pdfs/test.pdf
    `);
    return mockExecSync;
  },

  // Missing dependencies
  missingPlaywright: () => {
    const mockExecSync = createExecSyncMock();
    mockExecSync.mockImplementation((command) => {
      if (command.includes('npm list playwright-chromium')) {
        throw new Error('playwright-chromium not found');
      }
      if (command.includes('slidev export')) {
        throw new Error('Error: The exporting for Slidev is powered by Playwright, please install it via `npm i -D playwright-chromium`');
      }
      return 'mock output';
    });
    return mockExecSync;
  },

  // Missing Slidev CLI
  missingSlidev: () => {
    const mockExecSync = createExecSyncMock();
    mockExecSync.mockImplementation((command) => {
      if (command.includes('slidev') || command.includes('npx slidev')) {
        throw new Error('command not found: slidev');
      }
      return 'mock output';
    });
    return mockExecSync;
  },

  // Export timeout
  exportTimeout: () => {
    const mockExecSync = createExecSyncMock();
    mockExecSync.mockImplementation((command) => {
      if (command.includes('slidev export')) {
        throw new Error('Command failed: timeout');
      }
      return 'mock output';
    });
    return mockExecSync;
  },

  // Theme not found
  themeNotFound: () => {
    const mockExecSync = createExecSyncMock();
    mockExecSync.mockImplementation((command) => {
      if (command.includes('slidev export')) {
        throw new Error('The theme "@slidev/theme-custom" was not found');
      }
      return 'mock output';
    });
    return mockExecSync;
  },

  // General command failure
  commandFailure: (errorMessage = 'Mock command error') => {
    const mockExecSync = createExecSyncMock();
    mockExecSync.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    return mockExecSync;
  }
});

// Default successful mock
const defaultMockExecSync = createExecSyncMock();

module.exports = {
  createExecSyncMock,
  createMockScenarios,
  defaultMockExecSync
};