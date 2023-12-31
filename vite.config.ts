import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'./',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: ['electron'], // 告诉 Vite 排除预构建 electron，不然会出现 __diranme is not defined
  }
})


