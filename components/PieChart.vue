<!-- components/PieChart.vue -->
<template>
    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { Chart, registerables } from 'chart.js'
  
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
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = Math.round((value / total) * 100)
            return `${label}: ${value} (${percentage}%)`
          }
        }
      }
    }
  }
  
  const initChart = () => {
    if (chartInstance.value) {
      chartInstance.value.destroy()
    }
    
    if (chart.value && props.chartData.labels.length > 0) {
      chartInstance.value = new Chart(chart.value, {
        type: 'pie',
        data: props.chartData,
        options: { ...defaultOptions, ...props.chartOptions }
      })
    }
  }
  
  onMounted(initChart)
  watch(() => props.chartData, initChart, { deep: true })
  watch(() => props.chartOptions, initChart, { deep: true })
  </script>