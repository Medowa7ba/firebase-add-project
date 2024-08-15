<template>
    <div class="tag">
        <div v-if="Errorpost">{{ Errorpost }}</div>
        <div v-if="Singlepost.length" class="layout">
            <PostList :posts="postsWithTag" />
            <TagCloud :posts="Singlepost" />
        </div>
        <div v-else>
            <Spinner />
        </div>
    </div>
</template>

<script lang="ts" setup>
import TagCloud from '../components/TagCloud.vue'
import Spinner from '../components/Spinner.vue'
import PostList from '../components/PostList.vue'
import getPosts from '../composables/getPosts'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import type { IPost } from '@/types/posts.type'
const route = useRoute()
const Singlepost = ref();
const Errorpost = ref();
async function getSingleTag() {
    const { error, posts, load } = await getPosts();
    Singlepost.value = posts;
    Errorpost.value = error
;
}
getSingleTag()
const postsWithTag = computed(() => {
    return Singlepost.value.filter((p:  IPost) => p.tags.includes(route.params.tag as string))
})
</script>

<style>
.tag {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
}
</style>