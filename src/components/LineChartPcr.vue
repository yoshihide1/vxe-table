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
    setRatio() {
      this.pcr = [];
      this.date = [];
      let data1 = this.ratio.slice(0, this.ratio.length - 1);
      let data2 = this.ratio.slice(1, this.ratio.length);
      for (let i in data1) {
        this.date.unshift(data1[i].date.slice(5).replace("-", "月") + "日");
        this.pcr.unshift(data1[i].pcr - data2[i].pcr);
        this.cases.unshift(data1[i].cases - data2[i].cases);
      }
      this.totalChart();
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          {
            label: ["PCR検査の推移"],
            pointBackgroundColor: "#fff",
            backgroundColor: "rgba(0,0,255,0.1)",
            borderWidth: 3,
            borderColor: "#673FC4",
            data: this.pcr,
          },
        ],
      }),
        (this.options = {
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  stepSize: 5000,
                },
              },
            ],
          },
          title: {
            display: true,
            text: "全国",
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