<script>
import { Pie } from "vue-chartjs";
import { chartOptions } from "../../modules/chartModule.js";
import { mapState } from "vuex";
export default {
  extends: Pie,
  computed: {
    ...mapState(["prefData"]),
  },
  data() {
    return {
      datacollection: {},
      options: {},
    };
  },
  watch: {
    prefData() {
      this.totalChart();
    },
  },
  methods: {
    totalChart() {
      const total = this.prefData;
      (this.datacollection = {
        labels: ["PCR検査(累計)", "感染者(累計)"],
        datasets: [
          {
            label: [""],
            backgroundColor: ["blue", "red"],
            borderWidth: 2,
            pointBorderColor: "#249EBF",
            data: [total["pcr"].today, total["cases"].today],
          },
        ],
      }),
        (this.options = chartOptions(total.prefecture));

      this.renderChart(this.datacollection, this.options);
    },
  },
};
</script>