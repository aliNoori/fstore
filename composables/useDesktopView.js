import {ref} from 'vue';
export function useDesktopView() {
    const desktopView = ref(false);
    const checkDesktopView = () => {
        desktopView.value = window.innerWidth >= 1024;
    };

    return {
        desktopView,
        checkDesktopView
    };
}
