<script setup lang="ts">
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useProducts} from "~/composables/products";
import {useRuntimeConfig} from "#app";
import {useDesktopView} from "~/composables/useDesktopView";
const config=useRuntimeConfig();
const {desktopView,checkDesktopView}=useDesktopView()
const {products,fetchProducts}=useProducts();
onMounted(() => {
  if (process.client) {
    checkDesktopView(); // برای بار اول چک کردن سایز صفحه
    window.addEventListener('resize', checkDesktopView); // برای تغییر اندازه صفحه
  }
  fetchProducts();
});

</script>

<template>
  <div class="swiper-container">
    <swiper
        :modules="[Navigation, Pagination, Autoplay]"
        pagination
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :slides-per-view="desktopView ? 6 : 1"
        :space-between="20"
        class="custom-swiper"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <div class="slide-item">
          <NuxtLink :to="`/product/${product.id}`">
            <img :src="product.image ? `${config.public.API_BASE_URL}${product.image.path}` : '/default-product-image.jpg'"
                 :alt="product.name" />
          </NuxtLink>
          <h3>{{ product.name }}</h3>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style src="~/assets/css/products-slider.css">
</style>