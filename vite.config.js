
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'
export default defineConfig(({ command, mode }) => {
  
    const env = loadEnv(mode, process.cwd(), '');
    return {
      plugins: [react()],
        // server: {
        //     proxy: {
        //     '/api': {
        //     target: 'https://message-send.azurewebsites.net',
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, ''),
        //         },
        //     },
        // },
        define: {
            'process.env.SUPABASE_URL': JSON.stringify(env.SUPABASE_URL),
            'process.env.SUPABASE_KEY': JSON.stringify(env.SUPABASE_KEY),
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        },
    };
});