import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [sveltekit(), svgr()],
  publicDir: 'static',
  
  // Add server options to allow serving files outside the root
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  },
  
  // Configure asset handling
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.gif'],
  
  // Set the base URL if needed
  base: '/'
});