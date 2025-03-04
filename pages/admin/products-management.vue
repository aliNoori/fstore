<template>
  <SideBar/>
  <div class="body">
    <div class="fixed top-0 right-0 w-full flex flex-row-reverse items-center bg-blue-600 text-white py-3 px-4 z-50">
      <h1 class="text-lg font-bold flex items-center gap-2 py-1 px-3 rounded-lg">
        مدیریت محصولات <i class="fas fa-box"></i>
      </h1>
    </div>

    <!-- فیلد جستجو در زیر نوار مدیریت محصولات -->
    <div class="flex items-center justify-center mt-16 py-2">
      <div class="relative w-full max-w-md">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="جستجوی محصول..."
            class="border rounded-lg p-3 w-full focus:outline-blue-500 text-right bg-white text-black shadow-sm"
            dir="rtl"
        />
        <i class="fas fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"></i>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="modal-content bg-white rounded-lg p-6 w-full max-w-lg shadow-lg fixed top-8">
        <button @click="closeModal" class="absolute top-3 left-3 text-gray-500 hover:text-gray-700">
          <i class="fas fa-times text-lg"></i>
        </button>
        <h2 class="font-semibold mb-4 flex flex-row-reverse items-center gap-2">
          <i :class="isEditing ? 'fas fa-edit text-yellow-500' : 'fas fa-plus-circle text-blue-500'"></i>
          {{ isEditing ? 'ویرایش محصول' : 'افزودن محصول جدید' }}
        </h2>
        <form @submit.prevent="isEditing ? updateProduct() : createProduct()" class="flex flex-col gap-4">
          <input v-model="productForm.name" type="text" placeholder="نام محصول" required class="border rounded-lg p-2 focus:outline-blue-500 text-right " dir="rtl"  />
          <input v-model="productForm.sku" type="text" placeholder="کد محصول" required class="border rounded-lg p-2 focus:outline-blue-500 text-right " dir="rtl"  />
          <input v-model="productForm.price" type="number" placeholder="قیمت محصول" required class="border rounded-lg p-2 focus:outline-blue-500 text-right" dir="rtl"  />
          <input v-model="productForm.discount" type="number" placeholder="تخفیف" required class="border rounded-lg p-2 focus:outline-blue-500 text-right" dir="rtl"  />
          <input v-model="productForm.stock" type="number" placeholder="موجودی محصول" required class="border rounded-lg p-2 focus:outline-blue-500 text-right" dir="rtl"  />
          <textarea v-model="productForm.description" placeholder="توضیحات" class="border rounded-lg p-2 focus:outline-blue-500 text-right" dir="rtl" ></textarea>
          <select v-model="productForm.category_id" class="border rounded-lg p-2 focus:outline-blue-500" dir="rtl" >
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <div class="flex items-center gap-4">
            <input type="file" accept="image/*" @change="handleImageUpload" class="border rounded-lg p-2 focus:outline-blue-500 text-right" dir="rtl"  />
            <div v-if="productForm.image" class="w-16 h-16 overflow-hidden rounded-md border">
              <img :src="imagePreview" alt="پیش‌نمایش" class="object-cover w-full h-full" />
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-4">
            <button type="submit" class="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition w-full flex flex-row-reverse items-center justify-center gap-2">
              <i :class="isEditing ? 'fas fa-save' : 'fas fa-check-circle'"></i>
              {{ isEditing ? 'ویرایش محصول' : 'ایجاد محصول' }}
            </button>
            <button type="button" @click="closeModal" class="bg-gray-500 text-white rounded-lg py-2 px-4 hover:bg-gray-600 transition w-full flex flex-row-reverse items-center justify-center gap-2">
              <i class="fas fa-ban"></i> لغو
            </button>
          </div>
        </form>
      </div>
    </div>

    <div>
      <!-- لیست محصولات -->
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-3">
        <div class="border text-amber-50 rounded-lg shadow-md p-4 gap-4 bg-emerald-600 flex items-center justify-center cursor-pointer hover:bg-cyan-950 transition" @click="openModal('create')">
          افزودن محصول جدید <i class="fas fa-plus text-amber-50 text-2xl"></i>
        </div>
        <div v-for="product in filteredProducts" :key="product.id" class="border rounded-lg shadow-md p-6 flex flex-col items-center justify-between">
          <div class="relative h-40 mb-4">
            <img :src="product.image ? `${config.public.API_BASE_URL}${product.image.path}` : '/default-product-image.jpg'" :alt="product.name" class="object-cover h-full rounded-md" />
          </div>
          <h2 class="text-lg font-semibold mb-2 text-center">{{ product.name }}</h2>
          <p class="text-gray-600 text-center">قیمت: {{ $toPersian($formatPrice(product.price)) }} تومان</p>
          <p class="text-gray-600 text-center">موجودی: {{ $toPersian(product.stock) }}</p>
          <p class="text-sm text-gray-500 mt-2 text-center">{{ product.description }}</p>
          <div class="flex mt-4 gap-2 w-full justify-center">
            <button @click="openModal('edit', product)" class="bg-yellow-500 text-white rounded-lg py-2 px-3 hover:bg-yellow-600 transition w-full max-w-xs flex items-center justify-center flex-row-reverse gap-2">
              <i class="fas fa-edit"></i> ویرایش
            </button>
            <button @click="deleteProduct(product.id)" class="bg-red-500 text-white rounded-lg py-2 px-3 hover:bg-red-600 transition w-full max-w-xs flex items-center justify-center flex-row-reverse gap-2">
              <i class="fas fa-trash"></i> حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' },
  ],
});
import { useRuntimeConfig } from '#app';
import { onMounted, ref, computed } from 'vue';
import { useNuxtApp,useRouter} from '#app';
import Fuse from "fuse.js";
const config = useRuntimeConfig();
const { $axios,$toPersian,$formatPrice } = useNuxtApp();
const products = ref([]);
const categories = ref([]);
const productForm = ref({ name: '', sku: '', image: '', price: '', discount: '', stock: '', description: '', category_id: '' });
const isEditing = ref(false);
const editingProductId = ref(null);
const showModal = ref(false);
const imagePreview = computed(() => (productForm.value.image instanceof File ? URL.createObjectURL(productForm.value.image) : productForm.value.image));
const router = useRouter();
// متغیر جستجو
const searchQuery = ref("");

// تنظیمات Fuse.js برای جستجوی تطبیقی
const fuseOptions = {
  keys: ['name', 'description'], // جستجو در نام و توضیحات محصول
  threshold: 0.3, // حساسیت جستجو (هرچه کمتر باشد، نتایج دقیق‌تر خواهند بود)
  ignoreLocation: true, // نادیده گرفتن موقعیت کاراکترهای منطبق در متن
  useExtendedSearch: true, // امکان جستجوی تطبیقی مانند "پلوپز" و "پلو پز"
  findAllMatches: true, // نمایش تمام تطابق‌های ممکن
};

// ایجاد نمونه‌ای از Fuse برای جستجو
const fuse = computed(() => new Fuse(products.value, fuseOptions));

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value; // اگر چیزی وارد نشده، همه محصولات نمایش داده شوند

  // جستجو در داده‌های محصولات
  const results = fuse.value.search(searchQuery.value);
  return results.map(result => result.item); // استخراج محصولات از نتایج Fuse
});
async function fetchProducts() {
  try {
    const response = await $axios.get('product/list');
    products.value = response.data.data;
  } catch (error) {
    console.error("Fetch products error:", error.response ? error.response.data : error);
  }
}

async function fetchCategories() {
  try {
    const response = await $axios.get('category/list');
    categories.value = response.data.data;
  } catch (error) {
    console.error("Fetch categories error:", error.response ? error.response.data : error);
  }
}

async function createProduct() {
  try {
    const formData = new FormData();
    // اطمینان از ارسال category_id و حذف category
    const sanitizedForm = { ...productForm.value }; // کپی از آبجکت اصلی
    sanitizedForm.category_id = productForm.value.category_id; // اضافه کردن category_id
    delete sanitizedForm.category; // حذف category آبجکت
    // افزودن تمام فیلدها به formData
    Object.keys(sanitizedForm).forEach(key => {
      formData.append(key, sanitizedForm[key]);
    });

    const response = await $axios.post('product/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    products.value.push(response.data.data);
    closeModal();
    window.location.reload();
  } catch (error) {
    console.error("Create product error:", error.response ? error.response.data : error);
  }
}

async function updateProduct() {
  try {
    const formData = new FormData();
    // اطمینان از ارسال category_id و حذف category
    const sanitizedForm = { ...productForm.value }; // کپی از آبجکت اصلی
    sanitizedForm.category_id = productForm.value.category_id; // اضافه کردن category_id
    delete sanitizedForm.category; // حذف category آبجکت
    // افزودن تمام فیلدها به formData
    Object.keys(sanitizedForm).forEach(key => {
      formData.append(key, sanitizedForm[key]);
    });

    const response = await $axios.post(`product/update/${editingProductId.value}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    const index = products.value.findIndex(p => p.id === editingProductId.value);
    if (index !== -1) {
      products.value[index] = response.data.data;
    }
    closeModal();
    window.location.reload();
  } catch (error) {
    console.error("Update product error:", error.response ? error.response.data : error);
  }
}

async function deleteProduct(productId) {
  try {
    await $axios.delete(`product/delete/${productId}`);
    products.value = products.value.filter(p => p.id !== productId);
  } catch (error) {
    console.error("Delete product error:", error.response ? error.response.data : error);
  }
}

function openModal(action, product = null) {
  if (action === 'edit') {
    if (!product) {
      console.error('Product is null or undefined.');
      return;
    }
    productForm.value = { ...product };
    editingProductId.value = product.id;
    isEditing.value = true;
    productForm.value.image = product.image ? `${config.public.API_BASE_URL}${product.image.path}` : null;
  } else {
    resetForm();
    isEditing.value = false;
  }
  showModal.value = true;
}

function closeModal() {
  resetForm();
  showModal.value = false;
}

function resetForm() {
  productForm.value = { name: '', sku: '', image: '', price: '', discount: '', stock: '', description: '', category_id: '' };
  editingProductId.value = null;
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    productForm.value.image = file;
  }
}

onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<style scoped>
.body{
  margin-top: 100px;
}
.modal-content {
  max-height: 100vh; /* حداکثر ارتفاع 80% از ارتفاع پنجره */
  overflow-y: scroll; /* فعال کردن اسکرول عمودی */
  scrollbar-width: thin; /* کم کردن عرض اسکرول در مرورگرهایی که از آن پشتیبانی می‌کنند */
  scrollbar-color: transparent transparent; /* مخفی کردن اسکرول */
}

/* برای مرورگرهای Webkit مانند Chrome و Safari */
.modal-content::-webkit-scrollbar {
  width: 0; /* مخفی کردن اسکرول */
}
.modal-content::-webkit-scrollbar-thumb {
  background: transparent; /* مخفی کردن اسکرول */
}
.modal-content::-webkit-scrollbar-track {
  background: transparent; /* مخفی کردن اسکرول */
}


</style>
