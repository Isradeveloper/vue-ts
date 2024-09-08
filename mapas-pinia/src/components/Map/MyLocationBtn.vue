<template>
  <div class="fixed w-11/12 sm:w-[300px] flex justify-center lg:justify-end">
    <div
      class="bg-white py-5 px-4 rounded-xl shadow-md flex flex-col justify-center items-center gap-4 w-full"
    >
      <div class="flex gap-2 items-center">
        <div class="bg-violet-300 p-1.5 rounded-full text-center align-middle">
          <LatIcon :size="20" />
        </div>
        <span class="text-violet-900 font-semibold">LAT: {{ mapStore.position.lat }}</span>
      </div>
      <div class="flex gap-2 items-center">
        <div class="bg-violet-300 p-1.5 rounded-full text-center align-middle">
          <LngIcon :size="20" />
        </div>
        <span class="text-violet-900 font-semibold">LNG: {{ mapStore.position.lng }}</span>
      </div>
      <div class="flex gap-2 items-center">
        <div class="bg-violet-300 p-1.5 rounded-full text-center align-middle">
          <ZoomIcon :size="20" />
        </div>
        <span class="text-violet-900 font-semibold">ZOOM: {{ mapStore.position.zoom }}</span>
      </div>
      <button
        class="bg-indigo-700 py-1 px-16 rounded-full text-white font-semibold hover:bg-indigo-800 transition-all"
        @click="onMyLocationClicked()"
      >
        Ir a mi ubicación
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMapStore } from '@/store/map';
import { usePlacesStore } from '../../store/places';
import LatIcon from '@/components/common/components/LatIcon.vue';
import LngIcon from '../common/components/LngIcon.vue';
import ZoomIcon from '../common/components/ZoomIcon.vue';

const mapStore = useMapStore();
const placeStore = usePlacesStore();

const onMyLocationClicked = () => {
  if (!placeStore.isUserLocationReady || !placeStore.userLocation) return;

  mapStore.changeLocation(placeStore.userLocation);
};
</script>

<style scoped>
.fixed {
  position: fixed;
}

/* Styles for viewports smaller than 640px */
@media (width <= 640px) {
  .fixed {
    top: 10px;
    right: 0;
    left: 0;
    margin: auto;
  }
}

/* Styles for viewports between 640px and 1024px */
@media (width > 640px) and (width < 1024px) {
  .fixed {
    top: 20px;
    right: 0;
    left: 0;
    margin: auto;
  }
}

/* Styles for viewports 1024px and larger */
@media (width >= 1024px) {
  .fixed {
    top: 30px;
    right: 30px;
  }
}
</style>
