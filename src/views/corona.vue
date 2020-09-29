<template>
  <div class="container-fluid">
    <Updated class="date" />

    <Cumulative />

    <CCol col="13" sm="13">
      <CCard bodyWrapper>
        <LineChartPcr class="chart__pcr" />
      </CCard>
    </CCol>

    <CCol col="13" sm="13">
      <CCard bodyWrapper>
        <LineChart />
      </CCard>
    </CCol>
    <CRow>
      <CCol col="12" sm="6">
        <Domestic />
      </CCol>

      <CCol col="12" sm="6">
        <DomesticPrefecture />
      </CCol>
    </CRow>
    <CRow>
      <CCol col="12" sm="5">
        <CCard bodyWrapper>
          <LineChartPrefPcr class="chart__pref" />
        </CCard>
      </CCol>
      <CCol col="12" sm="7">
        <CCard bodyWrapper>
          <LineChartPref class="chart__pref" />
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol col="12" sm="8">
        <CCard bodyWrapper>
          <BarChart />
        </CCard>
      </CCol>
      <CCol col="12" sm="4">
        <CCard bodyWrapper>
          <PieChart />
        </CCard>
      </CCol>
    </CRow>
    <CCol col="13" sm="13">
      <CoronaTotal />
    </CCol>
  </div>
</template>

<script>
import CoronaTotal from "@/components/CoronaTotal";
import Cumulative from "@/components/Cumulative";
import Domestic from "@/components/Domestic";
import DomesticPrefecture from "@/components/DomesticPrefecture";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import LineChart from "@/components/LineChart";
import LineChartPcr from "@/components/LineChartPcr";
import LineChartPref from "@/components/LineChartPref";
import LineChartPrefPcr from "@/components/LineChartPrefPcr";
import Updated from "@/components/Updated";

export default {
  components: {
    CoronaTotal,
    Cumulative,
    Domestic,
    DomesticPrefecture,
    BarChart,
    PieChart,
    LineChart,
    LineChartPcr,
    LineChartPref,
    LineChartPrefPcr,
    Updated,
  },
  data() {
    return {};
  },
  watch: {},
  created() {
    this.$store.dispatch("coronaTotal");
  },
  methods: {},
};
</script>

<style lang="scss">
$info: #3e3d37;
@import "~@coreui/coreui/scss/coreui";
p {
  padding: 0;
  margin: 0;
}
.container-fluid {
  width: 95%;
  background-color: #fcfcfc;
}
.date {
  font-size: 20px;
}
.chart__pcr {
  height: 150px;
}
.chart__pref {
  height: 200px;
}
</style>