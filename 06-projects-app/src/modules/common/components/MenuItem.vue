<template>
  <li>
    <a>{{ value }}</a>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  value: string;
}

defineProps<Props>();
</script>
