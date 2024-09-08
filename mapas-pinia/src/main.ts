import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import App from './App.vue';
import router from './router';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

if (!navigator.geolocation) {
  alert('Geolocation is necessary');
  throw new Error('Geolocation is necessary');
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
