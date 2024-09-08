import { usePlacesStore } from '@/store/places';
import { storeToRefs } from 'pinia';
import { defineComponent, ref, watch } from 'vue';
import BlockShuffle from '../common/components/BlockShuffle.vue';
import Mapboxgl, { Map } from 'mapbox-gl';
import { useMapStore } from '@/store/map';

export default defineComponent({
  name: 'MapView',
  components: {
    BlockShuffle,
  },
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const placesStore = usePlacesStore();
    const mapStore = useMapStore();

    const { isLoading, userLocation, isUserLocationReady } = storeToRefs(placesStore);
    const { initialZoom, isMapReady } = storeToRefs(mapStore);

    const initMap = async () => {
      if (!mapElement.value) throw new Error('mapElement Not found');
      if (!userLocation.value) throw new Error('userLocation Not found');

      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: initialZoom.value, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup().setLngLat(userLocation.value).setHTML(`
        <h4 class="text-xl text-indigo-600">Aquí estoy</h4>
        <p class="text-md text-indigo-800 font-bold">Actualmente en Soledad</p>
      `);

      const myLocationMarker = new Mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      mapStore.setMap(map);
    };

    watch(isUserLocationReady, async (value) => {
      if (value) {
        await initMap();
      }
    });

    return {
      isLoading,
      userLocation,
      isUserLocationReady,
      mapElement,
      isMapReady,
    };
  },
});
