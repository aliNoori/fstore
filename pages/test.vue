<template>
  <!-- دکمه باز و بسته کردن منو -->
  <div class="menu-icon" @click="toggleMenu">
    <span></span>
    <span></span>
    <span></span>
  </div>

  <!-- محتوای اصلی صفحه -->
  <div id="content">
    <h1>محصولات</h1>
    <div class="product-grid">
      <div class="product-card" v-for="(product, index) in products" :key="index">
        <img :src="product.image" alt="Product Image" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">{{ product.price }} تومان</p>
      </div>
    </div>
  </div>

  <!-- منوی کشویی -->
  <div id="menu" :class="{ open: isMenuOpen }">
    <h2>منوی کشویی</h2>
    <p>اینجا می‌توانید لینک‌ها یا اطلاعات منو را قرار دهید.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

const products = ref([
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },{
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },{
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },{
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },{
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },{
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },{
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },{
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 1",
    description: "توضیحات محصول 1",
    price: "150,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 2",
    description: "توضیحات محصول 2",
    price: "200,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 3",
    description: "توضیحات محصول 3",
    price: "250,000",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "محصول 4",
    description: "توضیحات محصول 4",
    price: "300,000",
    image: "https://via.placeholder.com/150"
  }
]);
</script>

<style scoped>
/* تنظیمات برای پر کردن کل صفحه */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  height: 100%;
  display: flex;
}

#content {
  flex: 1;
  background-color: #f0f0f0;
  padding: 20px;
  transition: margin-left 0.3s;
}

.menu-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000;
}

.menu-icon span {
  display: block;
  width: 30px;
  height: 4px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.3s;
}

/* استایل برای منوی کشویی */
#menu {
  width: 250px;
  background-color: #333;
  color: #fff;
  height: 100vh;
  position: fixed;
  top: 0;
  right: -250px; /* در حالت بسته */
  transition: right 0.3s;
  padding: 20px;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
}

#menu.open {
  right: 0;
}

/* استایل برای کارت‌های محصول */
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>