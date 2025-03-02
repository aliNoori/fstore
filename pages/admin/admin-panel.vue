<template>
  <SideBar/>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1 class="title">صفحه مدیریت</h1>
    </header>
    <!-- Cards Section -->
    <section class="cards">
      <!-- Example Card 1 -->
      <div class="card">
        <div class="icon-wrapper">
          <i class="icon fa fa-users"></i>
        </div>
        <h2 class="card-title">کاربران</h2>
        <p class="card-description">مدیریت کاربران ثبت‌نام‌شده و کنترل دسترسی آن‌ها.</p>
        <button class="btn-secondary" @click="navigateTo('/admin/users-management')">مشاهده جزئیات</button>
      </div>

      <!-- Example Card 2 -->
      <div class="card">
        <div class="icon-wrapper">
          <i class="icon fa fa-shopping-cart"></i>
        </div>
        <h2 class="card-title">سفارشات</h2>
        <p class="card-description">پیگیری و مدیریت سفارشات مشتریان با سهولت.</p>
        <button class="btn-secondary" @click="navigateTo('/admin/orders-management')">مشاهده جزئیات</button>
      </div>

      <!-- Example Card 3 -->
      <div class="card">
        <div class="icon-wrapper">
          <i class="icon fa fa-box"></i>
        </div>
        <h2 class="card-title">محصولات</h2>
        <p class="card-description">افزودن، به‌روزرسانی و مدیریت موجودی به راحتی.</p>
        <button class="btn-secondary" @click="navigateTo('/admin/products-management')">مشاهده جزئیات</button>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
//import { useRouter } from "vue-router"; // برای هدایت استفاده می‌شود

const router = useRouter();

// متدی برای هدایت به مسیرهای مختلف
function navigateTo(path:any) {
  router.push(path);
}
</script>

<style scoped>
/* استایل کلی صفحه */
.container {
  min-height: 100vh;
  background: #f3f4f6;
  padding: 30px;
  /*font-family: 'Arial', sans-serif;*/
}

/* استایل هدر */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
  transform: scale(1.05);
}

/* استایل بخش کارت‌ها */
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* استایل کارت‌ها */
.card {
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card:hover {
  box-shadow: 0 4px 30px rgba(98, 117, 255, 0.5);
  transform: translateY(-5px);
  background: linear-gradient(145deg, #f9f9f9, #ffffff);
}

/* افکت نور در گوشه کارت */
.card:hover::before {
  content: '';
  position: absolute;
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
  background: radial-gradient(circle, rgba(98, 117, 255, 0.3), transparent 70%);
  z-index: -1;
  animation: glow 1.5s infinite ease-in-out;
}

/* افکت آیکون */
.icon-wrapper {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.icon {
  color: #fff;
  font-size: 24px;
}

/* استایل عنوان کارت */
.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

/* استایل توضیحات کارت */
.card-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.6;
}

/* استایل دکمه ثانویه */
.btn-secondary {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: bold;
  color: #6a11cb;
  background: #f3f4f6;
  border: 2px solid #6a11cb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.btn-secondary:hover {
  background: #6a11cb;
  color: #fff;
  transform: scale(1.05);
}

/* انیمیشن Glow */
@keyframes glow {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}
</style>
