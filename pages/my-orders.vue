<template>
  <SideBar/>
  <div class="orders-container">
    <div v-for="order in orders"
         :key="order.id"
         :class="['order-card', { 'pending-order': order.status === 'pending','complete-order':order.status==='completed' }]">
      <div class="order-header">
        <div class="order-title"> سفارش شماره: # {{ order.order_number }}</div>
        <div class="order-date">تاریخ ایجاد سفارش: {{ toPersianDate(order.created_at) }}</div>
      </div>
      <div class="order-body">
        <p>اقلام سفارش: {{ toPersian(order.items.length) }}</p>
        <p>مبلغ پرداخت شده: {{ toPersian(formatPrice(order.total_amount)) }} تومان</p>
      </div>
      <div class="order-footer">
        <div class="order-status">{{ getOrderStatus(order.status) }}</div>
        <div class="order-actions">
          <NuxtLink :to="`/order/${order.id}`">نمایش جزییات</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref, onMounted} from 'vue';
import {useNuxtApp} from '#app';
import jalaali from 'jalaali-js';

const orders = ref([]);
const {$axios} = useNuxtApp(); // Inject Axios from Nuxt context
const formatPrice = (price) => {
  return Math.floor(price).toLocaleString('fa-IR');
};
const toPersian = (number) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/[0-9]/g, (digit) => persianNumbers[digit]);
};
const toPersianDate=(dateString)=> {
  const date = new Date(dateString);
  const jalaaliDate = jalaali.toJalaali(date);
  return `${toPersian(jalaaliDate.jy)}/${toPersian(jalaaliDate.jm)}/${toPersian(jalaaliDate.jd)}`;
}
const getOrderStatus = (status) => {
  if (status === 'pending') {
    return 'پرداخت نشده';
  } else if (status === 'completed') {
    return 'پرداخت شده';
  }
  return status;
}
const fetchOrders = async () => {
  try {
    const response = await $axios.get('user/my/orders'); // Make sure the API URL is correct
    orders.value = response.data.orders;
  } catch (error) {
    console.error('Failed to fetch orders data:', error);
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.home-page-btn{
  position: absolute;
  top:15px;
  left: 20px;
  z-index: 200;
}
.orders-container {
  font-family: Vazirmatn, sans-serif;
  direction: rtl;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  padding: 10px;
  margin-top: 80px;
}
.order-header, .order-body, .order-footer {
  text-align: right;
}

.order-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
}
.order-card.pending-order {
  background: #fff8e1;
}
.order-card.complete-order {
  background: #d0f0c0;
}
.order-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.order-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(135deg, #ff8a00, #da1b60);
}

.order-header {
  padding: 20px;
  color: #333;
}

.order-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.order-date {
  font-size: 14px;
  color: #888;
}

.order-body {
  padding: 20px;
  border-top: 1px solid #eee;
}

.order-body p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}

.order-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-status {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 12px;
  background: #e0e0e0;
  color: #333;
}

.order-actions a {
  text-decoration: none;
  color: #fff;
  background: #007bff;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.order-actions a:hover {
  background: #0056b3;
}
</style>
