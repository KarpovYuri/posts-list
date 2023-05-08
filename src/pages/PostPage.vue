<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..." />
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
    <div ref="observer" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div
        class="page"
        :class="{ 'current-page': page === pageNumber }"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    //   this.fetchPosts();
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(BASE_URL, {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = response.data;
      } catch (error) {
        alert('Ошибка');
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(BASE_URL, {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert('Ошибка');
      }
    },
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((item1, item2) => {
        return item1[this.selectedSort]?.localeCompare(
          item2[this.selectedSort]
        );
      });
    },
    sortedAndSearchePosts() {
      return this.sortedPosts.filter((item) =>
        item.title.toLowerCase().includes(this.searchQuery)
      );
    },
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
