import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: path.resolve(__dirname, './src/locales/**'),
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});
