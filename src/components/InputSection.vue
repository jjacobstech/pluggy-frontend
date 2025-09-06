<template>

  <div v-show="alert" class="toast toast-center transition-all duration-450 toast-bottom mb-10">
    <div class="alert alert-success shadow-lg">
      <div class="flex items-center justify-between">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="stroke-current flex-shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-900">
            Link Copied
          </p>

        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col space-y-2 items-center justify-center">
    <p class="text-xl font-lobster-regular">
      Enter a link to shorten
    </p>
    <input type="text" name="input" v-model="input"
      class="w-1/2 font-lobster-regular px-4 py-2 text-xl rounded-lg border-2 border-orange-500 focus:border-orange-500 focus:outline-none focusorangeg50 focus:ring-orange-500" />
    <button @click="shorten"
      class=" hover:animate-pulse  bg-gradient-to-tr  from-orange-500 to-red-500 text-white font-lobster-bold py-2 px-4 rounded-xl">
      Submit
    </button>
    <p class="text-xl transition-all duration-450 font-lobster-regular">
      {{ link }}
    </p>
  </div>

  <button v-show="copyBtn" @click="copy"
    class=" hover:animate-pulse transition-all duration-450   bg-gradient-to-tr  from-orange-500 to-red-500 text-white font-lobster-bold py-2 px-4 rounded-xl">
    Copy
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('');
const link = ref('')
const copyBtn = ref(false)
const alert = ref(false)


const shorten = () => {
  if (input.value.length === 0) {
    link.value = "Please enter a link"
    setTimeout(() => {
      link.value = ""
    }, 2000);

  }
  else {
    console.log(input.value);
    link.value = input.value;
    copyBtn.value = true;
  }
}

const copy = () => {
  console.log(input.value);
  window.navigator.clipboard.writeText(input.value);
  alert.value = true;

  setTimeout(() => {
    alert.value = false;
  }, 2000);
}


</script>
