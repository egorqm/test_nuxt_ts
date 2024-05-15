<template>
  <div class="container">
    <div class="user">
      <button class="logout" @click="logout">Выйти</button>
      <b v-if="authStore.currentUser?.email">{{
        authStore.currentUser.email
      }}</b>
    </div>
    <div class="page-body">
      <TaskList />
      <TaskForm />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { useRouter, useCookie } from '#imports';

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  const currentUserCookie = useCookie('currentUser');
  currentUserCookie.value = null;
  router.push('/login');
}
</script>

<style scoped lang="scss">
.logout {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
}

.user {
  display: flex;
  gap: 30px;
  align-items: center;
  border-bottom: 1px solid #d7d7d7;
  padding-bottom: 30px;
  margin-bottom: 30px;

  button {
    height: auto;
  }

  @media screen and (max-width: 720px) {
    padding-bottom: 15px;
    margin-bottom: 15px;
    gap: 15px;
  }
}

.page-body {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;

    :deep(.task-list) {
      order: 2;
    }
  }
}
</style>
