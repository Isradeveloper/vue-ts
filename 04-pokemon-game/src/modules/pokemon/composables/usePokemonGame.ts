import { computed, onMounted, ref } from "vue"
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import pokemonApi from "../api/pokemonApi";

export const usePokemonGame = () => {

  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);
  const pokemonsOptions = ref<Pokemon[]>([]);
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length)
    return pokemonsOptions.value[randomIndex];
  });

  const getPokemons = async () => {

    const response = await pokemonApi.get<PokemonListResponse>('', {
      params: {
        limit: 151
      }
    });

    const pokemonsArray: Pokemon[] = response.data.results.map((pokemon) => {

      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? '0';

      return {
        name: pokemon.name,
        id: +id,
      }
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);

  }

  const getNextOptions = (howMany: number = 4) => {

    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);

  }

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextOptions();
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,

    //Methods
    getNextOptions
  }

}