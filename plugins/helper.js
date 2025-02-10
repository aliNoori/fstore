import jalaali from "jalaali-js";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            formatPrice: (price) => {
                return Math.floor(price).toLocaleString('fa-IR');
            },
            toPersian: (number) => {
                const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                return number.toString().replace(/[0-9]/g, (digit) => persianNumbers[digit]);
            },
            toPersianDate: (dateString) => {
                const date = new Date(dateString);
                const jalaaliDate = jalaali.toJalaali(date);
                return `${jalaaliDate.jy}/${jalaaliDate.jm}/${jalaaliDate.jd}`;
            }
        }
    }
});
