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
                'X-App-ID': '963c9466e5e96e6f',
                'X-App-Key': '4571675e392b748f312b0614e84c9024',
            },
        },
    });

    nuxtApp.provide('echo', echo);
});
