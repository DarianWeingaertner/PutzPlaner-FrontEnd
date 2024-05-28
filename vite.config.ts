import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import path from 'path';

// Lade Umgebungsvariablen aus der .env-Datei
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env.CLIENT_ID': JSON.stringify(process.env.VITE_CLIENT_ID),
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});

