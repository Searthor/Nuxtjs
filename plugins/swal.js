// ~/plugins/swal.js
import Swal from 'sweetalert2'

export default defineNuxtPlugin((nuxtApp) => {
  const swal = Swal.mixin({
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    buttonsStyling: true,
    timer: 1500
  })
  
  nuxtApp.provide('swal', swal)
})