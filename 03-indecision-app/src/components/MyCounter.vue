<template>
  <section>
    <h3>Counter: {{ counter }}</h3>
    <h3>Square {{ squareCounter }}</h3>
  </section>

  <div class="flex p-1">
    <button class="btn" @click="counter++">+1</button>
    <button class="btn" @click="counter--">-1</button>
  </div>
</template>

<script lang="ts" setup>
import { useCounter } from '@/composables/useCounter';

interface Props {
  value?: number;
}

const props = defineProps<Props>();

const { counter, squareCounter } = useCounter(props.value);
</script>

<style scoped>
.btn {
  @apply p-5 bg-green-600 rounded-lg mr-2 hover:bg-green-700 h-[20px] flex justify-center items-center;
}
</style>
