<template>
  <div class="flex flex-col h-full">
    <!-- Profile Info -->
    <div class="profile__card">
      <div class="profile__avatar">
        <svg
          class="w-16 h-16 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <h2 class="dark:text-white text-3xl">Torrence Brown</h2>
      <p class="dark:text-gray-400 text-sm">Personal Blog</p>
    </div>

    <div class="flex justify-between w-full mt-2 gap-x-2">
      <div class="stat__card">
        <h3 class="text-4xl">{{ store.getPosts.length }}</h3>
        <p class="text-sm dark:text-gray-400"># of Posts</p>
      </div>
      <div class="stat__card">
        <h3 class="text-3xl">{{ store.getMostRecentPostByDate }}</h3>
        <p class="text-sm dark:text-gray-400">Most Recent Post</p>
      </div>
    </div>

    <button
      @click="$router.push({ name: 'AddPost' })"
      type="button"
      class="add-post__button"
    >
      Add Post
    </button>
    <button
      @click="$router.push({ name: 'Posts' })"
      type="button"
      class="add-post__button"
    >
      View Posts
    </button>
  </div>
</template>
<script>
import { usePostStore } from "@/stores/posts";

export default {
  name: "Home",

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
.add-post__button {
  @apply focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800;
}

.profile__card {
  @apply p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col items-center;
}

.profile__avatar {
  @apply overflow-hidden flex justify-center items-center w-20 h-20 bg-gray-100 rounded-full dark:bg-gray-600 mb-2;
}

.stat__card {
  @apply rounded-md h-40 w-full dark:bg-gray-700 dark:text-white flex flex-col items-center justify-center;
}
</style>
