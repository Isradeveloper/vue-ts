<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button
      class="btn-pagination"
      :disabled="isFirstPage"
      @click="$router.push({ query: { page: page - 1 } })"
    >
      <ArrowLeftIcon />
      <span>Anteriores</span>
    </button>

    <button
      class="btn-pagination"
      @click="$router.push({ query: { page: page + 1 } })"
      :disabled="hasMoreData"
    >
      <span>Siguientes</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from '@/icons';

interface Props {
  page: number;
  isFirstPage: boolean;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>

<style scoped>
.btn-pagination {
  @apply flex items-center space-x-1.5 bg-blue-500 rounded-xl py-1.5 px-4 text-white font-semibold disabled:bg-gray-500 disabled:text-gray-200 hover:bg-blue-600 transition-all;
}
</style>
