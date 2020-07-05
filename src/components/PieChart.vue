<script>
import { Pie } from "vue-chartjs";
import { mapState } from "vuex";
export default {
  extends: Pie,
  computed: {
    ...mapState(["coronaTotalData"])
  },
  data() {
    return {
      datacollection: {},
      options: {}
    };
  },
  watch: {
    coronaTotalData() {
      this.totalChart();
    }
  },
  methods: {
    totalChart() {
      let total = this.coronaTotalData;
      (this.datacollection = {
        labels: ["感染者", "入院中", "退院", "重症", "死者"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: [
              "#008DA9",
              "#5EAD7D",
              "#11843E",
              "#DE4027",
              "#FFBCD7"
            ],
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: [
              total.cases,
              total.hospitalize,
              total.discharge,
              total.severe,
              total.deaths
            ]
          }
        ]
      }),
        (this.options = {
          scales: {},
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        });
      this.renderChart(this.datacollection, this.options);
    }
  }
};
</script>