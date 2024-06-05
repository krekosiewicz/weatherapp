import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ['babel-plugin-react-compiler']
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/logic/api'),
      '@store': path.resolve(__dirname, 'src/logic/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  ssr: {
    external: [
      'react-router-dom'
    ]
  }
});
