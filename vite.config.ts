import { defineConfig } from 'vite';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import checker from 'vite-plugin-checker';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.resolve(__dirname, './src'),
  // build: {
  //   outDir: path.resolve(__dirname, './build'),
  //   emptyOutDir: true,
  // },
  server: {
    port: 3005,
    // http: false,
    hmr: {
      overlay: true,
    },
  },
  plugins: [
    react(),
    /** Аналог ts-loader */
    // checker({
    //   typescript: true,
    //   // eslint: {
    //   //   lintCommand: `eslint "../src/**/*.{ts,tsx}"`,
    //   //   dev: {
    //   //     logLevel: ['error'],
    //   //   },
    //   // },
    //   terminal: true,
    //   // enableBuild: true,
    //   overlay: false,
    //   root: './src',
    // }),
  ],
  resolve: {
    alias: {
      '@state': path.resolve(__dirname, 'src/state'),
    },
  },
});
