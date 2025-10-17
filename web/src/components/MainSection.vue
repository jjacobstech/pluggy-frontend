<template>
  <div class="w-full flex justify-center items-center">

    <div
      class="w-1/2 rounded-lg items-center py-20 space-y-5 border border-slate-100  hover:backdrop-blur-md transition-all duration-500">
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-lobster-bold">
          Pluggy.io
        </h1>
        <p class="text-xl mt-2">
          A Link Shortener and PDF Viewer
        </p>
      </div>
      <div class="flex flex-col items-center justify-center">
        <InputSection />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputSection from './InputSection.vue';
</script>
