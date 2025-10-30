<template>
  <div className="min-h-screen relative bg-gradient-hero z-50">
    <LandingNavbar />
    <HeroSection />
    <FeatureSection />
    <CTASection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import LandingNavbar from '@/components/home/Navbar.vue';
import HeroSection from '@/components/home/HeroSection.vue';
import FeatureSection from '@/components/home/FeatureSection.vue';
import CTASection from '@/components/home/CTA.vue';
import Footer from '@/components/home/Footer.vue';
</script>
