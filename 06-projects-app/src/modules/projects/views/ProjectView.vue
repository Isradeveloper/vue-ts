<template>
  <div class="w-full" v-if="project">
    <section class="p-4">
      <BreadCrumbs>
        <BreadCrumpItem name="Home" />
        <BreadCrumpItem :name="project?.name ?? 'No name'" />
      </BreadCrumbs>
    </section>
    <section class="mx-5">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th class="text-center">Completada</th>
              <th class="text-center">Tarea</th>
              <th class="text-center">Completada en</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover" v-for="{ id, name, completedAt } in project?.tasks" :key="id">
              <th class="align-middle text-center">
                <input
                  type="checkbox"
                  :checked="!!completedAt"
                  class="checkbox checkbox-primary h-[20px] w-[20px]"
                  @change="projectStore.toggleTask(project?.id, id)"
                />
              </th>
              <td class="align-middle text-center">{{ name }}</td>
              <td class="align-middle text-center">{{ completedAt }}</td>
            </tr>
            <tr class="hover">
              <td colspan="3">
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva Tarea"
                  v-model="newTaskName"
                  @keyup.enter="createNewTask"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import BreadCrumpItem from '@/modules/common/components/BreadCrumpItem.vue';
import { useProjectsStore } from '../store/projects.store';
import type { Project } from '../interfaces/project.interface';

interface Props {
  id: string;
}

const router = useRouter();
const props = defineProps<Props>();
const projectStore = useProjectsStore();
const project = ref<Project | null>();
const newTaskName = ref('');

watch(
  () => props.id,
  (value) => {
    project.value = projectStore.projectList.find((project) => project.id === value);

    if (!project.value) {
      router.replace('/');
    }
  },
  {
    immediate: true,
  },
);

const createNewTask = () => {
  if (project.value) {
    projectStore.addTaskToProject(project.value, newTaskName.value);
    newTaskName.value = '';
  }
};
</script>

<style scoped></style>
