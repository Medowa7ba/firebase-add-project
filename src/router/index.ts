import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Create from '../views/Create.vue'
import Tag from '../views/Tag.vue'
import RealTime from '../views/RealTime.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts/:id',
      name: 'Details',
      component: Details,
      props: true
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/tags/:tag',
      name: 'Tag',
      component: Tag
    },
    {
      path: '/realtime',
      name: 'RealTime',
      component: RealTime
    }
  ]
  
})

export default router
