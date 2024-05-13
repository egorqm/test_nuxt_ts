// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      title: 'Tasks',
      meta: [{ name: 'description', content: 'Description Tasks' }],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: undefined,
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/scss/main.scss'],
});
