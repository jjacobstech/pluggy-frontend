<template>
      <nav class="border-b border-border/50 backdrop-blur-sm  bg-gradient-primary fixed w-full top-0 z-50">
            <div class="container  px-4 py-4 flex items-center ">
                  <SidebarTrigger class="text-white w-[10%]" />
                  <Link to="/" class="flex items-center justify-center gap-2 w-[90%] ">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center">
                        <LucidePlug class="w-5 h-5 text-white" />
                  </div>
                  <span class="text-2xl font-bold text-white ">
                        Pluggy.io
                  </span>
                  </Link>


            </div>
      </nav>
</template>

<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar';
import { RouterLink as Link } from 'vue-router';
import { LucidePlug } from 'lucide-vue-next';


</script>