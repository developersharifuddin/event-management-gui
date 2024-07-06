<template>
  <div class="card preloader-body">
    <div class="card-header py-3">
      <h5 class="card-title d-flex gap-3 justify-content-between align-items-center">
        <span class="placeholder col-4"></span>
        <span class="placeholder col-4"></span>
      </h5>
    </div>
    <div class="card-body">
      <div class="text-center">
        <img src="/src/assets/preloader.gif" alt="" height="40px" />
      </div>
      <div class="container gap-3 justify-content-between mx-auto">
        <p class="placeholder col-6"></p>
        <p class="placeholder col-6"></p>
        <p class="placeholder col-6"></p>
        <p class="placeholder col-6"></p>
        <p class="placeholder col-6"></p>
        <p class="placeholder col-6"></p>
        <p class="placeholder col-6"></p>
        <p class="placeholder col-6"></p>
      </div>
    </div>
    <div class="card-footer py-3 bg-transparent">
      <h5 class="card-title d-flex gap-3 justify-content-between align-items-center">
        <span class="placeholder col-4"></span>
        <span class="placeholder col-4"></span>
      </h5>
    </div>
  </div>
</template>

<style scoped>
.placeholder {
  background-color: #f0f0f0;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
