<template>
  <RouterView />
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>
