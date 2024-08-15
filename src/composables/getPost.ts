import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import type { IPost } from '@/types/posts.type'

const getPost:(id: string)=>Promise<({post:IPost | null,error:string[] | null,load:() =>void})> = async (id) => {
  
  const post = ref<IPost | null>(null)
  const error = ref(null)

  const load = async () => {
    try {
      let res = await projectFirestore.collection('posts').doc(id).get();
      // console.log(res);
      
      if (!res.exists) {
        throw Error('That post does not exist')
      }
      
      post.value = <IPost>{ ...res.data(), id: res.id }
    }
    catch(err: any) {
      error.value = err.message
    }
  }
  await load()

  return { post: post.value, error: error.value, load } 
}

export default getPost