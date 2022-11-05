<template>
  <div class="gallery-container">
    <div class="gallery-container__element bg-blue-600"></div>
    <div class="gallery-container__element bg-purple-600"></div>
    <div class="gallery-container__element bg-red-600"></div>
    <div class="gallery-container__element bg-green-600"></div>
    <div class="gallery-container__element bg-orange-600"></div>
    <div class="gallery-container__element bg-pink-600"></div>
    <div class="gallery-container__element bg-yellow-300"></div>
    <div class="gallery-container__element bg-teal-600"></div>
    <div class="gallery-container__element bg-blue-400"></div>
    <div class="gallery-container__element bg-purple-600"></div>
    <div class="gallery-container__element bg-red-600"></div>
  </div>
</template>
<script>
export default {
  name: "Gallery",
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
  @apply w-full h-64;
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

  .gallery-container__element:nth-child(3) {
    grid-row-start: span 2;
  }

  .gallery-container__element:nth-child(5) {
    grid-row-start: span 2;
  }

  .gallery-container__element:nth-child(8) {
    grid-column-start: span 2;
  }

  .gallery-container__element:nth-child(9) {
    grid-column-start: span 2;
  }
}
</style>
