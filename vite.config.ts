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
  // the 3D chunk (three + R3F + drei, ~270 KB gz) is loaded lazily on purpose
  build: { chunkSizeWarningLimit: 1100 },
  server: { port: 5180, strictPort: true },
});
