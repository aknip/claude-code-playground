/**
 * File system mocks for testing
 */

const { jest } = require('@jest/globals');

const createFsMock = () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(),
  readdirSync: jest.fn(),
  statSync: jest.fn(),

  // Helper methods for setting up test scenarios
  setupMockFiles: (files = {}) => {
    const mockFs = createFsMock();

    mockFs.existsSync.mockImplementation((path) => {
      return Object.keys(files).some(file => path.includes(file));
    });

    mockFs.readFileSync.mockImplementation((path) => {
      const filename = Object.keys(files).find(file => path.includes(file));
      return filename ? files[filename] : '';
    });

    mockFs.readdirSync.mockImplementation((path) => {
      return Object.keys(files).filter(file => file.startsWith(path));
    });

    mockFs.statSync.mockImplementation(() => ({
      isFile: () => true,
      size: 1024,
      mtime: new Date()
    }));

    return mockFs;
  },

  setupMockDirectories: (directories = []) => {
    const mockFs = createFsMock();

    mockFs.existsSync.mockImplementation((path) => {
      return directories.some(dir => path.includes(dir) || path === dir);
    });

    mockFs.mkdirSync.mockImplementation(() => {});
    mockFs.writeFileSync.mockImplementation(() => {});

    return mockFs;
  },

  setupMockError: (errorMessage = 'Mock filesystem error') => {
    const mockFs = createFsMock();

    mockFs.existsSync.mockImplementation(() => { throw new Error(errorMessage); });
    mockFs.mkdirSync.mockImplementation(() => { throw new Error(errorMessage); });
    mockFs.writeFileSync.mockImplementation(() => { throw new Error(errorMessage); });

    return mockFs;
  }
});

// Default mock responses
const defaultMockFs = {
  existsSync: jest.fn(() => true),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(() => 'mock file content'),
  readdirSync: jest.fn(() => ['test.md', 'example.md']),
  statSync: jest.fn(() => ({
    isFile: () => true,
    size: 2048,
    mtime: new Date('2024-01-01')
  }))
};

module.exports = {
  createFsMock,
  defaultMockFs
};