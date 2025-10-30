<template>
  <Alert :status="notify.status" :message="notify.message" position="center" />
  <Sidebar class="w-[15%]">
    <SidebarHeader class="bg-red-orange text-white"> </SidebarHeader>
    <SidebarContent class="px-5">
      <SidebarGroup />
      <SidebarGroupLabel class=""> Dashboard </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in items" :key="item.title">
            <SidebarMenuButton asChild class="h-bg-red-orange hover:text-white">
              <Link v-if="item.function !== 'logout'" :to="item.url">
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </Link>
              <span to="" @click="handleLogout" v-if="item.function === 'logout'">
                <component :is="item.icon" />
                <span>{{ item.title }}</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>

<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, LinkIcon, FolderArchive, Search, Settings, LogOut } from 'lucide-vue-next';
import { RouterLink as Link } from 'vue-router';
import Alert from '@/components/alert/Alert.vue';
import { useNotifyStore } from '@/stores/notify';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Links',
    url: '#',
    icon: LinkIcon,
  },
  {
    title: 'Documents',
    url: '#',
    icon: FolderArchive,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
  {
    title: 'Logout',
    url: '/logout',
    icon: LogOut,
    function: 'logout',
  },
];

const notify = useNotifyStore();

const handleLogout = () => {
  notify.show('Logging out...');
  notify.timeout(2000);

  // toast({
  //       title: "Logged out",
  //       description: "See you soon!",
  // });
  // navigate("/");
};
</script>
