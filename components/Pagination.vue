<template>
  <div class="pagination">
    <button @click="$emit('changePage', page - 1)" :disabled="page === 0">
      Назад
    </button>
    <span>Page {{ page + 1 }} of {{ totalPages }}</span>
    <button
      @click="$emit('changePage', page + 1)"
      :disabled="page >= totalPages - 1"
    >
      Вперед
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
});

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
