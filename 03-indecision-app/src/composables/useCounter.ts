import { ref, computed } from 'vue';

export const useCounter = (initialValue:number = 0) => {
  const counter = ref(initialValue);

  const squareCounter = computed(() => {
    return counter.value ** 2;
  });

  return {
    counter,
    squareCounter
  }
};
