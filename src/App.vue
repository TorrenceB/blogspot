<template>
  <div class="app">
    <button type="button" class="add-post__button">Add Post</button>
    <Posts />
  </div>
</template>

<script setup>
import Posts from "@/components/posts";
</script>

<style scoped>
.app {
  @apply p-6;
}

.add-post__button {
  @apply focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800;
}
</style>
