import { defineComponent, watchEffect, watch, ref } from 'vue';
import { createUpdateProductAction, getProductById } from '@/modules/products/actions';
import type { Product } from '@/modules/products/interfaces/products.interface';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useFieldArray, useForm } from 'vee-validate';
import * as yup from 'yup';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { useToast } from 'vue-toastification';

const validationSchema = yup.object({
  title: yup.string().required('Este campo es super importante').min(2),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().min(1).required(),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  components: { CustomInput, CustomTextArea },

  props: {
    productId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const toast = useToast();

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm<Product>({
      validationSchema,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');
    const { fields: images } = useFieldArray<string>('images');
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

    const imageFiles = ref<File[]>([]);

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'admin-products' });
        return;
      }
    });

    watch(
      product,
      () => {
        if (product) {
          resetForm({
            values: product.value,
          });
        }
      },
      {
        deep: true,
        immediate: true,
      },
    );

    const onSubmit = handleSubmit(async (values) => {

      const formValues = {
        ...values,
        images: [...values.images, ...imageFiles.value]
      }

      mutate(formValues);
    });

    const toogleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const hasSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      return currentSizes.includes(size);
    };

    const onFileChanged = (event: Event) => {

      const fileInput = event.target as HTMLInputElement;
      const fileList = fileInput.files;
      
      if (!fileList || fileList.length === 0) return;

      for ( const file of fileList ) {
        imageFiles.value.push(file)
      }

    };

    watch(isUpdateSuccess, (value) => {
      if (!value) return;

      toast.success('Producto actualizado correctamente');

      router.replace({ name: 'admin-product', params: { productId: updatedProduct.value?.id } });

      resetForm({
        values: updatedProduct.value,
      });

      imageFiles.value = [];

    });

    watch(
      () => props.productId,
      () => {
        refetch();
      },
    );

    return {
      //Properties
      values,
      errors,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      images,
      sizes,

      meta,

      isPending,
      imageFiles,

      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //Actions
      onSubmit,
      toogleSize,
      hasSize,
      onFileChanged,
      temporalImageUrl: (imageFile: File) => {
        return URL.createObjectURL(imageFile);
      }
    };
  },
});
