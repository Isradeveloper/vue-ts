import { RouterLink } from 'vue-router';
<template>
  <section class="flex flex-col">
    <h1 class="text-3xl font-bold">
      Pokémon <small class="text-blue-500">#{{ id }}</small>
    </h1>
    <img
      class="w-[200px] h-[200px] mt-5"
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
    />
    <RouterLink
      class="bg-blue-500 text-white p-2 rounded mt-5 text-center"
      :to="{ name: 'pokemon', params: { id: id + 1 } }"
      >Siguiente pokémon</RouterLink
    >
  </section>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';

interface Props {
  id: number;
}

const props = defineProps<Props>();

console.log({ id: props.id });
</script>
