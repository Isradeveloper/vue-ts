<template>
  <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este Pokémon?</h1>
    <h3>{{ randomPokemon }}</h3>

    <!-- Pokemon Picture -->
    <PokemonPicture />

    <!-- Pokemon options -->
    <PokemonOptions />
  </section>

</template>

<script lang="ts" setup>
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';

const { gameStatus, isLoading, randomPokemon } = usePokemonGame();

</script>

<style lang="scss" scoped></style>