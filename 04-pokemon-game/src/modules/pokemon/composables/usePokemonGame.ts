import { computed, onMounted, ref } from "vue"
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import pokemonApi from "../api/pokemonApi";
import confetti from 'canvas-confetti';

export const usePokemonGame = (lives = 3) => {

  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);
  const pokemonsOptions = ref<Pokemon[]>([]);
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length)
    return pokemonsOptions.value[randomIndex];
  });
  const count = ref(0)

  const attemps = computed(() => ({
    actual: 0,
    total: 0,
    limit: lives,
    lives: lives
  }))

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

    count.value = pokemonsArray.length

    return pokemonsArray.sort(() => Math.random() - 0.5);

  }

  const restartGame = async (howMany: number = 4) => {
    attemps.value.actual = 0;
    attemps.value.lives = lives;
    pokemons.value = await getPokemons();

    if (pokemons.value.length === count.value) {
      attemps.value.total = Math.floor(count.value / howMany);
    }

  }

  const getNextRound = (howMany: number = 4) => {

    if (attemps.value.lives == 0 || attemps.value.actual > attemps.value.total) {
      restartGame(howMany);
    }

    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);

    attemps.value.actual += 1

  }

  const checkAnswer = (id: number) => {

    const hasWon = randomPokemon.value.id == id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 }
      })
      return;
    }

    gameStatus.value = GameStatus.Lost;
    attemps.value.lives -= 1
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
      colors: ['#c30010']
    })

  }

  onMounted(async () => {
    await restartGame(4)
    getNextRound();
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    attemps,

    //Methods
    getNextRound,
    checkAnswer
  }

}