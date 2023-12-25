
<template>
    <!-- <div class="flex w-full border h-48 py-4 px-4"> -->
	<div class="flex md:w-full py-4 px-4">

      	<canvas ref="loansChart"></canvas>
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
			const canvas = this.$refs.loansChart;
			if (!canvas) {
				console.error("Canvas element not found");
			return;
			}
  
			console.log(this.data);
			const ctx = canvas.getContext('2d');
			this.chart = new Chart(ctx, {
				type: 'polarArea',
				data: {
					labels: ['Total Loans', 'Pending Loans', 'Approved Loans', 'Rejected Loans', 'Extended Loans', 'Returned Loans'],
					datasets: [
						{
							label: 'Number of Loans',
							data: [this.data.loans, this.data.pending, this.data.approved, this.data.rejected, this.data.extended, this.returned],
							backgroundColor: ['#000000', '#FFA500', '#008000', '#FF0000', '#0000FF', '#FFFF00'],
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
  