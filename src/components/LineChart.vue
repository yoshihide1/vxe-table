<script>
import { Line } from "vue-chartjs";
import { mapState } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState(["ratio"]),
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
        this.hospitalize.unshift(data1[i].hospitalize - data2[i].hospitalize);
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
        (this.options = {
          scales: {
            scaleLabel: {},
          },
          title: {
            display: true,
            text: "日本国内",
            fontSize: 15,
            padding: 0,
          },
          legend: {
            display: true,
          },
          responsive: true,
          maintainAspectRatio: false,
        });

      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>