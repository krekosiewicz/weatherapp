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
      '@api': path.resolve(__dirname, 'src/api'),
      '@': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@nstyles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "./src/styles/theme/main.scss";`
  //     }
  //   }
  // },
  ssr: {
    external: [
      'react-router-dom'
    ]
  }
});
