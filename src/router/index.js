import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from '@/views/Feed'
import Post from '@/views/Post'
import CurrentLocationMap from '@/views/CurrentLocationMap'
import BlogContent from '@/views/BlogContent'
import Images from '@/views/Images'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'feed',
    component: Feed
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: Post
  },
  {
    path: '/posts/:id/map',
    name: 'postmap',
    component: CurrentLocationMap
  },
  {
    path: '/posts/:id/blog',
    name: 'blogcontent',
    component: BlogContent
  },
  {
    path: '/posts/:id/images',
    name: 'postimages',
    component: Images
  }
]

const router = new VueRouter({
  routes
})

export default router
