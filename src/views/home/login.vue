<template>
      <NavBar />

      <div class=" flex items-center justify-center ">
            <div class="w-full max-w-md">
                  <!-- {/* Back to home */} -->
                  <Link to="/"
                        class="inline-flex items-center gap-2  text-sm text-muted-foreground text-red-500 group hover:text-black hover:text-foreground my-4 ">
                  <ArrowLeft class=" w-4 h-4 group-hover:text-black" />
                  <span class=" bg-red-orange text-transparent bg-clip-text hover:text-black group-hover:text-black">
                        Back to home
                  </span>
                  </Link>

                  <!-- {/* Login Card */} -->
                  <div
                        class="bg-card rounded-3xl shadow-[var(--shadow-elegant)] p-8 md:p-10 border  border-gray-300 backdrop-blur-xs b">
                        <!-- {/* Logo */} -->
                        <div class="flex items-center justify-center gap-2 mb-8">
                              <div class="w-10 h-10 rounded-xl bg-red-orange flex items-center justify-center">
                                    <LucidePlug color="white" class="w-6 h-6 text-white" />
                              </div>
                              <span class="text-2xl font-bold bg-red-orange bg-clip-text text-transparent">
                                    Pluggy.io
                              </span>
                        </div>

                        <div class="text-center mb-8 bg-red-orange bg-clip-text text-transparent">
                              <h1 class="text-3xl font-bold mb-2">Welcome back</h1>
                              <p class="text-muted-foreground">Sign in to your account to continue</p>
                        </div>

                        <div class="space-y-5 ">
                              <div class="space-y-2 flex items-center gap-9 ">
                                    <label class="bg-red-orange bg-clip-text text-transparent"
                                          htmlFor="email">Email</label>
                                    <input id="email" v-model="form.email" type="email" placeholder="you@example.com"
                                          value="" @change="" required
                                          class="h-10 placeholder:text-white text-white rounded-lg pl-2 bg-red-orange " />
                              </div>

                              <div class="space-y-2 ">
                                    <div class=" items-center gap-2 flex">
                                          <label class="bg-red-orange bg-clip-text text-transparent"
                                                htmlFor="password">Password</label>

                                          <input id="password" v-model="form.password" type="password"
                                                placeholder="••••••••" value="" required
                                                class="h-10 placeholder:text-white text-white rounded-lg pl-2 bg-red-orange" />
                                    </div>
                                    <div class="w-full flex justify-end">
                                          <a href="#"
                                                class="text-sm text-right mt-2 bg-red-orange bg-clip-text text-transparent  hover:underline">
                                                Forgot password?
                                          </a>
                                    </div>
                              </div>

                              <button @click="login" :disabled="signIn !== 'Sign In'"
                                    class="w-full h-12 flex items-center justify-center gap-2 bg-red-orange text-white focus:outline-2 cursor-pointer rounded-xl hover:opacity-90 text-lg font-medium">
                                    <span>{{ signIn }}</span>
                                    <div v-if="signIn !== 'Sign In'" class="flex items-center justify-center space-x-1">
                                          <div class="h-2 w-2 bg-white rounded-full dot"></div>
                                          <div class="h-2 w-2 bg-white rounded-full dot [animation-delay:0.2s]"></div>
                                          <div class="h-2 w-2 bg-white rounded-full dot [animation-delay:0.4s]"></div>
                                    </div>

                              </button>

                        </div>

                        <div class="mt-6 text-center bg-red-orange bg-clip-text text-transparent">
                              <p class="text-sm text-muted-foreground">
                                    Don't have an account?
                                    <Link to="/register" class="text-black hover:underline font-medium">
                                    <span class="bg-red-orange bg-clip-text text-transparent">
                                          Sign up
                                    </span>
                                    </Link>
                              </p>
                        </div>
                  </div>
            </div>
      </div>

      <Alert :status="notify.status" :message="notify.message" />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { RouterLink as Link } from 'vue-router'
import NavBar from '@/components/home/Navbar.vue';
import { ArrowLeft } from 'lucide-vue-next';
import { LucidePlug } from 'lucide-vue-next';
import { useNotifyStore } from '@/stores/notify';
import { useRouter } from 'vue-router';
import Alert from '@/components/alert/Alert.vue';
import { timeout } from '@/stores/timeout';
import { useAuthenticateStore } from '@/stores/authenticate';
import { BASE_URL } from '@/config';
import axios from 'axios';

const router = useRouter();
const auth = useAuthenticateStore()

const signIn = ref("Sign In")
const form = reactive({
      email: "",
      password: "",
});
const notify = useNotifyStore()

if (auth.loggedOut === true) {
      notify.show("Logged Out");
      notify.timeout(2000);
}



const login = () => {
      signIn.value = "Signing In"
      const getStoredUser = localStorage.getItem("user");
      const user = getStoredUser ? JSON.parse(getStoredUser) : null;
      const storedToken = localStorage.getItem("token");
      const token = storedToken ? JSON.parse(storedToken) : null;

      console.log(user);


      if (user.email === form.email) {
            auth.authenticate(user, token);
            router.push("/dashboard");

      } else {
            notify.show("Sorry these credentials do not exist");
            notify.timeout(2000);
      }

      timeout(signIn, "Sign In");

      return;
}




</script>