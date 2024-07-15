<template>
  <li>
    <details open>
      <summary v-if="url">
        <RouterLink :to="url">{{ value }}</RouterLink>
      </summary>
      <summary v-else>{{ value }}</summary>
      <ul>
        <slot />
      </ul>
    </details>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  value: string;
  url?: string;
}

defineProps<Props>();
</script>
