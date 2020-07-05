<template>
  <div id="corona">
    <div class="corona__total__header">
    <headerTotal></headerTotal>
    </div>
    <div class="chart">
      <barChart class="chart__bar"></barChart>
      <pieChart class="chart__pie"></pieChart>
    </div>

    <coronaTotal />
  </div>
</template>

<script>
import headerTotal from "@/components/headerTotal"
import coronaTotal from "@/components/coronaTotal";
import barChart from "@/components/BarChart";
import pieChart from "@/components/PieChart";

export default {
  components: {
    headerTotal,
    coronaTotal,
    barChart,
    pieChart
  }
};
</script>

<style>
/* .corona__total__header {
} */
.chart {
  display: flex;
}
.chart__bar {
  width: 40%;
}
.chart__pie {
  width: 40%;
}
</style>