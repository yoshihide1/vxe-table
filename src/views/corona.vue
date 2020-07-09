<template>
  <div class="container">
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
import headerTotal from "@/components/headerTotal";
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
.container {
  background-color: #FCFCFC;
}
.chart {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.chart__bar {
  width: 55%;
}
.chart__pie {
  width: 40%;
}

@media screen and (max-width:768px ) {
  .chart {
    display: block;
  }
  .chart__bar {
    width: 95%;
    margin: 0 auto;
  }
  .chart__pie {
    width: 95%;
    margin: 0 auto;
  }
}
</style>