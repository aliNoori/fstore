<template>
  <section class="products">
    <div class="container">
      <div
          class="product-card"
          v-for="(product, index) in products"
          :key="index"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>قیمت: {{ product.price }} تومان</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  { name: 'محصول 1', price: '100,000', image: '@/src/static/images/logo.webp' },
  { name: 'محصول 2', price: '150,000', image: '@/src/static/images/logo.webp' },
  { name: 'محصول 3', price: '200,000', image: '@/src/static/images/logo.webp' },
];
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: auto;
}
</style>
