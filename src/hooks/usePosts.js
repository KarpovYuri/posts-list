import axios from 'axios';
import { onMounted, ref } from 'vue';

export function usePosts(limit) {
  const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
  const posts = ref([]);
  const totalPages = ref(0);
  const isPostsLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          _page: 1,
          _limit: limit,
        },
      });
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      isPostsLoading.value = false;
    }
  };
  onMounted(fetching);
  return {
    posts,
    totalPages,
    isPostsLoading,
  };
}
