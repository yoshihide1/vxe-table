<template>
  <div id="ranking">
    <button @click="getData">Get</button>
    <vxe-table border height="300" :data="ranking">
      <vxe-table-column field="Item.rank" title="順位" width="70" sortable></vxe-table-column>
      <vxe-table-column field="Item.itemName" title="商品名" show-overflow></vxe-table-column>
      <vxe-table-column field="Item.reviewAverage" title="★" width="70" sortable></vxe-table-column>
      <vxe-table-column field="Item.itemPrice" title="価格" width="70" sortable></vxe-table-column>
      <vxe-table-column field="Item.shopName" title="店名" show-overflow sortable></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ranking: []
    };
  },
  computed: {
    ...mapState(["rankingData"])
  },
  created() {
    console.log(1);
  },
  watch: {
    rankingData() {
      this.setData(this.rankingData);
    }
  },
  methods: {
    getData() {
      this.$store.dispatch("rankingData");
    },
    setData(data) {
      this.ranking = data[0];
    }
  }
};
</script>

<style>
.vxe-button.type--button.theme--my-purple,
.vxe-button.type--button.theme--my-purple:hover {
  color: #fff;
}
.vxe-button.type--button.theme--my-purple {
  background-color: #800080;
}
.vxe-button.type--button.theme--my-purple:active {
  background-color: #a50aa5;
}
.my-green {
  color: #008000;
}
.my-primary {
  color: #3196ff;
}
.my-success {
  color: #67c23a;
}
.my-info {
  color: #909399;
}
.my-warning {
  color: #e6a23c;
}
.my-danger {
  color: #f56c6c;
}
</style>