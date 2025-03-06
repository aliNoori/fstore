// plugins/echo.client.js
import Echo from 'laravel-echo';
import io from 'socket.io-client';

export default defineNuxtPlugin(nuxtApp => {
    const token = localStorage.getItem('auth_token'); // فرض بر این است که توکن در localStorage ذخیره شده است

    const echo = new Echo({
        broadcaster: 'socket.io',
        //host: 'http://192.168.1.105:6001', // جایگزین با آدرس سرور Echo خود
        //host: 'http://185.204.197.237:6001',
        host: 'https://nemoonehshow.ir:6001',
        client: io,
        auth: {
            headers: {
                'Authorization': `Bearer ${token}`,  // ارسال توکن Sanctum در هدر Authorization
                'X-App-ID': '24472a8bd6cb6441',
                'X-App-Key': '22c94e01c7ea87e8981adbf55c6c30b6',
            },
        },
    });

    nuxtApp.provide('echo', echo);
});
