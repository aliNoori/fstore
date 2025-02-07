<template>
  <div class="body">
  <div class="wallet-container">
    <div class="wallet-header">Wallet Details</div>
    <div class="wallet-balance">Balance: ${{ wallet.balance }}</div>
    <div class="wallet-meta">
      <p>Created at: {{ new Date(wallet.created_at).toLocaleString() }}</p>
      <p>Last updated: {{ new Date(wallet.updated_at).toLocaleString() }}</p>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const wallet = ref({});
const { $axios } = useNuxtApp(); // Inject Axios from the Nuxt context

const fetchWalletDetails = async () => {
  try {
    const response = await $axios.get('user/my/wallet'); // Make sure the API URL is correct
    console.log(response); // Log the entire response
    wallet.value = response.data.wallet;
  } catch (error) {
    console.error('Failed to fetch wallet details:', error);
  }
};

onMounted(() => {
  fetchWalletDetails();
});
</script>

<style scoped>
.body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.wallet-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
}
.wallet-header {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}
.wallet-balance {
  font-size: 36px;
  margin-bottom: 10px;
  color: #27ae60;
}
.wallet-meta {
  font-size: 14px;
  color: #888;
}
</style>
