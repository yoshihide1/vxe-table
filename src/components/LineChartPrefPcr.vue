<script>
import { Line } from "vue-chartjs";
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
          {
            label: ["PCR検査"],
            pointBackgroundColor: "#fff",
            backgroundColor: "rgba(0,0,255,0.1)",
            borderWidth: 2,
            borderColor: "#673FC4",
            radius: 1,
            hitRadius: 3,
            data: this.pcr,
          },
        ],
      }),
        (this.options = {
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 1000,
                },
              },
            ],
          },
          title: {
            display: true,
            text: this.byPrefData[0].prefecture,
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