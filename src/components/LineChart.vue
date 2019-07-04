<template>
  <h1>Line Chart</h1>
</template>

<script>
import { Line } from 'vue-chartjs';

export default {
  props: {
    chartData: {
      type: Array,
      required: false,
    },
    chartLabels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: { beginAtZero: true },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: { display: false },
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart({
      labels: 'downloads',
      borderColor: '#249ebf',
      pointBackgroundColor: 'white',
      borderWidth: 1,
      pointBorderColor: '#239ebf',
      backgroundColor: 'transparent',
      data: this.chartData,
    });
  },
};
</script>

<style>
</style>
