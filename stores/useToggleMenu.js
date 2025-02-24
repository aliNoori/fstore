import { defineStore } from 'pinia';

export const useToggleMenu = defineStore('isOpen', {
    state: () => ({
        isMenuOpen: false
    }),
    actions: {
        setIsMenuOpen() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }
});
