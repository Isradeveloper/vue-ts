<template>
  <MapView />
  <MyLocationBtn/>
</template>

<script setup lang="ts">
import MyLocationBtn from '@/components/Map/MyLocationBtn.vue';
import MapView from '@/components/mapview/MapView.vue';
import { usePlacesStore } from '@/store/places';
import { onMounted } from 'vue';
const placesStore = usePlacesStore();

onMounted(() => {
  // La primera vez que el usuario ingresa tomamos la geolocalización
  if (!placesStore.isUserLocationReady) {
    placesStore.getInitialLocation();
  }
});
</script>

<style scoped></style>
