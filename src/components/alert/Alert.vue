<template>
      <div v-show="status"
            :class="`toast toast-${horizontalPosition} transition-all duration-450 toast-${verticalPosition} mt-20 bg-red-orange text-white rounded-2xl shadow-lg`">
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
                              <p class="text-sm font-medium text-white">
                                    {{ message }}
                              </p>

                        </div>
                  </div>
            </div>
      </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs, ref } from "vue"

const props = defineProps({
      status: {
            type: Boolean,
            default: false,
      },
      message: {
            type: String,
            default: '',
      },
      position: {
            type: String as () => 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center',
            default: 'top-left',
      },
});



const { status, message, position } = toRefs(props);
const horizontalPosition = ref('');
const verticalPosition = ref('');

switch (position.value) {
      case 'top-left':
            verticalPosition.value = 'top';
            horizontalPosition.value = 'left';
            break;
      case 'top-right':
            verticalPosition.value = 'top';
            horizontalPosition.value = 'right';
            break;
      case 'bottom-left':
            verticalPosition.value = 'bottom';
            horizontalPosition.value = 'left';
            break;
      case 'bottom-right':
            verticalPosition.value = 'bottom';
            horizontalPosition.value = 'right';
            break;
      case 'center':
            verticalPosition.value = 'center';
            horizontalPosition.value = 'top';
            break;
      default:
            break;
}


</script>