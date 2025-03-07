<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-gray-100 p-20" style="margin-top: 200px;">
    <div class="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10">
      <h1 class="text-3xl font-extrabold text-center text-gray-800 mb-8">بازنشانی رمز عبور</h1>
      <form @submit.prevent="submitForm">
        <input type="hidden" name="token" :value="token">
        <div class="mb-6">
          <label for="email" class="block text-right text-gray-700 mb-2 font-medium">ایمیل</label>
          <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              class="input w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-right text-gray-700 mb-2 font-medium">رمز عبور جدید</label>
          <input
              v-model="password"
              type="password"
              id="password"
              name="password"
              class="input w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
          />
        </div>
        <div class="mb-6">
          <label for="password_confirmation" class="block text-right text-gray-700 mb-2 font-medium">تایید رمز عبور</label>
          <input
              v-model="passwordConfirmation"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              class="input w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300" style="margin-top: 20px;"
        >
          بازنشانی رمز عبور
        </button>
      </form>
      <div v-if="error" class="mt-6 bg-red-100 border border-red-400 text-red-700 px-5 py-4 rounded-lg">
        <ul class="list-disc text-right">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div v-if="status" class="mt-6 bg-green-100 border border-green-400 text-green-700 px-5 py-4 rounded-lg">
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
      password: '',
      passwordConfirmation: '',
      token: this.$route.query.token || '',
      error: null,
      status: null,
    }
  },
  methods: {
    async submitForm() {
      try {
        // Make API call to reset the password
        const response = await this.$axios.post('password/reset', {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          token: this.token,
        })
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
.input:focus {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
</style>
