<!-- components/BarChart.vue -->
<template>
    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { Chart, registerables } from 'chart.js'
  
  // Register Chart.js components
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
        position: 'top',
        labels: {
          color: '#6B7280', // Tailwind gray-500
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: '#111827', // Tailwind gray-900
        titleColor: '#F9FAFB', // Tailwind gray-50
        bodyColor: '#F9FAFB',
        borderColor: '#374151', // Tailwind gray-700
        borderWidth: 1,
        padding: 12,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280' // Tailwind gray-500
        }
      },
      y: {
        grid: {
          color: '#E5E7EB', // Tailwind gray-200
          drawBorder: false
        },
        ticks: {
          color: '#6B7280' // Tailwind gray-500
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
        type: 'bar',
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