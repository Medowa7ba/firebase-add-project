<template>
    <div v-if="Errorpost">{{ Errorpost }}</div>
    <div v-if="Singlepost" class="post">
        <h3>{{ Singlepost.title }}</h3>
        <p class="pre">{{ Singlepost.body }}</p>
        <button @click="handleClick" class="delete">delete post</button>
    </div>
    <div v-else>
        <Spinner />
    </div>
</template>

<script lang="ts" setup>
import getPost from '../composables/getPost'
import { useRoute, useRouter } from 'vue-router'
import { projectFirestore } from '../firebase/config'
import { ref } from 'vue';
const props = defineProps(['id'])
const route = useRoute();
const Singlepost = ref();
const Errorpost = ref();
async function getSinglePost(){
    const { error, post, load } = await getPost(route.params.id as string);
    Singlepost.value = post;
    Errorpost.value = error
    console.log(route.params.id);
}
getSinglePost()
const router = useRouter()
const handleClick = async () => {
    await projectFirestore.collection('posts')
        .doc(props.id)
        .delete()
    router.push('/')
}
</script>

<style scoped>
.post {
    max-width: 1200px;
    margin: 0 auto;
}

.post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
}

.pre {
    white-space: pre-wrap;
}

button.delete {
    margin: 10px auto;
}
</style>