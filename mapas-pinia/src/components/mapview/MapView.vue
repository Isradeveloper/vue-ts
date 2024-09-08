<script lang="ts" src="./MapView.ts" />

<template>
  <div class="loading-map w-screen h-screen" v-if="!isUserLocationReady || !isMapReady">
    <div class="flex flex-col justify-center items-center h-full w-full">
      <BlockShuffle />
      <span class="mt-5 text-purple-950 font-semibold">Por favor, espera un momento.</span>
    </div>
  </div>

  <div class="map-container w-screen h-screen" ref="mapElement"></div>
</template>

<style scoped></style>
