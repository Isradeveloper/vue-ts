<template>
  <li>
    <details open>
      <summary>{{ value }}</summary>
      <ul>
        <slot />
      </ul>
    </details>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  value: string;
}

defineProps<Props>();
</script>
