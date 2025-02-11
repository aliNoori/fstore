<template>
  <div class="coupons-container">
    <div v-for="coupon in coupons" :key="coupon.id" class="coupon-card">
      <div class="coupon-header">
        <div class="coupon-title">{{ $toPersian(coupon.code) }}</div>
        <div class="coupon-date">تاریخ اعتبار: {{ $toPersian($toPersianDate(coupon.expire_date))}}</div>
      </div>
      <div class="coupon-body">
        <p>تخفیف : {{ $toPersian(coupon.discount_amount) }} {{ coupon.discount_type }}</p>
        <p>توضیحات : {{ coupon.description }}</p>
      </div>
      <div class="coupon-footer">
        <div class="coupon-status">{{ coupon.is_used ? 'استفاده شده' : 'اعتبار دارد' }}</div>
        <div class="coupon-actions">
          <a href="#">Use Coupon</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const coupons = ref([]);
const { $axios,$toPersian,$toPersianDate } = useNuxtApp(); // Inject Axios from Nuxt context

const fetchCoupons = async () => {
  try {
    const response = await $axios.get('user/my/coupons'); // Adjust API endpoint as needed
    coupons.value = response.data.coupons;
  } catch (error) {
    console.error('Failed to fetch coupons:', error);
  }
};

onMounted(() => {
  fetchCoupons();
});
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f7f6;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.coupons-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}
.coupon-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
}
.coupon-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}
.coupon-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(135deg, #ff8a00, #da1b60);
}
.coupon-header {
  padding: 20px;
  color: #333;
}
.coupon-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
.coupon-date {
  font-size: 14px;
  color: #888;
}
.coupon-body {
  padding: 20px;
  border-top: 1px solid #eee;
}
.coupon-body p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}
.coupon-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.coupon-status {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 12px;
  background: #e0e0e0;
  color: #333;
}
.coupon-actions a {
  text-decoration: none;
  color: #fff;
  background: #007bff;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.coupon-actions a:hover {
  background: #0056b3;
}
</style>
