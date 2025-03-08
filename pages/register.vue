<template>
  <SideBar/>
  <div class="body">
    <div class="store-info">
      <img src="@/src/static/images/basket-32.png" alt="Store Logo" class="store-logo"/>
      <div class="store-details">
        <h2>ثبت نام در فروشگاه آنلاین</h2>
      </div>
    </div>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <p style="display: flex;flex-direction: column;justify-content: center;align-items: center">
        <label for="avatar">آپلود آواتار</label>
        <input
            type="file"
            id="avatar"
            ref="avatarInput"
            @change="previewAvatar"
            accept="image/*"
        />
        <span class="help-text">یک فایل تصویر برای آواتار خود انتخاب کنید.</span>
      </p>
      <!-- نمایش تصویر آواتار -->
      <div class="avatar-preview">
        <img style="font-family: 'Vazirmatn', sans-serif;font-size: .7rem"
            :src="avatarPreviewUrl || 'https://example.com/default-avatar.png'"
            alt="پیش‌نمایش آواتار"
            @click="triggerAvatarUpload"
        />
      </div>
      <p>
        <label for="name">نام</label>
        <input
            type="text"
            id="name"
            v-model="form.name"
        />
        <span class="help-text">{{ nameHelpText }}</span>
      </p>

      <p>
        <label for="username">نام کاربری</label>
        <input
            type="text"
            id="username"
            v-model="form.username"
        />
        <span class="help-text">{{ usernameHelpText }}</span>
      </p>

      <p>
        <label for="email">ایمیل</label>
        <input
            type="email"
            id="email"
            v-model="form.email"
        />
        <span class="help-text">{{ emailHelpText }}</span>
      </p>

      <p>
        <label for="password">رمز عبور</label>
        <input
            type="password"
            id="password"
            v-model="form.password"
        />
        <span class="help-text">{{ passwordHelpText }}</span>
      </p>

      <p>
        <label for="password2">تایید رمز عبور</label>
        <input
            type="password"
            id="password_confirmation"
            v-model="form.password_confirmation"
        />
        <span class="help-text">{{ passwordConfirmationHelpText }}</span>
      </p>

      <button type="submit">ذخیره</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { $axios } = useNuxtApp();
import {useNuxtApp, useRouter} from "#app";
import { useAuthStore } from '~/stores/auth.js';
const authStore=useAuthStore();
const router=useRouter();
const avatarPreviewUrl = ref(null);
const form = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
});
const nameHelpText = 'نام خود را وارد کنید.';
const usernameHelpText = 'یک نام کاربری منحصربه‌فرد وارد کنید.';
const emailHelpText = 'آدرس ایمیل خود را وارد کنید.';
const passwordHelpText = 'یک رمز عبور قوی انتخاب کنید.';
const passwordConfirmationHelpText = 'رمز عبور را برای تأیید تکرار کنید.';
const previewAvatar = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const triggerAvatarUpload = () => {
  const avatarInput = document.querySelector('#avatar');
  avatarInput.click();
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('username', form.value.username);
    formData.append('email', form.value.email);
    formData.append('password', form.value.password);
    formData.append('password_confirmation', form.value.password_confirmation);

    // Handle avatar file upload
    const avatarFile = document.querySelector('#avatar').files[0];
    if (avatarFile) {
      formData.append('image', avatarFile);
    }

    // Replace with actual API endpoint
    const response = await $axios.post('user/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)

    if (response.data) {
      alert('Registration successful!');
      const loginResponse  = await $axios.post('user/login', {
        email: form.value.email,
        password: form.value.password,
      });

      const token = response.data.token;
      authStore.setToken(token);
      localStorage.setItem('auth_token',authStore.token);
      console.log(authStore.token);
      console.log("Login successful:", token);
      // تغییر مسیر به صفحه دیگر بعد از ورود موفق
      await router.push('/');
      // Optionally redirect or clear form
    } else {
      alert('Registration failed: ' + response.data.message);
    }
  } catch (error) {
    console.error('Registration failed:', error);
    alert('An error occurred during registration. Please try again.');
  }
};
</script>

<style scoped>
/* General Styles */
.body {
  font-family: Vazirmatn, sans-serif;
  /*background-color: #f0f2f5;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  margin-top: 70px;
  padding: 20px;
  box-sizing: border-box;
}

h2 {
  font-family: Vazirmatn, sans-serif;
  font-size: 1.5rem;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Form Styles */
form {
  background-color: #fff;
  border-radius: 12px;
  /*box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);*/
  /*padding: 40px;*/
  width: 100%;
  max-width: 700px;
}

/* Form Elements */
form p {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="file"] {
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
input[type="email"]:focus,
input[type="password"]:focus,
input[type="file"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.2);
  outline: none;
  background-color: #fff;
}

/* Submit Button */
button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

button[type="submit"]:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.3);
}

button[type="submit"]:active {
  background-color: #004494;
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

/* Help Text */
.help-text {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

/* avatar Preview */
.avatar-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar-preview img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 150px; /* Fixed size for avatur */
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* Hide File Input */
input[type="file"] {
  display: none;
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
