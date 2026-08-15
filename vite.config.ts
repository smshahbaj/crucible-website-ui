import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about/index.html'),
          agents: path.resolve(__dirname, 'agents/index.html'),
          changelog: path.resolve(__dirname, 'changelog/index.html'),
          docs: path.resolve(__dirname, 'docs/index.html'),
          faq: path.resolve(__dirname, 'faq/index.html'),
          how: path.resolve(__dirname, 'how/index.html'),
          install: path.resolve(__dirname, 'install/index.html'),
          ledger: path.resolve(__dirname, 'ledger/index.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
