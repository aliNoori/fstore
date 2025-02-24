// plugins/products-slider.js
import { defineNuxtPlugin } from '#app';
import ProductsSlider from '~/components/ProductsSlider.vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('ProductsSlider', ProductsSlider);
});
