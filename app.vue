<template>
  <div class="body">
    <NuxtRouteAnnouncer />
    <Header/>
    <NuxtPage />
  </div>
</template>
<script setup>
import { useHead } from 'unhead'
useHead({
  title: 'آموزش لاراول پروژه محور | بهترین دوره یادگیری Laravel',
  meta: [
    { name: 'description', content: 'کامل‌ترین دوره آموزش لاراول پروژه محور به همراه مثال‌های عملی، مناسب برای مبتدیان و حرفه‌ای‌ها. در این دوره، مفاهیم لاراول را از صفر تا صد یاد می‌گیرید.' },
    { name: 'keywords', content: 'لاراول, آموزش لاراول, دوره لاراول, برنامه‌نویسی وب, توسعه وب, PHP, فریمورک لاراول, پروژه محور' },

    // Open Graph (برای شبکه‌های اجتماعی مانند فیس‌بوک و تلگرام)
    { property: 'og:title', content: 'آموزش لاراول پروژه محور | بهترین دوره یادگیری Laravel' },
    { property: 'og:description', content: 'در این دوره پروژه محور، مفاهیم لاراول را از پایه تا پیشرفته یاد بگیرید و به یک برنامه‌نویس حرفه‌ای تبدیل شوید.' },
    { property: 'og:image', content: 'https://example.com/images/laravel-course.jpg' },
    { property: 'og:url', content: 'https://example.com/laravel-course' },
    { property: 'og:type', content: 'article' },
    { property: 'og:site_name', content: 'نام سایت شما' },

    // Twitter Card (برای بهینه‌سازی در توییتر)
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'آموزش لاراول پروژه محور | بهترین دوره یادگیری Laravel' },
    { name: 'twitter:description', content: 'یادگیری Laravel به‌صورت پروژه محور با بهترین روش تدریس.' },
    { name: 'twitter:image', content: 'https://example.com/images/laravel-course.jpg' },
    { name: 'twitter:site', content: '@YourTwitterHandle' },

    // Meta Robots (برای مدیریت ایندکس شدن در موتورهای جستجو)
    { name: 'robots', content: 'index, follow' },

    // Canonical URL (برای جلوگیری از مشکلات محتوای تکراری)
    { rel: 'canonical', href: 'https://example.com/laravel-course' }
  ],

  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "آموزش لاراول پروژه محور",
        "description": "بهترین دوره یادگیری فریمورک Laravel به‌صورت پروژه محور، از سطح مبتدی تا حرفه‌ای.",
        "provider": {
          "@type": "Organization",
          "name": "نام سایت شما",
          "url": "https://example.com"
        }
      })
    }
  ]
})

</script>
<style>
.body {
  direction: rtl;
  font-family:Vazirmatn, sans-serif;
}
</style>
