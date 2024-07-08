<template>
  <section v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">

    <div class="capitalize font-semibold my-5">
      <h1>ronda {{ attemps.actual }} de {{ attemps.total }}</h1>
    </div>

    <h1 class="m-5">¿Quién es este Pokémon?</h1>

    <div class="flex gap-3">
      <AttempHeart :alive="live <= attemps.lives" v-for="live in attemps.limit" :key="live" />
    </div>

    <div class="h-20">
      <button v-if="gameStatus !== GameStatus.Playing"
        class="bg-blue-500 p-3 my-5 px-6 rounded-full text-white hover:bg-blue-700 transition-all font-semibold"
        @click="getNextRound(4)">
        {{ (attemps.lives === 0 || attemps.actual > attemps.total) ? "Jugar de nuevo" : "Siguiente ronda" }}
      </button>
    </div>

    <!-- Pokemon Picture -->
    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />

    <!-- Pokemon options -->
    <PokemonOptions :options="options" @selected-option="onSelectedOption"
      :block-selection="gameStatus !== GameStatus.Playing" :correct-answer="randomPokemon.id" />
  </section>
</template>

<script lang="ts" setup>
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import AttempHeart from '@/modules/pokemon/components/AttempHeart.vue';
import { GameStatus } from '../interfaces';

const {
  gameStatus,
  isLoading,
  randomPokemon,
  pokemonsOptions: options,
  attemps,
  checkAnswer,
  getNextRound,
} = usePokemonGame();

const onSelectedOption = (value: number) => {
  checkAnswer(value);
};
</script>

<style lang="scss" scoped></style>
