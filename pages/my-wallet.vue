<template>
  <div class="wallet-container">
    <!-- کارت کیف پول -->
    <div class="wallet-card">
      <div class="wallet-header">
        <h2>کیف پول</h2>
      </div>
      <div class="wallet-balance">
        <span>موجودی: </span>
        <strong>{{ $toPersian($formatPrice(wallet.balance)) }} تومان</strong>
      </div>
    </div>

    <!-- لیست تراکنش‌ها -->
    <div class="transaction-list">
      <h3 class="transaction-title">تراکنش‌ها</h3>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id" class="transaction-item">
          <span class="transaction-type">{{ transaction.type === 'deposit' ? 'واریز' : 'برداشت' }}</span>
          <span
              class="transaction-amount"
              :class="transaction.type === 'deposit' ? 'deposit' : 'withdrawal'"
          >
            {{ $toPersian($formatPrice(transaction.amount)) }} تومان
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const { $axios, $toPersian, $formatPrice } = useNuxtApp();
const wallet = ref({});
const transactions = ref([]);

const fetchWalletDetails = async () => {
  try {
    const response = await $axios.get('user/my/wallet');
    wallet.value = response.data.wallet;
    transactions.value = response.data.wallet.transactions;
  } catch (error) {
    console.error('خطا در دریافت اطلاعات کیف پول:', error);
  }
};

onMounted(fetchWalletDetails);
</script>

<style scoped>
.wallet-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
  color: #333;
  font-family: 'Vazirmatn', sans-serif;
  padding: 20px;
}

/* کارت کیف پول */
.wallet-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.wallet-header h2 {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.wallet-balance {
  font-size: 26px;
  font-weight: bold;
  color: #2E7D32;
}

/* لیست تراکنش‌ها */
.transaction-list {
  background: white;
  padding: 15px;
  border-radius: 12px;
  max-width: 450px;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
}

.transaction-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-amount {
  font-weight: bold;
}

.deposit {
  color: #2E7D32; /* سبز برای واریز */
}

.withdrawal {
  color: #D32F2F; /* قرمز برای برداشت */
}
</style>
