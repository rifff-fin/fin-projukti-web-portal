import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // the 3D chunk is imported lazily: pre-bundle its packages, or the dev server discovers
  // them mid-session and reloads the page
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'maath/easing'],
  },
  build: {
    // the 3D chunk (three + R3F + drei, ~270 KB gz) is loaded lazily on purpose
    chunkSizeWarningLimit: 1100,
    // two pages: the home page and /founder/
    rolldownOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        founder: fileURLToPath(new URL('founder/index.html', import.meta.url)),
      },
    },
  },
  server: { port: 5180, strictPort: true },
});
