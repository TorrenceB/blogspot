<template>
  <div>
    <h1 class="text-4xl dark:text-white">Gallery</h1>
    <div class="gallery-container">
      <div
        v-for="(image, index) in store.getImages"
        :key="index"
        class="gallery-container__element"
      >
        <img :src="image" class="gallery-image" />
      </div>
    </div>
  </div>
</template>
<script>
import { useGalleryStore } from "@/stores/gallery";

export default {
  name: "Gallery",
  setup() {
    const store = useGalleryStore();

    if (store.getImages.length === 0) {
      store.fetchAll();
    }

    return {
      store,
    };
  },
};
</script>
<style scoped>
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.gallery-container__element {
  @apply w-full;
}

.gallery-image {
  object-fit: cover;
  width: 100%;
}

@media only screen and (min-width: 992px) {
  .gallery-container {
    margin: 0 auto;
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 16rem;
    gap: 1rem;
  }

  .gallery-container__element {
    @apply h-full;
  }

  .gallery-image {
    height: 100%;
  }

  .gallery-container__element:nth-child(1) {
    grid-column-start: span 2;
  }

  .gallery-container__element:nth-child(5) {
    grid-row-start: span 2;
  }

  .gallery-container__element:nth-child(6) {
    grid-column-start: span 2;
  }
}
</style>
