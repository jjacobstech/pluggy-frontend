<template>
  <Navbar />

  <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      <Link
        to="/"
        class="inline-flex items-center gap-2 text-sm text-red-500 group hover:text-black my-4"
      >
        <ArrowLeft class="w-4 h-4 group-hover:text-black" />
        <span
          class="bg-red-orange text-transparent bg-clip-text hover:text-black group-hover:text-black"
        >
          Back to home
        </span>
      </Link>

      <div
        className="bg-card rounded-3xl shadow-[var(--shadow-elegant)] p-8 md:p-10 border border-border"
      >
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
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground">Get started with Pluggy.io today</p>
        </div>

        <div className="space-y-5">
          <div class="space-y-2 flex items-center gap-9">
            <label class="bg-red-orange bg-clip-text text-transparent text-nowrap" htmlFor="name"
              >Full Name</label
            >
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              value=""
              @change=""
              required
              class="h-10 placeholder:text-white text-white rounded-lg pl-2 bg-red-orange"
            />
          </div>

          <div class="space-y-2 flex items-center gap-17">
            <label class="bg-red-orange bg-clip-text text-transparent" htmlFor="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              value=""
              @change=""
              required
              class="h-10 placeholder:text-white text-white rounded-lg pl-2 bg-red-orange"
            />
          </div>

          <div class="space-y-2 flex items-center gap-10">
            <label class="bg-red-orange bg-clip-text text-transparent" htmlFor="password"
              >Password</label
            >
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder=".........."
              value=""
              @change=""
              required
              class="h-10 placeholder:text-white text-white rounded-lg pl-2 bg-red-orange"
            />
          </div>
          <div class="space-y-2 flex items-center gap-9">
            <label
              class="bg-red-orange bg-clip-text text-transparent text-wrap"
              htmlFor="confirm_password"
              >Confirm
              <br />
              Password</label
            >
            <input
              id="confirm_password"
              v-model="form.confirm_password"
              type="password"
              placeholder="••••••••"
              value=""
              required
              class="h-10 placeholder:text-white text-white rounded-lg pl-2 bg-red-orange"
            />
          </div>

          <button
            @click="register"
            type="submit"
            class="w-full h-12 flex items-center justify-center gap-2 bg-red-orange text-white focus:outline-2 cursor-pointer rounded-xl hover:opacity-90 text-lg font-medium"
          >
            <span>{{ createAccount }}</span>
            <div v-if="loading" class="flex items-center justify-center space-x-1">
              <div class="h-2 w-2 bg-white rounded-full dot"></div>
              <div class="h-2 w-2 bg-white rounded-full dot [animation-delay:0.2s]"></div>
              <div class="h-2 w-2 bg-white rounded-full dot [animation-delay:0.4s]"></div>
            </div>
          </button>

          <div class="mt-6 text-center bg-red-orange bg-clip-text text-transparent">
            <p class="text-sm text-muted-foreground">
              Already have an account?
              <Link to="/login" class="text-black hover:underline font-medium">
                <span class="bg-red-orange bg-clip-text text-transparent"> Sign in </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <Alert :status="notify.status" :message="notify.message" position="center" />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/home/Navbar.vue';
import { RouterLink as Link } from 'vue-router';
import { ArrowLeft, LucidePlug } from 'lucide-vue-next';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useNotifyStore } from '@/stores/notify';
import Alert from '@/components/alert/Alert.vue';
import { timeout } from '@/stores/timeout';
import z, { flattenError } from 'zod';
import { log } from '@/lib/logger';
import { useAuthenticateStore } from '@/stores/authenticate';
import { BASE_URL } from '@/config';
import axios from 'axios';

const schema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
  });

type RegisterForm = z.infer<typeof schema>;

const form = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  confirm_password: '',
});

const createAccount = ref('Create Account');
const loading = ref(false);
const notify = useNotifyStore();
const router = useRouter();
const auth = useAuthenticateStore();

const register = () => {
  loading.value = true;

  const input = schema.safeParse(form);

  if (!input.success) {
    const inputError = flattenError(input.error);
    const error = inputError.fieldErrors;
    if (error.name) {
      log(error.name, 'warn');
      notify.show('Name cannot be empty');
      notify.timeout(2000);
      return;
    } else if (error.email) {
      log(error.email);
      notify.show(error.email[0] ?? 'Email cannot be empty');
      notify.timeout(2000);

      return;
    } else if (error.password) {
      log(error.password);
      notify.show(error.password[0] ? 'Choose a longer password' : 'Password cannot be empty');
      notify.timeout(2000);

      return;
    } else if (error.confirm_password) {
      log(error.confirm_password);
      notify.show(
        error.confirm_password[0] ? 'Choose a longer password' : 'Confirm password cannot be empty',
      );
      notify.timeout(2000);

      return;
    } else if (inputError) {
      log(`error: ${inputError.formErrors}`);
      notify.show(inputError.formErrors[0] ?? 'Something went wrong');
      notify.timeout(2000);

      return;
    }
  }

  const user: object = {
    name: form.name,
    email: form.email,
    password: form.password,
  };

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJKb3NodWEiLCJpYXQiOjE3MzA2OTE3NzcsImV4cCI6MTczMDcwNTM3N30.c0deEXAMPLEsigNaTure987654321';

  localStorage.setItem('user', JSON.stringify(user));

  const created = true;

  console.log(localStorage.getItem('user'));

  console.log(created);

  if (created) {
    auth.authenticate(user, token);
    notify.show('Account created');
    notify.timeout(2000);
    router.push('/dashboard');
  } else {
    notify.show('Account already exists');
    notify.timeout(2000);
  }
  timeout(loading, false);
  return;
};
</script>
