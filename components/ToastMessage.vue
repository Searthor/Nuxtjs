<template>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100">
      <div class="toast align-items-center text-white bg-success" :class="{ show: show }" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-check-circle-fill me-2"></i>
            {{ message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hide"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const show = ref(false)
  const message = ref('')
  
  const display = (msg) => {
    message.value = msg
    show.value = true
    setTimeout(() => {
      show.value = false
    }, 3000)
  }
  
  const hide = () => {
    show.value = false
  }
  
  defineExpose({ display })
  </script>