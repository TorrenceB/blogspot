<template>
  <div>{{ $route.params.id }}</div>
</template>
<script>
import { usePostStore } from "@/stores/posts";

export default {
  name: "PostSlug",
  setup() {
    const store = usePostStore();

    return {
      store,
    };
  },
};
</script>
<style scoped></style>
