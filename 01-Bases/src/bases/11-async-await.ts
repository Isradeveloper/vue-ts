import type { GiphyResponse } from "../interfaces/gif.response"
import { giphyApi } from "./10-axios"

export const getImage = async () => {
  try {

    const resp = await giphyApi.get<GiphyResponse>('/random');
    return resp.data.data.images.downsized_large.url;
  
  } catch (error) {
    throw new Error('Url no encontrada')
  }
}

getImage()
  .then(url => console.log({url}))
  .catch(error => console.log(error));