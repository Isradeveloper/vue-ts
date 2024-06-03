import type { GiphyResponse } from '../interfaces/gif.response';
const apiKey = 'DY9exDPJJl1ijt3KKEgdXOuK33pFRaWc';

fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`)
  .then(resp => {
    return resp.json()
  })
  .then((body: GiphyResponse) => {
    console.log(body.data.images.downsized_medium.url )
  })
  .catch(console.log)