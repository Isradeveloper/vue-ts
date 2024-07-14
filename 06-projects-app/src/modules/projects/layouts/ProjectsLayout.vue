<template>
  <div class="flex flex-col">
    <!-- Top Menu -->
    <TopMenu />

    <main class="flex flex-row">
      <!-- Side Menu -->
      <SideMenu />
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';
</script>
