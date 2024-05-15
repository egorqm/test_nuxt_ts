<template>
  <div class="container">
    <NuxtPage />
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 60px auto;
  padding: 0 15px;
  max-width: 900px;

  @media screen and (max-width: 900px) {
    margin-top: 30px;
  }

  @media screen and (max-width: 720px) {
    margin-top: 15px;
  }
}
</style>
