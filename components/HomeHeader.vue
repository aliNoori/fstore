<script setup lang="ts">
import {useNuxtApp} from '#app';
import {useHeader} from "~/composables/header";
import {useSidebarState} from "~/composables/useSidebarState";
const {$toPersian}=useNuxtApp();
const {toggleSidebar}=useSidebarState();
const {user,messages,toggleMessages,isMessagesOpen,changeStatusNotification,notifications}=useHeader();
</script>
<template>
  <div class="ribbon">
    <h3>فروشگاه آنلاین</h3>
    <div class="icons">
      <div class="icon" @click="toggleMessages">
        <img src="@/src/static/images/user-32.png" alt="اعلان">
        <span v-if="messages.length > 0" class="ribbon-badge">{{ $toPersian(messages.length) }}</span> <!-- تعداد پیام‌ها -->
        <!-- نمایش پیام‌ها -->
        <div class="messages-section" v-if="isMessagesOpen && messages.length">
          <h2>اعلان ها</h2>
          <div class="message" v-for="(message, index) in messages" :key="index" :class="{ read: notifications[index]?.is_read }" @click="changeStatusNotification(notifications[index]?.id)">
            <p>{{ message }}</p>
          </div>
        </div>
      </div>
      <div class="icon">
        <NuxtLink to="/steps-to-order">
          <img src="@/src/static/images/basket-32.png" alt="سبد خرید">
          <span v-if="user && user.items_cart > 0" class="cart-badge">{{ $toPersian(user.items_cart) }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="menu-icon" @click="toggleSidebar">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style src="~/assets/css/header.css"></style>