<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { RouterView, useRouter, useRoute } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (mutation, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
      return;
    }

    console.log(route);

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
