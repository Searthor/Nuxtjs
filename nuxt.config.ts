// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@pinia/nuxt"],
  i18n: {
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
      { code: "lo", iso: "lo-LA", name: "Lao", file: "lo.json" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    lazy: true,
    langDir: "locales",
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
    "~/assets/css/main.css",
    'sweetalert2/dist/sweetalert2.min.css'
  
  ],
  plugins: [
    { src: "~/plugins/bootstrap.client.js", mode: "client" },
    { src: "~/plugins/custom.client.js", mode: "client" },
    '~/plugins/glightbox.client.js',
    '~/plugins/swal.js'
  ],

  
});
