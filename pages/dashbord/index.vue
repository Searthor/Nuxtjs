<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-between">
            <p>Dashbord</p>
            <NuxtLink to="/">Dashbord</NuxtLink>
        </div>
        <div class="row mb-4">
            <div class="col-lg-6 mb-4 mb-lg-0">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Revenue Overview</h5>
                        <div style="height: 320px">
                            <LineChart :chart-data="revenueData" :chart-options="chartOptions" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Revenue Sources</h5>
                        <div style="height: 320px">
                            <PieChart :chart-data="trafficData" :chart-options="pieOptions" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">User Acquisition</h5>
                        <div style="height: 320px">
                            <BarChart :chart-data="userData" :chart-options="stackedOptions" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
// definePageMeta({
//     middleware: 'auth'
// })

const revenueData = ref({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Revenue',
        data: [12500, 19000, 15000, 22000, 19500, 24000],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.05)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#4F46E5',
        pointRadius: 4,
        pointHoverRadius: 6
    }]
})

const chartOptions = ref({
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    return `$${context.raw.toLocaleString()}`
                }
            }
        }
    },
    scales: {
        y: {
            ticks: {
                callback: function (value) {
                    return `$${value.toLocaleString()}`
                }
            }
        }
    }
})


const trafficData = {
    labels: ['Direct', 'Organic', 'Referral', 'Social'],
    datasets: [{
        data: [1200, 1900, 800, 1500],
        backgroundColor: [
            'rgba(79, 70, 229, 0.8)', // indigo
            'rgba(16, 185, 129, 0.8)', // emerald
            'rgba(245, 158, 11, 0.8)', // amber
            'rgba(236, 72, 153, 0.8)'  // pink
        ],
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1
    }]
}

const pieOptions = {
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20
            }
        }
    }
}


// User Acquisition Data (Stacked Bar Chart)
const userData = ref({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Organic',
            data: [1200, 1900, 1500, 2200, 1950, 2400],
            backgroundColor: '#10B981', // Tailwind emerald-500
            borderRadius: 6
        },
        {
            label: 'Paid',
            data: [800, 1200, 1000, 1500, 1300, 1800],
            backgroundColor: '#3B82F6', // Tailwind blue-500
            borderRadius: 6
        },
        {
            label: 'Referral',
            data: [400, 600, 500, 700, 650, 800],
            backgroundColor: '#F59E0B', // Tailwind amber-500
            borderRadius: 6
        }
    ]
})

// Options for stacked bar chart
const stackedOptions = ref({
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    }
})


</script>