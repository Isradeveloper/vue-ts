import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const usePlacesStore = defineStore('places', () => {
  const isLoading = ref(true);
  const userLocation = ref<[number, number] | undefined>();

  const isUserLocationReady = computed(() => !!userLocation.value);

  //* ACTIONS
  const getInitialLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log(coords);
        userLocation.value = [coords.longitude, coords.latitude];
      },
      (error) => {
        console.log(error);
        throw new Error('No geolocation found.');
      },
    );
  };

  return { isLoading, userLocation, isUserLocationReady, getInitialLocation };
});
