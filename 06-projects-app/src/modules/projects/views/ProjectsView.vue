<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover">
          <th>1</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
      </tbody>
    </table>

    <InputModal
      :open="modalOpen"
      @close="modalOpen = false"
      @value="onNewValue"
      title="Crear nuevo proyecto"
      subtitle="Dale un nombre único a tu proyecto"
    />

    <CustomModal :open="customModalOpen" @close="customModalOpen = false">
      <template #header>
        <h1 class="text-3xl">Titulo del modal</h1>
      </template>
      <template #body>
        Est labore ullamco commodo exercitation qui voluptate officia et laborum culpa. Nostrud
        magna ut non aute aliquip dolor cupidatat Lorem nostrud minim esse consequat do ut. Aliqua
        deserunt cupidatat aliqua laborum labore fugiat in mollit. Et anim aute id laborum anim
        Lorem excepteur mollit esse sit pariatur. Dolore reprehenderit incididunt dolor minim
        incididunt proident fugiat consequat in excepteur irure duis.
      </template>

      <template #footer>
        <div class="flex justify-end gap-4">
          <button class="btn min-h-[10px]" @click="customModalOpen = false">Cancelar</button>
          <button class="btn btn-secondary min-h-[10px]" @click="customModalOpen = false">
            Guardar
          </button>
        </div>
      </template>
    </CustomModal>

    <FabButton position="bottom-right" @click="modalOpen = true">
      <AddCircle />
    </FabButton>

    <FabButton position="bottom-left" @click="customModalOpen = true">
      <AddCircle />
    </FabButton>
  </div>
</template>

<script lang="ts" setup>
import AddCircle from '@/modules/common/components/AddCircle.vue';
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import { ref } from 'vue';

const modalOpen = ref(false);
const customModalOpen = ref(false);

const onNewValue = (projectName: string) => {
  console.log({ projectName });
};
</script>
