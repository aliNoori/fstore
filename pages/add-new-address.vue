<template>
  <div class="body">
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <h2>فرم ثبت‌ نام آدرس</h2>
      <!-- اطلاعات آدرس -->
      <p>
        <label for="street">خیابان</label>
        <input type="text" id="street" v-model="form.street" />
      </p>

      <p>
        <label for="city">شهر</label>
        <input type="text" id="city" v-model="form.city" />
      </p>

      <p>
        <label for="state">استان</label>
        <input type="text" id="state" v-model="form.state" />
      </p>

      <p>
        <label for="postal_code">کد پستی</label>
        <input type="text" id="postal_code" v-model="form.postal_code" />
      </p>

      <p>
        <label for="country">کشور</label>
        <input type="text" id="country" v-model="form.country" />
      </p>
      <button type="submit">ذخیره</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const { $axios } = useNuxtApp();
import {useNuxtApp, useRouter} from "#app";
const router=useRouter();
const form = ref({
  street: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
});
const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('street', form.value.street);
    formData.append('city', form.value.city);
    formData.append('state', form.value.state);
    formData.append('postal_code', form.value.postal_code);
    formData.append('country', form.value.country);
    // Replace with actual API endpoint
    const response = await $axios.post('user/add/address', formData);
    console.log(response.data)

    if (response.data) {
      alert('Address Registration successful!');
      // تغییر مسیر به صفحه دیگر بعد از ورود موفق
      await router.push('/steps-to-order');
      // Optionally redirect or clear form
    } else {
      alert('Address Registration failed: ' + response.data.message);
    }
  } catch (error) {
    console.error('Address Registration failed:', error);
    alert('An error occurred during address registration. Please try again.');
  }
};
</script>

<style scoped>
/* General Styles */
.body {
  font-family: Vazirmatn, sans-serif;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
}

h2 {
  font-size: 1.5rem;
  text-align: center;
  color: #2000ff;
  margin-bottom: 20px;
}

/* Form Styles */
form {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
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
/* Hide File Input */
input[type="file"] {
  display: none;
}
.home-page-btn{
  position: absolute;
  top:15px;
  left: 20px;
  z-index: 200;
}
</style>
