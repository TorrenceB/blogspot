<template>
  <div class="post-card">
    <div class="post-card__image-container">
      <img
        class="rounded-t-lg"
        :src="props.post.image"
        :alt="props.post.image"
      />
    </div>

    <div class="p-5">
      <h5 class="post-card__title">
        {{ props.post.title }}
      </h5>

      <p class="post-card__body">
        {{ props.post.body }}
      </p>

      <button
        @click="
          $router.push({ name: 'PostsSlug', params: { id: props.post.id } })
        "
        type="button"
        class="post-card__view-button"
      >
        View Post
        <svg
          aria-hidden="true"
          class="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  post: {
    id: String,
    image: String,
    title: String,
    body: String,
  },
});
</script>
<style scoped>
.post-card {
  @apply max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 my-2;
  height: fit-content;
}

.post-card__image-container > img {
  text-align: center;
  object-fit: cover;
  height: 15rem;
  width: 100%;
}

.post-card__title {
  @apply mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white;
}

.post-card__body {
  @apply mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden h-48 max-h-60;
}

.post-card__view-button {
  @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full justify-center;
}
</style>
