<script>
  import { Bar } from 'vue-chartjs'
  export default {
    extends: Bar,
    data () {
      return {
        datacollection: {
          labels: ["感染者", "入院中", "退院", "重症", "死者", ],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: 'black',
              pointBackgroundColor: 'red',
              borderWidth: 1,
              pointBorderColor: 'glay',
              data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>