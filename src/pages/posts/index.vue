<template>
  <div class="flex flex-col">
    <Post v-for="post in store.getPosts" :key="post.id" :post="post" />
  </div>
</template>
<script>
import Post from "../../components/posts/Post.vue";
import { usePostStore } from "@/stores/posts";

export default {
  name: "Posts",
  components: {
    Post,
  },
  setup() {
    const store = usePostStore();

    return {
      store,
    };
  },
  methods: {
    async init() {
      if (this.store.getPosts && this.store.getPosts.length === 0) {
        await this.store.fetch();
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped></style>
