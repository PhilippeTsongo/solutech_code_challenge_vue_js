<template>
  <div class="flex md:w-full py-4 px-4">
    <canvas ref="booksChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            chart: null,
        };
    },
    props: ['data'],
    mounted() {
        // Wait for next tick to ensure the canvas element is rendered
        this.$nextTick(() => {
            this.renderChart();
        });
    },
    methods: {
        renderChart() {
            // Destroy existing chart if it exists
            if (this.chart) {
                this.chart.destroy();
            }

            // Check if the canvas element is available
            const canvas = this.$refs.booksChart;
            if (!canvas) {
                console.error("Canvas element not found");
                return;
            }

            const ctx = canvas.getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                labels: ['Total Books', 'Available Books', 'Unavailable Books'],
                datasets: [
                    {
                        label: 'Number of Books',
                        data: [this.data.books, this.data.available, this.data.unavailable],
                        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
                    },
                ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },

    watch: {
        data: function (newData) {
            // Check if chart instance exists and destroy it
            if (this.chart) {
                this.chart.destroy();
            }
            // Render the new chart with updated data
            this.renderChart();
        },
    },
};
</script>

