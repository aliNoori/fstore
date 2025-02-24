<script setup lang="ts">
import {useUser} from '~/composables/user.js';
import {useNuxtApp, useRuntimeConfig} from '#app';
import {useSidebarState} from "~/composables/useSidebarState";
const {$toPersian}=useNuxtApp();
const config=useRuntimeConfig();
const {user,fetchUser,logout} =useUser();
const {isMenuOpen,toggleSidebar}=useSidebarState();
onMounted(() => {
  fetchUser();
});
</script>
<template>
    <aside class="sidebar" :class="{ open: isMenuOpen }">
      <div class="sidebar-content">
        <div class="menu-icon-sidebar" @click="toggleSidebar">
          <span class="arrow"></span>
        </div>
        <!-- نمایش اطلاعات کاربر اگر موجود باشد -->
        <div v-if="user" class="user-info-header">
          <img :src="user.image ? `${config.public.API_BASE_URL}${user.image.path}` : '/default-avatar.png'" :alt="user.name" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">{{ user.name }}</div>
          </div>

          <button @click="logout" class="logout-button">خروج</button>
        </div>
        <div v-else style="margin-top: 70px;">
          <NuxtLink to="/login" class="sidebar-link">ورود</NuxtLink>
          <NuxtLink to="/register" class="sidebar-link">ثبت نام</NuxtLink>
        </div>

        <!-- منوی سایدبار -->
        <div v-if="user" class="user-info">
          <nav class="sidebar-menu">
            <NuxtLink to="/my-wallet">
              کیف پول
              <span v-if="user.wallet_balance > 0" class="badge-sidebar">{{ $toPersian(user.wallet_balance) }}</span>
            </NuxtLink>
            <NuxtLink to="/my-scores">
              امتیازات
              <span v-if="user.score > 0" class="badge-sidebar">{{ $toPersian(user.score) }}</span>
            </NuxtLink>
            <NuxtLink to="/my-coupons">
              کد های تخفیف
              <span v-if="user.coupons_count > 0" class="badge-sidebar">{{ $toPersian(user.coupons_count) }}</span>
            </NuxtLink>
            <NuxtLink to="/my-orders">
              سفارشات
              <span v-if="user.orders_count > 0" class="badge-sidebar">{{ $toPersian(user.orders_count) }}</span>
            </NuxtLink>
            <NuxtLink to="/steps-to-order">
              سبد خرید
              <span v-if="user.items_cart > 0" class="badge-sidebar">{{ $toPersian(user.items_cart) }}</span>
            </NuxtLink>
            <NuxtLink to="/admin/admin-panel">صفحه مدیریت</NuxtLink>
          </nav>
        </div>
        <div v-else></div>
      </div>
    </aside>
</template>
<style src="~/assets/css/sidebar.css"></style>