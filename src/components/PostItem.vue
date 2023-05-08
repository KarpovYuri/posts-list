<template>
  <div class="post">
    <div class="post__item">
      <div><strong>ID: </strong>{{ post.id }}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btn">
      <MyButton @click="$router.push(`/posts/${post.id}`)">Открыть</MyButton>
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: justify;
}

.post__btn {
  display: flex;
  gap: 15px;
}

.post__item {
  margin-right: 15px;
}
</style>
