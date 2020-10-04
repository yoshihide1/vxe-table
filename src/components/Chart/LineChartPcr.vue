<script>
import { Line } from "vue-chartjs";
import { mapState, mapGetters } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["chartOptions", "dateFormat"]),
  },
  data() {
    return {
      datacollection: {},
      options: {},
      date: [],
      pcr: [],
      cases: [],
    };
  },
  watch: {
    ratio() {
      this.setRatio();
    },
  },
  methods: {
    setRatio(test = false) {
      this.pcr = [];
      this.date = [];
      const data1 = this.ratio.slice(0, this.ratio.length - 1);
      const data2 = this.ratio.slice(1, this.ratio.length);
      for (let i in data1) {
        this.date.unshift(this.dateFormat(data1[i].date.replace(/[-]/g, "")));
        this.pcr.unshift(data1[i].pcr - data2[i].pcr);
        this.cases.unshift(data1[i].cases - data2[i].cases);
      }
      if (test) return;
      this.totalChart();
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          {
            label: ["PCR検査"],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            backgroundColor: "rgba(0,0,255,0.1)",
            borderWidth: 3,
            borderColor: "#673FC4",
            hitRadius: 3,
            radius: 2,
            data: this.pcr,
          },
        ],
      }),
        (this.options = this.chartOptions("日本国内"));

      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>