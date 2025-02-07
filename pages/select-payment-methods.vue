<template>
  <div id="payment-method-page">
    <!-- Title at the top -->
    <h2>Select Your Payment Method</h2>

    <!-- Cards container in the middle -->
    <div class="cards-container">
      <div
          v-for="paymentMethod in paymentMethods"
          :key="paymentMethod.id"
          class="card"
          :class="{ selected: selectedPaymentMethod === paymentMethod.id }"
          @click="selectedPaymentMethod = paymentMethod.id"
      >
        <label>
          <input
              type="radio"
              :value="paymentMethod.id"
              v-model="selectedPaymentMethod"
              required
              hidden
          />
          <h3>{{ paymentMethod.name }}</h3>
          <img
              :src="paymentMethod.image ? `${$config.public.API_BASE_URL}${paymentMethod.image.path}` : '/default-payment-image.jpg'"
              :alt="paymentMethod.name"
              class="payment-image"
          />
          <p>{{ paymentMethod.description }}</p>
          <p>Is Active: {{ paymentMethod.is_active }}</p>
        </label>
      </div>
    </div>

    <!-- Submit button at the bottom -->
    <form @submit.prevent="handleSubmit">
      <button type="submit">Add Payment Method To Order</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentMethods: [], // لیست آدرس‌های کاربر
      selectedPaymentMethod: null // آدرس انتخاب شده
    };
  },
  async mounted() {
    await this.loadShippingMethods();
  },
  methods: {
    async loadShippingMethods() {
      try {
        const response = await this.$axios.get('/paymentMethod/list'); // مسیر API برای دریافت آدرس‌ها
        this.paymentMethods = response.data.paymentMethods;
      } catch (error) {
        console.error('Failed to load shippingMethods:', error);
      }
    },
    async handleSubmit() {
      if (!this.selectedPaymentMethod) {
        console.error('No shippingMethod selected');
        return;
      }

      try {
        // دریافت در صفحه بعدی
        //const order_number = JSON.parse(localStorage.getItem('order_number'));
        const response = await this.$axios.post(`user/manageSelectedPayment/${this.selectedPaymentMethod}`); // ارسال آدرس انتخاب شده به سرور
        console.log(response.data.action)
        console.log('PaymentMethod :', response.data.action);
        if(response.data.action==='Online'){
          this.$router.push('/online-payment-method');
        }

      } catch (error) {
        console.error('Failed to selected paymentMethod :', error);
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

#payment-method-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: start;
  align-items: center;
  padding: 20px 20px 40px; /* کم کردن فاصله پایین */
}

#payment-method-page h2 {
  color: #333;
  font-size: 28px;
  text-align: center;
  margin-top: 10px; /* تنظیم فاصله بالای صفحه */
}

.cards-container {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  margin: 0; /* فاصله بین کارت‌ها و دکمه */
}

.card {
  display: flex; /* تنظیم به فلیکس */
  flex-direction: column; /* چینش عمودی */
  justify-content: center; /* مرکز قرار دادن محتوا */
  align-items: center; /* مرکز قرار دادن محتوا */
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 200px; /* ارتفاع ثابت */
  margin: 0;
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
  flex-grow: 1; /* اجازه می‌دهد متن تا حد ممکن فضا را پر کند */
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
.payment-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}
</style>








