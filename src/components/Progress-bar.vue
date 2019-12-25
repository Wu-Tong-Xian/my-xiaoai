<template>
  <div>
    <div>
      <img src="../assets/123.png" alt />
    </div>
    <!-- 循环拿到的数组， -->
    <div v-for="(item) in bar" :key="item.id">
      {{item.name}}
     <!-- 如果数组中的progress =1 就让其进度条变为绿色，并打钩 -->
      <div v-if="item.progress === 1">
        <el-progress :percentage="(item.progress)*100" status="success"></el-progress>
      </div>
      <div v-else>
        <el-progress :percentage="(item.progress)*100"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bar: []
    };
  },
  components: {},
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    // get请求 拿到计算数据
    getProgressBar() {
      this.$axios.req("/progress").then(res => {
        console.log(res.data);
        this.bar = res.data;
      });
    }
  },
  mounted() {
    this.getProgressBar();
    this.format();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>