import { defineStore } from 'pinia';

interface User {
  email: string;
  password?: string;
  role: 'user' | 'admin';
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      users: [
        { email: 'user@user.com', password: '12345', role: 'user' },
        { email: 'admin@admin.com', password: '67890', role: 'admin' },
      ],
      currentUser: null,
      error: null,
    }) as AuthState,

  getters: {
    isAdmin: state => {
      if (!state.currentUser) return false;
      const user = state.users.find(
        user => user.email === state.currentUser?.email,
      );
      return user && user.role === 'admin';
    },
  },

  actions: {
    login(email: string, password: string) {
      const foundUser = this.users.find(
        user => user.email === email && user.password === password,
      );

      if (foundUser) {
        this.currentUser = { email: foundUser.email, role: foundUser.role };
        const currentUserCookie = useCookie('currentUser');
        currentUserCookie.value = JSON.stringify(this.currentUser);

        useRouter().push('/');
      } else this.error = 'Неверные учетные данные';
    },

    logout() {
      this.currentUser = null;
      this.error = null;
    },

    checkAuth() {
      const currentUserCookie = useCookie<User>('currentUser');

      if (currentUserCookie.value) {
        this.currentUser = currentUserCookie.value;
      } else {
        this.currentUser = null;
      }
    },
  },
});
