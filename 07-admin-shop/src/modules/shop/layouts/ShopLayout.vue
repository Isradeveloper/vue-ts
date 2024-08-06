<template>
  <!-- Header Navbar -->
  <TopMenu />

  <!-- Router view -->
  <RouterView />

  <!-- Footer -->
  <CustomFooter />
</template>

<script lang="ts" setup>
import { CustomFooter, TopMenu } from '../components';
</script>
