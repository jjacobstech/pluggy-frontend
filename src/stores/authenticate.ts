import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthenticateStore = defineStore("authenticate", () => {
  const isAuthenticated = ref(false);
  const authenticatedUser = ref();
  const authenticatedToken = ref();
  const loggedOut = ref(false);

  const authenticate = (user: object, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    authenticatedUser.value = user;
    authenticatedToken.value = token;
    isAuthenticated.value = true;

    return true;
  };

  const unauthenticate = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    authenticatedUser.value = null;
    authenticatedToken.value = null;
    isAuthenticated.value = false;
    loggedOut.value = true;
    return true;
  };

  return {
    authenticate,
    unauthenticate,
    isAuthenticated,
    authenticatedUser,
    loggedOut,
  };
});
