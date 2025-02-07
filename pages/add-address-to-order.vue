<template>
  <div id="address-selection-page">
    <h2>Select Your Address</h2>

    <div class="address-cards-container">
      <div
          v-for="address in addresses"
          :key="address.id"
          class="address-card"
          :class="{ selected: selectedAddress === address.id }"
          @click="selectedAddress = address.id"
      >
        <div class="address-content">
          <h3>{{ address.street }}</h3>
          <p>{{ address.city }}, {{ address.state }}, {{ address.country }}</p>
        </div>
        <i v-if="selectedAddress === address.id" class="fas fa-check-circle check-icon"></i>
      </div>
    </div>

    <div class="buttons-container">
      <button @click="handleSubmit" class="submit-button">
        <i class="fas fa-check"></i> Add Address To Order
      </button>
      <button @click="addNewAddress" type="button" class="new-address-button">
        <i class="fas fa-plus"></i> Add New Address
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: [],
      addresses: [],
      selectedAddress: null,
    };
  },
  async mounted() {
    await this.loadAddresses();
  },
  methods: {
    async loadAddresses() {
      try {
        const response = await this.$axios.get('user/addresses');
        this.addresses = response.data.addresses;
      } catch (error) {
        console.error('Failed to load addresses:', error);
      }
    },
    async handleSubmit() {
      if (!this.selectedAddress) {
        console.error('No address selected');
        return;
      }
      try {
        const response = await this.$axios.post(`user/create/order/${this.selectedAddress}`);
        this.order = response.data.order;
        localStorage.setItem('order_number', JSON.stringify(this.order.order_number));
        console.log('Address added to order:', response.data.order);
        this.$router.push('/add-shipping-method-to-order');
      } catch (error) {
        console.error('Failed to add address to order:', error);
      }
    },
    addNewAddress() {
      this.$router.push('/add-new-address');
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f4f6f9;
  margin: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

#address-selection-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

h2 {
  color: #333;
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
}

.address-cards-container {
  display: grid;
  gap: 20px;
  width: 100%;
  max-width: 900px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  margin-bottom: 30px;
}

.address-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  text-align: center;
  border: 2px solid transparent;
}

.address-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.address-card.selected {
  border: 2px solid #007bff;
  background-color: #e6f0ff;
}

.check-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #007bff;
}

.address-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.address-card p {
  font-size: 16px;
  color: #555;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.submit-button,
.new-address-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 10px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.new-address-button {
  background-color: #28a745;
}

.new-address-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.submit-button i,
.new-address-button i {
  margin-right: 8px;
}
</style>