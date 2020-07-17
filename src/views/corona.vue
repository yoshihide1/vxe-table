<template>
  <div class="container">
    <div>
      <cumulative />
      <domestic />
      <domesticPrefecture />
      <populationRatio />
    </div>
    <div class="corona__total__header">
      <headerTotal></headerTotal>
    </div>
    <div class="chart">
      <barChart class="chart__bar"></barChart>
      <pieChart class="chart__pie"></pieChart>
    </div>
    <div>
      <lineChart></lineChart>
    </div>
    <coronaTotal />
  </div>
</template>

<script>
import headerTotal from "@/components/headerTotal";
import coronaTotal from "@/components/coronaTotal";
import cumulative from "@/components/Cumulative"
import domestic from "@/components/Domestic"
import domesticPrefecture from "@/components/DomesticPrefecture"
import populationRatio from "@/components/PopulationRatio"
import barChart from "@/components/BarChart";
import pieChart from "@/components/PieChart";
import lineChart from "@/components/LineChart";

export default {
  components: {
    headerTotal,
    coronaTotal,
    cumulative,
    domestic,
    domesticPrefecture,
    populationRatio,
    barChart,
    pieChart,
    lineChart
  }
};
</script>

<style>
.container {
  background-color: #fcfcfc;
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

@media screen and (max-width: 768px) {
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