<template>
      <!-- {/* Features Section */} -->
      <section id="features" class="container mx-auto px-4 py-20">
            <div class="text-center mb-16">
                  <h2 class="text-4xl font-bold mb-4">Everything You Need</h2>
                  <p class="text-xl text-muted-foreground">Powerful features in a simple package</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div v-for="feature in features" :key="feature.title"
                        class="p-8 rounded-2xl card h-bg-red-orange  hover:text-white border border-border group hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                        <div
                              class="w-12 h-12 rounded-xl text-white bg-orange-500 flex items-center group-hover:text-red-400 group-hover:bg-white justify-center mb-4">
                              <component :is="feature.icon" class="w-6 h-6 " />
                        </div>
                        <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
                        <p class="text-muted-foreground">
                              {{ feature.description }}
                        </p>
                  </div>

            </div>
      </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowRight, BarChart3, FileText, Link2, Shield, Zap } from 'lucide-vue-next';
const features = ref([
      {
            title: "Link Shortening",
            description: "Create short, memorable links that are easy to share and track.",
            icon: Link2,
      },
      {
            title: "PDF Viewer",
            description: "View and share PDFs instantly without downloads or installations.",
            icon: FileText,
      },
      {
            title: "Analytics",
            description: "Track clicks and locations with detailed analytics.",
            icon: BarChart3,
      },
      {
            title: "Secure & Private",
            description: "Your data is encrypted and protected with enterprise-grade security.",
            icon: Shield,
      },
      {
            title: "Lightning Fast",
            description: "Optimized infrastructure ensures your links load instantly.",
            icon: Zap,
      },
      {
            title: "Custom Domains",
            description: "Use your own domain for branded short links.",
            icon: ArrowRight,
      },
]);



</script>