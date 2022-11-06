<template>
  <div class="gallery-container">
    <div
      v-for="(image, index) in store.getImages"
      :key="index"
      class="gallery-container__element"
    >
      <img :src="image" class="object-cover" height="100%" />
    </div>
  </div>
</template>
<script>
import { useGalleryStore } from "@/stores/gallery";

export default {
  name: "Gallery",
  setup() {
    const store = useGalleryStore();
    store.fetchAll();

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
  @apply w-full h-64 overflow-hidden;
}

@media only screen and (min-width: 992px) {
  .gallery-container {
    margin: 0 auto;
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(4, 15rem);
    grid-auto-rows: 16rem;
    gap: 1rem;
  }

  .gallery-container__element {
    @apply h-full;
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
