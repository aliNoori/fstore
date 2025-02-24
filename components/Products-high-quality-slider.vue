<script setup lang="ts">

import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useDesktopView} from "~/composables/useDesktopView";
import {useProducts} from "~/composables/products";
import {useNuxtApp, useRuntimeConfig} from "#app";
const {$toPersian,$formatPrice}=useNuxtApp();
const config=useRuntimeConfig();
const {desktopView,checkDesktopView}=useDesktopView();
const {products,fetchProducts}=useProducts();
onMounted(() => {
  if (process.client) {
    checkDesktopView();
    window.addEventListener('resize', checkDesktopView);
    fetchProducts();
  }
});
</script>

<template>
  <div class="swiper-container">
    <swiper
        :modules="[Navigation]"
        pagination
        :slides-per-view="desktopView ? 6 : 2"
        :space-between="20"
        class="custom-swiper"
    >
      <swiper-slide v-for="product in products" :key="product.id" class="product-card" :data-product-id="product.id" style="width: 200px;">

        <!-- برچسب تخفیف در صورت وجود تخفیف -->
        <div v-if="product.discount" class="discount-badge">{{ $toPersian($formatPrice(product.discount)) }}% تخفیف</div>

        <!-- تصویر محصول -->
        <NuxtLink :to="`/product/${product.id}`"><img :src="product.image ? `${config.public.API_BASE_URL}${product.image.path}` : '/default-product-image.jpg'" :alt="product.name" />
        </NuxtLink>
        <div class="product-card-content">
          <!--            <div class="buttons">
                        &lt;!&ndash; Like Icon &ndash;&gt;
                        <button @click="ToggleLikeProduct(product.id)">
                          &lt;!&ndash; SVG Icon &ndash;&gt;
                          <span v-html="product.isLiked ? heartFilled : heartOutline"
                                :style="{ color: product.isLiked ? '#ff0000' : '#888888' }"> </span>
                          <span v-if="product.likes > 0" class="badge">{{ product.likes }}</span>
                        </button>
                         View Icon
                        <button>
                          <span class="material-icons-outlined" style="color: #888888;">visibility</span>
                          <span v-if="product.views > 0" class="badge">{{ product.views }}</span>
                        </button>
                         Cart Icon
                        <button @click="addToCart(product.id)">
                          <span class="material-icons-outlined" style="color: #da1b60;">add_shopping_cart</span>
                          <span v-if="product.cart_count > 0" class="badge">{{ $toPersian(product.cart_count) }}</span>
                        </button>
                      </div>-->
          <h3>{{ product.name }}</h3>
          <p class="price">قیمت: {{ $toPersian($formatPrice(product.price)) }}تومان</p>
          <p class="stock">موجودی: {{ $toPersian(product.stock) }}</p>

          <!-- بررسی وجود امتیاز و نمایش ستاره‌ها -->
          <div v-if="product.reviews && product.reviews.length > 0" class="star-rating">
      <span
          v-for="star in 5"
          :key="star"
          class="active"
      >
        ★
      </span>
          </div>
          <div v-else class="no-rating">هنوز امتیازی ندارد</div>

        </div>
      </swiper-slide>
    </swiper>
  </div>

</template>

<style src="~/assets/css/products-high-quality-slider.css"></style>