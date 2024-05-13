<template>
  <div class="add-form-task">
    <h2>Добавить новую задачу</h2>
    <form @submit.prevent="addTask">
      <input v-model="title" type="text" placeholder="Title" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <textarea v-model="description" placeholder="Description"></textarea>
      <button type="submit">Add Task</button>
    </form>
    <p v-if="titleError" class="add-form-task__error-message">
      {{ titleError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '~/stores/tasks';

const taskStore = useTaskStore();
const title = ref('');
const email = ref('');
const description = ref('');
const titleError = ref('');

function addTask() {
  if (title.value.length < 3 || title.value.length > 25) {
    titleError.value = 'Название должно быть от 3 до 25 символов.';
    return;
  }
  taskStore.addTask(title.value, email.value, description.value);
  title.value = '';
  email.value = '';
  description.value = '';
  titleError.value = '';
}
</script>

<style scoped lang="scss">
.add-form-task {
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input,
    textarea {
      width: 100%;
    }

    textarea {
      height: 70px;
      padding: 5px 15px;
    }
  }

  &__error-message {
    color: red;
    margin-top: 15px;
  }
}
</style>
