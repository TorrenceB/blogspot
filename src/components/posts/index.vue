<template>
  <div class="flex flex-col">
    <div class="flex">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
<script>
import Post from "./Post.vue";
import { usePostStore } from "@/stores/posts";

export default {
  name: "Posts",
  components: {
    Post,
  },
  setup() {
    const store = usePostStore();

    return {
      posts: store.getPosts,
    };
  },
};
</script>
<style scoped></style>
