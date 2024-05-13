<template>
  <div class="task-list">
    <h2>Задачи</h2>
    <div class="task-list__sort">
      <span>Сортировка по:</span>
      <select v-model="sortBy" @change="changeSort">
        <option value="id">ID</option>
        <option value="title">Title</option>
        <option value="email">Email</option>
        <option value="completed">Status</option>
      </select>
    </div>
    <div class="task-list__items">
      <TaskItem v-for="task in paginatedTasks" :key="task.id" :task="task" />
    </div>
    <Pagination
      :page="page"
      :perPage="perPage"
      :totalItems="taskStore.tasks.length"
      @changePage="handleChangePage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTaskStore } from '~/stores/tasks';

const taskStore = useTaskStore();
const sortBy = ref<'id' | 'title' | 'email' | 'completed'>('id');
const page = ref(0);
const perPage = 3;

const paginatedTasks = computed(() => {
  const start = page.value * perPage;
  const end = start + perPage;
  return taskStore.tasks.slice(start, end);
});

function handleChangePage(newPage: number) {
  page.value = newPage;
}

function changeSort() {
  taskStore.setSortBy(sortBy.value as 'id' | 'title' | 'email' | 'completed');
}
</script>

<style scoped lang="scss">
.task-list {
  &__sort {
    display: flex;
    gap: 10px;
    span {
      opacity: 0.6;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0 30px 0;
  }
}
</style>
