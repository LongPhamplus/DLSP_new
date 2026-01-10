// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    app: {
        head: {
            title: 'Sapa Paragliding',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Experience the dream of flying in Sapa - Where you feel freedom and the sky closer than ever.' },
                { property: 'og:title', content: 'Sapa Paragliding' },
                { property: 'og:description', content: 'Book your paragliding adventure in Sapa, Vietnam' },
                { property: 'og:image', content: '/images/hero-bg.jpg' },
                { property: 'og:type', content: 'website' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },

    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@pinia/nuxt'
    ],

    i18n: {
        // URL: / (vi là mặc định), /en/...
        strategy: 'prefix',
        locales: [
            { code: 'vi', name: 'Tiếng Việt', iso: 'vi-VN', file: 'vi.json' },
            { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
            { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr.json' },
            { code: 'ru', name: 'Русский', iso: 'ru-RU', file: 'ru.json' }
        ],
        defaultLocale: 'vi',
        langDir: 'locales',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root'
        }
    },

    css: [
        '~/assets/css/main.css'
    ],

    experimental: {
        payloadExtraction: false
    },

    runtimeConfig: {
        // Private keys (server-side only)
        telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '8521544567:AAHDVR3dVpV89jZVwIuNinIkyh4bQG0bjD4',
        telegramAdminChatId: process.env.TELEGRAM_ADMIN_CHAT_ID || '5066728656',

        // Public keys (exposed to client)
        public: {
            zaloUrl: 'https://zalo.me/84386887489',
            whatsappUrl: 'https://wa.me/84386887489'
        }
    }
})
