<template>
  <div class="flex flex-col items-center mt-32 w-full h-full space-y-4">
    <h1 class="dark:text-white text-4xl">Blogspot</h1>
    <h2 class="dark:text-gray-400 text-lg">Login</h2>
    <!-- email -->
    <div class="mb-6 w-full">
      <label
        for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Email address</label
      >
      <input
        v-model="state.email"
        type="email"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="john.doe@company.com"
        required
      />
    </div>
    <!-- password -->
    <div class="mb-6 w-full">
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Password</label
      >
      <input
        v-model="state.password"
        type="password"
        id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="•••••••••"
        required
      />
    </div>
    <AppButton @click="loginUser" isPrimary><span>Login</span></AppButton>
  </div>
</template>
<script>
import { ref } from "vue";
import AppButton from "@/components/global/AppButton";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: {
    AppButton,
  },
  setup() {
    const router = useRouter();
    const store = useUserStore();
    const state = ref({
      email: "",
      password: "",
    });

    const loginUser = async () => {
      const payload = {
        password: state.value.password,
        email: state.value.email,
      };

      const { status } = await store.login(payload);

      if (status === "success") {
        router.push({ name: "home" });
      }
    };

    return {
      state,
      loginUser,
    };
  },
};
</script>
<style scoped></style>
