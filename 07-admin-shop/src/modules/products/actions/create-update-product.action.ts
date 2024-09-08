import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/products.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const productId = product.id;

  product.images = await uploadImages(product.images ?? []);

  const cleanProduct = cleanProductForCreateUpdate(product);

  if (productId && productId !== '') {
    // Actualizar producto
    return await updateProduct(productId, cleanProduct);
  }

  // Crear producto
  return await createProduct(cleanProduct);
};

const cleanProductForCreateUpdate = (product: Partial<Product>) => {
  const images = (product.images || [])
    .filter((image): image is string => typeof image === 'string')
    .map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? image : '';
      }

      return image;
    });

  const { id, user, ...restProduct } = product;
  return { ...restProduct, images };
};

const updateProduct = async (productId: string, product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.patch<Product>(`/products/${productId}`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.post<Product>(`/products`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating product');
  }
};

const uploadImages = async (images: (string | File)[]) => {
  const filesToUpload = images.filter((image) => image instanceof File) as File[];
  const currentImages = images.filter((image) => typeof image === 'string') as string[];

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await tesloApi.post<{ secureUrl: string }>('/files/product', formData);

      return data.secureUrl;
    } catch (error) {
      console.log(error);

      throw new Error('Ha ocurrido un error al cargar las imágenes');
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return [...currentImages, ...uploadedImages];
};
