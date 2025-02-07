<template>
  <div class="body">
    <HeaderComponent />
    <HeroSlider />
    <CategoriesSection />
    <ProductsGrid />
    <FooterComponent />
  </div>

</template>
<script setup>
import HeaderComponent from '~/components/HeaderComponent.vue';
import HeroSlider from '~/components/HeroSlider.vue';
import CategoriesSection from '~/components/CategoriesSection.vue';
import ProductsGrid from '~/components/ProductsGrid.vue';
import FooterComponent from '~/components/FooterComponent.vue';
</script>
<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
</style>


