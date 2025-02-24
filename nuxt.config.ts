// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL// || 'https://store.python.local'
    }
  },
  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/helper.js',
    '~/plugins/sidebar.js',
    '~/plugins/header.js',
    '~/plugins/products-slider.js',
    { src: '~/plugins/echo.js', mode: 'client' },
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/tailwind.css','swiper/swiper-bundle.css'],
  modules: [
    '@pinia/nuxt',
    // سایر ماژول‌ها
  ],
  nitro: {
    prerender: {
      routes: [
        '/admin/products-management',
        // فقط مسیرهایی که می‌خواهید prerender شود
        // حذف '/login' از اینجا
      ],
    },
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, viewport-fit=cover,maximum-scale=1, user-scalable=no'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap'
        }
      ]
    }
  }
})
