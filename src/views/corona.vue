<template>
  <div>
    <div id="pc">
      <div class="container">
        <updated class="date" />
        <div class="wrap__1">
          <lineChart class="chart__line"></lineChart>
          <cumulative class="card__cumulative" />
        </div>

        <div class="wrap__2">
          <domesticPrefecture class="card__domestic__prefecture" />
          <pieChart class="chart__pie"></pieChart>
          <populationRatio class="card__population__ratio" />
        </div>

        <div class="wrap__3">
          <domestic class="card__domestic" />
          <barChart class="chart__bar"></barChart>
        </div>
        <coronaTotal />
      </div>
    </div>

    <div id="sp">
      <div container>
        <updated class="date" />
        <lineChart class="chart__line"></lineChart>
        <div class="tab__group">
          <input type="radio" name="tab__name" id="cumulative" checked />
          <label class="tab__class" for="cumulative">日本国内</label>
          <div class="card__content">
            <div class="card">
              <cumulative class="card__cumulative" />
            </div>
            <div class="card">
              <populationRatio class="card__population__ratio" />
            </div>
            <div class="card">
              <domestic class="card__domestic" />
            </div>
          </div>
          <input type="radio" name="tab__name" id="domestic__prefecture" checked />
          <label class="tab__class" for="domestic__prefecture">都道府県別</label>
          <div class="card__content">
            <div class="card">
              <domesticPrefecture class="card__domestic__prefecture" />
              <pieChart class="chart__pie"></pieChart>
            </div>
          </div>
        </div>
        <barChart class="chart__bar"></barChart>
        <coronaTotal />
      </div>
    </div>
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
#pc {
  display: block;
}
#sp {
  display: none;
}
.container {
  width: 100%;
  background-color: #fcfcfc;
}
.date {
  font-size: 20px;
}

.wrap__1 {
  display: flex;
  justify-content: space-around;
  height: 350px;
}
.wrap__2 {
  display: flex;
  justify-content: space-around;
  height: 350px;
}
.wrap__3 {
  display: flex;
  justify-content: center;
  height: 350px;
  margin-top: 1rem;
}

.card {
  font-size: 1.4rem;
  width: 25%;
  margin: auto 0;
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
.chart__bar {
  width: 70%;
}
.chart__pie {
  width: 30%;
  margin: 0 1rem;
}
.chart__line {
  width: 70%;
}
.card__domestic {
  margin-right: 1rem;
}

@media screen and (max-width: 768px) {
  #pc {
    display: none;
  }
  #sp {
    display: block;
  }
  .chart__line {
    width: 100%;
    margin: 0 auto;
  }
  .chart__bar {
    width: 95%;
    margin: 0 auto;
  }
  .chart__pie {
    width: 95%;
    margin: 0 auto;
  }
  .card {
    width: 95%;
    margin: 0 auto;
  }
  .tab__group {
    width: 95%;
    margin: auto;
    margin-top: 1rem;
    flex-wrap: wrap;
    display: flex;
  }
  .tab__class {
    width: calc(100% / 2);
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: block;
    float: left;
    order: -1;
  }
  input[name="tab__name"] {
    display: none;
  }

  input:checked + .tab__class {
    background: linear-gradient(#000, gray);

    color: aliceblue;
  }

  .card__content {
    display: none;
    width: 100%;
  }

  input:checked + .tab__class + .card__content {
    display: block;
  }
}
</style>