<script setup lang="ts">
import {useNuxtApp} from "#app";
const {$toPersian,$formatPrice}=useNuxtApp();
</script>
<template>
  <SideBar/>
  <ProductsSlider/>
  <div class="store-banner">
    <h2>فروشگاه آنلاین</h2>
    <p>
      با خرید از فروشگاه آنلاین تجربه بهتری از خرید داشنه باشید و اجناس و کالای با کیفیت و مرغوب را تهیه کنید و در مراحل بعد تبلیغ فروشگاه ما باشید.
    </p>
  </div>
  <ProductsHighQualitySlider/>
  <div class="store-banner-height-quality">
    <h2>کیفیت برتر</h2>
    <p>
      در فروشگاه ما، بهترین و با کیفیت‌ترین محصولات را پیدا کنید و از خریدی مطمئن لذت ببرید.
    </p>
  </div>
  <ProductsHighQualitySlider/>
  <div class="store-banner-off">
    <h2>تخفیف‌های ویژه</h2>
    <p>
      هر هفته از تخفیف‌ها و پیشنهادات ویژه فروشگاه ما بهره‌مند شوید و خریدی اقتصادی و به‌صرفه را تجربه کنید.
    </p>
  </div>
  <ProductsHighQualitySlider/>
  <div class="store-banner-buy-fast">
    <h2>خرید آسان و سریع</h2>
    <p>
      با خرید آنلاین از فروشگاه ما، به راحتی و با سرعت بالا، کالای مورد نیاز خود را تهیه کنید و از تخفیف‌های ویژه بهره‌مند شوید.
    </p>
  </div>
  <ProductsHighQualitySlider/>
  <div class="store-banner-support">
    <h2>{{$toPersian('پشتیبانی 24 ساعته')}}</h2>
    <p>
      تیم پشتیبانی ما در هر ساعت از شبانه‌روز آماده پاسخگویی به سوالات و مشکلات شماست. خریدی آسان و بدون دغدغه را تجربه کنید.
    </p>
    <div class="social-icons">
      <a href="https://t.me/your-telegram" target="_blank"><i class="fab fa-telegram-plane"></i></a>
      <a href="https://instagram.com/your-instagram" target="_blank"><i class="fab fa-instagram"></i></a>
      <a href="https://wa.me/your-whatsapp-number" target="_blank"><i class="fab fa-whatsapp"></i></a>
    </div>
  </div>
</template>
<style>
.store-banner {
/*background: linear-gradient(135deg, #f9f9f9, #ececec);*/
  padding: 80px 80px 40px 80px;
/*border-radius: 10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);*/
  text-align: center;
  max-width: 100%;
  margin-top: 80px;
}

.store-banner h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #007bff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.store-banner p {
  font-size: .8em;
  color: #555;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
.store-banner-buy-fast {
/*background: linear-gradient(135deg, #f0f0f0, #dcdcdc);*/
  padding: 80px 80px 80px 80px;
  max-width: 100%;
  margin-top: 80px;
/*border-radius: 10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);*/
  text-align: center;
}

.store-banner-buy-fast h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #007bff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.store-banner-buy-fast p {
  font-size: .8em;
  color: #555;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
.store-banner-height-quality {
/*background: linear-gradient(135deg, #ffefba, #ffffff);*/
  padding: 80px 80px 80px 80px;
  margin-top: 80px;
  max-width: 100%;
/*border-radius: 10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);*/
  text-align: center;

}

.store-banner-height-quality h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #ff6f61;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.store-banner-height-quality p {
  font-size: .8em;
  color: #555;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.store-banner-off {
/*background: linear-gradient(135deg, #fceabb, #f8b500);*/
  padding: 80px 80px 80px 80px;
  margin-top: 80px;
  max-width: 100%;
/*border-radius: 10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);*/
  text-align: center;
}

.store-banner-off h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #d35400;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.store-banner-off p {
  font-size: .8em;
  color: #555;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
.store-banner-support {
/*background: linear-gradient(135deg, #d4fc79, #96e6a1);*/
  padding: 80px 80px 80px 80px;
  margin-top: 80px;
  max-width: 100%;
/*border-radius: 10px;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);*/
  text-align: center;
}

.store-banner-support h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #2d572c;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.store-banner-support p {
  font-size: .8em;
  color: #333;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}
.social-icons {
  margin-top: 20px;
}

.social-icons a {
  margin: 0 10px;
  color: #333;
  font-size: 1.5em;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #007bff;
}
</style>