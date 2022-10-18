<template>
  <div class="post-container">
    <div class="post-image__container">
      <img :src="state.post.image" />
    </div>
    <div class="post-title">
      <h1 class="dark:text-white text-2xl">{{ state.post.title }}</h1>
    </div>
    <div class="post-body">
      <p class="dark:text-gray-400">{{ state.post.body }}</p>
    </div>
    <div class="post-actions__container">
      <UpdatePost
        :isActive="state.updateIsActive"
        @close="state.updateIsActive = false"
      />

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
      handleDeletePost,
    };
  },
};
</script>
<style scoped>
.post-container {
  @apply flex flex-col w-full;
}

.post-actions__container {
  @apply flex w-full justify-between space-x-2;
}

.toggle-modal__button {
  @apply w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900;
}

.post-actions__delete-button {
  @apply w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900;
}
</style>
