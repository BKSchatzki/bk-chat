import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': `style-src 'nonce-random' 'self'`,
    },
  },
  base: '/chat-appwrite',
  plugins: [react()],
})
