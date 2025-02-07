<template>
  <div id="app">
    <div class="container">
      <!-- Left Card -->
      <div class="left-card">
        <img src="@/src/static/images/logo.webp" alt="Profile Image" />
        <div>
          <h2>Cart</h2>
          <button @click="addAddress" class="calculate-invoice">
            Continue Purchase
          </button>
          <p>You can manage and view Carts here.</p>
        </div>
      </div>

      <!-- Right Card -->
      <div class="right-card">
          <div v-for="item in cartItems.cart.items" :key="item.id" class="item-card">
            <img :src="item.product.image ? `${config.public.API_BASE_URL}${item.product.image.path}` : '/default-product-image.jpg'" :alt="item.product.name" />
            <div class="card-content">
              <div class="card-labels">
                <div class="label">{{ item.product.name }}</div>
                <div class="label">{{ item.product.price }}</div>
                <div class="label">{{ item.quantity }}</div>
              </div>
              <div class="card-buttons">
                <button class="details-button">Details</button>
                <button @click="removeFromCart(item.product.id)" class="remove-from-cart">
                  Remove From Cart
                </button>
              </div>
            </div>
          </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {useNuxtApp, useRuntimeConfig} from '#app';
const { $axios } = useNuxtApp(); // Using Nuxt Axios
const cartItems = ref({});
const logoUrl = ref('@/src/static/images/logo.webp'); // Assuming logo in static folder
const config = useRuntimeConfig();
const fetchCartItems = async () => {
  try {
    const response = await $axios.get('cart/items/show'); // Adjust API endpoint
    cartItems.value = response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

const removeFromCart = async (productId) => {
  try {
    const response = await $axios.post(`cart/item/remove/${productId}`);

    if (response.status === 200) {
      // پیدا کردن آیتم مورد نظر در cartItems و تغییر دادن مقدار quantity
      cartItems.value.cart.items.forEach((item) => {

        if (item.product.id === productId) {
          if (item.quantity > 1) {
            item.quantity--; // کاهش مقدار quantity
          } else {
            // اگر quantity برابر با 1 بود، آیتم را از لیست حذف کن
            cartItems.value.cart.items = cartItems.value.cart.items.filter((cartItem) => cartItem.product.id !== productId);
          }
        }
      });
    } else {
      alert('Error removing the item from the cart.');
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};
const addAddress = () => {
  // Use the router to navigate to the invoice creation route
  useRouter().push('/add-address-to-order');
};

onMounted(() => {
  fetchCartItems();
});
</script>

<style scoped>
.card {
  display: flex; /* برای قرار دادن کارت‌ها و بخش detail در کنار هم */
  flex-direction: column; /* کارت‌ها و detail کنار هم قرار بگیرند */
  gap: 20px;
}
.container {

}
.left-card {
  background-color: #a2e3f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.left-card p {
  padding: 5px;
  margin-top: 0;
  font-size: 11px;
  margin-left: 10px;
}
.left-card h2 {
  padding: 5px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 10px;
}
.left-card button {
  padding: 5px;
  margin-top: 0;
  margin-left: 10px;
}
.left-card img {
  width: 100px; /* تنظیم عرض خاص برای تصویر */
  height: auto;  /* حفظ نسبت تصویر */
  border-radius: 10px;
//margin-bottom: 20px;
  object-fit: cover; /* برای اینکه تصویر بهتر قرار بگیرد */
}
.right-card {
  display: flex;
  flex-direction: row;
  background-color: #fff399;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  padding: 5px;
  width: 100%;
  gap: 10px;
  overflow-y: auto;
}
.item-card {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* عرض کارت را تمام عرض تنظیم کنید */
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px; /* فاصله بین کارت‌ها */
  padding: 10px;

}
.card img {
  width: 120px; /* تنظیم عرض ثابت */
  height: 120px; /* تنظیم ارتفاع یکسان */
  border-radius: 10px;
  object-fit: cover; /* برای تناسب بهتر تصاویر */
}
.card-content {
  flex-grow: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
}
.card-labels {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}
.detail-div {
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: auto;
  max-height: 100%;
  overflow-y: auto;
  flex-grow: 2; /* باعث افزایش عرض این بخش می‌شود */
}
.label {
  padding: 5px 10px;
  margin-top: 0;
  margin-bottom: 10px;
  background-color: #a2f7a2;
  border-radius: 5px;
  font-size: 12px;
  color: #333;
}
.card-buttons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
}
.details-button {
  padding: 5px 10px;
  background-color: #312eeb;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.remove-from-cart {
  padding: 5px 10px;
  background-color: #f76e6e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.calculate-invoice {
  padding: 5px 10px;
  background-color: #f7e3a2;
  color: #080808;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
@media screen {
  .container{
  //flex-wrap: wrap ;
  }

}
</style>