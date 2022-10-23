<template>
  <div class="post-container">
    <div class="space-y-4">
      <h1 class="dark:text-white text-3xl">{{ state.post.title }}</h1>
      <div class="post-image__container">
        <img :src="state.post.image" class="rounded-lg" />
      </div>
      <div class="post-info">
        <div class="flex divide-x space-x-1 divide-gray-400">
          <h2 class="dark:text-gray-400 pr-1">Torrence Brown</h2>
          <p class="dark:text-gray-400 px-1">{{ postCreatedAt }}</p>
        </div>
        <p class="dark:text-white">{{ state.post.body }}</p>
      </div>
    </div>

    <div class="post-actions__container">
      <button
        @click="state.updateIsActive = true"
        class="toggle-modal__button"
        type="button"
        data-modal-toggle="update-modal"
      >
        Update Post
      </button>
      <button
        @click="handleDeletePost"
        class="post-actions__delete-button"
        type="button"
      >
        Delete Post
      </button>
      <UpdatePost
        :isActive="state.updateIsActive"
        @close="state.updateIsActive = false"
      />
    </div>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
import { usePostStore } from "@/stores/posts";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import UpdatePost from "@/components/posts/UpdatePost";

export default {
  name: "PostSlug",
  components: {
    UpdatePost,
  },
  setup() {
    const store = usePostStore();
    const { getPost } = storeToRefs(store);
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      updateIsActive: false,
      post: computed(() => getPost.value(route.params.id)),
    });

    const postCreatedAt = computed(() =>
      new Date(state.post.createdAt).toDateString()
    );

    const handleDeletePost = async () => {
      try {
        await store.delete(state.post.id);

        router.push({ name: "Posts" });
      } catch (err) {
        console.error("!", "@posts:Post::handleDeletePost", err);
      }
    };

    return {
      state,
      postCreatedAt,
      handleDeletePost,
    };
  },
};
</script>
<style scoped>
.post-container {
  @apply flex flex-col justify-between h-full w-full;
}

.post-info {
  @apply flex flex-col space-y-2;
}

.post-actions__container {
  @apply flex flex-col w-full justify-between;
}

.toggle-modal__button {
  @apply w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900;
}

.post-actions__delete-button {
  @apply w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900;
}
</style>
