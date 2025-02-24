import { computed } from 'vue';
import { useToggleMenu } from '~/stores/useToggleMenu.js';

export function useSidebarState() {
    const toggleMenu = useToggleMenu();
    const isMenuOpen = computed(() => toggleMenu.isMenuOpen);

    function toggleSidebar() {
        toggleMenu.setIsMenuOpen();
    }

    return {
        isMenuOpen,
        toggleSidebar
    };
}
