export default defineNuxtPlugin(async (nuxtApp) => {
  const permissions = useState<string[]>('permissions', () => [])
  // Only run on client to avoid SSR issues
  if (process.client && permissions.value.length === 0) {
    const roleId = localStorage.getItem('role_id')
    if (roleId) {
      const { data } = await useFetch('/api/permissions', {
        headers: {
          'role-id': roleId
        }
      })
      if (data.value?.success) {
        permissions.value = data.value.data.map((item: any) => item.name)
      }
    }
  }
  // Global permission checker
  const checkPermission = (permission: string): boolean => {
    return permissions.value.includes(permission)
  }
  // Make available in template as $checkPermission
  nuxtApp.vueApp.config.globalProperties.$checkPermission = checkPermission
  // Provide to script via useNuxtApp().$checkPermission
  return {
    provide: {
      checkPermission
    }
  }
})
