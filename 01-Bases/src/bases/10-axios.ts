import axios from 'axios';
import type { GiphyResponse } from '../interfaces/gif.response';

const apiKey = 'DY9exDPJJl1ijt3KKEgdXOuK33pFRaWc';

export const giphyApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: apiKey,
  }
});

giphyApi.get<GiphyResponse>('/random')
  .then(console.log)
  .catch(console.error)