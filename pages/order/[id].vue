<template>
  <div class="order-container">
    <!-- اطلاعات سفارش -->
    <div class="order-details special-background">
      <div class="order-info" data-aos="fade-up">
        <h1>سفارش شماره: #{{ order.order_number }}</h1>
        <p class="order-status">وضعیت: {{ getOrderStatus(order.status) }}</p>
        <p class="total-amount">مبلغ کل: {{ toPersian(formatPrice(order.total_amount)) }} تومان</p>
        <p class="order-date">تاریخ ایجاد سفارش: {{ toPersianDate(order.created_at) }}</p>
      </div>
    </div>

    <!-- جزئیات آدرس -->
    <div class="address-details">
      <h2>آدرس ارسال:</h2>
      <p>{{ toPersian(order.address.street) }}, {{ order.address.city }}</p>
      <p>{{ order.address.state }}, {{ toPersian(order.address.postal_code) }}</p>
      <p>{{ order.address.country }}</p>
    </div>

    <!-- روش ارسال -->
    <div class="shipping-method">
      <h2>روش ارسال:</h2>
      <img :src="`${config.public.API_BASE_URL}${order.shipping_method.image.path}`" :alt="order.shipping_method.name" />
      <p>{{ order.shipping_method.name }}</p>
      <p>{{ order.shipping_method.description }}</p>
      <p>هزینه ارسال: {{ toPersian(order.shipping_method.cost) }} تومان</p>
      <p>{{ order.shipping_method.delivery_time }}</p>
    </div>

    <!-- اقلام سفارش -->
    <div class="order-items">
      <h2>اقلام سفارش:</h2>
      <ul>
        <li v-for="item in order.items" :key="item.id">
          <img :src="`${config.public.API_BASE_URL}${item.product.image.file_path}`" alt="Product Image" class="product-image" />
          <p>محصول: {{ item.product.name }}</p>
          <p>قیمت: {{ toPersian(formatPrice(item.price)) }} تومان</p>
          <p>تعداد: {{ toPersian(item.quantity) }}</p>
          <p>مبلغ کل: {{ toPersian(item.total) }} تومان</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useNuxtApp, useRoute } from '#app';
import { useRuntimeConfig } from '#app';
import jalaali from 'jalaali-js';


const { $axios } = useNuxtApp();
const route = useRoute();
const config = useRuntimeConfig();
const order = ref(null);

const formatPrice = (price) => {
  return Math.floor(price).toLocaleString('fa-IR');
};
const toPersian = (number) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/[0-9]/g, (digit) => persianNumbers[digit]);
};

const toPersianDate = (dateString) => {
  const date = new Date(dateString);
  const jalaaliDate = jalaali.toJalaali(date);
  return `${toPersian(jalaaliDate.jy)}/${toPersian(jalaaliDate.jm)}/${toPersian(jalaaliDate.jd)}`;
};

const getOrderStatus = (status) => {
  if (status === 'pending') {
    return 'پرداخت نشده';
  } else if (status === 'completed') {
    return 'پرداخت شده';
  }
  return status;
};

const fetchOrder = async () => {
  try {
    const response = await $axios.get(`user/order/${route.params.id}`);
    order.value = response.data.order;
    console.log('جزئیات سفارش:', order.value);
  } catch (error) {
    console.error('خطا در دریافت جزئیات سفارش:', error);
  }
};

onMounted(() => {
  const orderId = route.params.id;
  if (orderId) {
    fetchOrder();
  }
});

watch(
    () => route.params.id,
    (newId) => {
      if (newId) {
        fetchOrder();
      }
    }
);
</script>
<style>
.order-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  margin: 0;
  text-align: right;
  direction: rtl;
  overflow: hidden;
}

.special-background {
  background-color: #ffd700; /* رنگ خاص برای قسمت اول */
  color: #fff; /* رنگ متن مناسب */
}

.order-details,
.address-details,
.shipping-method,
.order-items {
  background-color: #f9f9f9; /* پس‌زمینه ملایم */
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* سایه نرم */
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
}

.address-details {
  background-color: #e0f7fa; /* رنگ آبی ملایم برای آدرس ارسال */
}

.shipping-method {
  background-color: #ffecb3; /* رنگ زرد ملایم برای روش ارسال */
}

.order-items {
  background-color: #c8e6c9; /* رنگ سبز ملایم برای اقلام سفارش */
}

.order-info h1,
.order-info p,
.address-details p,
.shipping-method p,
.order-items h2,
.order-items ul li p {
  margin-bottom: 1rem;
}

.order-info h1 {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 2rem;
  color: #333;
  font-weight: bold;
  text-align: right;
}

.order-info .order-status,
.order-info .total-amount,
.order-info .order-date {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1.2rem;
  color: #666;
}

.address-details h2,
.shipping-method h2,
.order-items h2 {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
}

.address-details p,
.shipping-method p,
.order-items ul li p {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1rem;
  color: #666;
}

.shipping-method img {
  max-width: 200px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.order-items ul {
  list-style: none;
  padding: 0;
}

.order-items ul li {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* جلوگیری از بیرون زدن عناصر */
  flex-wrap: wrap; /* اجبار عناصر به جا گرفتن در دیو برای نمایش موبایل */
}

.order-items ul li .product-image {
  flex-shrink: 0; /* جلوگیری از کوچک شدن تصویر */
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-left: 1rem;
}

.order-items ul li p {
  flex-grow: 1; /* بهینه‌سازی فضا برای پاراگراف‌ها */
  word-wrap: break-word; /* جلوگیری از بیرون زدن متن */
}

@media (max-width: 768px) {
  .order-container {
    padding: 1rem;
  }

  .order-details,
  .address-details,
  .shipping-method,
  .order-items {
    width: 100%;
    max-width: 100%;
  }

  .order-items ul li {
    flex-direction: column; /* ستون‌بندی عناصر در موبایل */
    align-items: flex-start; /* ترازبندی عناصر به سمت راست */
  }

  .order-items ul li .product-image {
    width: 80px; /* کاهش سایز تصویر در موبایل */
    height: 80px;
    margin-left: 0;
    margin-bottom: 1rem;
  }
}

</style>