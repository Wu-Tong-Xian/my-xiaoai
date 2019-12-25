<template>
  <div>
    <ve-pie :data="chartData2"></ve-pie>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData2: {
        columns: ['name',"data",],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    // 获取饼图的get请求
    gethomePie(){
      this.$axios.req('/ringChat').then(res=>{
        // console.log(res.data);
        this.chartData2.rows =res.data
        // console.log(this.chartData2);
      })
    }
  },
  mounted() {
    this.gethomePie();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>