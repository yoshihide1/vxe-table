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
          {
            label: ["感染者"],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            backgroundColor: "rgba(255,0,0,0.1)",
            borderWidth: 2,
            borderColor: "#D7366A",
            radius: 1,
            hitRadius: 3,
            data: this.cases,
          },
          {
            label: ["入院"],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            backgroundColor: "rgba(255,255,0,0.1)",
            borderWidth: 2,
            borderColor: "#F1CD42",
            radius: 1,
            hitRadius: 3,
            data: this.hospitalize,
          },
          {
            label: ["退院"],
            pointBackgroundColor: "#fff",
            pointBorderWidth: 2,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 2,
            borderColor: "#2BBA2B",
            radius: 1,
            hitRadius: 3,
            data: this.discharge,
          },
        ],
      }),
        (this.options = {
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 100,
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