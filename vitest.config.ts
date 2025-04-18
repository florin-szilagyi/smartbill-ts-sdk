import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 30000, // 30 seconds
    // You can also set globalSetup, environment, etc. here
  },
});