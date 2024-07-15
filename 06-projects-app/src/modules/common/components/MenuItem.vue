<template>
  <li>
    <RouterLink v-if="url" :to="url">{{ value }}</RouterLink>
    <a v-else>{{ value }}</a>
  </li>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';

interface Props {
  value: string;
  url?: string;
}

defineProps<Props>();
</script>
