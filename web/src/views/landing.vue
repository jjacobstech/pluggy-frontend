<template>


      <video src="/background.mp4" class=" fixed top-0 left-0 object-cover w-full h-full" autoplay muted loop></video>

      <div className="min-h-screen relative bg-gradient-hero z-50">
            <LandingNavbar />
            <HeroSection />
            <FeatureSection />
            <CTASection />
            <Footer />
      </div>
</template>

<script setup lang="ts">
import LandingNavbar from '../components/landing/Navbar.vue';
import HeroSection from '../components/landing/HeroSection.vue';
import FeatureSection from '../components/landing/FeatureSection.vue';
import CTASection from '../components/landing/CTA.vue';
import Footer from '../components/landing/Footer.vue';
</script>