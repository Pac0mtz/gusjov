import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  ssr: {
    // react-helmet-async ships CommonJS. Left external, Node's ESM loader can't
    // pull named exports (Helmet, HelmetProvider) out of it and the prerender
    // dies on import. Bundling it lets Rollup handle the interop.
    noExternal: ['react-helmet-async'],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        // Client only. In the SSR build (used by scripts/prerender.js) react &
        // co. are externals resolved from node_modules, and Rollup refuses to
        // chunk an external — it fails the build outright.
        ...(isSsrBuild
          ? {}
          : {
              manualChunks: {
                vendor: ['react', 'react-dom', 'react-router-dom'],
              },
            }),
      },
    },
  },
}))
