<template>
  <div>
    <!-- 本页面是订单列表  作为home的子组件 -->
    <el-table :data="arr" style="width: 100%;">
      <el-table-column prop="num" label="Order_No" align="center"></el-table-column>
      <el-table-column prop="price" label="Price" width="180"  align="center"></el-table-column>
      <el-table-column prop="status" label="Status" width="180"  align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: []
    };
  },
  components: {},
  methods: {
    getorder() {
      this.$axios.req("/orderData").then(res => {
        // console.log(res.data);
        this.arr = res.data;
        this.arr.map(item => {
          item.price = `￥${item.price}`
          if (item.status === 1) {
            item.status = "succese";
          }else if(item.status === 0){
            item.status = "pengding";
          }
        });
      });
    }
  },
  mounted() {
    this.getorder();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>

</style>