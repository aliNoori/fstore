<template>
  <div id="shipping-method-page">
    <!-- Title at the top -->
    <h2>Select Your Shipping Method</h2>

    <!-- Cards container in the middle -->
    <div class="cards-container">
      <div
          v-for="shippingMethod in shippingMethods"
          :key="shippingMethod.id"
          class="card"
          :class="{ selected: selectedShippingMethod === shippingMethod.id }"
          @click="selectedShippingMethod = shippingMethod.id"
      >
        <label>
          <input
              type="radio"
              :value="shippingMethod.id"
              v-model="selectedShippingMethod"
              required
              hidden
          />
          <h3>{{ shippingMethod.name }}</h3>
          <p>{{ shippingMethod.description }}</p>
          <p>Cost: {{ shippingMethod.cost }}</p>
          <p>Estimated Delivery: {{ shippingMethod.delivery_time }}</p>
        </label>
      </div>
    </div>

    <!-- Submit button at the bottom -->
    <form @submit.prevent="handleSubmit">
      <button type="submit">Add Shipping Method To Order</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shippingMethods: [], // لیست آدرس‌های کاربر
      selectedShippingMethod: null // آدرس انتخاب شده
    };
  },
  async mounted() {
    await this.loadShippingMethods();
  },
  methods: {
    async loadShippingMethods() {
      try {
        const response = await this.$axios.get('/shippingMethod/list'); // مسیر API برای دریافت آدرس‌ها
        this.shippingMethods = response.data.shippingMethods;
      } catch (error) {
        console.error('Failed to load shippingMethods:', error);
      }
    },
    async handleSubmit() {
      if (!this.selectedShippingMethod) {
        console.error('No shippingMethod selected');
        return;
      }

      try {
        // دریافت در صفحه بعدی
        const order_number = JSON.parse(localStorage.getItem('order_number'));
        const response = await this.$axios.post(`user/addShipping/${this.selectedShippingMethod}/order/${order_number}`); // ارسال آدرس انتخاب شده به سرور
        console.log('ShippingMethod added to order:', response.data);
        this.$router.push('/create-invoice');
      } catch (error) {
        console.error('Failed to add shippingMethod to order:', error);
      }
    },
  }
};
</script>

<style scoped>
body {
  background-color: #f4f6f9;
  margin: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

#shipping-method-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: start;
  align-items: center;
  padding: 20px 20px 40px; /* کم کردن فاصله پایین */
}

#shipping-method-page h2 {
  color: #333;
  font-size: 28px;
  text-align: center;
  margin-top: 10px; /* تنظیم فاصله بالای صفحه */
}

.cards-container {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  margin-bottom: 20px; /* فاصله بین کارت‌ها و دکمه */
}

.card {
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  text-align: center;
  min-height: 250px;
}

.card:hover {
  background-color: #f1f1f1;
}

.card.selected {
  border: 2px solid #007bff;
  background-color: #e6f0ff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

.card h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.card p {
  font-size: 16px;
  color: #555;
}

form {
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  margin-top: 20px; /* فاصله بالای دکمه */
}

form button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
}

form button[type="submit"]:hover {
  background-color: #0056b3;
  box-shadow: 0 8px 15px rgba(0, 86, 179, 0.4);
  transform: translateY(-3px);
}

form button[type="submit"]:active {
  background-color: #003f7f;
  box-shadow: 0 5px 10px rgba(0, 123, 255, 0.2);
  transform: translateY(0);
}
</style>








