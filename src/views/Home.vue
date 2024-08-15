<template>
  <div class="home">
    <div v-if="err">{{ err }}</div>
    <div v-if="allPosts?.length" class="layout">
      <PostList :posts="allPosts" />
      <TagCloud :posts="allPosts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue'
import getPosts from '../composables/getPosts'
import PostList from '../components/PostList.vue'
import Spinner from '../components/Spinner.vue'
import TagCloud from '../components/TagCloud.vue'
let allPosts = ref();
let err = ref();
async function data(){
  const { posts, error, load } = await getPosts()
  allPosts.value = posts;
  err.value = error;
  console.log(allPosts.value)
}
data()
</script>

<style>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}
</style>