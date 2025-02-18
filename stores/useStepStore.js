import { defineStore } from 'pinia';

export const useStepStore = defineStore('step', {
    state: () => ({
        currentStep: 1 // مرحله ابتدایی را به ۲ تنظیم کنید
    }),
    actions: {
        setStep(step) {
            this.currentStep = step;
        }
    }
});
