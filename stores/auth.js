// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken
        },
        clearToken() {
            this.token = null
        },
        hydrateToken() {
            // بازیابی توکن از localStorage هنگام بارگذاری مجدد
            const savedToken = localStorage.getItem('auth_token')
            if (savedToken) {
                this.token = savedToken
            }
        }
    },

    getters: {
        isAuthenticated: (state) => !!state.token
    }
})
