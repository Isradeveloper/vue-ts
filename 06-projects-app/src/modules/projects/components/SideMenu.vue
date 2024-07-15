<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <RouterLink to="/" class="text-lg font-bold mx-4">Proyectos</RouterLink>
    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- Menu -->
    <ul v-else class="menu rounded-box">
      <template
        v-for="{ id: projectId, name, tasks } in projectsStore.projectList"
        :key="projectId"
      >
        <MenuItem :value="name" v-if="tasks.length === 0" :url="`/project/${projectId}`" />
        <MenuMultipleItem :value="name" :url="`/project/${projectId}`" v-else>
          <MenuItem
            :value="name"
            v-for="{ id: taskId, name } in tasks"
            :key="taskId"
            :url="`/project/${projectId}`"
          />
        </MenuMultipleItem>
      </template>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import MenuItem from '@/modules/common/components/MenuItem.vue';
import MenuMultipleItem from '@/modules/common/components/MenuMultipleItem.vue';
import { useProjectsStore } from '../store/projects.store';
import { RouterLink } from 'vue-router';

const projectsStore = useProjectsStore();
</script>
