<template>
  <section class="mt-5 flex flex-col">
    <button :disabled="props.blockSelection" v-for="{ id, name } in props.options" :key="id" :class="['capitalize disabled:shadow-none disabled:bg-gray-100 disabled:cursor-not-allowed', {
      correct: id === correctAnswer && blockSelection === true,
      incorrect: id !== correctAnswer && blockSelection === true,
    }]" @click="$emit('selectedOption', id)">
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';


interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number
}

const props = withDefaults(defineProps<Props>(), {
  blockSelection: false,
});

defineEmits<{
  selectedOption: [id: number]
}>()

</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
}

.correct {
  @apply bg-blue-500 text-white hover:bg-blue-600
}

.incorrect {
  @apply bg-red-100 opacity-70 hover:bg-red-200
}
</style>