<script>
import { Line } from "vue-chartjs";
import { mapState, mapGetters } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState(["ratio"]),
    ...mapGetters(["chartOptions"])
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
        this.date.unshift(this.dateFormat(data1[i].date));
        this.cases.unshift(data1[i].cases - data2[i].cases);
        this.discharge.unshift(data1[i].discharge - data2[i].discharge);
        this.hospitalize.unshift(data1[i].hospitalize - data2[i].hospitalize);
      }
      if (test) return;
      this.totalChart();
    },
    dateFormat(date) {
      if (date) {
        return date.slice(5).replace("-", "月") + "日";
      }
      return;
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          {
            label: ["感染者"],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            backgroundColor: "rgba(255,0,0,0.1)",
            borderWidth: 3,
            borderColor: "#D7366A",
            hitRadius: 5,
            radius: 2,
            data: this.cases,
          },
          {
            label: ["入院"],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            backgroundColor: "rgba(255,255,0,0.1)",
            borderWidth: 3,
            borderColor: "#F1CD42",
            hitRadius: 5,
            radius: 2,
            data: this.hospitalize,
          },
          {
            label: ["退院"],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 3,
            borderColor: "#2BBA2B",
            hitRadius: 5,
            radius: 2,
            data: this.discharge,
          },
        ],
      }),
        this.options = this.chartOptions("日本国内")

      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>