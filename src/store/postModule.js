import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((item1, item2) => {
        return item1[state.selectedSort]?.localeCompare(
          item2[state.selectedSort]
        );
      });
    },
    sortedAndSearchePosts(state, getters) {
      return getters.sortedPosts.filter((item) =>
        item.title.toLowerCase().includes(state.searchQuery)
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true);
        const response = await axios.get(BASE_URL, {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        );
        commit('setPosts', response.data);
      } catch (error) {
        console.log(error);
      } finally {
        commit('setLoading', false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get(BASE_URL, {
          params: {
            _page: state.page,
            _limit: state.limit,
          },
        });
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        );
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (error) {
        console.log(error);
      }
    },
  },
  namespaced: true,
};
