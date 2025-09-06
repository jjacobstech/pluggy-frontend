<template>
  <div class="flex flex-col items-center py-20 justify-center">
    <h1 class="text-4xl font-lobster-bold">
      Pluggy
    </h1>
    <p class="text-2xl font-lobster-regular">
      A Link Shortener and PDF Viewer
    </p>
  </div>
  <div class="flex flex-col items-center justify-center">
    <InputSection />
  </div>
</template>
<script lang="ts" setup>
import InputSection from './InputSection.vue';
</script>
