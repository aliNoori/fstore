<template>
  <div id="online-payment-method-page">
    <!-- Title at the top -->
    <h2>Online Payment Method Page</h2>

    <!-- Cards container in the middle -->
    <div class="cards-container">
      <div
          v-for="onlinePaymentMethod in onlinePaymentMethods"
          :key="onlinePaymentMethod.id"
          class="card"
          :class="{ selected: selectedOnlinePaymentMethod === onlinePaymentMethod.id }"
          @click="selectedOnlinePaymentMethod = onlinePaymentMethod.id"
      >
        <label>
          <input
              type="radio"
              :value="onlinePaymentMethod.id"
              v-model="selectedOnlinePaymentMethod"
              required
              hidden
          />
          <h3>{{ onlinePaymentMethod.name }}</h3>
          <img
              :src="onlinePaymentMethod.image ? `${$config.public.API_BASE_URL}${onlinePaymentMethod.image.path}` : '/default-payment-image.jpg'"
              :alt="onlinePaymentMethod.name"
              class="online-payment-image"
          />
          <p>Terminal ID : {{ onlinePaymentMethod.terminal_id }}</p>
          <p>Gateway Name : {{ onlinePaymentMethod.gateway }}</p>
        </label>
      </div>
    </div>

    <!-- Submit button at the bottom -->
    <form @submit.prevent="handleSubmit">
      <button type="submit">Go to Payment</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onlinePaymentMethods: [], // لیست آدرس‌های کاربر
      selectedOnlinePaymentMethod: null // آدرس انتخاب شده
    };
  },
  async mounted() {
    await this.loadOnlineMethods();
  },
  methods: {
    async loadOnlineMethods() {
      try {
        const response = await this.$axios.get('/onlineMethodGateway/list'); // مسیر API برای دریافت آدرس‌ها
        this.onlinePaymentMethods = response.data.onlinePaymentMethods;
      } catch (error) {
        console.error('Failed to load onlinePaymentMethods:', error);
      }
    },
    async handleSubmit() {
      if (!this.selectedOnlinePaymentMethod) {
        console.error('No onlinePaymentMethod selected');
        return;
      }

      try {
        // دریافت در صفحه بعدی
        const order_number = JSON.parse(localStorage.getItem('order_number'));
        const response = await this.$axios.post(`user/processPayment/${order_number}/${this.selectedOnlinePaymentMethod}`); // ارسال آدرس انتخاب شده به سرور
        console.log('url :', response.data.url);
        window.location.href = response.data.url; // هدایت کاربر به URL پرداخت

      } catch (error) {
        console.error('Failed to selected onlinePaymentMethods :', error);
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

#online-payment-method-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: start;
  align-items: center;
  padding: 20px 20px 40px; /* کم کردن فاصله پایین */
}

#online-payment-method-page h2 {
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
  padding: 20px;
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
.online-payment-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  margin-left: 30px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}
</style>








