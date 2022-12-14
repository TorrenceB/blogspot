<template>
  <!-- Main modal -->
  <div
    v-if="props.isActive"
    id="update-modal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          @click="$emit('close')"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="update-modal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="py-6 px-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Update Post
          </h3>
          <form class="space-y-6" action="#">
            <div>
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Post Title</label
              >
              <input
                v-model="state.title"
                type="title"
                name="title"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Dating in the 21st century"
                required=""
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                for="post-image"
                >Update Post Image</label
              >
              <input
                @change="handleUploadImage($event)"
                class="image__input"
                aria-describedby="image_help"
                id="post-image"
                type="file"
              />
            </div>
            <div>
              <label
                for="body"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Post Body</label
              >
              <textarea
                v-model="state.body"
                type="text"
                name="body"
                id="body"
                placeholder="It was like my first time doing something like this..."
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required=""
                rows="15"
              />
            </div>
            <button
              @click.prevent="handleUpdatePost"
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { usePostStore } from "@/stores/posts";
import { useRoute } from "vue-router";

export default {
  name: "UpdatePost",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const store = usePostStore();
    const route = useRoute();
    const currentPost = store.getPost(route.params.id);
    const state = reactive({
      title: "",
      body: "",
      image: "",
    });

    const handleUpdatePost = async () => {
      const { title, body, image } = state;
      const updatedPost = {
        id: route.params.id,
        title: title || currentPost.title,
        image: image || currentPost.image,
        body: body || currentPost.body,
      };

      const imageIsUpdated = updatedPost.image === state.image;

      try {
        imageIsUpdated
          ? await store.updateWithImage(updatedPost)
          : await store.update(updatedPost);

        emit("close");
      } catch (err) {
        console.error("!", "@posts:Post::handleUpdatePost", err);
      }
    };

    const handleUploadImage = async (e) => {
      const { files } = e.target;
      const image = await store.uploadPostImage(files[0]);

      state.image = image;
    };

    return {
      props,
      state,
      handleUploadImage,
      handleUpdatePost,
    };
  },
};
</script>
<style scoped>
.toggle-modal__button {
  @apply w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900;
}

.image__input {
  @apply block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400;
}
</style>
