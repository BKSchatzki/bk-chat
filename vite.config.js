import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      // 'Content-Security-Policy': `style-src 'nonce-random' 'self'`,
      // Above is from TP. Below is new.
      "Content-Security-Policy": "script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules' https://bkschatzki.github.io",
    },
  },
  base: '/chat-appwrite',
  plugins: [react()],
})
