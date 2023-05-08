<template>
  <div class="navbar">
    <h2 class="title" @click="$router.push('/')">Vue 3</h2>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Список постов</MyButton>
      <MyButton @click="$router.push('/about')">О приложении</MyButton>
      <MyButton @click="$router.push('/store')">Store Vuex</MyButton>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
  display: flex;
  gap: 15px;
}

.title {
  cursor: pointer;
}
</style>
