<template>
  <SideBar/>
  <div class="transaction-container">
    <div class="transaction">
      <h1 v-if="error" class="error">Error</h1>
      <p v-if="error" class="message">{{ error }}</p>

      <div v-else>
        <h1>تراکنش موفق</h1>
        <p class="message">تراکنش شما با موفقیت به انجام رسید</p>
        <div v-if="transaction" class="transaction-details">
          <p><strong>شناسه سفارش :</strong> {{ convertedOrderId }}</p>
          <p><strong>مبلغ سفارش :</strong> {{ convertedAmount }}</p>
          <p><strong>کد رهگیری :</strong> {{ convertedToken }}</p>
          <p><strong>شماره پیگیری :</strong> {{ convertedRrn }}</p>
<!--          <p><strong>تاریخ تراکنش :</strong> {{ convertedDate }}</p>-->
          <!-- می‌توانید جزئیات بیشتری اضافه کنید -->
        </div>
      </div>

      <nuxt-link to="/" class="back-button">برگشت به صفحه اصلی</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import jalaali from "jalaali-js";

const formatPrice = (price: number) => {
  return Math.floor(price).toLocaleString('fa-IR');
};

const toPersian = (number: { toString: () => string }) => {
  const persianNumbers: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/[0-9]/g, (digit: string) => {
    const digitNumber = parseInt(digit, 10); // تبدیل digit به عدد
    return persianNumbers[digitNumber];
  });
};

/*const toPersianDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const jalaaliDate = jalaali.toJalaali(date);
  return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
};*/

const authStore = useAuthStore();
const route = useRoute();

const error = ref<string | null>(null);
const transaction = ref<any>({});

const convertedOrderId = computed(() => toPersian(transaction.value.order_id || ''));
const convertedAmount = computed(() => formatPrice(transaction.value.amount || 0));
const convertedToken = computed(() => toPersian(transaction.value.token || ''));
const convertedRrn = computed(() => toPersian(transaction.value.rrn || ''));
/*const convertedDate = computed(() => toPersianDate(transaction.value.created_at || new Date()));*/

onMounted(() => {
  const query = route.query;
  console.log(query);

  if (query.error) {
    error.value = query.error as string;
  } else {
    transaction.value = {
      order_id: query.order_id,
      amount: query.amount,
      token: query.token,
      rrn: query.rrn,
      created_at: new Date().toLocaleString()
    };
    const token = query.auth_token as string;
    authStore.setToken(token);
  }

  console.log('Transaction:', transaction.value);
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
.transaction-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.transaction {
  background-color: #fff;
  margin-top: 150px;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
