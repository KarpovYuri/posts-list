<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <MyButton class="btn_create" @click="showDialog">Создать пост</MyButton>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';
import MyButton from './components/UI/MyButton.vue';

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
  },
  data() {
    return {
      posts: [
        { id: 1, title: 'JavaScript 1', body: 'Описание поста 1' },
        { id: 2, title: 'JavaScript 2', body: 'Описание поста 2' },
        { id: 3, title: 'JavaScript 3', body: 'Описание поста 3' },
        { id: 4, title: 'JavaScript 4', body: 'Описание поста 4' },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.btn_create {
  margin: 15px 0;
}
</style>
