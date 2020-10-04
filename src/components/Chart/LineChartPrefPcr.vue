<script>
import { Line } from "vue-chartjs";
import { lineChartDataSet, chartOptions } from "../../modules/chartModule.js";
import { mapState, mapGetters } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState(["byPrefData"]),
    ...mapGetters(["dateFormat"]),
  },
  data() {
    return {
      datacollection: {},
      options: {},
      date: [],
      pcr: [],
    };
  },
  watch: {
    byPrefData() {
      this.setPref();
    },
  },
  methods: {
    setPref(test = false) {
      this.date = [];
      this.pcr = [];
      const data1 = this.byPrefData.slice(1, this.byPrefData.length);
      const data2 = this.byPrefData.slice(0, this.byPrefData.length - 1);
      for (let i in data1) {
        this.date.push(this.dateFormat(data1[i].created_at));
        this.pcr.push(data1[i].pcr - data2[i].pcr);
      }
      if (test) return;
      this.totalChart();
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          lineChartDataSet("PCR検査", "rgba(0,0,255,0.1)", "#673FC4", this.pcr),
        ],
      }),
        (this.options = chartOptions(this.byPrefData[0].prefecture));

      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>