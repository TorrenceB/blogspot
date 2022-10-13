<template>
  <div class="space-y-6">
    <!-- Title -->
    <div>
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
    </div>

    <!-- Upload Image -->
    <div>
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        for="post-image"
        >Upload image</label
      >
      <input
        @change="handleUploadImage($event)"
        class="image__input"
        aria-describedby="image_help"
        id="post-image"
        type="file"
      />
    </div>

    <!-- Body -->
    <div>
      <label
        for="body"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Post Body</label
      >
      <textarea
        v-model="state.body"
        type="text"
        id="body"
        class="body__input"
        rows="8"
      />
    </div>

    <AppButton @click="handlePostSubmit" isPrimary> Add Post </AppButton>
  </div>
</template>
<script>
import { reactive } from "vue";
import { usePostStore } from "@/stores/posts";
import AppButton from "@/components/global/AppButton";

export default {
  name: "AddPost",
  components: {
    AppButton,
  },

  setup() {
    const store = usePostStore();
    const state = reactive({
      title: "",
      body: "",
      image: null,
    });

    const handlePostSubmit = () => {
      const { title, body, image } = state;
      const post = {
        title,
        body,
        image,
      };

      store.create(post);
    };

    const handleUploadImage = async (e) => {
      const { files } = e.target;
      const image = await store.uploadPostImage(files[0]);

      state.image = image;
    };

    return {
      state,
      handlePostSubmit,
      handleUploadImage,
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
</style>
