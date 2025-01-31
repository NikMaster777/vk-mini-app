import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

function handleModuleDirectivesPlugin() {
  return {
    name: 'handle-module-directives-plugin',
    transform(code, id) {
      if (id.includes('@vkontakte/icons')) {
        code = code.replace(/"use-client";?/g, '');
      }
      return { code };
    },
  };
}

/**
 * Конфигурация Vite для работы с GitHub Pages и другими особенностями.
 */
export default defineConfig({
  base: '/vk-mini-app/',  // Путь для GitHub Pages

  plugins: [
    react(),
    handleModuleDirectivesPlugin(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],

  server: {
    port: 5173,
    host: 'localhost',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },

  build: {
    outDir: 'build',  // Директория для сборки
  },
});
