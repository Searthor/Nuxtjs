export default defineNuxtRouteMiddleware((to, from) => {
  const token = process.client ? localStorage.getItem('token') : null;
  const protectedRoutes = ['/dashboard', '/settings/roles', '/settings/users'];
  if (protectedRoutes.includes(to.path)) {
    if (process.client) {
      if (!token) {
        return navigateTo('/login');
      }
    }
  }
});
