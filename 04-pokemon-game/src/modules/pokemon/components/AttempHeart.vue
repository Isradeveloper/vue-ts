<template>
  <img :src="(props.alive) ? heartImg : BlackheartImg" :class="['h-[40px]', { 'animate-bounce': props.alive }]">
</template>

<script setup lang="ts">
import heartImg from '/heart.png'
import BlackheartImg from '/heart_black.png'

interface Props {
  alive: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alive: true
})

</script>

<style scoped></style>