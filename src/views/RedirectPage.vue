<template>
  <div class="flex items-center justify-center min-h-screen">
    <div v-if="error" class="text-center">
      <h1 class="text-2xl font-bold text-red-600 mb-4">Error</h1>
      <p class="text-gray-700">{{ error }}</p>
      <a href="/" class="text-blue-500 underline mt-4 inline-block">Go to Home</a>
    </div>
    <div v-else class="text-center">
      <h1 class="text-2xl font-bold text-black">Redirecting....</h1>
      <div class="mt-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { get } from '@/lib/request';

interface Response {
  statusCode: number;
  url: string;
}

const route = useRoute();
const error = ref<string | null>(null);

try {
  // Get the slug from the route params
  const slug = route.params.slug as string;

  // Make the API request - send just the slug, not the full path
  const request = await get(`url/${slug}`);
  const response: Response = request.data;

  if (response.url) {
  // Redirect to the URL
    window.location.href = response.url;
  } else {
    error.value = 'Invalid redirect URL';
  }
} catch (err) {
  console.error('Redirect error:', err);
  error.value = 'Failed to fetch redirect URL. The link may be invalid or expired.';
}
</script>