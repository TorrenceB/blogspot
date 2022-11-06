import { defineStore } from "pinia";
import { Storage } from "aws-amplify";

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    images: [],
  }),
  getters: {
    getImages: (state) => state.images,
  },
  actions: {
    async fetchAll() {
      try {
        const listImages = await Storage.list("gallery");

        this.images = await Promise.all(
          listImages.map(async ({ key }) => await Storage.get(key))
        );
      } catch (err) {
        console.error("!", "@useGalleryStore:gallery::fetch", err);
      }
    },
  },
});
