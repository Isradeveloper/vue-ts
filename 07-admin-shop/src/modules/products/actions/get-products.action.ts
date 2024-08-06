import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/products.interface';

export const getProducts = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>('/products', {
      params: {
        limit,
        offset: page * limit,
      },
    });

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};