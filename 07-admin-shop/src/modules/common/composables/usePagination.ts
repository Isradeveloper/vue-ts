import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const usePagination = (scrollQuerySelector?: string) => {
  const route = useRoute();
  const page = ref(Number(route.query.page || 1));

  watch(
    () => route.query.page,
    (newPage) => {
      console.log(newPage);

      page.value = Number(newPage || 1);

      scrollQuerySelector
        ? document.querySelector(scrollQuerySelector)?.scrollTo({ top: 0, behavior: 'smooth' })
        : window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  );

  return { page };
};
