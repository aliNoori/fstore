<template>
  <div class="container">
    <h1 v-if="error" class="error">Error</h1>
    <p v-if="error" class="message">{{ error }}</p>

    <div v-else>
      <h1>تراکنش موفق</h1>
      <p class="message">تراکنش شما با موفقیت به انجام رسید</p>
      <div class="transaction-details">
        <p><strong>شناسه سفارش :</strong> {{ transaction.order_id }}</p>
        <p><strong>مبلغ سفارش :</strong> {{ transaction.amount }}</p>
        <p><strong>کد رهگیری :</strong> {{ transaction.token }}</p>
        <p><strong>شماره پیگیری :</strong> {{ transaction.rrn }}</p>
        <p><strong>تاریخ تراکنش :</strong> {{ transaction.created_at }}</p>
        <!-- می‌توانید جزئیات بیشتری اضافه کنید -->
      </div>
    </div>

    <nuxt-link to="/" class="back-button">برگشت به صفحه اصلی</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useNuxtApp } from '#app';

const authStore = useAuthStore(); // Access the store in the setup function
const route = useRoute();
/*const { $helper } = useNuxtApp();*/

const error = ref<string | null>(null); // در صورت وجود خطا این مقدار تنظیم می‌شود
const transaction = ref<any>({}); // اطلاعات تراکنش در اینجا قرار می‌گیرد

onMounted(() => {
  // گرفتن query params برای نمایش پیام خطا یا جزئیات تراکنش
  const query = route.query;
  console.log(query);

  if (query.error) {
    error.value = query.error as string; // دریافت پیام خطا از query params
  } else {
    // دریافت جزئیات تراکنش از API یا route params
    // برای سادگی، داده‌های ساختگی اضافه شده‌اند
    transaction.value = {
      order_id: query.order_id,
      amount: query.amount,
      token: query.token,
      rrn: query.rrn,
      created_at: new Date().toLocaleString() // تنظیم تاریخ ساختگی برای نمایش
    };
    const token = query.auth_token as string;
    localStorage.setItem('auth_token', token);
    authStore.setToken(token);
  }
});
</script>

<style scoped>
body {
  background-color: #f5f5f5;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  background-color: #fff;
  margin-top: 80px;
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

h1 {
  color: #27ae60; /* سبز برای موفقیت */
  font-size: 2rem;
  margin-bottom: 20px;
}

h1.error {
  color: #e74c3c; /* قرمز برای خطا */
}

.message {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
}

.transaction-details {
  text-align: left;
  margin-top: 20px;
}

.transaction-details p {
  margin: 10px 0;
  font-size: 0.9rem;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2980b9;
}
</style>
