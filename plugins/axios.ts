import { defineNuxtPlugin } from '#app'
import {useAuthStore} from "~/stores/auth";
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
        //baseURL: 'http://127.0.0.1:8000/api/', // آدرس API پیش‌فرض شما
        //baseURL: 'http://192.168.1.100:8000/api/', // آدرس API پیش‌فرض شما
        //baseURL: 'http://192.168.1.105/api/', // آدرس API پیش‌فرض شما
        baseURL: 'http://185.204.197.237/api/',
        //baseURL: 'http://store.laravel.local/api/', // آدرس API پیش‌فرض شما
        //baseURL:'http://store.pythone.local/api/',//آدرس API پیش‌فرض شما
        //withCredentials: true // اطمینان از ارسال و دریافت کوکی‌ها
        //baseURL: 'https://store.python.local/api/', // آدرس API پیش‌فرض شما
    })
    api.interceptors.request.use(config => {
            const authStore = useAuthStore()
            authStore.hydrateToken() // بازیابی توکن هنگام بارگذاری
            const token = authStore.token

            //console.log('توکن در Axios Interceptor:', token)

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },error => {
        return Promise.reject(error);
    });
        // اضافه کردن Axios به context
    nuxtApp.provide('axios', api)
})
