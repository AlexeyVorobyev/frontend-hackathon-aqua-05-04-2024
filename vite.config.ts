import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            // devOptions: {
            //     enabled: true,
            // },
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                globPatterns: ['**/*.{js,jsx,ts,tsx,css,html,ico,png,svg}']
            },
            injectRegister: 'auto',
            includeAssets: ['vite.svg', 'apple-touch-icon.png'],
            manifest: {
                name: 'На колёсах!',
                short_name: 'На колёсах!',
                description: 'Лучшее приложение для караванинга!',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'apple-touch-icon.png',
                        sizes: '180x180',
                        type: 'image/png'
                    },
                ]
            }
        }),
    ],
    server: {
        port: 3000,
    },
    base: '/',
    optimizeDeps: {
        exclude: ['@changey/react-leaflet-markercluster'],
    },
})
