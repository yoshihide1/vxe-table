<script>
import { Line } from "vue-chartjs";
import { lineChartDataSet, chartOptions } from "../../modules/chartModule.js";
import { mapState, mapGetters } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["dateFormat"]),
  },
  data() {
    return {
      datacollection: {},
      options: {},
      coronaTransition: [],
      date: [],
      cases: [],
      discharge: [],
      hospitalize: [],
    };
  },
  watch: {
    ratio() {
      this.setRatio();
    },
  },
  methods: {
    setRatio(test = false) {
      this.cases = [];
      this.discharge = [];
      this.date = [];
      const data1 = this.ratio.slice(0, this.ratio.length - 1);
      const data2 = this.ratio.slice(1, this.ratio.length);
      for (let i in data1) {
        this.date.unshift(this.dateFormat(data1[i].date.replace(/[-]/g, "")));
        this.cases.unshift(data1[i].cases - data2[i].cases);
        this.discharge.unshift(data1[i].discharge - data2[i].discharge);
        this.hospitalize.unshift(data1[i].hospitalize - data2[i].hospitalize);
      }
      if (test) return;
      this.totalChart();
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          lineChartDataSet("感染者", "rgba(255,0,0,0.1)", "#D7366A", this.cases),
          lineChartDataSet("入院", "rgba(255,255,0,0.1)", "#F1CD42", this.hospitalize),
          lineChartDataSet("退院", "rgba(0,0,0,0)", "#2BBA2B", this.discharge),
        ],
      }),
        (this.options = chartOptions("日本国内"));

      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>