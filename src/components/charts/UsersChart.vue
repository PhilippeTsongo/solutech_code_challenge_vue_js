
<template>
	<div class="w-full max-h-48 mb-5 py-4 px-4">
      	<canvas ref="usersChart"></canvas>
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
			const canvas = this.$refs.usersChart;
			if (!canvas) {
				console.error("Canvas element not found");
			return;
			}
  
			// console.log(this.data);
			const ctx = canvas.getContext('2d');
			this.chart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Total Users', 'Active', 'Inactive'],
					datasets: [
						{
							label: 'Number of users',
							data: [this.data.users, this.data.active, this.data.inactive],
							backgroundColor: ['#3498db', '#2ecc71', '#FF0000'], //'#e74c3c'],
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
  