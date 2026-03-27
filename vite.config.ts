import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true,
  })],
  server: {
    port: 5000,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'TacticalIcons',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // ⚠️ CRITICAL: Don't bundle React into your icons
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
})
