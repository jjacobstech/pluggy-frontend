<template>
  <!-- Alert -->
  <div v-show="alert" class="toast toast-center transition-all duration-450 toast-bottom mb-10">
    <div class="alert alert-success shadow-lg">
      <div class="flex items-center justify-between">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-900">Link Copied</p>
        </div>
      </div>
    </div>
  </div>
  <!-- {/* Hero Section */} -->
  <section class="container mx-auto px-4 py-20 md:py-32">
    <div class="max-w-4xl mx-auto text-center animate-slide-up">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-red-orange bg-clip-text text-sm font-medium mb-6"
      >
        <ZapSvg class="w-7 h-7" />
        <span>Fast, Secure, and Simple</span>
      </div>

      <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-red-orange bg-clip-text text-transparent">
        Shorten Links.<br />View PDFs.<br />All in One.
      </h1>

      <p class="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
        Pluggy.io is your all-in-one solution for managing links and viewing PDFs. Simple, fast, and
        beautifully designed.
      </p>

      <!-- {/* Quick Shortener */} -->
      <div class="max-w-2xl mx-auto mb-12">
        <div
          class="flex text- flex-col sm:flex-row p-2 bg-card rounded-2xl shadow-[var(--shadow-elegant)]"
        >
          <input
            v-model="input"
            placeholder="Enter a link to shorten"
            class="flex-1 text-white focus:outline-0 placeholder:text-white bg-red-orange rounded-l-md pl-5 border-0 focus-visible:ring-0 text-lg h-14"
          />
          <button
            v-if="!copyBtn"
            @click="shorten"
            size="lg"
            class="bg-[#FC8C3B] cursor-pointer text-white hover:opacity-90 hover:bg-white border border-l-white hover:text-[#FC8C3B] border-[#FC8C3B] h-14 px-8 rounded-r-md flex items-center text-lg transition-all duration-300"
          >
            Shorten
            <ArrowRight class="ml-2 w-5 h-5" />
          </button>

          <!-- Copy  -->

          <button
            v-if="copyBtn"
            @click="copy"
            size="lg"
            class="bg-[#FC8C3B] cursor-pointer text-white hover:opacity-90 hover:bg-white border border-l-white hover:text-[#FC8C3B] border-[#FC8C3B] h-14 px-8 rounded-r-md flex items-center text-lg transition-all duration-300"
          >
            Copy
            <Copy class="ml-2 w-5 h-5" />
          </button>
        </div>
        <p
          class="text-xl py-5 bg-red-orange bg-clip-text text-transparent transition-all duration-450"
        >
          {{ link }}
        </p>
        <p class="text-sm text-muted-foreground mt-3">
          No signup required for basic features.
          <Link to="/register" class="text-primary hover:underline">Create an account </Link> for
          advanced features.
        </p>
      </div>

      <!-- {/* Stats */} -->
      <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-1">10M+</div>
          <div class="text-sm text-muted-foreground">Links Shortened</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-1">99.9%</div>
          <div class="text-sm text-muted-foreground">Uptime</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-1">50K+</div>
          <div class="text-sm text-muted-foreground">Active Users</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink as Link } from 'vue-router';
import { ArrowRight, Copy } from 'lucide-vue-next';
import ZapSvg from '../icons/zap.svg.vue';
import { ref } from 'vue';
import { post } from '@/lib/request';
import { URL } from '@/config';

const input = ref('');
const link = ref('');
const copyBtn = ref(false);
const alert = ref(false);

const shorten = async () => {
  if (input.value.length === 0) {
    link.value = 'Please enter a link';
    setTimeout(() => (link.value = ''), 2000);
    return;
  }

  const urlStart = input.value.startsWith('https://');
  const urlEnd = input.value.endsWith('.com');
  const urlEnds = input.value.endsWith('/');
  console.log(input.value);

  if (!urlStart && !urlEnd && !urlEnds) {
    link.value = 'Please enter a valid url';
    setTimeout(() => (link.value = ''), 2000);
    return;
  }

  const response = await post('/url/shorten', {
    url: input.value,
  })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // console.log(error.response.data);
      return error.response.data;
    });
  // console.log(response);
  link.value = response.message ?? `${URL}${response.shortUrl}`;
  copyBtn.value = true;


  setTimeout(() => {
    link.value = '';
    copyBtn.value = false;
  }, 10000);
  return;
};

const copy = () => {
  window.navigator.clipboard.writeText(link.value);
  alert.value = true;

  setTimeout(() => {
    alert.value = false;
  }, 2000);
};
</script>
