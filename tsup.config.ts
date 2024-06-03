import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/cli/index.ts',
  ],
  shims: true,
})
