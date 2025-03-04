<template>
  <div class="body">
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <h2>فرم ثبت‌ آدرس</h2>
      <!-- اطلاعات آدرس -->
      <p>
        <label for="street">خیابان</label>
        <input type="text" id="street" v-model="form.street" />
      </p>

      <p>
        <label for="city">شهر</label>
        <div class="select-wrapper">
          <select id="city" v-model="form.city">
            <option disabled value="">انتخاب شهر</option>
            <option value="Tehran">تهران</option>
            <option value="Mashhad">مشهد</option>
            <option value="Isfahan">اصفهان</option>
            <!-- Add more cities as needed -->
          </select>
        </div>
      </p>

      <p>
        <label for="state">استان</label>
        <div class="select-wrapper">
          <select id="state" v-model="form.state">
            <option disabled value="">انتخاب استان</option>
            <option value="Tehran">تهران</option>
            <option value="Khorasan">خراسان</option>
            <option value="Isfahan">اصفهان</option>
            <!-- Add more states as needed -->
          </select>
        </div>
      </p>

      <p>
        <label for="postal_code">کد پستی</label>
        <input type="text" id="postal_code" v-model="form.postal_code" />
      </p>

      <p>
        <label for="country">کشور</label>
        <div class="select-wrapper">
          <select id="country" v-model="form.country">
            <option disabled value="">انتخاب کشور</option>
            <option value="Iran">ایران</option>
            <option value="USA">آمریکا</option>
            <option value="Canada">کانادا</option>
            <!-- Add more countries as needed -->
          </select>
        </div>
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
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  padding-left: 40px; /* Increase left padding for arrow */
  width: 100%;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
  cursor: pointer;
}

select:focus {
  border-color: #007bff;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.2);
}

.select-wrapper {
  position: relative;
}

.select-wrapper::before {
  content: '▼';
  font-size: 12px;
  color: #333;
  position: absolute;
  top: 50%;
  left: 15px; /* Move arrow to the left side */
  transform: translateY(-50%);
  pointer-events: none;
}

.select-wrapper select {
  padding-left: 40px; /* Increase left padding for arrow */
}


</style>
