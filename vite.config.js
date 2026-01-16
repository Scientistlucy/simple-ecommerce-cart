import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: [
                'resources/views/**',         // Watch Blade templates
                'routes/**',                  // Watch web.php or api.php
                'app/Http/Controllers/**',   // Watch Controllers
                'resources/js/**',            // Watch all React components
            ],
        }),
        react(),
    ],
});
