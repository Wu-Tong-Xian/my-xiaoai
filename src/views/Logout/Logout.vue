<template>
  <el-button type="text" @click="open">
    <img src="../../assets/timg (1).gif" alt class="box-img" />
    <div class="box">不要啊,别离开我</div>
  </el-button>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    dropOut() {
      // this.$axios
      //   .req("/user/logout")
      //   .then(res => {
      //     // this.$router.push("/login");
      //     localStorage.removeItem("name");
      //     localStorage.removeItem("time");
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, "您确定要退出登录吗? ")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
// 点击确定之后退出登录 并且清除localStorage数据，并跳转到登录界面
            this.$axios.req("/user/logout").then(res => {
                localStorage.removeItem("name");
                localStorage.removeItem("time");
                 this.$router.push("/login");
              })
              .catch(err => {
                console.log(err);
              });

            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "info",
         message: "action: " + '您已成功退出本系统'
        });
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box-img {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
.box {
  font-size: 30px;
}
</style>