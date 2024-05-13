import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  authStore.checkAuth();

  if (authStore.currentUser && to.path === '/login') {
    return navigateTo('/');
  }

  if (!authStore.currentUser && to.path !== '/login') {
    return navigateTo('/login');
  }
});
