/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />
/// <reference types="vitest" />

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { splitVendorChunkPlugin } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), svgr()],
  resolve: {
    alias: [
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@mocks', replacement: path.resolve(__dirname, 'src/mocks') },
      { find: '@entities', replacement: path.resolve(__dirname, 'src/entities') },
      { find: '@features', replacement: path.resolve(__dirname, 'src/features') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@validations', replacement: path.resolve(__dirname, 'src/validations') }
    ]
  },
  test: {
    globals: true,
    css: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts']
  }
});
