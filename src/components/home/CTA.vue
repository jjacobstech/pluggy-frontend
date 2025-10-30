<template>
  <!-- {/* CTA Section */} -->
  <section class="container mx-auto px-4 py-20 text-black">
    <div class="max-w-4xl mx-auto text-center p-12 rounded-3xl grid justify-center border">
      <h2 class="text-4xl font-bold mb-4 justify-center">Ready to get started?</h2>
      <p class="text-xl opacity-90 mb-8">
        Join thousands of users who trust Pluggy.io for their link management needs.
      </p>
      <Link class="mx-auto cursor-pointer" to="/register">
        <button
          size="lg"
          class="h-14 px-8 text-lg flex cursor-pointer hover:border-0 justify-center text-black hover:text-white border border-black hover:bg-white h-bg-red-orange rounded-md items-center"
        >
          Create Free Account
          <ArrowRight class="ml-2 w-5 h-5" />
        </button>
      </Link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink as Link } from 'vue-router';
import { ArrowRight } from 'lucide-vue-next';
</script>
