import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    threads: true,
    maxThreads: 1,
    minThreads: 1
  }
})
