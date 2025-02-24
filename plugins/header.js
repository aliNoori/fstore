// plugins/header.js
import { defineNuxtPlugin } from '#app';
import Header from '~/components/Header.vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('Header', Header);
});
