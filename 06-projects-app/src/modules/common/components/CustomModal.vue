<template>
  <dialog id="my_modal_1" class="modal" :open="props.open">
    <div class="modal-box">
      <div class="border-b border-blue-500">
        <!-- HEADER -->
        <slot name="header" />
      </div>

      <div class="my-5">
        <slot name="body" />
      </div>

      <div class="border-t border-blue-500 pt-2">
        <slot name="footer" />
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-30 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  open: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
});

const emits = defineEmits<{
  close: [void];
  open: [void];
  value: [text: string];
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus();
    return;
  }

  emits('value', inputValue.value.trim());
  emits('close');
  inputValue.value = '';
};

const closeModal = () => {
  inputValue.value = '';
  emits('close');
};
</script>

<style lang="scss" scoped></style>
