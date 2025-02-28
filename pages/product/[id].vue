<template>
  <SideBar/>
  <div v-if="product" class="product-container">
    <!-- اطلاعات محصول -->
    <div class="product-details">
      <div class="product-info" data-aos="fade-up">
        <h1>{{ product.name }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="stock" :class="{ 'out-of-stock': product.stock === 0 }">
          موجودی: {{ product.stock > 0 ? toPersian(product.stock) : 'ناموجود' }}
        </p>
        <p class="price">قیمت: {{ toPersian(formatPrice(product.price)) }} تومان</p>
        <button @click.prevent="addToCart(product.id)" class="add-to-cart-btn">
          <i class="fas fa-shopping-cart"></i> افزودن به سبد خرید
          <span v-if="cartCount > 0" class="cart-badge-btn-product">{{ toPersian(cartCount) }}</span>
        </button>
      </div>
      <div class="product-image" data-aos="zoom-in">
        <img
            :src="product.image ? `${config.public.API_BASE_URL}${product.image.path}` : '/default-product-image.jpg'"
            :alt="product.name"
        />
      </div>
    </div>

    <!-- بخش نظرات -->
    <div class="product-comments" data-aos="fade-left">
      <h2>ثبت نظر:</h2>
      <textarea v-model="newComment" placeholder="لطفا نظر خود را در مورد محصول بنویسید..." rows="4"></textarea>
      <div class="rating-section">
        <label for="rating">ثبت امتیاز:</label>
        <div class="star-rating">
      <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ active: star <= newRating }"
          @click="setRating(star)"
      >
        ★
      </span>
        </div>
      </div>
      <button @click="submitComment" :disabled="!newComment || !newRating">
        ثبت نظر
      </button>
      <!-- نمایش نظرات -->
      <div v-if="product.reviews && product.reviews.length > 0">
        <h3>نظرات کاربران:</h3>
        <ul>
          <li v-for="(comment, index) in product.reviews" :key="comment.id">
            <div class="comment">
              <div class="comment-header">
                <img
                    :src="comment.user.image ? `${config.public.API_BASE_URL}${comment.user.image.path}` : '/default-avatar.png'"
                    alt="User Image" class="user-avatar"/>
                <div class="comment-user-info">
                  <p class="user-name">{{ comment.user.name }}</p>
                  <!--                  <p class="user-username">{{ comment.user.username }}</p>-->
                  <p class="comment-rating">امتیاز: {{ comment.rating }}</p>
                </div>
              </div>
              <p class="comment-text">{{ comment.review }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>هنوز نظری ثبت نشده است.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import {useNuxtApp, useRoute} from '#app';
import {useRuntimeConfig} from '#app';

const {$axios} = useNuxtApp();
const route = useRoute();
const config = useRuntimeConfig();
const product = ref(null);
const newComment = ref('');
const newRating = ref(0);
const infoProduct = ref(null);
const cartCount = ref(0);
const user = ref(null);
const toPersian = (number) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/[0-9]/g, (digit) => persianNumbers[digit]);
};
const formatPrice = (price) => {
  return Math.floor(price).toLocaleString('fa-IR');
};
const isLoggedIn = ref(false);
const checkUserLoginStatus = () => {
  return !!localStorage.getItem('auth_token');
}

async function fetchCartCount() {
  isLoggedIn.value = checkUserLoginStatus();
  if (isLoggedIn.value) {
    try {
      const response = await $axios.get(`cart/items/${route.params.id}/info`);
      infoProduct.value = response.data;
      cartCount.value = infoProduct.value.quantity;
      console.log(response.data);
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error);
    }
  } else {
    console.log('کاربر لاگین نیست.');
  }
}

// دریافت اطلاعات محصول
async function fetchProduct() {
  try {
    const response = await $axios.get(`product/show/${route.params.id}`);
    product.value = response.data.data;
    console.log('جزئیات محصول:', product.value);
  } catch (error) {
    console.error('خطا در دریافت جزئیات محصول:', error);
  }
}

// افزودن محصول به سبد خرید
async function addToCart(productId) {

  isLoggedIn.value = checkUserLoginStatus();
  if (isLoggedIn.value) {
    try {
      const response = await $axios.post(`cart/item/add/${productId}`);
      if (response.status === 200) {
        console.log('محصول به سبد خرید اضافه شد:', response.data);
        //alert('محصول با موفقیت به سبد خرید اضافه شد');
        cartCount.value += 1;
      } else if (response.status === 400) {
        console.log('تعداد درخواستی بیشتر از موجودی محصول است', response.data);
        alert('تعداد درخواستی بیشتر از موجودی محصول است');
      } else if (response.status === 404) {
        console.log('محصول مورد نظر یافت نشد', response.data);
        alert('محصول مورد نظر یافت نشد');
      } else if (response.status === 500) {
        console.log('خطایی در افزودن محصول به سبد خرید رخ داده است', response.data);
        alert('خطایی در افزودن محصول به سبد خرید رخ داده است');
      } else {
        console.log('خطا:', response.data);
        alert('خطایی رخ داده است');
      }
    } catch (error) {
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 400:
            console.error('تعداد درخواستی بیشتر از موجودی محصول است:', error.response.data);
            alert('تعداد درخواستی بیشتر از موجودی محصول است');
            break;
          case 404:
            console.error('محصول مورد نظر یافت نشد:', error.response.data);
            alert('محصول مورد نظر یافت نشد');
            break;
          case 500:
            console.error('خطایی در افزودن محصول به سبد خرید رخ داده است:', error.response.data);
            alert('خطایی در افزودن محصول به سبد خرید رخ داده است');
            break;
          default:
            console.error('خطا:', error.response.data);
            alert('خطایی رخ داده است');
        }
      } else {
        console.error('خطا در افزودن محصول به سبد خرید:', error);
        alert('خطایی در افزودن محصول به سبد خرید رخ داد.');
      }
    }
  } else {
    console.log('لطفا لاگین نمایید.');
    alert('لطفا لاگین نمایید.');
  }
}


// ثبت نظر جدید
async function submitComment() {
  if (newComment.value && newRating.value) {
    const submitButton = document.querySelector('button');
    submitButton.classList.add('loading');
    try {
      const response = await $axios.post(`product/review/${product.value.id}`, {
        review: newComment.value,
        rating: newRating.value,
      });
      if (response.status === 200) {
        alert('نظر شما با موفقیت ثبت شد!');
        product.value.comments.push({
          text: newComment.value,
          author: 'شما',
          rating: newRating.value,
        });
        newComment.value = '';
        newRating.value = 0;
      }
    } catch (error) {
      alert(error.response?.data?.error?.details || 'خطا در ثبت نظر.');
    } finally {
      submitButton.classList.remove('loading');
    }
  }
}

// تنظیم امتیاز براساس ستاره
function setRating(star) {
  newRating.value = star;
}

import AOS from 'aos';
import 'aos/dist/aos.css';
// اجرا در زمان بارگذاری صفحه
onMounted(() => {
  const productId = route.params.id;
  if (productId) {
    fetchProduct();
    fetchCartCount(productId);
  }
  AOS.init({
    duration: 1000, // مدت زمان انیمیشن
    easing: 'ease-in-out',
  });
});

// مشاهده تغییر در ID محصول
watch(
    () => route.params.id,
    (newId) => {
      if (newId) {
        fetchProduct();
        fetchCartCount();
      }
    }
);
</script>


<style scoped>
.home-page-btn{
  position: absolute;
  top:15px;
  left: 20px;
  z-index: 200;
}
/* کانتینر اصلی */
.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  margin-top: 80px;
  text-align: right;
  direction: rtl;
  overflow: hidden;

}

/* جزئیات محصول */
.product-details {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 2rem;
  width: 100vw;
  height: auto;
//border-bottom: 2px solid #ddd; padding: 2.5rem; //margin-bottom: 2rem;
}

/* اطلاعات محصول */
.product-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
//gap: 10px; width: 100%; height: auto;
  background-color: #f9f9f9; /* پس‌زمینه ملایم */
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* سایه نرم */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
//flex: 1;
}

.product-info:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.product-info h1,
.product-info .description,
.product-info .price,
.product-info .stock,
.add-to-cart-btn {
  margin-bottom: 1rem;
}


.product-info h1 {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1.5rem;
  color: #000000;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: right;
}

.product-info .description {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
  text-align: justify;
}

.product-info .price {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #28a745; /* سبز برای قیمت */
  margin: 1rem 0;
  //background: rgba(40, 167, 69, 0.1);
  //padding: 0.5rem 1rem;
  border-radius: 5px;
  display: inline-block;
}

.product-info .stock {
  font-family: 'Vazirmatn', sans-serif;
  font-size: .8rem;
  font-weight: bold;
  //background: rgba(255, 0, 0, 0.1);
  //padding: 0.5rem 1rem;
  border-radius: 5px;
  display: inline-block;
  margin-top: 0.5rem;
  color: #d90101;
}

.product-info .stock.out-of-stock {
  color: #d9534f; /* قرمز برای موجودی تمام شده */
  font-weight: bold;
}

/* تصویر محصول */
.product-image img {
  max-width: 300px;
  max-height: 50vh;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(0.85);
  transition: transform 0.5s ease, box-shadow 0.3s ease;
}

.product-image img:hover {
  transform: scale(1.1) rotate(3deg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* دکمه افزودن به سبد خرید */
.add-to-cart-btn {
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.add-to-cart-btn i {
  margin-right: 0.5rem; /* آیکون فاصله با متن */
  padding-left: 10px;
}

.add-to-cart-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  background-color: #0056b3;
}

.add-to-cart-btn:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.add-to-cart-btn:active {
  transform: scale(0.95);
  background: linear-gradient(90deg, #0056b3, #003f7f);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


/* نشانگر تعداد سبد خرید */
.cart-badge-btn-product {
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  font-size: 0.9rem;
  border-radius: 50%;
  padding: 1px;
  margin-right: 10px;
}

/* بخش نظرات */
.product-comments {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.product-comments:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}


.product-comments h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.product-comments textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease-in-out;
}

.product-comments textarea:focus {
  border-color: #007bff;
  outline: none;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rating-section label {
  font-size: 1rem;
  color: #555;
}

.rating-section input {
  width: 60px;
  padding: 0.3rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 1rem;
}

.rating-section input:focus {
  border-color: #007bff;
  outline: none;
}

.product-comments button {
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s;
}

.product-comments button:hover {
  background-color: #218838;
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}


.product-comments button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

/* لیست نظرات */

.product-comments ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
}

.product-comments li {
  background-color: #f8f9fa;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.8rem;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeIn 0.5s forwards;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
}

.comment-user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  color: #333;
}

.user-username {
  color: #777;
  font-size: 0.9rem;
}

.comment-rating {
  font-size: 0.9rem;
  color: #28a745;
}

.comment-text {
  color: #555;
  font-size: 1rem;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.product-comments li p {
  margin: 0;
  color: #333;
  font-size: 1rem;
}

.product-comments li small {
  display: block;
  margin-top: 0.5rem;
  color: #555;
  font-size: 0.85rem;
}

button.loading {
  position: relative;
  pointer-events: none;
}

button.loading::after {
  content: '';
  position: absolute;
  right: 1rem;
  top: 50%;
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .product-container {
    padding: 0;
    flex-direction: column; /* چینش عمودی برای موبایل */
    align-items: center; /* تراز کردن محتوا به مرکز */
  //gap: 1rem;
  }

  .product-details {
    flex-direction: column;
    padding: 0;
    align-items: center;
    width: 100%; /* کارت‌ها تمام عرض صفحه را می‌گیرند */
  }

  .product-image {
    order: 1; /* تصویر در بالا قرار می‌گیرد */
    width: 100%; /* عرض کامل */
    text-align: center; /* متن و محتوا در مرکز */
  }

  .product-image img {
    width: 100%; /* تصویر عرض کامل */
    max-width: 100%; /* محدود به حداکثر عرض کارت */
    height: auto; /* نسبت تصویر حفظ شود */
    border-radius: 0; /* حذف گوشه‌های گرد در موبایل */
    box-shadow: none; /* حذف سایه اضافی در موبایل */
  }

  .product-info {
    order: 2; /* اطلاعات زیر تصویر قرار می‌گیرند */
    width: 100%; /* عرض کامل */
    max-width: 100%;
  //padding: 1rem; box-sizing: border-box; background: #f9f9f9; /* پس‌زمینه ملایم */
    border-radius: 10px;
  }

  .add-to-cart-btn {
    width: 100%; /* دکمه تمام عرض */
    text-align: center;
  }
}

.star-rating {
  display: flex;
  gap: 5px;
  cursor: pointer;
}

.star {
  font-size: 24px;
  color: #ccc;
  transition: color 0.3s;
}

.star.active {
  color: #ffd700; /* رنگ طلایی برای ستاره‌های فعال */
}

.star:hover {
  color: #ffa500; /* رنگ نارنجی برای هاور */
}

</style>

<!--&lt;!&ndash; Comment Icon &ndash;&gt;
<button>
<span class="material-icons-outlined" style="color: #da1b60;">chat_bubble_outline</span>
<span v-if="product.reviews > 0" class="badge">{{ product.reviews }}</span>
</button>-->

