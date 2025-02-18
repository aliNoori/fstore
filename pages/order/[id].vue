<template>
  <div v-if="order" class="order-container">
    <NuxtLink to="/">
      <img class="home-page-btn" src="@/src/static/images/house-32.png" alt="صفحه اصلی">
    </NuxtLink>
    <!-- اطلاعات سفارش -->
    <div class="order-details special-background">
      <div class="order-info">
        <h3>کد سفارش : #{{ order.order_number }}</h3>
        <p class="order-status">وضعیت: {{ getOrderStatus(order.status) }}</p>
        <p class="total-amount">مبلغ کل: {{ toPersian(formatPrice(order.total_amount)) }} تومان</p>
        <p class="order-date">تاریخ ایجاد سفارش: {{ toPersianDate(order.created_at) }}</p>
        <div class="order-actions">
          <button v-if="order.status === 'pending'" class="order-btn complete-order-btn" @click="completeOrder">
            <span>✔ تکمیل سفارش</span>
          </button>
          <button v-if="order.status === 'pending'" class="order-btn cancel-order-btn" @click="cancelOrder">
            <span>✖ لغو سفارش</span>
          </button>
        </div>

      </div>
    </div>

    <!-- جزئیات آدرس -->
    <div v-if="order.address" class="address-details">
      <h2>آدرس ارسال:</h2>
      <p>{{ toPersian(order.address.street) }}, {{ order.address.city }}</p>
      <p>{{ order.address.state }}, {{ toPersian(order.address.postal_code) }}</p>
      <p>{{ order.address.country }}</p>
      <button class="edit-address-btn" @click="editAddress">
        <span>ویرایش آدرس</span>
      </button>
    </div>
    <div v-else>
      <button class="add-address-btn" @click="addAddress">
        <span>افزودن آدرس</span>
      </button>
    </div>

    <!-- روش ارسال -->
    <div v-if="order.shipping_method" class="shipping-method">
      <h2>روش ارسال:</h2>
      <img :src="`${config.public.API_BASE_URL}${order.shipping_method.image.path}`" :alt="order.shipping_method.name" />
      <p>{{ order.shipping_method.name }}</p>
      <p>{{ toPersian(order.shipping_method.description) }}</p>
      <p>هزینه ارسال: {{ toPersian(order.shipping_method.cost) }} تومان</p>
      <p>{{ toPersian(order.shipping_method.delivery_time) }}</p>
      <button class="edit-shipping-method-btn" @click="editShippingMethod">
        <span>ویرایش روش ارسال</span>
      </button>
    </div>
    <div v-else>
      <button class="add-shipping-method-btn" @click="addShippingMethod">
        <span>افزودن روش ارسال</span>
      </button>
    </div>

    <!-- اقلام سفارش -->
    <div v-if="order.items" class="order-items">
      <h2>اقلام سفارش:</h2>
      <ul>
        <li v-for="item in order.items" :key="item.id">
          <img :src="`${config.public.API_BASE_URL}${item.product.image.file_path}`" alt="Product Image" class="product-image" />
          <p>محصول: {{ item.product.name }}</p>
          <p>قیمت: {{ toPersian(formatPrice(item.price)) }} تومان</p>
          <p>تعداد: {{ toPersian(item.quantity) }}</p>
          <p>مبلغ کل: {{ toPersian(formatPrice(item.total)) }} تومان</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>اقلام سفارش یافت نشد.</p>
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
const isLoggedIn = ref(false);
const checkUserLoginStatus = () => {
  return !!localStorage.getItem('auth_token');
}
const fetchOrder = async () => {
  isLoggedIn.value = checkUserLoginStatus();
  if (isLoggedIn.value) {
  try {
    const response = await $axios.get(`user/order/${route.params.id}`);
    order.value = response.data.order;
    console.log('جزئیات سفارش:', order.value);
  } catch (error) {
    console.error('خطا در دریافت جزئیات سفارش:', error);
  }
  }
};

onMounted(() => {
  const orderId = route.params.id;
  if (orderId) {
    //if (isLoggedIn.value) {
    fetchOrder();
    //}
  }
});

watch(
    () => route.params.id,
    (newId) => {
      if (newId) {
        //if (isLoggedIn.value) {
          fetchOrder();
        //}
      }
    }
);
</script>
<style>
.home-page-btn{
  position: absolute;
  top:15px;
  left: 20px;
  z-index: 200;
}
.order-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  margin-top: 45px;
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

.order-info h3,
.order-info p,
.address-details p,
.shipping-method p,
.order-items h2,
.order-items ul li p {
  margin-bottom: 1rem;
}

.order-info h3 {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1.3rem;
  color: #ff6961;
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
.order-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.order-btn {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 0.95rem;
  font-weight: bold;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 50px; /* گرد کردن دکمه‌ها برای طراحی مدرن */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  min-width: 150px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

/* افکت جذاب برای کلیک */
.order-btn::before {
  content: "";
  position: absolute;
  width: 300%;
  height: 300%;
  background: rgba(255, 255, 255, 0.3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
  border-radius: 50%;
  opacity: 0;
}

.order-btn:active::before {
  width: 0%;
  height: 0%;
  opacity: 1;
}

/* استایل دکمه "تکمیل سفارش" */
.complete-order-btn {
  background: linear-gradient(135deg, #00c853, #00e676);
  color: white;
}

.complete-order-btn:hover {
  background: linear-gradient(135deg, #00e676, #00c853);
  transform: translateY(-3px);
}

/* استایل دکمه "لغو سفارش" */
.cancel-order-btn {
  background: linear-gradient(135deg, #d50000, #ff1744);
  color: white;
}

.cancel-order-btn:hover {
  background: linear-gradient(135deg, #ff1744, #d50000);
  transform: translateY(-3px);
}

/* افکت زیبای کلیک */
.order-btn:active {
  transform: scale(0.95);
}

/* واکنش‌گرایی برای موبایل */
@media (max-width: 768px) {
  .order-actions {
    flex-direction: column;
    align-items: center;
  }

  .order-btn {
    width: 100%;
    max-width: 280px;
  }
}
.edit-address-btn {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.edit-address-btn:hover {
  background-color: #0056b3;
}
.add-address-btn {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.add-address-btn:hover {
  background-color: #0056b3;
}
.edit-shipping-method-btn {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.edit-shipping-method-btn:hover {
  background-color: #0056b3;
}
.add-shipping-method-btn {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.add-shipping-method-btn:hover {
  background-color: #0056b3;
}

</style>