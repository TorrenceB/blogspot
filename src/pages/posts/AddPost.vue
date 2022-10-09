<template>
  <div>
    <!-- Title -->
    <label
      for="title"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >Post Title</label
    >
    <input
      v-model="state.title"
      type="text"
      id="title"
      class="title__input"
      placeholder="Example: Recipe Ideas"
      required
    />

    <!-- Upload Image -->

    <label
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      for="post-image"
      >Upload image</label
    >
    <input
      class="image__input"
      aria-describedby="image_help"
      id="post-image"
      type="file"
    />

    <!-- Body -->
    <div class="mb-6">
      <label
        for="body"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Your Post</label
      >
      <input v-model="state.body" type="text" id="body" class="body__input" />
    </div>

    <button @click="handlePostSubmit" type="button" class="add-post__button">
      Add Post
    </button>
  </div>
</template>
<script>
import { reactive } from "vue";
import { usePostStore } from "@/stores/posts";

export default {
  name: "AddPost",

  setup() {
    const store = usePostStore();
    const state = reactive({
      title: "",
      body: "",
    });

    const handlePostSubmit = () => {
      const post = {
        title: state.title,
        body: state.body,
      };

      store.create(post);
    };

    return {
      state,
      handlePostSubmit,
    };
  },
};
</script>
<style scoped>
.title__input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.image__input {
  @apply block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400;
}

.body__input {
  @apply block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.add-post__button {
  @apply focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900;
}
</style>
