<template>
  <div class="progress-container">
    <!-- نوار پیشرفت -->
    <div class="steps-wrapper">
      <div v-for="(step, index) in steps" :key="index" class="step-container">
        <!-- دایره مربوط به هر مرحله -->
        <div
            :class="['step-circle', { 'step-active': index + 1 <= currentStep }, { 'step-raised': index + 1 === currentStep }]">
          <span>{{ $toPersian(step.number) }}</span>
        </div>
        <!-- نام مرحله -->
        <div class="step-name">
          <span>{{ step.name }}</span>
        </div>
        <!-- خط اتصال بین دایره‌ها -->
        <div v-if="index < steps.length - 1" :class="['step-line', { 'line-active': index + 1 < currentStep }]"></div>
      </div>
    </div>
  </div>
  <!-- محتوای مربوط به هر مرحله -->
  <div class="step-content">
    <div v-if="currentStep === 1" class="page card">
      <h2>سبد خرید</h2>
      <div class="items">
        <div v-for="product in cartItems.cart.items" :key="product.id" class="item-card">
          <div class="image">
            <img
                :src="product.product.image ? `${config.public.API_BASE_URL}${product.product.image.path}` : '/default-product-image.jpg'"
                :alt="product.product.name"/>
          </div>
          <div class="product-details">
            <div class="product-name">{{ product.product.name }}</div>
            <div class="product-price">قیمت:{{ $toPersian($formatPrice(product.product.price)) }}</div>
            <div class="product-quantity">تعداد:{{ $toPersian(product.quantity) }}</div>
          </div>
          <div class="buttons">
            <NuxtLink :to="`/product/${product.product.id}`">
              <button class="product-info-btn">اطلاعات محصول</button>
            </NuxtLink>
            <button @click="removeFromCart(product.product.id)" class="rm-item-card-btn">حذف از سبد خرید</button>
          </div>
        </div>
      </div>
      <div class="controls">
        <button @click="() => { fetchUserAddresses(); nextStep(); }">ثبت آدرس</button>
      </div>
    </div>
    <div v-if="currentStep === 2" class="page addresses">
      <h2>ثبت آدرس</h2>
      <div id="address-selection-page">
        <div class="address-cards-container">
          <div
              v-for="address in addresses"
              :key="address.id"
              class="address-card"
              :class="{ selected: selectedAddress === address.id }"
              @click="selectedAddress = address.id"
          >
            <div class="address-content">
              <h3>{{ $toPersian(address.street) }}</h3>
              <p>{{ address.city }}, {{ address.state }}, {{ address.country }}</p>
            </div>
            <div class="address-buttons">
              <button @click.stop="editAddress(address.id)" class="edit-address-btn">
                <i class="fas fa-edit"></i> ویرایش
              </button>
              <button @click.stop="selectAddress(address.id)" class="select-address-btn">
                <i class="fas fa-check-circle"></i> انتخاب
              </button>
            </div>
          </div>
          <!-- Add New Address Card -->
          <div class="add-address-card" @click="addNewAddress">
            <div class="add-address-icon">
              <i class="fas fa-plus">+</i>
            </div>
            <p>افزودن آدرس جدید</p>
          </div>
        </div>
      </div>
      <div class="controls">
        <button @click="() => { handleSelectedAddress(); fetchShippingMethods(); nextStep(); }">ثبت روش ارسال</button>
        <button @click="previousStep">برگشت به سبد خرید</button>
      </div>
    </div>
    <div v-if="currentStep === 3" class="page shipping-methods">
      <h2>نوع ارسال</h2>
      <div id="shipping-method-selection-page">
        <!-- Cards container in the middle -->
        <div class="shipping-cards-container">
          <div
              v-for="shippingMethod in shippingMethods"
              :key="shippingMethod.id"
              class="shipping-card"
              :class="{ selected: selectedShippingMethod === shippingMethod.id }"
              @click="selectedShippingMethod = shippingMethod.id"
          >
            <label>
              <input
                  type="radio"
                  :value="shippingMethod.id"
                  v-model="selectedShippingMethod"
                  required
                  hidden
              />
              <h3>{{ shippingMethod.name }}</h3>
              <p>{{ $toPersian(shippingMethod.description) }}</p>
              <p>هزینه : {{ $toPersian(shippingMethod.cost) }}</p>
              <p>مدت زمان تحویل :{{ $toPersian(shippingMethod.delivery_time) }}</p>
              <span v-if="selectedShippingMethod === shippingMethod.id" class="checkmark-shipping">&#10003;</span>
            </label>
          </div>
        </div>
        <div class="controls">
          <button @click="() => {
    handleSelectedShippingMethods()
        .then(fetchUser)
        .then(createInvoice)
        .then(nextStep)
        .catch(error => console.error(error));}">صدور فاکتور
          </button>
          <button @click="previousStep">برگشت به انتخاب آدرس</button>
        </div>
      </div>
    </div>
    <div v-if="currentStep === 4" class="page invoice">
      <h2>صدور فاکتور</h2>
      <div class="body">
        <div v-if="isLoading"> Loading...</div>
        <div class="invoice-container">
          <!-- سربرگ فاکتور -->
          <div class="invoice-header">
            <div class="store-details">
              <h2>فروشگاه<br>آنلاین</h2>
            </div>
            <div class="user-details">
              <p><strong>شماره فاکتور:</strong> {{ $toPersian(invoice.invoice_number) }}</p>
              <p><strong>تاریخ:</strong> {{ $toPersian($toPersianDate(invoice.created_at)) }}</p>
              <p><strong>خریدار:</strong> {{ user.name }}</p>
              <p><strong>تلفن:</strong> {{ $toPersian("058-362-10992") }}</p>
              <p><strong>پست الکترونیکی:</strong> {{ user.email }}</p>
            </div>
          </div>

          <!-- آیتم‌های فاکتور -->
          <div class="invoice-items">
            <table>
              <thead>
              <tr>
                <th>#</th>
                <th>تصویر</th>
                <th>محصول</th>
                <th>تعداد</th>
                <th>قیمت</th>
                <th>مجموع</th>
                <th>تخفیف</th>
                <th>قیمت نهایی</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in invoice.items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <img
                      :src="item.product.image ? `${config.public.API_BASE_URL}${item.product.image.path}` : '/default-product-image.jpg'"
                      :alt="item.product.name"
                      class="product-image"
                  />
                </td>
                <td>{{ item.product.name }}</td>
                <td>{{ $toPersian(item.quantity) }}</td>
                <td>{{ $toPersian($formatPrice(item.price)) }}</td>
                <td>{{ $toPersian($formatPrice(item.total)) }}</td>
                <td>{{ $toPersian($formatPrice(item.discount)) }}</td>
                <td>{{ $toPersian($formatPrice(item.price_with_discount)) }}</td>
              </tr>
              <tr v-if="!invoice.items.length">
                <td colspan="8">محصولی موجود نیست</td>
              </tr>
              </tbody>
            </table>
          </div>

          <!-- خلاصه فاکتور -->
          <div class="invoice-summary">
            <div>
              <span>جمع کل:</span>
              <strong>{{ $toPersian($formatPrice(invoice.sub_total_amount)) }}</strong>
            </div>
            <div>
              <span>مالیات ({{ $toPersian($formatPrice(invoice.tax_rate)) }}%):</span>
              <strong>{{ $toPersian($formatPrice(invoice.tax)) }}</strong>
            </div>
            <div>
              <span>هزینه ارسال:</span>
              <strong>{{ $toPersian($formatPrice(invoice.shipping_cost)) }}</strong>
            </div>
            <div class="total">
              <span>مجموع کل:</span>
              <strong>{{ $toPersian($formatPrice(invoice.total_amount)) }}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="controls">
        <button @click="() => {fetchPaymentMethods().then(nextStep).catch(error => console.error(error));}">انتخاب روش
          پرداخت
        </button>
        <button @click="previousStep">برگست به روش ارسال</button>
      </div>
    </div>
    <div v-if="currentStep === 5" class="page payment">
      <h2>انتخاب روش پرداخت</h2>
      <div id="payment-method-selection-page">
        <div class="payment-cards-container">
          <div
              v-for="paymentMethod in paymentMethods"
              :key="paymentMethod.id"
              class="payment-card"
              :class="{ selected: selectedPaymentMethod === paymentMethod.id }"
              @click="selectedPaymentMethod = paymentMethod.id"
          >
            <label>
              <input
                  type="radio"
                  :value="paymentMethod.id"
                  v-model="selectedPaymentMethod"
                  required
                  hidden
              />
              <div class="header-payment-card">
                <h3>{{ getPaymentMethodName(paymentMethod.name) }}</h3>
                <img
                    :src="paymentMethod.image ? `${$config.public.API_BASE_URL}${paymentMethod.image.path}` : '/default-payment-image.jpg'"
                    :alt="paymentMethod.name"
                />
              </div>

              <p>{{ getPaymentMethodDescription(paymentMethod.name) }}</p>
              <p>فعال/غیرفعال :
                <span v-if="paymentMethod.is_active === 1">فعال</span>
                <span v-else>غیرفعال</span>
              </p>
              <span v-if="selectedPaymentMethod === paymentMethod.id" class="checkmark">&#10003;</span>
            </label>
          </div>
        </div>
      </div>
      <div class="controls">
        <button @click="() => {
         handleSelectedPaymentMethods()
        .then(nextStep)
        .catch(error => console.error(error));}">انتخاب درگاه پرداخت
        </button>
        <button @click="previousStep">برگشت به صدور فاکتور</button>
      </div>
    </div>
    <div v-if="currentStep === 6 && action==='Online'">
      <div class="page online-payment-methods">
        <h2>انتخاب درگاه پرداخت</h2>
        <div id="online-method-selection-page">
          <!-- Cards container in the middle -->
          <div class="online-cards-container">
            <div
                v-for="onlineMethod in onlinePaymentMethods"
                :key="onlineMethod.id"
                class="online-card"
                :class="{ selected: selectedOnlinePaymentMethod === onlineMethod.id }"
                @click="selectedOnlinePaymentMethod = onlineMethod.id"
            >
              <input
                  type="radio"
                  :value="onlineMethod.id"
                  v-model="selectedOnlinePaymentMethod"
                  required
                  hidden
              />
              <h3>{{ getOnlineMethodGateway(onlineMethod.gateway) }}</h3>
              <img
                  :src="onlineMethod.image ? `${$config.public.API_BASE_URL}${onlineMethod.image.path}` : '/default-payment-image.jpg'"
                  :alt="onlineMethod.name"
              />
              <span v-if="selectedOnlinePaymentMethod === onlineMethod.id" class="checkmark">&#10003;</span>
            </div>
          </div>
          <div class="controls">
            <button @click="() => {
            handleSelectedOnlineMethods()
            .then(nextStep)
            .catch(error => console.error(error));}">اتصال به درگاه
            </button>
            <button @click="previousStep">برگشت به انتخاب روش پرداخت</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="currentStep===6 && action==='Wallet'">
      <div class="page offline-payment-methods">
        <h2>پرداخت با کیف پول</h2>
        <div class="wallet-method-selection-page">
          <!-- Cards container in the middle -->
          <div class="wallet-card-container">
            <div><p>کیف پول</p></div>
            <div class="wallet-card"
                 :class="{ selected: selectedWallet === wallet.id }"
                 @click="selectedWallet = wallet.id">
              <span>موجودی: </span>
              <strong>{{ $toPersian($formatPrice(wallet.balance)) }} تومان</strong>
            </div>
          </div>
          <div class="controls">
            <button @click="() => {
            handleSelectedOnlineMethods()
            .then(nextStep)
            .catch(error => console.error(error));}">پرداخت سفارش
            </button>
            <button @click="previousStep">برگشت به انتخاب روش پرداخت</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="currentStep===6 && action==='OtherWays'">
      <div class="page offline-payment-methods">
        <h2>پرداخت با کارت اعتباری</h2>
        <div class="coupon-cards-selection-page">
          <p>کارت های اعتباری</p>
          <div class="coupons-card-container">

            <div v-for="coupon in coupons" :key="coupon.id" class="coupon-card"
                 :class="{ selected: selectedCoupon === coupon.id }"
                 @click="selectedCoupon = coupon.id">
              <div class="coupon-header">
                <div class="coupon-title">{{ $toPersian(coupon.code) }}</div>
                <div class="coupon-date">تاریخ اعتبار: {{ $toPersian($toPersianDate(coupon.created_at)) }}</div>
              </div>
              <div class="coupon-body">
                <p>تخفیف : {{ $toPersian(coupon.discount_amount) }} {{ coupon.discount_type }}</p>
                <p>توضیحات : {{ coupon.description }}</p>
              </div>
              <div class="coupon-footer">
                <div class="coupon-status">{{ coupon.is_used ? 'استفاده شده' : 'اعتبار دارد' }}</div>
                <div class="coupon-actions">
                  <a href="#">Use Coupon</a>
                </div>
              </div>
            </div>
          </div>
          <div class="controls">
            <button @click="() => {
            handleSelectedOnlineMethods()
            .then(nextStep)
            .catch(error => console.error(error));}">پرداخت سفارش
            </button>
            <button @click="previousStep">برگشت به انتخاب روش پرداخت</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';
import {useNuxtApp, useRuntimeConfig} from '#app';
import jalaali from "jalaali-js";

const router = useRouter();
/////////// convert number to persian ///////
// تعداد مراحل و نام‌های هر مرحله
const steps = [
  {number: 1, name: 'سبد'},
  {number: 2, name: 'آدرس'},
  {number: 3, name: 'ارسال'},
  {number: 4, name: 'فاکتور'},
  {number: 5, name: 'درگاه'},
  {number: 6, name: 'پرداخت'}
];

// مرحله فعلی
const currentStep = ref(1);

// رفتن به مرحله بعد
const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
};

// بازگشت به مرحله قبل
const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const getPaymentMethodName = (name) => {
  if (name === 'Online') {
    return 'آنلاین';
  } else if (name === 'Wallet') {
    return 'کیف پول';
  } else if (name === 'OtherWays') {
    return 'از طرق دیگر';
  }else {
    return name; // یا هر مقدار دیگری که ممکن است داشته باشد
  }
};
const getPaymentMethodDescription=(name)=>{
  if (name === 'Online') {
    return 'پرداخت از طریق درگاه های بانکی';
  } else if (name === 'Wallet') {
    return 'پرداخت از طریق کیف پول';
  } else if (name === 'OtherWays') {
    return 'پرداخت از طریق کارت جایزه و ...';
  }else {
    return name; // یا هر مقدار دیگری که ممکن است داشته باشد
  }
};
const getOnlineMethodGateway = (gateway) => {
  if (gateway === 'parsian') {
    return 'پارسیان';
  } else if (gateway === 'mellat') {
    return 'ملت';
  } else if (gateway === 'melli') {
    return 'ملی';
  }else {
    return gateway; // یا هر مقدار دیگری که ممکن است داشته باشد
  }
};


//////////////// Fetch Cart Items /////////

const {$axios, $toPersian, $toPersianDate, $formatPrice} = useNuxtApp(); // Using Nuxt Axios
const cartItems = ref({});
const config = useRuntimeConfig();
const fetchCartItems = async () => {
  try {
    const response = await $axios.get('cart/items/show'); // Adjust API endpoint
    cartItems.value = response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};
///////// Remove items in cart /////////
const removeFromCart = async (productId) => {
  try {
    const response = await $axios.post(`cart/item/remove/${productId}`);

    if (response.status === 200) {
      // پیدا کردن آیتم مورد نظر در cartItems و تغییر دادن مقدار quantity
      cartItems.value.cart.items.forEach((item) => {

        if (item.product.id === productId) {
          if (item.quantity > 1) {
            item.quantity--; // کاهش مقدار quantity
          } else {
            // اگر quantity برابر با 1 بود، آیتم را از لیست حذف کن
            cartItems.value.cart.items = cartItems.value.cart.items.filter((cartItem) => cartItem.product.id !== productId);
          }
        }
      });
    } else {
      alert('Error removing the item from the cart.');
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};
////////////////// Fetch Addresses ///////////
const addresses = ref([]);
const fetchUserAddresses = async () => {
  try {
    const response = await $axios.get('user/addresses');
    addresses.value = response.data.addresses;
  } catch (error) {
    console.error('Failed to load addresses:', error);
  }
};
///////////// Selected Address Manage ////////////
const selectedAddress = ref(null);
const order = ref([]);
const handleSelectedAddress = async () => {
  if (!selectedAddress.value) {
    console.error('No address selected');
    return;
  }
  try {
    const response = await $axios.post(`user/create/order/${selectedAddress.value}`);
    order.value = response.data.order;
    localStorage.setItem('order_number', JSON.stringify(order.value.order_number));
    console.log('Address added to order:', response.data.order);
  } catch (error) {
    console.error('Failed to add address to order:', error);
  }
};
const editAddress = (addressId) => {
  // انتقال به صفحه ویرایش آدرس با شناسه آدرس
  router.push(`/edit-address/${addressId}`);
};
const selectAddress = (addressId) => {
  selectedAddress.value = addressId;
  console.log(`آدرس با شناسه ${addressId} انتخاب شد.`);
};
const addNewAddress = async () => {
  await router.push('/add-new-address');
};

////////////// Add Shipping Methods //////////////
const shippingMethods = ref([]);
const selectedShippingMethod = ref(null);
const fetchShippingMethods = async () => {
  try {
    const response = await $axios.get('/shippingMethod/list'); // مسیر API برای دریافت آدرس‌ها
    shippingMethods.value = response.data.shippingMethods;
  } catch (error) {
    console.error('Failed to load shippingMethods:', error);
  }
}
///////////// Selected Shipping Methods //////////
const handleSelectedShippingMethods = async () => {
  if (!selectedShippingMethod.value) {
    console.error('No shippingMethod selected');
    return;
  }
  try {
    // دریافت در صفحه بعدی
    const order_number = JSON.parse(localStorage.getItem('order_number'));
    const response = await $axios.post(`user/addShipping/${selectedShippingMethod.value}/order/${order_number}`); // ارسال آدرس انتخاب شده به سرور
    console.log('ShippingMethod added to order:', response.data);
  } catch (error) {
    console.error('Failed to add shippingMethod to order:', error);
  }
}
//////////////// Create Invoice //////////////////
const invoice = ref({});
const isLoading = ref(true); // وضعیت بارگذاری
const user = ref({});
const createInvoice = async () => {
  try {
    const order_number = JSON.parse(localStorage.getItem('order_number'));
    const response = await $axios.get(`invoice/create/${order_number}`);
    invoice.value = response.data.invoice;
  } catch (error) {
    console.error("Invoice error:", error.response ? error.response.data : error);
  } finally {
    isLoading.value = false; // پایان بارگذاری
  }
};
const fetchUser = async () => {
  try {
    const response = await $axios.get('user/profile');
    user.value = response.data;
    isLoading.value = false; // پایان بارگذاری
  } catch (error) {
    console.error("Fetch user error:", error.response ? error.response.data : error);
  }
};
//////////////////////////// Payment Methods //////////////
const action = ref(null);
const paymentMethods = ref([]);
const selectedPaymentMethod = ref(null);
const fetchPaymentMethods = async () => {
  try {
    const response = await $axios.get('/paymentMethod/list'); // مسیر API برای دریافت آدرس‌ها
    paymentMethods.value = response.data.paymentMethods;
  } catch (error) {
    console.error('Failed to load shippingMethods:', error);
  }
};
const handleSelectedPaymentMethods = async () => {
  if (!selectedPaymentMethod.value) {
    console.error('No shippingMethod selected');
    return;
  }
  try {
    const response = await $axios.post(`user/manageSelectedPayment/${selectedPaymentMethod.value}`); // ارسال آدرس انتخاب شده به سرور

    action.value = response.data.action;

    if (response.data.action === 'Online') {
      console.log('action1 :', response.data.action);
      await loadOnlineMethods();
    } else if (response.data.action === 'Wallet') {
      console.log('action2 :', response.data.action);
      await fetchWallet();
    } else if (response.data.action === 'OtherWays') {
      console.log('action3 :', response.data.action);
      await fetchCoupons();
    }
  } catch (error) {
    console.error('Failed to selected paymentMethod :', error);
  }
}
/////////////////// Online Methods ///////////////
const onlinePaymentMethods = ref([]);
const selectedOnlinePaymentMethod = ref(null);
const loadOnlineMethods = async () => {
  try {
    const response = await $axios.get('/onlineMethodGateway/list'); // مسیر API برای دریافت آدرس‌ها
    onlinePaymentMethods.value = response.data.onlinePaymentMethods;
  } catch (error) {
    console.error('Failed to load onlineMethods:', error);
  }
};
const handleSelectedOnlineMethods = async () => {
  if (!selectedOnlinePaymentMethod.value) {
    console.error('No OnlineMethod selected');
    return;
  }
  try {
    // دریافت در صفحه بعدی
    const order_number = JSON.parse(localStorage.getItem('order_number'));
    const response = await $axios.post(`user/processPayment/${order_number}/${selectedOnlinePaymentMethod.value}`); // ارسال آدرس انتخاب شده به سرور
    console.log('url :', response.data.url);
    window.location.href = response.data.url; // هدایت کاربر به URL پرداخت

  } catch (error) {
    console.error('Failed to selected onlinePaymentMethods :', error);
  }
};
/////////////////// Offline Methods ///////////////
const wallet = ref({});
const coupons = ref({});
const selectedCoupon = ref(null);
const selectedWallet = ref(null);
const fetchWallet = async () => {
  try {
    const response = await $axios.get('user/my/wallet');
    wallet.value = response.data.wallet;
  } catch (error) {
    console.error('خطا در دریافت اطلاعات کیف پول:', error);
  }
};
const fetchCoupons = async () => {
  try {
    const response = await $axios.get('user/my/coupons'); // Adjust API endpoint as needed
    coupons.value = response.data.coupons;
  } catch (error) {
    console.error('خطا در دریافت اطلاعات  کپن های کاربر:', error);
  }
};

/////////////////On Mounted /////////
onMounted(() => {
  fetchCartItems();
});
</script>
<style scoped>
.checkmark {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(50%, -50%);
  font-size: 1.5rem;
  color: #28a745;
}
.checkmark-shipping {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.5rem;
  color: #28a745;
}
/* استایل کلی */
.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
}

.steps-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  max-width: 800px;
}

.step-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  color: #888;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.step-circle.step-active {
  border-color: #4caf50;
  background-color: #e8f5e9;
  color: #2e7d32;
}

.step-circle.step-raised {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.step-name {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.step-line {
  width: 150px;
  height: 3px;
  background: #ddd;
  position: absolute;
  top: 25px;
  right: 10px;
  z-index: -10;
  transition: background 0.3s ease;
}

.step-line.line-active {
  background: #4caf50;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.controls button {
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #4caf50;
  background: white;
  border: 2px solid #4caf50;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.controls button:hover {
  color: white;
  background: #4caf50;
  border-color: #388e3c;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.controls button:disabled {
  color: #bbb;
  background: #f9f9f9;
  border-color: #ddd;
  cursor: not-allowed;
  box-shadow: none;
}


.step-content {
  width: 100%;
//padding: 1rem 0;
}

.page {
  width: 100%;
  text-align: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.card {
  width: 100%;
}

.card .items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.item-card {
  flex: 1 1 calc(33.333% - 10px); /* هر کارت 33.33% از عرض ردیف را اشغال می‌کند */
  max-width: calc(33.333% - 10px); /* عرض حداکثر برای جلوگیری از شکست */
  box-sizing: border-box; /* برای محاسبه دقیق اندازه کارت‌ها */
}

.item-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 450px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1rem;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.image img {
  width: 54px;
  height: 44px;
  object-fit: cover;
  border-radius: 8px;
}

.product-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: right;
  gap: 5px;
  flex-grow: 1;
}

.product-details .product-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.product-details .product-price {
  font-size: 1rem;
  color: #4caf50;
  font-weight: bold;
}

.product-details .product-quantity {
  font-size: 0.9rem;
  color: #777;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buttons .product-info-btn {
  padding: 0.3rem 1rem;
  font-size: 0.85rem;
  border: 1px solid #4caf50;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ffffff;
  color: #4caf50;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.buttons .product-info-btn:hover {
  background-color: #4caf50;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.buttons .product-info-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.buttons .rm-item-card-btn {
  padding: 0.3rem 1rem;
  font-size: 0.85rem;
  border: 1px solid #f44336;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ffffff;
  color: #f44336;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.buttons .rm-item-card-btn:hover {
  background-color: #f44336;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.buttons .rm-item-card-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem; /* اندازه مناسب برای تیتر */
  font-weight: bold; /* ضخامت متن */
  color: #333; /* رنگ متن */
  text-align: center; /* مرکزچین کردن متن */
  position: relative; /* برای استفاده از خط تزئینی زیر متن */
  padding-bottom: 0.5rem; /* فاصله از خط */
  margin-bottom: 1.5rem; /* فاصله کلی تیتر از بقیه محتوا */
}

h2::after {
  content: '';
  display: block;
  width: 80px; /* طول خط */
  height: 3px; /* ضخامت خط */
  background-color: #4caf50; /* رنگ خط */
  margin: 0.5rem auto 0; /* تنظیم موقعیت خط */
  border-radius: 2px; /* گوشه‌های خط */
  transition: width 0.3s ease; /* انیمیشن تغییر عرض خط */
}

h2:hover::after {
  width: 120px; /* تغییر عرض خط هنگام هاور */
  background-color: #388e3c; /* تغییر رنگ خط هنگام هاور */
}


@media (max-width: 460px) {
  .steps-wrapper {
    flex-wrap: wrap;
    gap: 10px;
  }

  .step-circle {
    width: 40px;
    height: 40px;
    font-size: 0.8rem;
  }

  .step-line {
    width: 77px;
    height: 2px;
    top: 20px;
    left: 15px;
  }

  .step-name {
    font-size: 0.8rem;
  }

  .item-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .product-details {
    align-items: center;
    text-align: center;
  }

  .buttons {
    flex-direction: row;
    gap: 10px;
    justify-content: center;
  }
}

@media (max-width: 420px) {
  .buttons {
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }
}

.address-cards-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}

.address-card {
  position: relative;
  width: calc(33.333% - 20px);
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.address-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.address-card.selected {
  border-color: #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.address-content h3 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.address-content p {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}

.address-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.edit-address-btn,
.select-address-btn {
  padding: 5px 10px;
  font-size: 0.85rem;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  background-color: #f1f1f1;
  color: #555;
  transition: all 0.3s ease;
}

.edit-address-btn:hover {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

.select-address-btn:hover {
  background-color: #388e3c;
  color: white;
  border-color: #388e3c;
}

.add-address-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(33.333% - 20px);
  max-width: 300px;
  height: 150px;
  border: 2px dashed #4caf50;
  border-radius: 10px;
  background: #f9f9f9;
  color: #4caf50;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-address-card:hover {
  background: #e8f5e9;
  border-color: #388e3c;
  color: #388e3c;
}

.add-address-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.add-address-card p {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

@media (max-width: 768px) {
  .address-cards-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .add-address-card {
    width: 100%;
  }

  .address-card {
    width: calc(50% - 20px);
  }

  @media (max-width: 768px) {
    .controls {
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      margin: 1rem 0; /* کمی تغییر در فاصله برای هماهنگی بهتر */
    }

    .controls button {
      width: 100%; /* دکمه‌ها به عرض کامل می‌رسند */
      padding: 0.8rem; /* تنظیم ارتفاع دکمه‌ها برای ظاهری متناسب‌تر */
      font-size: 0.9rem; /* متن کمی کوچک‌تر برای صفحات کوچکتر */
    }
  }

}

@media (max-width: 480px) {
  .address-cards-container {
    justify-content: center;
  }

  .address-card {
    width: 100%;
  }

  .address-buttons {
    flex-direction: column;
    gap: 10px;
  }
}

.shipping-cards-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}

.shipping-card {
  position: relative;
  width: calc(33.333% - 20px);
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.shipping-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.shipping-card.selected {
  border-color: #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.shipping-card h3 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.shipping-card p {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .shipping-cards-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .shipping-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 460px) {
  .shipping-card {
    width: 100%;
  }
}

.payment-cards-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-start;
}

.payment-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: calc(33.333% - 20px); /* برای نمایش سه کارت در یک ردیف */
//max-width: 300px; padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center; /* متن وسط‌چین */
}

.payment-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.payment-card.selected {
  border-color: #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.header-payment-card {
  width: 100%;
  display: flex;
  flex-direction: row-reverse; /* برای راست‌چین بودن */
  align-items: center; /* هم‌تراز کردن عمودی تصویر و متن */
  justify-content: space-between; /* فاصله بین تصویر و متن */
  gap: 10px; /* فاصله بین تصویر و متن */
}

.header-payment-card h3 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0; /* حذف فاصله‌های اضافی */
  text-align: right; /* متن راست‌چین */
  flex-grow: 1; /* متن فضای باقی‌مانده را پر می‌کند */
}

.header-payment-card img {
  width: 50px; /* تنظیم اندازه مناسب برای تصویر */
  height: 50px;
  object-fit: cover; /* جلوگیری از تغییر نسبت تصویر */
  border-radius: 5px;
  margin: 0; /* حذف فاصله‌های اضافی */
}

.payment-card p {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}
.payment-card label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .payment-cards-container {
    flex-direction: column;
    align-items: center;
  }

  .payment-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 460px) {
  .payment-card {
    width: 100%;
  }
}

/* استایل برای موبایل */
@media (max-width: 768px) {
  .payment-cards-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .card {
    width: calc(50% - 20px); /* نمایش دو کارت در موبایل */
  }
}

@media (max-width: 460px) {
  .card {
    width: 100%; /* کارت‌ها به صورت تمام‌عرض در موبایل‌های کوچک */
  }
}

.online-cards-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}

.online-card {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: calc(33.333% - 20px);
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  gap: 10px; /* فاصله بین تصویر و متن */
}

.online-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.online-card.selected {
  border-color: #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.online-card {
  width: 100%;
  display: flex;
  flex-direction: row-reverse; /* برای راست‌چین بودن */
  align-items: center; /* هم‌تراز کردن عمودی تصویر و متن */
  justify-content: space-between; /* فاصله بین تصویر و متن */
  gap: 10px; /* فاصله بین تصویر و متن */
}

.online-card h3 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0; /* حذف فاصله‌های اضافی */
  text-align: right; /* متن راست‌چین */
  flex-grow: 1; /* متن فضای باقی‌مانده را پر می‌کند */
}

.online-card img {
  max-width: 100%; /* تنظیم اندازه مناسب برای تصویر */
  height: 35px;
  object-fit: cover; /* جلوگیری از تغییر نسبت تصویر */
  border-radius: 5px;
  margin: 0; /* حذف فاصله‌های اضافی */
}

.online-card p {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .online-cards-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .online-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 460px) {
  .online-card {
    width: 100%;
  }
}

/* استایل برای موبایل */
@media (max-width: 768px) {
  .online-cards-container {
    flex-direction: column-reverse;
    align-items: center;
  }

  .card {
    width: calc(50% - 20px); /* نمایش دو کارت در موبایل */
  }
}

@media (max-width: 460px) {
  .card {
    width: 100%; /* کارت‌ها به صورت تمام‌عرض در موبایل‌های کوچک */
  }
}

.body {
  direction: rtl;
  font-family: 'Vazir', Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  //min-height: 100vh;
  overflow-y: auto; /* امکان اسکرول عمودی */
}

.invoice-container {
  font-family: 'IRANSans', sans-serif;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  direction: rtl;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
}

.store-details h2 {
  font-size: 9px;
  color: #4caf50;
  margin: 0;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-details p {
  margin: 5px 0;
  font-size: 0.9rem;
}

.invoice-items table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.invoice-items th, .invoice-items td {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
}

.invoice-items th {
  background: #4caf50;
  color: white;
}

.invoice-items .product-image {
  width: 50px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}

.invoice-summary div {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1rem;
}

.invoice-summary .total {
  font-weight: bold;
  color: #388e3c;
}

.invoice-controls {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.invoice-controls button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #4caf50;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.invoice-controls button:hover {
  background: #388e3c;
}

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
    width: 100%;
    height: auto;
  }

  /* دکمه‌ی انتخاب روش پرداخت */
  .invoice-items {
    overflow-x: auto; /* فعال شدن اسکرول افقی در موبایل */
  }

  .invoice-items::-webkit-scrollbar {
    display: none; /* مخفی کردن نوار اسکرول */
  }
}

.offline-method-selection-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-end;
}
.coupon-cards-selection-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  //justify-content: flex-start;
  align-items: center;
}

.coupons-card-container {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-end;
}

.coupon-card {
  position: relative;
  //width: calc(33.333% - 20px);
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.coupon-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.coupon-card.selected {
  border-color: #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}


.coupon-card h3 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.coupon-card p {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}
.wallet-method-selection-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-end;
}

.wallet-card-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.wallet-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.wallet-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.wallet-card.selected {
  border-color: #4caf50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}


.wallet-card h3 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.wallet-card p {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}
</style>
