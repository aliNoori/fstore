<template>
  <div class="forgot-container">
    <div class="store-info">
      <img src="@/src/static/images/basket-32.png" alt="Store Logo" class="store-logo"/>
      <div class="store-details">
        <h2> فروشگاه آنلاین</h2>
      </div>
    </div>
    <div class="forgot-password-box">
      <h1>بازنشانی رمز عبور</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">ایمیل</label>
          <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              required
          />
        </div>
        <button type="submit">ارسال لینک بازنشانی</button>
      </form>
      <div v-if="error" class="error-message">
        <ul>
          <li>{{ error }}</li>
        </ul>
      </div>
      <div v-if="status" class="status-message">
        {{ status }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      error: null,
      status: null,
    }
  },
  methods: {
    async submitForm() {
      try {
        // Make API call to send password reset email
        const response = await this.$axios.post('password/email', { email: this.email })
        this.status = response.data.message
        this.error = null
      } catch (err) {
        this.error = err.response.data.error
        this.status = null
      }
    }
  }
}
</script>

<style scoped>
.forgot-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /*justify-content: center;*/
  min-height: 100vh;
  /*background: linear-gradient(to top right, #ebf8ff, #f7f7f7);*/
  padding: 20px;
  margin-top: 100px;
}

.forgot-password-box {
  width: 100%;
  max-width: 700px;
  background: #ffffff;
  border-radius: 20px;
  /*box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);*/
  padding: 0;
  text-align: center;
}

.forgot-password-box h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333333;
}

.form-group {
  margin-bottom: 20px;
  text-align: right;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666666;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 15px;
  background: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #0056b3;
}

.error-message {
  margin-top: 20px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 10px;
  border-radius: 10px;
}

.status-message {
  margin-top: 20px;
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 10px;
  border-radius: 10px;
}
.store-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  background-color: #3af9c3;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  max-width: 700px;
  width: 100%;
}

.store-logo {
  width: 80px;
  height: 80px;
  margin-right: -5px;
}

.store-details {
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-right: 10px;
}
.store-details h2{
  color:black;
  font-size: 1.3rem;
  font-weight: bold;
}
</style>
