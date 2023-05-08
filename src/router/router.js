import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/Main';
import PostPage from '../pages/PostPage';
import PostPageWhithStore from '../pages/PostPageWhithStore';
import About from '../pages/About';
import PostIdPage from '../pages/PostIdPage';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostPage,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
  {
    path: '/store',
    component: PostPageWhithStore,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.Base_URL),
});

export default router;
