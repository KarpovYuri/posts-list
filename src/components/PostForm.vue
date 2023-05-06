<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <MyInput v-model="post.title" placeholder="Название" />
    <MyInput v-model="post.body" placeholder="Описание" />
    <MyButton class="btn_create" @click="createPost">Создать</MyButton>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn_create {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
