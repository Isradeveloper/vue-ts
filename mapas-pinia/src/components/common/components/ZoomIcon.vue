<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
        stroke="#3c0085"
        stroke-width="1.6799999999999997"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M20.9992 21L14.9492 14.95"
        stroke="#3c0085"
        stroke-width="1.6799999999999997"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
  </svg>
</template>

<script lang="ts" setup>
interface Props {
  size: number;
}

defineProps<Props>();
</script>
