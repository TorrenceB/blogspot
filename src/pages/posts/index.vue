<template>
  <div class="posts-container">
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
<style scoped>
.posts-container {
  @apply flex flex-col flex-wrap box-border;
}

@media only screen and (min-width: 768px) {
  .posts-container {
    display: grid;
    width: fit-content;
    height: 100vh;

    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(1fr auto);
    grid-auto-flow: row;
    gap: 1rem;
  }
}

@media only screen and (min-width: 1024px) {
  .posts-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (min-width: 1280px) {
  .posts-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media only screen and (min-width: 1536px) {
  .posts-container {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
