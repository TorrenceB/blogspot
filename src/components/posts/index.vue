<template>
  <div class="flex flex-col">
    <h2>Current Posts</h2>
    <div class="flex">
      <Post v-for="post in state.posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
<script setup>
import Post from "./Post.vue";
import SinglePost from "@/models/Post.js";
import { reactive } from "vue";

const state = reactive({
  posts: [
    SinglePost({
      id: "1",
      image: require("@/assets/placeholders/notebook.jpg"),
      title: "Noteworthy technology acquisitions 2021",
      body: "Here are the biggest enterprise technology acquisitions of 2021 so far\
        in reverse chronological order.",
    }),
    SinglePost({
      id: "2",
      image: require("@/assets/placeholders/notebook.jpg"),
      title: "Noteworthy technology acquisitions 2021",
      body: "Here are the biggest enterprise technology acquisitions of 2021 so far\
        in reverse chronological order.",
    }),
  ],
});
</script>
<style scoped></style>
