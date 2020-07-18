<template>
  <div class="container">
    <updated />
    <div class="aaa">
      <cumulative />
      <populationRatio />
      <domestic />
      <domesticPrefecture />
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
import coronaTotal from "@/components/coronaTotal";
import cumulative from "@/components/Cumulative";
import domestic from "@/components/Domestic";
import domesticPrefecture from "@/components/DomesticPrefecture";
import populationRatio from "@/components/PopulationRatio";
import barChart from "@/components/BarChart";
import pieChart from "@/components/PieChart";
import lineChart from "@/components/LineChart";
import updated from "@/components/updated";

export default {
  components: {
    coronaTotal,
    cumulative,
    domestic,
    domesticPrefecture,
    populationRatio,
    barChart,
    pieChart,
    lineChart,
    updated
  }
};
</script>

<style>
.container {
  width: 100%;
}
.container {
  background-color: #fcfcfc;
}
.aaa {
  display: flex;
  justify-content: space-around;
}
.card {
  width: 20%;
  font-size: 1.4rem;
}
.card__title {
  position: relative;
  /* background-color: gray; */
  bottom: -15px;
  overflow: hidden;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  padding: 0.2rem;
  font-weight: bolder;
  background: linear-gradient(#829ebc, #354453fd);
}
.card__title p {
  margin: 1rem;
}
.card__body {
  background-color: white;
  color: black;
  padding: 0.4rem;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}
.card__title select {
  font-size: 1.4rem;
  padding: 0 1rem 5px;
  margin-right: 0.5rem;
  border: 2px solid white;
  border-radius: 5px;
  text-indent: 10px;
  background: none transparent;
  color: white;
}
.card__title select option {
  color: black;
}
.card__font__span {
  font-size: 0.9rem;
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