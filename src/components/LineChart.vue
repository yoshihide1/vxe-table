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
      pcr: [],
      deaths: []
    };
  },
  watch: {
    ratio() {
      this.setRatio();
    }
  },
  methods: {
    setRatio() {
      let data1 = this.ratio.slice(0, this.ratio.length - 1);
      let data2 = this.ratio.slice(1, this.ratio.length);
      for (let i in data1) {
        this.date.unshift(data1[i].date);
        this.cases.unshift(data1[i].cases - data2[i].cases);
        this.pcr.unshift(data1[i].pcr - data2[i].pcr);
        this.deaths.unshift(data1[i].deaths - data2[i].deaths);
      }
      this.totalChart();
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          {
            label: ["感染者"],
            // backgroundColor: "pink",
            pointBackgroundColor: "black",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: this.cases
          },
          {
            label: ["PCR検査"],
            // backgroundColor: "#F24C0C",
            pointBackgroundColor: "pink",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            data: this.pcr
          },
          {
            label: ["死者"],
            // backgroundColor: "black",
            pointBackgroundColor: "red",
            borderWidth: 1,
            pointBorderColor: "black",
            data: this.deaths
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