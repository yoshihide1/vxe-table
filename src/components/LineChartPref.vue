<script>
import { Line } from "vue-chartjs";
import { mapState } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState(["byPrefData"]),
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
    setPref() {
      console.log(this.byPrefData.length);
      let data1 = this.byPrefData.slice(1, this.byPrefData.length);
      let data2 = this.byPrefData.slice(0, this.byPrefData.length - 1);
      for (let i in data1) {
        this.date.push(this.dateFormat(data1[i].created_at));
        this.cases.push(data1[i].cases - data2[i].cases);
        this.discharge.push(data1[i].discharge - data2[i].discharge);
        this.hospitalize.push(data1[i].hospitalize - data2[i].hospitalize);
      }
      this.totalChart();
    },
    dateFormat(value) {
      const a = value.slice(4, 6);
      const b = value.slice(6, 9);
      return `${a}月${b}日`;
    },
    totalChart() {
      (this.datacollection = {
        labels: this.date,
        datasets: [
          {
            label: ["感染者"],
            pointBackgroundColor: "#fff",
            backgroundColor: "rgba(255,0,0,0.1)",
            borderWidth: 3,
            borderColor: "#D7366A",
            data: this.cases,
          },
          {
            label: ["入院"],
            pointBackgroundColor: "#fff",
            backgroundColor: "rgba(255,255,0,0.1)",
            borderWidth: 3,
            borderColor: "#F1CD42",
            data: this.hospitalize,
          },
          {
            label: ["退院"],
            pointBackgroundColor: "#fff",
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 3,
            borderColor: "#2BBA2B",
            data: this.discharge,
          },
        ],
      }),
        (this.options = {
          scales: {},
          title: {
            display: true,
            text: this.byPrefData[0].prefecture,
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