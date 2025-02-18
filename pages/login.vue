<template>
  <div class="body">
    <img src="@/src/static/images/house-64.png" alt="صفحه اصلی">
    <div class="login-container">
      <img src="https://example.com/your-logo.png" alt="لوگوی برند">
      <form @submit.prevent="handleLogin">
        <input type="text" v-model="email" placeholder="ایمیل" required />
        <input type="password" v-model="password" placeholder="رمز عبور" required />
        <button type="submit">ورود</button>
      </form>
      <div class="forgot-password">
        <a href="#">رمز عبور خود را فراموش کرده‌اید؟</a>
      </div>
      <div class="signup">
        جدید در سایت؟ <router-link to="/register">همین حالا ثبت‌نام کنید</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth.js';
import {useRouter} from "#app";

export default {
  setup() {
    const authStore = useAuthStore(); // Access the store in the setup function
    const router=useRouter();
    return {
      authStore,
      router
    };
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await this.$axios.post('user/login', {
          email: this.email,
          password: this.password
        });

        const token = response.data.token;
        this.authStore.setToken(token);
        localStorage.setItem('auth_token',this.authStore.token);
        //console.log(this.authStore.token);
        await this.$router.push('/');

      } catch (error) {
        alert('خطایی در بارگذاری اطلاعات رخ داد.');
      }
    }
  }
};

</script>

<style scoped>
.body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f5;
  font-family: 'Roboto', sans-serif;
}

.login-container {

  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 40px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-container img {
  width: 100px;
  margin-bottom: 20px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #f9f9f9;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.2);
  outline: none;
  background-color: #fff;
}

button[type="submit"] {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s, box-shadow 0.2s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

button[type="submit"]:active {
  background-color: #004494;
  transform: translateY(0);
  box-shadow: none;
}

.forgot-password,
.signup {
  margin-top: 20px;
}

.forgot-password a,
.signup a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-password a:hover,
.signup a:hover {
  color: #0056b3;
}

@media (max-width: 480px) {
  .login-container {
    padding: 20px;
  }

  button[type="submit"] {
    font-size: 14px;
    padding: 10px;
  }
}

</style>