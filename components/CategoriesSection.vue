<template>
  <section class="categories">
    <div class="container">
      <div class="category" v-for="(category, index) in categories" :key="index">
        {{ category }}
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = ['پوشاک', 'اکسسوری', 'کفش', 'لوازم خانگی'];
</script>

<style scoped>
.categories {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.category {
  padding: 10px 20px;
  background-color: #e9ecef;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
</style>
