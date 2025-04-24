export default defineNuxtRouteMiddleware((to, from) => {
  const protectedRoutes = ['/dashboard', '/settings/roles', '/settings/users'];
  if (protectedRoutes.includes(to.path)) {
    if (process.client) {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigateTo('/login');
      }
    } else {
      return navigateTo('/login');
    }
  }
});
