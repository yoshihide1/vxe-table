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
      pcr: []
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
      this.pcr = [];
      this.date = [];
      let data1 = this.ratio.slice(0, this.ratio.length - 1);
      let data2 = this.ratio.slice(1, this.ratio.length);
      for (let i in data1) {
        this.date.unshift(data1[i].date.slice(5).replace("-", "月") + "日");
        this.cases.unshift(data1[i].cases - data2[i].cases);
        this.pcr.unshift(data1[i].pcr - data2[i].pcr);
      }
      this.totalChart();
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          {
            label: ["感染者"],
            pointBackgroundColor: "blue",
            borderWidth: 3,
            borderColor: "orange",
            data: this.cases
          },
          {
            label: ["PCR検査"],
            pointBackgroundColor: "black",
            borderWidth: 3,
            borderColor: "green",
            data: this.pcr
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