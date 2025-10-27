<template>
      <!-- {/* Navigation */} -->
      <nav
            class="border-b border-border/50 backdrop-blur-sm  bg-gradient-to-tr  from-orange-500 to-red-500 bg-background/80 sticky top-0 z-50">
            <div class="container mx-auto px-4 py-4 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-lg  flex items-center justify-center">
                              <LucidePlug class="w-5 h-5 text-white" color="white" />
                        </div>
                        <span class="text-2xl font-bold bg-clip-text text-white logo">
                              Pluggy.io
                        </span>
                  </div>

                  <div class="hidden text-white md:flex items-center gap-6">
                        <a href="#features"
                              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                              Features
                        </a>
                        <a href="#how-it-works"
                              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                              How it Works
                        </a>
                  </div>

                  <div class="flex text-white items-center gap-3">
                        <Link to="/login">
                        <button class="cursor-pointer" variant="ghost" size="sm">
                              Login
                        </button>
                        </Link>
                        <Link to="/register">
                        <button size="sm" class="cursor-pointer hover:opacity-90">
                              Get Started
                        </button>
                        </Link>
                  </div>
            </div>
      </nav>
</template>

<script setup lang="ts">
import { RouterLink as Link } from 'vue-router'
import { Link2, LucidePlug } from 'lucide-vue-next';
</script>