import { defineStore } from "pinia";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listPosts } from "@/graphql/queries.js";
import { createPost, updatePost, deletePost } from "@/graphql/mutations.js";

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPost: (state) => (id) => state.posts.find((post) => post.id === id),
    getPosts: (state) => state.posts,
    getMostRecentPostByDate: (state) => {
      const mostRecent = new Date(
        Math.max(...state.posts.map((post) => new Date(post.createdAt)))
      );
      const options = {
        weekday: "short",
        month: "short",
        day: "2-digit",
      };
      const formated = mostRecent.toLocaleDateString("en-US", options);

      return formated;
    },
  },
  actions: {
    async fetch() {
      try {
        const { data } = await API.graphql(graphqlOperation(listPosts));

        this.posts = await Promise.all(
          data.listPosts.items.map(async (post) => {
            const image = await Storage.get(post.image);

            return { ...post, image };
          })
        );
      } catch (err) {
        console.error("!", "@usePostStore:posts:fetch", err);
      }
    },
    async create(post = {}) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(createPost, { input: post })
        );
        const image = await Storage.get(data.createPost.image);

        this.posts.push({ ...data.createPost, image });
      } catch (err) {
        console.error("!", "@usePostStore:posts::create", err);
      }
    },
    async update(input = {}) {
      try {
        const { data } = await API.graphql(
          graphqlOperation(updatePost, { input })
        );

        const updatedPostIndex = this.posts.findIndex(
          (post) => post.id === data.updatePost.id
        );
        const image = await Storage.get(data.updatePost.image);

        this.posts[updatedPostIndex] = { ...data.updatePost, image };
      } catch (err) {
        console.error("!", "@usePostStore:posts::update", err);
      }
    },
    async delete(id = "") {
      try {
        const { data } = await API.graphql(
          graphqlOperation(deletePost, { input: { id } })
        );

        this.posts = this.posts.filter(
          (post) => post.id !== data.deletePost.id
        );
      } catch (err) {
        console.error("!", "@usePostStore:posts::delete", err);
      }
    },

    async uploadPostImage(file) {
      try {
        const { key } = await Storage.put(file.name, file);

        return key;
      } catch (err) {
        console.error("!", "@usePostStore:posts::uploadPostImage", err);
      }
    },
  },
});
