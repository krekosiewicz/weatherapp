import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': resolve(__dirname, 'src/api'),
      '@src': resolve(__dirname, 'src'),
      '@store': resolve(__dirname, 'src/store'),
    },
  },
});
