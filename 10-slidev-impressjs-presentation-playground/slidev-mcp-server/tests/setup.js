/**
 * Jest setup file for Slidev MCP Server tests
 * Sets up common mocks and test utilities
 */

const { jest } = require('@jest/globals');

// Global test timeout (for PDF export tests)
jest.setTimeout(30000);

// Mock console methods to reduce test noise
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn()
};

// Mock process.env
global.process = {
  ...process,
  env: {
    ...process.env,
    HOME: '/mock/home',
    NODE_ENV: 'test'
  }
};

// Common test utilities
global.testUtils = {
  // Create a mock MCP server
  createMockServer: () => ({
    registerTool: jest.fn(),
    console: { error: jest.fn(), log: jest.fn() }
  }),

  // Common test data
  sampleSlides: [
    {
      layout: 'cover',
      title: 'Test Presentation',
      content: 'This is a test slide'
    },
    {
      layout: 'default',
      title: 'Second Slide',
      content: 'This is the second slide'
    }
  ],

  // Sample presentation input
  samplePresentation: {
    name: 'test-presentation',
    theme: 'apple-basic',
    title: 'Test Presentation',
    author: 'Test Author',
    slides: [
      {
        layout: 'cover',
        title: 'Test Presentation',
        content: 'Welcome to the test presentation'
      },
      {
        layout: 'default',
        title: 'Agenda',
        content: '- Point 1\n- Point 2\n- Point 3'
      }
    ]
  },

  // Expected markdown structure
  expectedMarkdown: `---
layout: cover
theme: apple-basic
title: "Test Presentation"
author: "Test Author"
---

# Test Presentation

Welcome to the test presentation

---
layout: default
---

# Agenda

- Point 1
- Point 2
- Point 3
`,

  // Mock file system responses
  mockFs: {
    existsSync: jest.fn(() => true),
    mkdirSync: jest.fn(),
    writeFileSync: jest.fn(),
    readdirSync: jest.fn(() => ['test.md']),
    statSync: jest.fn(() => ({
      isFile: () => true,
      size: 1024,
      mtime: new Date()
    }))
  },

  // Mock child_process responses
  mockExecSync: jest.fn(() => 'mock command output'),

  // Reset all mocks
  resetMocks: () => {
    jest.clearAllMocks();
    global.console.error.mockClear();
    global.console.warn.mockClear();
    global.console.log.mockClear();
  }
};

// Set up default mocks before each test
beforeEach(() => {
  global.testUtils.resetMocks();
});