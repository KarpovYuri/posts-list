<template>
  <div>
    <h1>Страница с постами Composition</h1>
    <MyInput v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
    </div>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostList
      :posts="sortedAndSearchePosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <!-- <div v-intersection="loadMorePosts"></div> -->
  </div>
</template>

<script>
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { usePosts } from '../hooks/usePosts';
import { useSortedPosts } from '../hooks/useSortedPosts';
import { useSortedAndSearchePosts } from '../hooks/useSortedAndSearchePosts';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержанию' },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.unshift(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchePosts } =
      useSortedAndSearchePosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchePosts,
    };
  },
};
</script>

<style scoped>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
