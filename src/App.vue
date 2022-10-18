<template>
  <div class="dark">
    <Nav />
    <div class="app dark:bg-gray-800">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/global/Nav";

export default {
  name: "App",
  components: {
    Nav,
  },
};
</script>

<style scoped>
.app {
  @apply p-6 h-full overflow-y-scroll;
}
</style>
