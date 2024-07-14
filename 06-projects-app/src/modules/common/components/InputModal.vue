<template>
  <dialog id="my_modal_1" class="modal" :open="props.open">
    <div class="modal-box w-11/12 max-w-full">
      <h3 class="text-lg font-bold">{{ props.title }}</h3>
      <p class="py-4">{{ props.subtitle }}</p>

      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            type="text"
            placeholder="Nombre del proyecto"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
            ref="inputRef"
          />
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-5">
            <button class="btn mr-4" @click="closeModal">Cerrar</button>
            <button class="btn btn-primary" type="submit">Aceptar</button>
          </div>
        </form>
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
  title: '';
  subtitle?: '';
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
