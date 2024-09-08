import { computed, reactive, ref, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import type { LngLatLike, Map, Marker } from 'mapbox-gl';

export const useMapStore = defineStore('map', () => {
  const map = ref<Map>();
  const markers = ref<Marker[]>();
  const distance = ref<number | undefined>(undefined);
  const duration = ref<number | undefined>(undefined);
  const initialZoom = ref(15);
  const position = reactive({ lng: 0, lat: 0, zoom: 0 });

  const updatePosition = () => {
    if (map.value) {
      const { lat, lng } = map.value.getCenter();
      const zoom = map.value.getZoom();
      position.lat = lat;
      position.lng = lng;
      position.zoom = zoom;
    }
  };

  const setMap = (mapParam: Map) => {
    map.value = mapParam;

    updatePosition();

    map.value.on('move', () => {
      updatePosition();
    });
  };

  const changeLocation = (coords: LngLatLike, zoom: number = initialZoom.value) => {
    if (!map.value) throw new Error('Map not found');

    map.value.flyTo({ center: coords, zoom });
  };

  const isMapReady = computed(() => !!map.value);
  const getMap = computed(() => map.value);

  watchEffect(() => {
    console.log(map.value?.getZoom());
  });

  return {
    //*props
    markers,
    distance,
    duration,
    initialZoom,
    position,

    //*getters
    isMapReady,
    getMap,

    //*actions
    setMap,
    changeLocation,
  };
});
