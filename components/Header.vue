<template>
  <component :is="headerComponent" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import HomeHeader from "~/components/HomeHeader.vue";
import BasketHeader from "~/components/BasketHeader.vue";
import OrdersHeader from "~/components/OrdersHeader.vue";
import OrderDetailsHeader from "~/components/OrderDetailsHeader.vue";
import ProductDetailsHeader from "~/components/ProductDetailsHeader.vue";
import LoginHeader from "~/components/LoginHeader.vue";
import RegisterHeader from "~/components/RegisterHeader.vue";
import ScoresHeader from "~/components/ScoresHeader.vue";
import CouponsHeader from "~/components/CouponsHeader.vue";
import WalletHeader from "~/components/WalletHeader.vue";
import TransactionHeader from "~/components/transactionHeader.vue";
const route = useRoute();
const headerComponentsMap = {
  '/steps-to-order': BasketHeader,
  '/my-orders': OrdersHeader,
  '/my-scores': ScoresHeader,
  '/my-coupons': CouponsHeader,
  '/my-wallet': WalletHeader,
  '/your-transaction-receive': TransactionHeader,
  '/login': LoginHeader,
  '/register': RegisterHeader,
  '/': HomeHeader
};

const dynamicRoutesMap = [
  { path: '/product/', component: ProductDetailsHeader },
  { path: '/order/', component: OrderDetailsHeader }
];

const headerComponent = computed(() => {
  for (const dynamicRoute of dynamicRoutesMap) {
    if (route.path.startsWith(dynamicRoute.path)) {
      return dynamicRoute.component;
    }
  }
  return headerComponentsMap[route.path] || HomeHeader;
});
</script>
