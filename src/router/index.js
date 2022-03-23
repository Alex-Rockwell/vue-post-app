import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '@/pages/PostPage.vue' 
import PostDetails from '@/Components/PostDetails.vue' 
import Contacts from '../pages/Contacts.vue'
import About from '../pages/About.vue'
import PostPageWithStore from '../pages/PostPageWithStore.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PostPage
    },
    {
      path: '/contacts',
      component: Contacts
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/posts/:id',
      component: PostDetails,
    },
    {
      path: '/store',
      component: PostPageWithStore,
    },
  ]
})

export default router
