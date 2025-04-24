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
  runtimeConfig: {
    JWT_SECRET: 'e7e23c810d3e93cb94d3c70857fdb463164ebdf34f61fb85910460dcb1f249cc6e871eb42860b53469b6c814f98e66f5affcbd15a088be5053737b522d7b839d151d355dc5b6da91bb5281d536004699e6a71b9801856244083d13e804b25799c36068beb4cea98087022e44e2b5a92f32ca528997d5d6c0042a3ed2c655934d0c7bbd9461992ebe7c94e59a71072b7e08e9521dc9c43090cd2f9e80901579cabe6567db5479247501f7108918061062f306dac565361d7cca6badd2fe893af0503a319385720023cf95c8f88ada274e3a5639c5dbe0d5af9b138c054c68ac29a32eca64f354a6682fad477a8de298146eb09346db0316a0c0ba06cae17338ef',
    JWT_EXPIRES_IN: '24h',                     
  }
  
});
