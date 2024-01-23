import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});
