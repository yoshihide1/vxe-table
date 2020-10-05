<script>
import { Line } from "vue-chartjs";
import {lineChartDataSet, chartOptions} from "../../modules/chartModule.js"
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
      coronaTransition: [],
      date: [],
      cases: [],
      discharge: [],
      hospitalize: [],
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
      this.cases = [];
      this.discharge = [];
      this.hospitalize = [];
      const data1 = this.byPrefData.slice(1, this.byPrefData.length);
      const data2 = this.byPrefData.slice(0, this.byPrefData.length - 1);
      for (let i in data1) {
        this.date.push(this.dateFormat(data1[i].created_at));
        this.cases.push(data1[i].cases - data2[i].cases);
        this.discharge.push(data1[i].discharge - data2[i].discharge);
        this.hospitalize.push(data1[i].hospitalize - data2[i].hospitalize);
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
          lineChartDataSet("退院", "rgba(0,0,0,0)", "#2BBA2B", this.discharge)
        ],
      }),
        (this.options = chartOptions(this.byPrefData[0].prefecture));

      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>