
##Header
<script setup lang="ts">
import {useNuxtApp} from '#app';
import {useHeader} from "~/composables/header";
import {useSidebarState} from "~/composables/useSidebarState";
const {$toPersian}=useNuxtApp();
const {toggleSidebar}=useSidebarState();
const {user,messages,toggleMessages,isMessagesOpen}=useHeader();
</script>
<template>
  <div class="ribbon">
    <h3>کیف پول</h3>
    <NuxtLink to="/">
      <img class="home-page-btn" src="@/src/static/images/house-32.png" alt="صفحه اصلی">
    </NuxtLink>
    <div class="menu-icon" @click="toggleSidebar">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

</template>

<style src="~/assets/css/header.css"></style>