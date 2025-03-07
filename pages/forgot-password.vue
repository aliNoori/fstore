<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-gray-100 p-5 mt-52">
    <!-- محتوا -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-semibold text-center text-gray-700 mb-6">بازنشانی رمز عبور</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="email" class="block text-right text-gray-600 mb-2">ایمیل</label>
          <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              class="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
        >
          ارسال لینک بازنشانی
        </button>
      </form>
      <div v-if="error" class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <ul class="list-disc text-right">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div v-if="status" class="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
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
.input:focus {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}
</style>
