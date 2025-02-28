<template>
  <SideBar/>
  <div class="transaction-container">
    <div class="transaction">
      <div class="store-info">
        <img src="@/src/static/images/basket-32.png" alt="Store Logo" class="store-logo"/>
        <div class="store-details">
          <h2>نام فروشگاه</h2>
          <p>آدرس: خیابان مثال، شهر مثال</p>
          <p>تلفن: ۰۱۲۳۴۵۶۷۸۹</p>
          <p>ایمیل: example@example.com</p>
        </div>
      </div>

      <div class="transaction-details">
        <h2>جزئیات تراکنش</h2>
        <p><strong>شناسه سفارش :</strong><span class="dotted-line"></span><strong>{{ convertedOrderId }}</strong></p>
        <p><strong>مبلغ سفارش :</strong><span class="dotted-line"></span><strong>{{ convertedAmount }}</strong></p>
        <p><strong>کد رهگیری :</strong><span class="dotted-line"></span><strong>{{ convertedToken }}</strong></p>
        <p><strong>شماره پیگیری :</strong><span class="dotted-line"></span><strong>{{ convertedRRN }}</strong></p>
        <p><strong>تاریخ تراکنش :</strong><span class="dotted-line"></span><strong>{{ convertedDate }}</strong></p>
        <!-- می‌توانید جزئیات بیشتری اضافه کنید -->
      </div>

      <div class="payment-info">
        <h2>اطلاعات پرداخت</h2>
        <p><strong>نوع پرداخت:</strong><span class="dotted-line"></span><strong> کارت بانکی</strong></p>
        <p><strong>شماره کارت:</strong><span class="dotted-line"></span><strong> {{ convertedCardNumberMasked }}</strong></p>
      </div>

      <nuxt-link to="/" class="back-button">برگشت به صفحه اصلی</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useNuxtApp } from '#app';
const { $formatPrice, $toPersian, $toPersianDate } = useNuxtApp();

const authStore = useAuthStore();
const route = useRoute();

const error = ref<string | null>(null);
const transaction = ref<any>({});

const convertedOrderId = computed(() => $toPersian(transaction.value.order_id || ''));
const convertedAmount = computed(() => $formatPrice(transaction.value.amount || 0));
const convertedToken = computed(() => $toPersian(transaction.value.token || ''));
const convertedRRN = computed(() => $toPersian(transaction.value.rrn || ''));
const convertedDate = computed(() => $toPersian($toPersianDate(transaction.value.created_at || new Date())));
const convertedCardNumberMasked = computed(() => $toPersian(transaction.value.card_number_masked || ''));
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
      card_number_masked:query.card_number_masked,
      created_at: new Date().toLocaleString()
    };
    const token = query.auth_token as string;
    authStore.setToken(token);
    localStorage.setItem('auth_token',token);
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
/*.transaction-details{
  background-color: #14ff0073;
  padding: 20px;
  margin-top: 5px;
  border-radius: 10px;
}*/
.transaction-details h2{
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #14ff0073;
  padding: 20px;
  margin-top: 5px;
  border-radius: 10px;
}
.payment-info h2{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.transaction-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.transaction {
  font-size: .8rem;
  background-color: #fff;
  margin-top: 100px;
  padding: 30px 50px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px;
  width: 100%;
}

.store-info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fffb005e;
  padding: 20px;
  border-radius: 10px;
}

.store-logo {
  width: 80px;
  height: 80px;
  margin-right: -5px;
}

.store-details {
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-right: 10px;
}
.payment-info {
  background-color: #0800ff1c;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  text-align: left;
}

.transaction-details p,
.payment-info p {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.transaction-details .dotted-line,
.payment-info .dotted-line {
  flex-grow: 1;
  border-bottom: 1px dotted #333;
  margin: 0 8px;
}

.back-button {
  display: inline-block;
  margin-top: 30px;
  padding: 12px 24px;
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
