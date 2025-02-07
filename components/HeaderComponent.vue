<template>
  <header class="header">
    <div class="container">
      <div class="logo">لوگو</div>
      <div class="search-bar">
        <input type="text" placeholder="جستجو کنید..." />
        <button>جستجو</button>
      </div>
      <div class="header-icons">
        <i class="fas fa-shopping-cart"></i>
        <i class="fas fa-user"></i>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header .logo {
  font-size: 24px;
  font-weight: bold;
}

.search-bar input {
  padding: 5px;
  width: 200px;
}

.search-bar button {
  padding: 5px 10px;
}

.header-icons i {
  font-size: 20px;
  margin: 0 10px;
  cursor: pointer;
}
</style>
