<template>
  <div class="task">
    <div class="task__title">
      <input
        v-if="isEditing"
        v-model="editableTitle"
        @input="validateTitle"
        type="text"
        placeholder="Заголовок"
        :class="{ 'input-error': titleError }"
      />
      <span v-else>{{ task.id }}. {{ task.title }}</span>
      <p v-if="titleError" class="task__error-message">{{ titleError }}</p>
    </div>
    <div class="task__email">
      <span>{{ task.email }}</span>
    </div>
    <p class="task__text">
      <textarea v-if="isEditing" v-model="editableDescription"></textarea>
      <span v-else>{{ task.description }}</span>
    </p>
    <div class="task__status">
      <span>Статус:</span>
      <input v-if="isEditing" type="checkbox" v-model="editableCompleted" />
      <p v-else>{{ task.completed ? 'Выполнена' : 'Не выполнена' }}</p>
    </div>
    <div class="task__buttons">
      <button v-if="isEditing" @click="saveTask" :disabled="titleError !== ''">
        Сохранить
      </button>
      <button v-else @click="editTask" v-if="isAdmin">Редактировать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '~/stores/tasks';
import { useAuthStore } from '~/stores/auth';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const { updateTask } = useTaskStore();
const { isAdmin } = useAuthStore();

const isEditing = ref(false);
const editableTitle = ref('');
const editableEmail = ref('');
const editableDescription = ref('');
const editableCompleted = ref(false);
const titleError = ref('');

function editTask() {
  isEditing.value = true;
  resetEditableFields();
}

function resetEditableFields() {
  editableTitle.value = props.task.title;
  editableEmail.value = props.task.email;
  editableDescription.value = props.task.description;
  editableCompleted.value = props.task.completed;
  validateTitle();
}

function validateTitle() {
  if (
    editableTitle.value.length < 3 ||
    editableTitle.value.length > 25 ||
    editableTitle.value.trim() === ''
  ) {
    titleError.value = 'Название должно быть от 3 до 25 символов.';
  } else {
    titleError.value = '';
  }
}

function saveTask() {
  validateTitle();
  if (!titleError.value) {
    updateTask(
      props.task.id,
      editableTitle.value,
      editableDescription.value,
      editableCompleted.value,
    );
    isEditing.value = false;
  }
}
</script>

<style scoped lang="scss">
.task {
  background: #f4f4f4;
  border-radius: 10px;
  padding: 20px;

  &__title {
    span {
      font-size: 16px;
      font-weight: 500;
    }
  }

  &__title,
  &__email {
    margin-bottom: 5px;
    line-height: 30px;

    input {
      width: 100%;

      &.input-error {
        outline: 1px solid red;
      }
    }
  }

  &__email {
    span {
      opacity: 0.5;
    }
  }

  &__text {
    margin-bottom: 15px;

    textarea {
      width: 100%;
      padding: 5px 15px;
    }
  }

  &__error-message {
    color: red;
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #d1d1d1;
    border-left: none;
    border-right: none;
    padding: 10px 0;
  }

  &__buttons {
    margin-top: 15px;
  }
}
</style>
