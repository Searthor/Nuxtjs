<!-- components/LineChart.vue -->
<template>
    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { Chart, registerables } from 'chart.js'
  
  // Register all Chart.js components
  Chart.register(...registerables)
  
  const props = defineProps({
    chartData: {
      type: Object,
      required: true,
      default: () => ({
        labels: [],
        datasets: []
      })
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    }
  })
  
  const chart = ref(null)
  const chartInstance = ref(null)
  
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }
  
  const initChart = () => {
    if (chartInstance.value) {
      chartInstance.value.destroy()
    }
    
    if (chart.value && props.chartData.labels.length > 0) {
      chartInstance.value = new Chart(chart.value, {
        type: 'line',
        data: props.chartData,
        options: { ...defaultOptions, ...props.chartOptions }
      })
    }
  }
  
  onMounted(initChart)
  watch(() => props.chartData, initChart, { deep: true })
  watch(() => props.chartOptions, initChart, { deep: true })
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    height: 100%;
    width: 100%;
  }
  </style>