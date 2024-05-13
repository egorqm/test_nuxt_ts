<template>
  <div class="login-container">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Войти</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const email = ref('');
const password = ref('');
const store = useAuthStore();
const error = computed(() => store.error);

function handleLogin() {
  store.login(email.value, password.value);
}
</script>

<style>
.error {
  color: red;
  margin-top: 10px;
}

.login-container {
  display: flex;
  width: 300px;
  margin: 0 auto;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  border-radius: 10px;
  background: #f7f7f7;

  input {
    height: 35px;
  }

  button {
    height: 30px;
  }
}
</style>
