<template>
    <!-- سایدبار ثابت در سمت چپ -->
    <aside class="sidebar" :class="{ open: isMenuOpen }">
      <div class="sidebar-content">
        <div class="menu-icon-sidebar" @click="toggleMenu">
          <span class="arrow"></span>
        </div>
        <h1 class="sidebar-title">پروفایل</h1>
        <!-- نمایش اطلاعات کاربر اگر موجود باشد -->
        <div v-if="user" class="user-info">
          <img :src="user.image ? `${config.public.API_BASE_URL}${user.image.path}` : '/default-avatar.png'" :alt="user.name" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-points">{{ user.scores }}</div>
          </div>

          <button @click="logout" class="logout-button">خروج</button>
        </div>
        <div v-else>
          <NuxtLink to="/login" class="sidebar-link">ورود</NuxtLink>
          <NuxtLink to="/register" class="sidebar-link">ثبت نام</NuxtLink>
        </div>

        <!-- منوی سایدبار -->
        <div v-if="user" class="user-info">
          <nav class="sidebar-menu">
            <NuxtLink to="/my-wallet">
              کیف پول
              <span v-if="user.wallet_balance > 0" class="badge-sidebar">{{ toPersian(user.wallet_balance) }}</span>
            </NuxtLink>
            <NuxtLink to="/my-scores">
              امتیازات
              <span v-if="user.score > 0" class="badge-sidebar">{{ toPersian(user.score) }}</span>
            </NuxtLink>
            <NuxtLink to="/my-coupons">
              کد های تخفیف
              <span v-if="user.coupons_count > 0" class="badge-sidebar">{{ toPersian(user.coupons_count) }}</span>
            </NuxtLink>
            <NuxtLink to="/my-orders">
              سفارشات
              <span v-if="user.orders_count > 0" class="badge-sidebar">{{ toPersian(user.orders_count) }}</span>
            </NuxtLink>
            <NuxtLink to="/steps-to-order">
              سبد خرید
              <span v-if="user.items_cart > 0" class="badge-sidebar">{{ toPersian(user.items_cart) }}</span>
            </NuxtLink>
            <NuxtLink to="/admin/admin-panel">صفحه مدیریت</NuxtLink>
          </nav>
        </div>
        <div v-else></div>

      </div>
    </aside>

    <!-- محتوای اصلی -->
    <div class="content">
      <div class="ribbon">
          <!-- آیکون نمایش پیام‌ها -->

        <h2>Store</h2>
        <!-- اضافه کردن آیکون‌های جدید -->
        <div class="icons">
          <div class="icon" @click="toggleMessages">
            <i class="fas fa-envelope"></i>
            <span v-if="messages.length>0" class="ribbon-badge">{{ toPersian(messages.length) }}</span> <!-- تعداد پیام‌ها -->
            <!-- نمایش پیام‌ها -->
            <div class="messages-section" v-if="isMessagesOpen && messages.length">
              <h2>Messages</h2>
              <div class="message" v-for="(message, index) in messages" :key="index">
                <p>{{ message }}</p>
              </div>
            </div>
          </div>
          <div class="icon" @click="goToCart">
            <NuxtLink to="/steps-to-order">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="user&&user.items_cart > 0" class="cart-badge">{{ toPersian(user.items_cart) }}</span>
            </NuxtLink>
          </div>
          <div class="icon" @click="goToContactUs">
            <i class="fas fa-phone-alt"></i>
          </div>
          <div class="icon" @click="goToInfo">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>
        <div class="menu-icon" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="swiper-container">
        <swiper
            :modules="[Navigation, Pagination, Autoplay]"
            pagination
            :autoplay="{ delay: 3000, disableOnInteraction: false }"
            class="custom-swiper"
            :slidesPerView="desktopView ? 3 : 1"
            :spaceBetween="30"
        >
          <swiper-slide v-for="product in products" :key="product.id">
            <div class="slide-item">
              <!-- تصویر محصول -->
              <NuxtLink :to="`/product/${product.id}`">
              <img :src="product.image ? `${config.public.API_BASE_URL}${product.image.path}` : '/default-product-image.jpg'" :alt="product.name" />
              <!--<img src="@/src/static/images/img1.jpg" alt="Brand Logo">-->
              </NuxtLink>
              <h3>{{ product.name }}</h3>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div>

      </div>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card" :data-product-id="product.id">
          <NuxtLink :to="`/product/${product.id}`">
          <!-- برچسب تخفیف در صورت وجود تخفیف -->
          <div v-if="product.discount" class="discount-badge">{{ toPersian(formatPrice(product.discount)) }}% تخفیف</div>

          <!-- تصویر محصول -->
          <img :src="product.image ? `${config.public.API_BASE_URL}${product.image.path}` : '/default-product-image.jpg'" :alt="product.name" />

          <div class="product-card-content">
            <div class="buttons">
              <!-- Like Icon -->
<!--              <button @click="ToggleLikeProduct(product.id)">
                &lt;!&ndash; SVG Icon &ndash;&gt;
                <span v-html="product.isLiked ? heartFilled : heartOutline"
                      :style="{ color: product.isLiked ? '#ff0000' : '#888888' }"> </span>
                <span v-if="product.likes > 0" class="badge">{{ product.likes }}</span>
              </button>-->
              <!-- View Icon -->
<!--              <button>
                <span class="material-icons-outlined" style="color: #888888;">visibility</span>
                <span v-if="product.views > 0" class="badge">{{ product.views }}</span>
              </button>-->
              <!-- Cart Icon -->
              <button @click="addToCart(product.id)">
                <span class="material-icons-outlined" style="color: #da1b60;">add_shopping_cart</span>
                <span v-if="product.cart_count > 0" class="badge">{{ toPersian(product.cart_count) }}</span>
              </button>
            </div>


            <h3>{{ product.name }}</h3>
            <p class="price">قیمت: {{ toPersian(formatPrice(product.price)) }}تومان</p>
            <p class="stock">موجودی: {{ toPersian(product.stock) }}</p>

            <!-- بررسی وجود امتیاز و نمایش ستاره‌ها -->
            <div v-if="product.reviews && product.reviews.length > 0" class="star-rating">
      <span
          v-for="star in 5"
          :key="star"
          class="active"
      >
        ★
      </span>
            </div>
            <div v-else class="no-rating">هنوز امتیازی ندارد</div>

          </div>
          </NuxtLink>
        </div>
      </div>
    </div>
</template>

<script setup>
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined' },
  ]
});
import { useRuntimeConfig } from '#app';
import { onMounted, ref } from 'vue';
import { useNuxtApp } from '#app'; // Import useNuxtApp to access $axios
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
const { $axios } = useNuxtApp(); // Get $axios from Nuxt app context
const user = ref(null); // تعریف متغیر برای ذخیره اطلاعات کاربر
const products = ref([]);// تعریف متغیر برای ذخیره اطلاعات محصولات

const router = useRouter();
const config = useRuntimeConfig();
const isMenuOpen = ref(false);
const { $echo } = useNuxtApp();
const cartCount = ref(0);
const messages = ref([]); // آرایه برای ذخیره پیام‌های دریافتی
const isMessagesOpen = ref(false); // وضعیت نمایش پیام‌ها
// SVG for outlined heart
const heartOutline = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 21s-6-4.35-9.31-7.87A5.42 5.42 0 0 1 3.6 5.59a5.5 5.5 0 0 1 7.8 0L12 7l.6-.6a5.5 5.5 0 0 1 7.8 0 5.42 5.42 0 0 1 .91 7.54C18 16.65 12 21 12 21z"></path>
</svg>`;

// SVG for filled heart
const heartFilled = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 21s-6-4.35-9.31-7.87A5.42 5.42 0 0 1 3.6 5.59a5.5 5.5 0 0 1 7.8 0L12 7l.6-.6a5.5 5.5 0 0 1 7.8 0 5.42 5.42 0 0 1 .91 7.54C18 16.65 12 21 12 21z"></path>
</svg>`;

const formatPrice = (price) => {
  return Math.floor(price).toLocaleString('fa-IR');
};
const toPersian = (number) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/[0-9]/g, (digit) => persianNumbers[digit]);
};
// نمایش/مخفی کردن پیام‌ها
const toggleMessages = () => {
  isMessagesOpen.value = !isMessagesOpen.value;
};
async function toggleMenu() {

  isMenuOpen.value = !isMenuOpen.value;
  console.log(isMenuOpen.value);
}
const desktopView = ref(false); // متغیر برای شناسایی صفحه دسکتاپ

// چک کردن سایز صفحه
const checkDesktopView = () => {
  desktopView.value = window.innerWidth >= 1024; // اگر عرض صفحه بزرگتر از 1024 پیکسل باشد، دسکتاپ است
};

onMounted(() => {
  if (process.client) {
    checkDesktopView(); // برای بار اول چک کردن سایز صفحه
    window.addEventListener('resize', checkDesktopView); // برای تغییر اندازه صفحه
  }

  if(localStorage.auth_token) {
    fetchUser();
  }
  fetchProducts();
});

const ToggleLikeProduct = async (productId) => {
  try {
    const response = await $axios.post(`product/${productId}/toggle-like`);
    if (response.status === 200) {
      const updatedProduct = response.data.data; // دریافت داده محصول جدید از سرور

      // پیدا کردن محصول در لیست و به‌روزرسانی آن
      const index = products.value.findIndex((product) => product.id === productId);
      if (index !== -1) {
        products.value[index] = {
          ...products.value[index],
          isLiked: updatedProduct.isLiked, // به‌روزرسانی وضعیت لایک
          likes: updatedProduct.likes,     // به‌روزرسانی تعداد لایک‌ها
        };
      }

      console.log('Product updated:', updatedProduct);
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    alert('An error occurred while toggling the like status.');
  }
};

async function fetchUser() {
  try {
    const response = await $axios.get('user/profile'); // Adjust the endpoint as needed
    user.value = response.data; // Assuming the user data is in this field
    console.log(user.value);
    if(user.value && user.value.id){
      const token = localStorage.getItem('auth_token');
      const nuxtApp = useNuxtApp();
      const echo = nuxtApp.$echo; // دریافت Echo از NuxtApp

      if (token) {
        echo.auth = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
      console.log(echo.auth.headers);
      console.log('Echo instance: ', echo); // بررسی Echo instance
      echo.connector.socket.on('connect', () => {
        console.log('Socket connected');
      });

      echo.connector.socket.on('connect_error', (error) => {
        console.error('Connection Error: ', error);
      });

      echo.connector.socket.on('disconnect', (reason) => {
        console.log('Socket disconnected due to: ', reason);
      });

      echo.channel('chat')
          .listen('.OrderCreated', (data) => {
            console.log('A new public message: ', data.message);
            messages.value.push(data.message); // افزودن پیام به آرایه پیام‌ها
          });
      echo.private('order-10')
          .listen('.OrderCreatedPrivate', (data) => {
            console.log('A new private message: ', data.order_id);
            messages.value.push(data.order_id); // افزودن پیام به آرایه پیام‌ها
          })
      echo.private(`add-score-${user.value.id}`)
          .listen('.AddScore', (data) => {
            console.log('A new private message AddScore: ', data.message);
            messages.value.push(data.message); // افزودن پیام به آرایه پیام‌ها
          });
      echo.private(`add-user-to-lottery-${user.value.id}`)
          .listen('.AddUserToLattery', (data) => {
            console.log('A new private message AddUserToLattery: ', data.message);
            messages.value.push(data.message); // افزودن پیام به آرایه پیام‌ها
          });
      echo.private(`apply-coupon-${user.value.id}`)
          .listen('.ApplyCoupon', (data) => {
            console.log('A new private message ApplyCoupon: ', data.message);
            messages.value.push(data.message); // افزودن پیام به آرایه پیام‌ها
          });
      echo.private(`charge-wallet-${user.value.id}`)
          .listen('.ChargeWallet', (data) => {
            console.log('A new private message ChargeWallet: ', data.message);
            messages.value.push(data.message); // افزودن پیام به آرایه پیام‌ها
          });
      echo.private(`handle-high-value-order-${user.value.id}`)
          .listen('.HandleHighValueOrder', (data) => {
            console.log('A new private message HandleHighValueOrder: ', data.message);
            messages.value.push(data.message); // افزودن پیام به آرایه پیام‌ها
          });
      echo.private(`send-payment-notification-${user.value.id}`)
          .listen('.SendPaymentNotification', (data) => {
            console.log('A new private message HandleHighValueOrder: ', data.message);
            messages.value.push(data.message); // افزودن پیام به آرایه پیام‌ها
          });
    }
  } catch (error) {
    alert('خطایی در بارگذاری اطلاعات رخ داد.');
  }
}
async function fetchProducts() {
  try {
    const response = await $axios.get('product/list'); // Adjust the endpoint as needed
    products.value = response.data.data; // Assuming the user data is in this field
    console.log(products.value);
    // به هر محصول ویژگی cart_count اضافه می‌کنیم
    products.value = products.value.map((product) => ({
      ...product,
      cart_count: 0,  // مقدار اولیه cart_count صفر است
    }));
  } catch (error) {
    console.error("Fetch user error:", error.response ? error.response.data : error);
  }
}
const addToCart = async (productId) => {
  try {
    // ارسال درخواست POST به API برای افزودن محصول به سبد خرید
    const response = await $axios.post(`cart/item/add/${productId}`);
    // بررسی نتیجه درخواست
    if (response.status === 200) {
      // پیدا کردن محصول در لیست و به‌روزرسانی آن
      const index = products.value.findIndex((product) => product.id === productId);
      if (index !== -1) {
        products.value[index] = {
          ...products.value[index],
          cart_count: products.value[index].cart_count + 1, // به‌روزرسانی تعداد کارت
        };
      }
      console.log('Product added to cart:', response.data);
      alert('Product added to cart successfully');
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    alert('There was an error adding the product to the cart.');
  }
};

async function logout() {
  try {
    await $axios.get('user/logout'); // Adjust the endpoint as needed
    user.value = null;
    localStorage.removeItem('auth_token');
    await router.push('/');
  } catch (error) {
    console.error("Logout error:", error.response ? error.response.data : error);
  }
}

onMounted(() => {
  if (process.client) {
    if(localStorage.auth_token)
    {
      fetchUser();
    }

    fetchProducts();
  }
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  top: 0;
  right: -350px; /* در حالت بسته */
  transition: all 0.3s ease-in-out; /* انیمیشن باز/بسته شدن */
  padding: 20px;
  background: linear-gradient(145deg, #222, #444); /* گرادیان رنگی جدید */
  color: #f5f5f5; /* تغییر رنگ متن */
  height: 100vh; /* ارتفاع تمام صفحه */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* سایه برای زیبایی */
  position: fixed;
  z-index: 1000;
  font-family: 'Vazirmatn', sans-serif;

}
.sidebar-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 40px); /* جلوگیری از نمایش بیش از حد */
}
.sidebar-title {
  font-family: 'Vazirmatn', sans-serif;
  font-size: 2rem;
  margin-bottom: 25px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
  margin-bottom: 20px;
}
.user-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-name {
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
}
.user-points {
  margin-top: 5px;
  font-size: 1.1rem;
  color: #ddd;
}
.sidebar-link {
  display: flex;
  justify-content: flex-end;
  margin: 15px 0;
  color: #f5f5f5;
  background: #333;
  text-align: right;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 12px 25px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}
.sidebar-link:hover {
  background: #555;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
.logout-button {
  margin-top: 30px;
  background-color: #d9534f;
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.logout-button:hover {
  background-color: #c9302c;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
.content {
  flex: 1;
  transition: margin-left 0.3s;
  padding: 0;
  margin: 0;
  overflow: hidden; /* برای جلوگیری از تغییر اندازه صفحه */
}
.product-card {
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  background: #ffffff;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden; /* برای جلوگیری از بیرون زدن محتوا در حالت hover */
}
/* استایل تصویر داخل کارت */
.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
/* محتویات کارت */
.product-card-content {
  font-family: 'Vazirmatn', sans-serif;
  direction: rtl;
  padding: 10px;
}
.product-list {
  font-family: 'Vazirmatn', sans-serif;
  position: relative;
  margin-top: 90px;
  left: 0;
  display: grid;
  gap: 5px;
  padding: 5px;
  grid-template-columns: repeat(1, 1fr); /* حالت پیش‌فرض تک‌ستونی */
}
/* برای صفحه‌نمایش‌های کوچکتر از 768 پیکسل */
@media (min-width: 384px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr); /* نمایش دو ستون در صفحه‌های متوسط */
  }
}

/* برای صفحه‌نمایش‌های بزرگتر از 1024 پیکسل */
@media (min-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(4, 1fr); /* چهار ستون در صفحه‌های بزرگ */
  }
}
.product-card:hover img {
  border-radius: 12px 12px 0 0;
  max-height: 200px;
  object-fit: cover;
}
.product-card-content h3 {
  font-size: 1.2rem;
  font-family: 'Vazirmatn', sans-serif;
  color: #333;
  line-height: 1.5;
  font-weight: 600;
  margin: 0;
}
.product-card-content p {
  margin: 5px 0;
  font-size: 1rem;
  font-family: 'Vazirmatn', sans-serif;
  color: #555;
  }
.product-card-content .price {
  font-weight: bold;
  color: #333;
}
.product-card-content .stock {
  color: #666;
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

.active {
  color: #ffd700; /* رنگ طلایی برای ستاره‌های فعال */
}
.product-card-content .buttons {
  display: flex;
  justify-content:space-around;
  margin-top: 5px;
  gap: 10px;
}
/* دکمه‌ها */
.buttons button {
  position: relative; /* برای موقعیت‌دهی badge درون دکمه */
  background: none;
  border: none;
  cursor: pointer;
}
button .material-icons-outlined {
  font-size: 1.3rem; /* اندازه آیکون */
  transition: color 0.3s ease, transform 0.3s ease;
  color: #888888; /* رنگ پیش‌فرض */
}

/*.product-card-content .buttons button,
.product-card-content .buttons a {
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 8px;
  cursor: pointer;
  font-size: 10px;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s;
  font-family: "Roboto", sans-serif;
}

.product-card-content .buttons button:hover,
.product-card-content .buttons a:hover {
  background: #0056b3;
}

.product-card-content .buttons .details-btn {
  background: #28a745;
}

.product-card-content .buttons .details-btn:hover {
  background: #218838;
}

.product-card-content .buttons button {
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card-content .buttons button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 123, 255, 0.6);
}

.product-card-content .buttons .details-btn {
  box-shadow: 0 4px 6px rgba(40, 167, 69, 0.4);
}

.product-card-content .buttons .details-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(40, 167, 69, 0.6);
}*/

.ribbon {
  background-color: #fff;
  box-shadow: 0 1px 15px 0 rgba(192,72,25,0.32);
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  color: #f27474;
  display: flex; /* تغییر از حالت block به flex */
  align-items: center; /* تراز عمودی آیکون و عنوان */
  //gap: 10px; /* فاصله بین آیکون و عنوان */
}
.ribbon h2 {
  position: absolute;
  //top: 15px;
  left:10px;
  margin: 0; /* حذف فاصله‌های پیش‌فرض */
  font-size: 2rem;
  //flex: 1; /* عنوان به اندازه فضای باقی‌مانده گسترش یابد */
  //text-align: left; /* تراز به چپ برای عنوان */
}

.sidebar-menu {
  font-family: 'Vazirmatn', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  width: 100%;
}

.sidebar-menu a {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; /* تراز عمودی لینک و badge */
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  //padding: 10px 0;
  text-align: left;
  padding-left: 15px;
  transition: background-color 0.3s;
}

.sidebar-menu a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* استایل برای برچسب تخفیف */

/* استایل برای ستاره‌ها */
.rating {
  margin-top: 5px;
  display: flex;
  justify-content: center;
}

.rating .fa-star {
  font-size: 1rem;
  margin-right: 2px;
}
.filled-star {
  color: #ffd700; /* رنگ زرد برای ستاره‌های پر */
}
.empty-star {
  color: #ccc; /* رنگ خاکستری برای ستاره‌های خالی */
}
.badge-sidebar {
  background-color: #0c3fff;
  color: white;
  font-size: 0.9rem;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
}
.menu-icon {
  position: absolute;
  right: 20px;
  cursor: pointer;
}
.menu-icon span {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #f27474;;
  margin: 5px 0;
  transition: 0.3s;
}
.menu-icon-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: relative;
  right: 180px;
}

.menu-icon-sidebar .arrow {
  width: 10px;
  height: 10px;
  border-left: 2px solid #f5f5f5;
  border-top: 2px solid #f5f5f5;
  transform: rotate(135deg);
  transition: all 0.3s ease-in-out;
}

.menu-icon-sidebar.open .arrow {
  transform: rotate(-45deg);
}

.sidebar.open {
  right: 0;
}
.ribbon-badge {
  position: absolute;
  top:-5px;
  left:15px;
  background-color: #f27474;
  color: white;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 100%;
  display: inline-block;
}
.cart-badge {
  position: absolute;
  top:-5px;
  left:65px;
  background-color: #f27474;
  color: white;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 100%;
  display: inline-block;
}
.messages-section {
  position: absolute;
  top: 20px; /* Adjust as per your header's height */
  right: -350px;
  width: 350px; /* Width of the message box */
  height: 500px; /* Height of the message box */
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1500;
}

.messages-section h2 {
  background: linear-gradient(145deg, #4caf50, #81c784); /* Green gradient */
  color: white;
  font-size: 1.5rem;
  text-align: center;
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.messages-section .message {
  padding: 10px;
  margin: 5px;
  background: #f1f1f1;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
}
.messages-section .message:nth-child(even) {
  background: #e0f7fa; /* Alternate color for better readability */
}
.messages-section {
  flex: 1;
  overflow-y: auto; /* Enables scrolling for messages */
  scrollbar-width: thin; /* Custom scrollbar width for modern browsers */
  scrollbar-color: #81c784 transparent; /* Colors for custom scrollbar */
}
/* Custom scrollbar for Webkit-based browsers */
.messages-section::-webkit-scrollbar {
  width: 6px;
}
.messages-section::-webkit-scrollbar-thumb {
  background-color: #81c784;
  border-radius: 3px;
}
.messages-section::-webkit-scrollbar-track {
  background-color: transparent;
}
.swiper-container {
  position: relative;
  top: 60px;
  width: 100%;
  height: auto;
}
.slide-item {
  text-align: center;
  padding: 15px;
  margin-top: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.slide-item img {
  width: 100%;
  max-height: 300px;
  //overflow: clip;
  border-radius: 8px;
  object-fit: cover;
}
.slide-item h3 {
  font-family: 'Vazirmatn', sans-serif;
  padding: 10px;
}
.icons{
  position: absolute;
  left:130px;
  //bottom: 20px;
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.icon i {
  background-color: #f7e3a2;
  color: #222222;
  padding: 7px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  //color: #f5a623; /* تغییر رنگ هنگام هاور */
}
.icon:hover i {
  color: #007bff;
  transform: scale(1.1);
}
/* استایل badge */
.badge {
  position: absolute;
  top: -8px; /* فاصله از بالا */
  right: -8px; /* فاصله از راست */
  background-color: #ff5722;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%; /* کاملاً گرد */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 10; /* برای اطمینان از اینکه روی دکمه قرار می‌گیرد */
}
.discount-badge{
  font-family: 'Vazirmatn', sans-serif;
  color: #da1b60;
}
</style>
