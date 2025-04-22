// middleware/auth.js
export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()
    
    if (!authStore.loggedIn) {
      return navigateTo('/login')
    }
  })