import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'Music-Application',  // <-- यहाँ अपना GitHub repo नाम डालें
  plugins: [react()],
});
