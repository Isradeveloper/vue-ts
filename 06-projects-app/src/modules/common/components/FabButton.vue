<template>
  <button :class="['btn btn-circle btn-secondary p-1 fixed', position]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
});

defineEmits(['click']);
</script>

<style scoped>
.top-left {
  @apply top-10 left-10;
}
.top-right {
  @apply top-10 right-10;
}
.bottom-left {
  @apply bottom-10 left-10;
}
.bottom-right {
  @apply bottom-10 right-10;
}
</style>
