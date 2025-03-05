// plugins/echo.client.js
import Echo from 'laravel-echo';
import io from 'socket.io-client';

export default defineNuxtPlugin(nuxtApp => {
    const token = localStorage.getItem('auth_token'); // فرض بر این است که توکن در localStorage ذخیره شده است

    const echo = new Echo({
        broadcaster: 'socket.io',
        //host: 'http://192.168.1.105:6001', // جایگزین با آدرس سرور Echo خود
        host: 'https://185.204.197.237:6001',
        //host: 'http://nemoonehshow.ir:6001',
        wsHost: window.location.hostname,
        wsPort: 6001,
        wssPort: 6001,
        encrypted: true,
        disableStats: true,
        enabledTransports: ['ws', 'wss'] ,// تنظیم پروتکل‌ها
        client: io,
        auth: {
            headers: {
                'Authorization': `Bearer ${token}`,  // ارسال توکن Sanctum در هدر Authorization
                'X-App-ID': '963c9466e5e96e6f',
                'X-App-Key': '4571675e392b748f312b0614e84c9024',
            },
        },
    });

    nuxtApp.provide('echo', echo);
});
