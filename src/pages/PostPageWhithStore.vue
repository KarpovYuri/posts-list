<template>
  <div>
    <h1>Страница с постами Store</h1>
    <MyInput
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    />
    <div class="app__btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      ></MySelect>
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
    <div v-intersection="loadMorePosts"></div>
  </div>
</template>

<script>
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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
  mounted() {
    this.fetchPosts();
  },
  watch: {},
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchePosts: 'post/sortedAndSearchePosts',
    }),
  },
};
</script>

<style scoped>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
  gap: 15px;
  justify-content: center;
}

.page {
  border: 1px solid black;
  padding: 5px 10px;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
}
</style>
