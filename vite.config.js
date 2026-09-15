import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Path relatif memungkinkan hasil build dihosting pada subfolder.
  base: './',
  build: {
    rolldownOptions: {
      preserveEntrySignatures: false,
      output: {
        strictExecutionOrder: true,
        codeSplitting: {
          // React tetap terpisah agar halaman tidak memuat 3D sebelum diperlukan.
          includeDependenciesRecursively: false,
          groups: [
            { name: 'three-renderer', test: /node_modules[\\/]three[\\/]build[\\/]three.module/ },
            { name: 'three-core', test: /node_modules[\\/]three[\\/]build[\\/]three.core/ },
            { name: 'react-three', test: /node_modules[\\/](@react-three|three-stdlib)/ },
          ],
        },
      },
    },
  },
});
