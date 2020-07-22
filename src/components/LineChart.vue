<script>
import { Line } from "vue-chartjs";
import { mapState } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState(["ratio"])
  },
  data() {
    return {
      datacollection: {},
      options: {},
      coronaTransition: [],
      date: [],
      cases: [],
      discharge: []
    };
  },
  watch: {
    ratio() {
      this.setRatio();
    }
  },
  methods: {
    setRatio() {
      this.cases = [];
      this.discharge = [];
      this.date = [];
      let data1 = this.ratio.slice(0, this.ratio.length - 1);
      let data2 = this.ratio.slice(1, this.ratio.length);
      for (let i in data1) {
        this.date.unshift(data1[i].date.slice(5).replace("-", "月") + "日");
        this.cases.unshift(data1[i].cases - data2[i].cases);
        this.discharge.unshift(data1[i].discharge - data2[i].discharge);
      }
      this.totalChart();
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          {
            label: ["感染者"],
            pointBackgroundColor: "#fff",
            borderWidth: 3,
            borderColor: "#D7366A",
            data: this.cases
          },
          {
            label: ["退院者"],
            pointBackgroundColor: "#fff",
            borderWidth: 3,
            borderColor: "#673FC4",
            data: this.discharge
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