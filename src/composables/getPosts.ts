import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import type { IPost } from '@/types/posts.type';

const getPosts:()=>Promise<({posts:IPost[],error:string[] | null,load:() =>void})>= async () => {
  const posts = ref<IPost[]>([]) ;
  const error = ref(null)
  const load = async () => {
    try {
      const res = await projectFirestore.collection('posts') 
      // .orderBy('createdAt', 'desc')  
        .get()
        
        posts.value = res.docs.map(doc => {
          return <IPost>{ ...doc.data(), id: doc.id }
        })
    }
    catch(err:any) {
      error.value = err.message
    }
  }
  await load()
  return { posts:posts.value, error: error.value, load }
}

export default getPosts