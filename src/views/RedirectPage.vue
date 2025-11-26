<template>
  <h1 class="text-black">Redirecting....</h1>
</template>

<script setup lang="ts">
import { get } from '@/lib/request';

interface response {
  statusCode: number;
  url: string;
}

const path = window.location.pathname;
const request = await get(`url${path}`);

const response: response = request.data

window.location.href = response.url;


</script>