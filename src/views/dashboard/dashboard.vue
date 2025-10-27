<template>
      <div class="min-h-screen bg-gradient-hero ">
            <!-- {/* Main Content */} -->
            <div class="container mx-auto px-4 py-8 my-10">

                  <!-- {/* Stats Cards */} -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card class="p-6 border-border bg-card">
                              <div class="flex items-center justify-between">
                                    <div>
                                          <p class="text-sm text-muted-foreground mb-1">Total Links</p>
                                          <p class="text-3xl font-bold text-primary">{{ links.length }}
                                          </p>
                                    </div>
                                    <div
                                          class="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                                          <Link2 class="w-6 h-6 text-white" />
                                    </div>
                              </div>
                        </Card>

                        <Card class="p-6 border-border bg-card">
                              <div class="flex items-center justify-between">
                                    <div>
                                          <p class="text-sm text-muted-foreground mb-1">Total Clicks</p>
                                          <p class="text-3xl font-bold text-primary">
                                                {{links.reduce((sum, link) => sum + link.clicks, 0)}}
                                          </p>
                                    </div>
                                    <div
                                          class="w-12 h-12 rounded-xl bg-gradient-primary  flex items-center justify-center">
                                          <BarChart3 class="w-6 h-6 text-white" />
                                    </div>
                              </div>
                        </Card>

                        <Card class="p-6 border-border bg-card">
                              <div class="flex items-center justify-between">
                                    <div>
                                          <p class="text-sm text-muted-foreground mb-1">PDFs Viewed</p>
                                          <p class="text-3xl font-bold text-primary">0</p>
                                    </div>
                                    <div
                                          class="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                                          <FileText class="w-6 h-6 text-white" />
                                    </div>
                              </div>
                        </Card>
                  </div>

                  <!-- {/* Create New Link */} -->
                  <Card class="p-6 mb-8 border-border bg-card">
                        <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                              <Plus class="w-5 h-5 text-primary" />
                              Create Short Link
                        </h2>
                        <form @submit="handleShortenLink" class="flex rounded-md bg-blue-500">
                              <input v-model="input" placeholder="Enter a link to shorten"
                                    class="flex-1 text-white focus:outline-0 placeholder:text-white bg-red-orange rounded-l-md pl-5 border-0 focus-visible:ring-0 text-lg h-14" />
                              <button @click="handleShortenLink" size="lg"
                                    class="bg-[#FC8C3B] cursor-pointer text-white hover:opacity-90  hover:bg-white border border-l-white  hover:text-[#FC8C3B]  border-[#FC8C3B] h-14 px-8  rounded-r-md flex items-center text-lg transition-all duration-300">
                                    Shorten
                                    <ArrowRight class="ml-2 w-5 h-5" />
                              </button>

                        </form>
                  </Card>

                  <!-- {/* Links List */} -->
                  <div>
                        <h2 class="text-2xl font-bold mb-6">Your Links</h2>
                        <div class="space-y-4">
                              <Card v-if="links.length === 0" class="p-12 text-center border-border bg-card">
                                    <Link2 class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <p class="text-muted-foreground"> No links yet.Create your first short link
                                          above! </p>
                              </Card>

                              <div v-if="links.length > 0" v-for="link in links" class="space-y-4">
                                    <Card key="link.id"
                                          class="p-6 border-border bg-card hover:shadow-[var(--shadow-elegant)] transition-all">
                                          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div class="flex-1 min-w-0">
                                                      <div class="flex items-center gap-2 mb-2">
                                                            <a href="" target="_blank" rel="noopener noreferrer"
                                                                  class="text-lg font-bold text-primary hover:underline flex items-center gap-1">
                                                                  {{ link.short }}

                                                                  <ExternalLink class="w-4 h-4" />
                                                            </a>
                                                      </div>
                                                      <p class="text-sm text-muted-foreground truncate">
                                                            {{ link.original }}
                                                      </p>
                                                      <div
                                                            class="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                                            <span class="flex items-center gap-1">
                                                                  <BarChart3 class="w-4 h-4" />
                                                                  {{ link.clicks }} clicks
                                                            </span>
                                                            <span>Created {{ link.created }}</span>
                                                      </div>
                                                </div>

                                                <div class="flex  items-center gap-5">
                                                      <utton variant="outline" size="md"
                                                            class="cursor-pointer text-nowrap text-black hover:opacity-80  transition-all duration-300"
                                                            @click="">
                                                            <Copy class="w-4 h-4 " />
                                                            <span>Copy</span>
                                                      </utton>
                                                      <Button variant="outline" size="sm"
                                                            class="cursor-pointer text-black hover:opacity-90  **:text-destructive">
                                                            <Trash2 class="w-4 h-4" />
                                                      </Button>
                                                </div>
                                          </div>
                                    </Card>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Copy, Trash2, ArrowRight, BarChart3, Link2, FileText } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useAuthenticateStore } from '@/stores/authenticate';
import { BASE_URL } from '@/config';
import axios from 'axios';

const router = useRouter();
const auth = useAuthenticateStore()


type user = {
      id: string | number,
      name: string,
      email: string,
      password: string,
}
const storedUser = localStorage.getItem("user")
const response: user = storedUser ? JSON.parse(storedUser) : null;


// console.log("user:", response);


// const authenticatedUser = response.email ?? null;


// if (!auth.isAuthenticated) {
//       router.push("/login");
// }
// else if (auth.authenticatedUser.email !== authenticatedUser) {
//       auth.unauthenticate()
//       router.push("/login ");
// }

interface LinkItem {
      id: string;
      original: any;
      short: string;
      clicks: number;
      created: string;
}


const setLinks = (links: LinkItem[]) => {
      links.sort((a, b) => b.clicks - a.clicks);
      links.slice(0, 5);
      return links;
};

const input = ref("");
const newLink = ref("");

const links = ref([
      {
            id: "1",
            original: "https://example.com/very-long-url-that-needs-shortening",
            short: "pluggy.io/abc123",
            clicks: 145,
            created: "2 days ago",
      },
      {
            id: "2",
            original: "https://example.com/another-long-url",
            short: "pluggy.io/xyz789",
            clicks: 89,
            created: "5 days ago",
      },
]);


const handleShortenLink = (e: any) => {
      e.preventDefault();
      if (!newLink) return;

      const newShortLink: LinkItem = {
            id: Date.now().toString(),
            original: newLink,
            short: `pluggy.io/${Math.random().toString(36).substring(7)}`,
            clicks: 0,
            created: "Just now",
      };

      setLinks([newShortLink, ...links.value]);
      newLink.value = "";
      // toast({
      //       title: "Link created!",
      //       description: "Your short link is ready to share",
      // });
};

const handleCopy = (shortUrl: string) => {
      navigator.clipboard.writeText(shortUrl);
      // toast({
      //       title: "Copied!",
      //       description: "Link copied to clipboard",
      // });
};

const handleDelete = (id: string) => {
      setLinks(links.value.filter((link) => link.id !== id));
      // toast({
      //       title: "Deleted",
      //       description: "Link has been removed",
      // });
};
</script>