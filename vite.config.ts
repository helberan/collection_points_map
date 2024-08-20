import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_MAPBOX_TOKEN': JSON.stringify(env.REACT_APP_MAPBOX_TOKEN),
    },
    plugins: [react()],
    base: '/collection_points_map',
  };
});
