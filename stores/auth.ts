export const useAuthStore = defineStore('auth', {
    state: () => ({
      loggedIn: false,
      user: null
    }),
    actions: {
      login() {
        this.loggedIn = true
      },
      logout() {
        this.loggedIn = false
      }
    }
  })