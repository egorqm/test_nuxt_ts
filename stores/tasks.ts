import { defineStore } from 'pinia';

interface Task {
  id: number;
  title: string;
  email: string;
  description: string;
  completed: boolean;
}

export const useTaskStore = defineStore({
  id: 'task',
  state: () => ({
    tasks: [
      {
        id: 1,
        title: 'Отчет по продажам',
        email: 'manager@example.com',
        description: 'Сводный отчет за первый квартал',
        completed: false,
      },
      {
        id: 2,
        title: 'Подготовить презентацию',
        email: 'marketing@example.com',
        description: 'Презентация для нового клиента',
        completed: true,
      },
      {
        id: 3,
        title: 'Обновить базу данных',
        email: 'techsupport@example.com',
        description: 'Добавление новых клиентских данных',
        completed: false,
      },
      {
        id: 4,
        title: 'План обучения',
        email: 'hr@example.com',
        description: 'Разработка плана обучения для новых сотрудников',
        completed: false,
      },
      {
        id: 5,
        title: 'Инвентаризация склада',
        email: 'warehouse@example.com',
        description: 'Ежеквартальная проверка запасов на складе',
        completed: true,
      },
      {
        id: 6,
        title: 'Подготовить блог-пост',
        email: 'content@example.com',
        description: 'Написать статью о последних тенденциях в отрасли',
        completed: false,
      },
      {
        id: 7,
        title: 'Проверка техники',
        email: 'maintenance@example.com',
        description: 'Регулярная диагностика офисной техники',
        completed: true,
      },
      {
        id: 8,
        title: 'Организация корпоратива',
        email: 'events@example.com',
        description: 'Подготовка годового корпоративного мероприятия',
        completed: false,
      },
      {
        id: 9,
        title: 'Обновление программного обеспечения',
        email: 'it@example.com',
        description: 'Установка обновлений на рабочие станции',
        completed: true,
      },
      {
        id: 10,
        title: 'Подготовка предложения',
        email: 'sales@example.com',
        description:
          'Создание коммерческого предложения для потенциального клиента',
        completed: false,
      },
    ] as Task[],
    sortBy: 'id',
  }),
  actions: {
    addTask(
      title: string,
      email: string,
      description: string,
      completed: boolean = false,
    ) {
      const newId =
        this.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
      this.tasks.push({ id: newId, title, email, description, completed });
      this.sortTasks();
    },

    updateTask(
      id: number,
      title: string,
      description: string,
      completed: boolean,
    ) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        let needSort = false;

        if (task.title !== title || task.completed !== completed) {
          needSort = true;
        }

        task.title = title;
        task.description = description;
        task.completed = completed;

        if (needSort) {
          this.sortTasks();
        }
      }
    },

    sortTasks() {
      switch (this.sortBy) {
        case 'title':
          this.tasks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'email':
          this.tasks.sort((a, b) => a.email.localeCompare(b.email));
          break;
        case 'completed':
          this.tasks.sort((a, b) => Number(b.completed) - Number(a.completed));
          break;
        case 'id':
          this.tasks.sort((a, b) => b.id - a.id);
          break;
      }
    },

    setSortBy(sortBy: 'title' | 'email' | 'completed' | 'id') {
      this.sortBy = sortBy;
      this.sortTasks();
    },
  },
});
