import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/products.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>('/products', {
      params: {
        limit,
        offset: (page - 1) * limit,
      },
    });

    return data.map((product) => ({
      ...product,
      images: product.images
        .filter((image): image is string => typeof image === 'string')
        .map(getProductImageAction),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};