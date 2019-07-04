<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: {
      type: Array || Object,
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
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
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
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'downloads',
            borderColor: '#48CFAE',
            pointBackgroundColor: '#48CFAE',
            borderWidth: 1,
            pointBorderColor: '#48CFAE',
            pointColor: '#48CFAE',
            backgroundColor: 'transparent',
            data: this.chartData,
          },
        ],
      },
      this.options,
    );
  },
};
</script>
