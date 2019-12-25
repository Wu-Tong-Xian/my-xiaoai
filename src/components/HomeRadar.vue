<template>
  <div>
    <ve-radar :data="chartData1" ></ve-radar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData1: {
        columns: ["name", "sales","ministration","techology",'marketing', "delelopmer"  ],
        rows: [],
      }
    };
  },
  components: {},
  methods: {
    // 获取雷达图的get请求
    getradarChat() {
      this.$axios.req("/radarChat").then(res => {
        // console.log(res.data);
        this.chartData1.rows = res.data;
          // console.log(this.chartData1);
      });
    },
    
    
  },
  mounted() {
    this.getradarChat();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>

</style>