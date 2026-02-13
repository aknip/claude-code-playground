/**
 * Simple test to validate Jest setup
 */

const { describe, it, expect } = require('@jest/globals');

describe('Basic Jest Setup', () => {
  it('should be able to run a basic test', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle strings', () => {
    expect('hello world').toContain('world');
  });

  it('should work with objects', () => {
    const testObj = { name: 'test', value: 42 };
    expect(testObj).toHaveProperty('name', 'test');
    expect(testObj.value).toBe(42);
  });
});