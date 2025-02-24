import { ref } from 'vue';
import { useNuxtApp } from '#app';


export function useUser() {
    const user = ref(null);
    const { $axios } = useNuxtApp();
    const router = useRouter();
    async function fetchUser() {
        if (!$axios) {
            console.error('Axios is not available');
            return;
        }

        try {
            const response = await $axios.get('user/profile'); // Adjust the endpoint as needed
            user.value = response.data; // Assuming the user data is in this field
            console.log(user.value);
        } catch (error) {
            alert('خطایی در بارگذاری اطلاعات رخ داد.');
        }
    }
    async function logout() {
        try {
            await $axios.get('user/logout'); // Adjust the endpoint as needed
            user.value = null;
            localStorage.removeItem('auth_token');
            await router.push('/');
        } catch (error) {
            console.error("Logout error:", error.response ? error.response.data : error);
        }
    }

    return {
        user,
        logout,
        fetchUser
    };
}


