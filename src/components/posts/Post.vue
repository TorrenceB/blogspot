<template>
  <div
    @click="$router.push({ name: 'PostsSlug', params: { id: props.post.id } })"
    class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <img class="rounded-t-lg" :src="props.post.image" alt="notebook" />

    <div class="p-5">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ props.post.title }}
      </h5>

      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ props.post.body }}
      </p>

      <button
        @click.stop="handleUpdatePost"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Update
      </button>

      <button
        @click.stop="handleDeletePost"
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Delete
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { usePostStore } from "@/stores/posts";

const props = defineProps({
  post: {
    id: String,
    image: String,
    title: String,
    body: String,
  },
});

const store = usePostStore();

const handleUpdatePost = async () => {
  const post = {
    id: props.post.id,
    title: "Here is an updated title",
  };

  try {
    await store.update(post);
  } catch (err) {
    console.error("!", "@posts:Post::handleUpdatePost", err);
  }
};

const handleDeletePost = async () => {
  try {
    await store.delete(props.post.id);
  } catch (err) {
    console.error("!", "@posts:Post::handleDeletePost", err);
  }
};
</script>
<style scoped></style>
