<template>
  <div class="body">
  <div v-if="isLoading"> Loading... </div>
  <div v-else  class="invoice-container">
    <!-- Invoice Header -->
    <div class="invoice-header">
      <div class="store-details">
        <h2>Store Name</h2>
      </div>
      <div class="user-details">
        <p>Invoice #: {{ invoice.invoice_number }}</p>
        <p>Date: </p>
        <p>User: {{ user.name }}</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: {{ user.email }}</p>
      </div>
    </div>

    <!-- Invoice Items -->
    <div class="invoice-items">
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Image</th> <!-- ستون جدید برای تصویر محصول -->
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Discount</th>
          <th>PriceWithDiscount</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in invoice['items']" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="item.product.image ? `${$config.public.API_BASE_URL}${item.product.image.path}` : '/default-product-image.jpg'"
                 :alt="item.product.name" class="product-image" />
          </td> <!-- نمایش تصویر محصول -->
          <td>{{ item['product']['name'] }}</td>
          <td>{{ item['quantity'] }}</td>
          <td>${{ item['price'] }}</td>
          <td>${{ item['total'] }}</td>
          <td class="discount-cell">${{ item['discount'] }}</td>
          <td>${{ item['price_with_discount'] }}</td>
        </tr>
        <tr v-if="!invoice['items'].length">
          <td colspan="8">No items found</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Invoice Summary -->
    <div class="invoice-summary">
      <div class="summary-item">
        <span>Subtotal:</span> ${{ invoice['sub_total_amount'] }}
      </div>
      <div class="summary-item">
        <span>Tax ({{ invoice['tax_rate'] }}%):</span>
        ${{ invoice['tax'] }}
      </div>
      <div class="summary-item">
        <span>Shipping Cost:</span> ${{ invoice['shipping_cost'] }}
      </div>
      <div class="total">
        Total: ${{ invoice['total_amount'] }}
      </div>
    </div>

    <!-- Add Address Button -->
    <nuxt-link to="/select-payment-methods" class="invoice_add_address">
      SelectPaymentMethods
    </nuxt-link>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      invoice: null,
      isLoading: true, // وضعیت بارگذاری
      user:null,
    };
  },
  methods: {
    async createInvoice() {
      try {
        const order_number = JSON.parse(localStorage.getItem('order_number'));
        const response = await this.$axios.get(`invoice/create/${order_number}`);
        this.invoice = response.data.invoice;
      } catch (error) {
        console.error("Invoice error:", error.response ? error.response.data : error);
      }finally {
        //this.isLoading = false; // پایان بارگذاری
      }
    },
    async fetchUser() {
      try {
        const response = await this.$axios.get('user/profile');
        this.user = response.data;
        this.isLoading = false; // پایان بارگذاری
      } catch (error) {
        console.error("Fetch user error:", error.response ? error.response.data : error);
      }
    }
  },
  mounted() {  // This is the correct hook for Options API
    this.createInvoice();  // Correctly call the method from this context
    this.fetchUser(); // فراخوانی متد دریافت اطلاعات کاربر
  }
};
</script>


<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  overflow-y: auto; /* امکان اسکرول عمودی */
}

.invoice-container {
  max-width: 100%;
  width: 100%;
  overflow-x: auto; /* امکان اسکرول افقی */
  box-sizing: border-box;
  background-color: #a2e3f7;
  //margin-top: 50px;
  //padding: 25px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e3e3e3;
  padding-bottom: 15px;
  margin-bottom: 30px;
}

.store-details {
  text-align: left;
  font-size: 14px;
}

.store-details h2 {
  font-size: 24px;
  color: #007bff;
  padding-bottom: 27px;
  padding-left: 10px;

}

.user-details {
  text-align: right;
  font-size: 14px;
  color: #666;
}

.user-details p {
  margin: 2px 0;
}

.invoice-items {
  margin-bottom: 20px;
  border-bottom: 2px solid #e3e3e3;
  padding-bottom: 20px;
  border-bottom: 2px solid #e3e3e3;
  max-height: 300px; /* ارتفاع ثابت */
  overflow-y: auto; /* امکان اسکرول در جهت عمودی */

}


.invoice-items table {

  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.invoice-items th,
.invoice-items td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e3e3e3;
}

.invoice-items th {
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
}
.invoice-items .product-image {
  width: 50px; /* تنظیم اندازه تصویر محصول */
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.invoice-items tr:nth-child(even) {
  background-color: #f9f9f9;
}

.invoice-summary {
  text-align: right;
  font-size: 16px;
}

.invoice-summary .summary-item {
  margin: 10px 0;
}

.invoice-summary .total {
  font-size: 22px;
  font-weight: bold;
  color: #28a745;
}
.invoice-summary .shipping {
  font-size: 22px;
  font-weight: bold;
  color: #28a745;
}

.invoice-summary .summary-item span {
  font-weight: 600;
}

/* Add Address Button */
.invoice_add_address {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding: 30px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.invoice_add_address:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.invoice_add_address:active {
  background-color: #004085;
  transform: translateY(0);
}
.discount-cell {
  color: red;
  font-weight: bold;
}

/* تنظیمات برای صفحه‌های کوچک (موبایل) */
/* تنظیمات برای صفحه‌های کوچک (موبایل) */
@media (max-width: 600px) {
  .invoice-container {
    width: 100%;
    padding: 15px;
    box-shadow: none;
  }

  .invoice-header,
  .invoice-summary {
    text-align: right;
  }

  .invoice-header {
    flex-direction: row;

    align-items: flex-end;
  }

  .store-details,
  .user-details {
    font-size: 12px;
  }

  .store-details h2 {
    font-size: 18px;
  }

  .invoice-items th,
  .invoice-items td {
    padding: 8px 10px;
    font-size: 12px;
    white-space: nowrap; /* جلوگیری از شکست خطوط */
  }

  .invoice-summary .summary-item,
  .invoice-summary .total {
    font-size: 14px;
  }

  .invoice-items .product-image {
    width: 40px;
    height: 40px;
  }

  /* دکمه‌ی انتخاب روش پرداخت */
  .invoice_add_address {
    padding: 8px 15px;
    font-size: 14px;
  }
}
</style>
