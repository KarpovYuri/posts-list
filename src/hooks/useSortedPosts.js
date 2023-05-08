import { computed, ref } from 'vue';

export function useSortedPosts(posts) {
  const selectedSort = ref('');
  const sortedPosts = computed(() => {
    return [...posts.value].sort((item1, item2) => {
      return item1[selectedSort.value]?.localeCompare(
        item2[selectedSort.value]
      );
    });
  });
  return { selectedSort, sortedPosts };
}
