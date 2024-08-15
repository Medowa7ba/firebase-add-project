// take in an array of posts
// create a new tag set (so no duplicates)
// add the tags of each post to the tag set
// return a a single array of tags based on the set

import type { IPost } from '@/types/posts.type';
import { ref } from 'vue'

const useTags = (posts:IPost[]) => {

  const tags = ref<string[]>([])
  const tagSet = new Set<string>()
console.log(posts);

  posts.forEach((item:IPost) => {
    item.tags.forEach((tag:string) => tagSet.add(tag))
  })

  tags.value = [...tagSet]

  return { tags }

}

export default useTags