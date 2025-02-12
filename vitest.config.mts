import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        setupFiles: ['./vitest.setup.mts'],
        environment: 'jsdom',
        deps: {
            inline: ['vitest-canvas-mock'],
            optimizer: { web: { include: ['vitest-canvas-mock'] } },
        },
    },
})
