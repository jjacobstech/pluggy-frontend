  <template>

    <SidebarProvider>

      <AppSidebar />
      <main class=" h-screen w-screen ">
        <Navbar />
        <RouterView />
      </main>
    </SidebarProvider>
  </template>

<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Navbar from '@/components/dashboard/Navbar.vue';
</script>