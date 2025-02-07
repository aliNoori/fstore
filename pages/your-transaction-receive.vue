<template>
  <div class="container">
    <h1 v-if="error" class="error">Error</h1>
    <p v-if="error" class="message">{{ error }}</p>

    <div v-else>
      <h1>Transaction Successful</h1>
      <p class="message">Your transaction was completed successfully. Here are the details:</p>
      <div class="transaction-details">
        <p><strong>Order ID:</strong> {{ transaction.order_id }}</p>
        <p><strong>Amount:</strong> {{ transaction.amount }}</p>
        <p><strong>Token:</strong> {{ transaction.token }}</p>
        <p><strong>RRN:</strong> {{ transaction.rrn }}</p>
        <p><strong>Transaction Date:</strong> {{ transaction.created_at }}</p>
        <!-- می‌توانید جزئیات بیشتری اضافه کنید -->
      </div>
    </div>

    <nuxt-link to="/" class="back-button">Back to Home</nuxt-link>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth.js';

export default {
  setup() {
    const authStore = useAuthStore(); // Access the store in the setup function

    return {
      authStore
    };
  },
  data() {
    return {
      error: null, // در صورت وجود خطا این مقدار تنظیم می‌شود
      transaction: {} // اطلاعات تراکنش در اینجا قرار می‌گیرد

    };
  },
  mounted() {
    // گرفتن query params برای نمایش پیام خطا یا جزئیات تراکنش
    const query = this.$route.query;
    console.log(query);

    if (query.error) {
      this.error = query.error; // دریافت پیام خطا از query params
    } else {
      // دریافت جزئیات تراکنش از API یا route params
      // برای سادگی، داده‌های ساختگی اضافه شده‌اند
      this.transaction = {
        order_id: query.order_id,
        amount: query.amount,
        token: query.token,
        rrn: query.rrn,
        created_at: new Date().toLocaleString() // تنظیم تاریخ ساختگی برای نمایش
      };
      const token = query.auth_token;
      localStorage.setItem('auth_token',token);
      this.authStore.setToken(token);
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
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
