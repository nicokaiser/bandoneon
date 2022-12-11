import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import autoprefixer from 'autoprefixer';
import legacy from '@vitejs/plugin-legacy';

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
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
});
