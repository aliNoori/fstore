import {ref} from "vue";
import {useNuxtApp} from "#app";

export function useProducts() {
    const { $axios } = useNuxtApp();
    const products = ref([]);
    async function fetchProducts() {
        if (!$axios) {
            console.error('Axios is not available');
            return;
        }
        try {
            const response = await $axios.get('product/list'); // Adjust the endpoint as needed
            products.value = response.data.data; // Assuming the user data is in this field
        } catch (error) {
            console.error("Fetch user error:", error.response ? error.response.data : error);
        }
    }

    return {
        products,
        fetchProducts
    };
}