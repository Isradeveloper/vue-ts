<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- Menu -->
    <ul class="menu rounded-box">
      <MenuItem value="Item 1" />

      <MenuMultipleItem value="Item 2">
        <MenuItem value="Subitem 1" />

        <MenuMultipleItem value="SubMenu 2">
          <MenuItem value="Subitem 1" />
        </MenuMultipleItem>

        <MenuItem value="Subitem 3" />
      </MenuMultipleItem>

      <MenuItem value="Item 3" />
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import MenuItem from '@/modules/common/components/MenuItem.vue';
import MenuMultipleItem from '@/modules/common/components/MenuMultipleItem.vue';
</script>
