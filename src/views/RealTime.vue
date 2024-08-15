<template>
    <h1>Real-time Listeners</h1>
    <div v-for="post in posts" :key="post.id">
      <div>{{ post.title }}</div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import type { IPost } from '@/types/posts.type';
import { projectFirestore } from '../firebase/config'
  import { ref } from 'vue'
      const posts = ref<IPost[]>([])
      projectFirestore.collection('posts')
        .orderBy('createdAt', 'desc')  
        .onSnapshot(snap => {
          console.log('snapshot: ', snap.docs)
          let docs = snap.docs.map(doc => {

            return <IPost>{ ...doc.data(), id: doc.id }
          })
          posts.value = docs
          console.log(posts.value);
          
        })
  </script>
  
  <style>
  
  </style>