<template>
  <div class="updated">
    <p>{{ updated }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      updated: ""
    };
  },
  computed: {
    ...mapState(["ratio"])
  },
  watch: {
    ratio() {
      this.lastUpdate(this.ratio[0].date);
    }
  },
  methods: {
    lastUpdate(date) {
      const a = String(date);
      const b = a.slice(0, 4);
      const c = a.slice(5, 7);
      const d = a.slice(8, 10);
      this.updated = `最終更新日${b}年${c}月${d}日`;
    }
  }
};
</script>

<style>
</style>