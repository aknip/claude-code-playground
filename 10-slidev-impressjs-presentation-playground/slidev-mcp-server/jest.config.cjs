module.exports = {
  // Test environment
  testEnvironment: 'node',

  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],

  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.js',
    'export-wrapper.js',
    '!src/index.js', // Exclude main server file (integration tested separately)
    '!**/node_modules/**'
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Setup files
  // setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Mock settings
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Verbose output
  verbose: true
};