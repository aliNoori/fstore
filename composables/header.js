import { ref } from 'vue';
import { useNuxtApp } from '#app';
import {useUser} from "~/composables/user.js";
import {useAuthStore} from "~/stores/auth.js";
export function useHeader() {
    const { $axios } = useNuxtApp();
    const isMessagesOpen = ref(false);
    const messages = ref([]);
    const notifications = ref([]);
    const {user,fetchUser} =useUser();
    const authStore=useAuthStore();
    const toggleMessages = () => {
        isMessagesOpen.value = !isMessagesOpen.value;
    };
    async function changeStatusNotification(id) {
        try {
            const response = await $axios.get(`user/notification/${id}/changeStatus`);
            const notificationIndex = notifications.value.findIndex(n => n.id === id);
            if (notificationIndex !== -1) {
                notifications.value[notificationIndex].is_read = true;
                // حذف پیام از آرایه messages
                messages.value.splice(notificationIndex, 1);
            }
        } catch (error) {
            alert('خطایی رخ داد.');
        }
    }
    async function getNotifications() {
        try {
            console.log('user/notifications');
            const response = await $axios.get(`user/notifications`);
            notifications.value = response.data.notifications;
            /*!// اضافه کردن پیام‌های نوتیفیکیشن‌ها به آرایه messages*/
            messages.value = notifications.value.map(notification => notification.message);

            /*if (response.data.success) {
                alert('نوتیفیکیشن ها دریافت شد.');
            } else {
                alert('خطایی در دریافت نوتیفیکیشن ها رخ داد. لطفا مجددا تلاش کنید.');
            }*/
        } catch (error) {
            alert('خطایی رخ داد.');
        }
    }

    async function getMessages() {
        if (typeof fetchUser === 'function') { /*// بررسی اینکه fetchUser یک تابع است*/
            await fetchUser(); /*// فراخوانی fetchUser*/
        } else {
            console.error('fetchUser is not a function');
        }

        if(user.value && user.value.id){
            const token = localStorage.getItem('auth_token');
            const nuxtApp = useNuxtApp();
            const echo = nuxtApp.$echo; /*// دریافت Echo از NuxtApp*/

            if (token) {
                echo.auth = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            }
            console.log(echo.auth.headers);
            console.log('Echo instance: ', echo); /*// بررسی Echo instance*/
            echo.connector.socket.on('connect', () => {
                console.log('Socket connected');
            });

            echo.connector.socket.on('connect_error', (error) => {
                console.error('Connection Error: ', error);
            });

            echo.connector.socket.on('disconnect', (reason) => {
                console.log('Socket disconnected due to: ', reason);
            });

            echo.channel('chat')
                .listen('.OrderCreated', (data) => {
                    console.log('A new public message: ', data.message);
                    messages.value.push(data.message); /*// افزودن پیام به آرایه پیام‌ها*/
                });
            echo.private('order-10')
                .listen('.OrderCreatedPrivate', (data) => {
                    console.log('A new private message: ', data.order_id);
                    messages.value.push(data.order_id); /*// افزودن پیام به آرایه پیام‌ها*/
                })
            echo.private(`add-score-${user.value.id}`)
                .listen('.AddScore', (data) => {
                    console.log('A new private message AddScore: ', data.message);
                    messages.value.push(data.message); /*// افزودن پیام به آرایه پیام‌ها*/
                });
            echo.private(`add-user-to-lottery-${user.value.id}`)
                .listen('.AddUserToLattery', (data) => {
                    console.log('A new private message AddUserToLattery: ', data.message);
                    messages.value.push(data.message); /*// افزودن پیام به آرایه پیام‌ها*/
                });
            echo.private(`apply-coupon-${user.value.id}`)
                .listen('.ApplyCoupon', (data) => {
                    console.log('A new private message ApplyCoupon: ', data.message);
                    messages.value.push(data.message); /*// افزودن پیام به آرایه پیام‌ها*/
                });
            echo.private(`charge-wallet-${user.value.id}`)
                .listen('.ChargeWallet', (data) => {
                    console.log('A new private message ChargeWallet: ', data.message);
                    messages.value.push(data.message); /*// افزودن پیام به آرایه پیام‌ها*/
                });
            echo.private(`handle-high-value-order-${user.value.id}`)
                .listen('.HandleHighValueOrder', (data) => {
                    console.log('A new private message HandleHighValueOrder: ', data.message);
                    messages.value.push(data.message); /*// افزودن پیام به آرایه پیام‌ها*/
                });
            echo.private(`send-payment-notification-${user.value.id}`)
                .listen('.SendPaymentNotification', (data) => {
                    console.log('A new private message HandleHighValueOrder: ', data.message);
                    messages.value.push(data.message); /*// افزودن پیام به آرایه پیام‌ها*/
                });
        }
    }
    onMounted(async () => {
        authStore.hydrateToken();
        console.log('authStore.token :',authStore.token);
        if(authStore.token!=null) {
            await getMessages(); /// استفاده از await برای فراخوانی getMessages*
            await getNotifications();
        }
    });
    return {
        isMessagesOpen,
        messages,
        user,
        notifications,
        fetchUser,
        toggleMessages,
        changeStatusNotification,
        getNotifications
    };
}


