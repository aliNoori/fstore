// plugins/sidebar.js
import { defineNuxtPlugin } from '#app';
import SideBar from '~/components/SideBar.vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('SideBar', SideBar);
});
