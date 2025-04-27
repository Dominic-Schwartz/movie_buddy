import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr({
    enforce: 'pre',
  }), react() ],
  optimizeDeps: {
    include: ['jwt-decode'],
  },
});
