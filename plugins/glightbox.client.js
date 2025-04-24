import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('glightbox', GLightbox);
});
