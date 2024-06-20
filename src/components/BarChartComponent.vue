<template>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Ju', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                datasets: [ 
                    { 
                        data: [40, 20, 12, 35, 50, 60, 70, 80, 80, 42, 24, 100],
                        backgroundColor: 'rgba(32, 168, 156, 1)', // color of the bars
                        borderColor: 'rgba(25, 61, 78, 1)', // color of the bar borders
                        borderWidth: 1 // width of the bar borders
                    } 
                ]
            },

            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false, // this will hide the legend
                    },
                    title: {
                        display: true,
                        text: '   Rented Properties by Month',
                        font: {
                            size: 18,
                            weight: 800,
                        },
                        color: '#193D4E',
                        align: 'start',
                        padding: {
                            top: 10, 
                            bottom: 15,
                        },
                    },
                }
            }
        }
    }
}
</script>
