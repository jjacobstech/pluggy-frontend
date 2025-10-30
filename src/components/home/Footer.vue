<template>
  <!-- {/* Footer */} -->
  <footer class="border-t border-border bg-card/50 backdrop-blur-sm">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg flex items-center justify-center">
            <LucidePlug class="w-5 h-5 text-white" color="black" />
          </div>
          <span class="font-bold text-lg font-lobster-bold">Pluggy.io</span>
        </div>
        <p class="text-sm text-muted-foreground">© 2025 Pluggy.io. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { LucidePlug } from 'lucide-vue-next';
</script>
