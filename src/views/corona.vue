<template>
  <div class="container-fluid">
    <updated class="date" />

    <cumulative />

    <CCol col="13" sm="13">
      <CCard bodyWrapper>
        <lineChart />
      </CCard>
    </CCol>
    <CRow>
      <CCol col="12" sm="6">
        <domestic />
      </CCol>

      <CCol col="12" sm="6">
        <domesticPrefecture />
      </CCol>
    </CRow>
    <CRow>
      <CCol col="12" sm="8">
        <CCard bodyWrapper>
          <barChart />
        </CCard>
      </CCol>
      <CCol col="12" sm="4">
        <CCard bodyWrapper>
          <pieChart />
        </CCard>
      </CCol>
    </CRow>
    <CCol col="13" sm="13">
        <coronaTotal />
    </CCol>
  </div>
</template>

<script>
import coronaTotal from "@/components/coronaTotal";
import cumulative from "@/components/Cumulative";
import domestic from "@/components/Domestic";
import domesticPrefecture from "@/components/DomesticPrefecture";
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
    barChart,
    pieChart,
    lineChart,
    updated
  },
  data() {
    return {
      pc: false,
      sp: false,
      repkaceWidth: 768,
      windowSize: 0
    };
  },
  watch: {},
  created() {
    this.windowSwitch();
    this.$store.dispatch("coronaTotal");
    this.$store.dispatch("coronaTwoDay");
  },
  methods: {
    windowSwitch() {
      let size = parseInt(window.innerWidth);
      if (size > 768) {
        this.pc = !this.pc;
        console.log(1);
      } else {
        this.sp = !this.sp;
        console.log(2);
      }
    }
  }
};
</script>

<style lang="scss">
@import "~@coreui/coreui/scss/coreui";
.container-fluid {
  width: 95%;
  background-color: #fcfcfc;
}
.date {
  font-size: 20px;
}
</style>