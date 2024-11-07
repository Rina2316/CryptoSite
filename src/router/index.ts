import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import ProfilePage from '../views/ProfilePage.vue';

const routes = [
  { path: '/', name: 'Main', component: MainPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
