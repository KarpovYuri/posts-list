import { computed, ref } from 'vue';

export function useSortedAndSearchePosts(sortedPosts) {
  const searchQuery = ref('');
  const sortedAndSearchePosts = computed(() => {
    return sortedPosts.value.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  return { searchQuery, sortedAndSearchePosts };
}
