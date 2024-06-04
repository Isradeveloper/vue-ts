<template>
  <!-- Example Message -->
  <div v-if="itsMine" class="flex justify-end">
    <div class="bg-green-200 text-black p-2 rounded-lg max-w-xs">{{ message }}</div>
  </div>

  <!-- Example Received Message -->
  <div v-else class="flex">
    <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs" v-if="!loading">
      <span class="capitalize">{{ message }}</span>
      <img v-if="image" :src="image" class="w-52 h-52 object-cover rounded-md pt-1" />
    </div>

    <div v-if="loading" class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
      <FontAwesomeIcon :icon="faEllipsis" :bounce="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Props {
  message: string;
  itsMine: boolean;
  image?: string;
  loading?: boolean;
}

defineProps<Props>();
</script>
