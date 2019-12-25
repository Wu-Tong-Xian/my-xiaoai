<template>
  <div>
    <!-- 本页面为公共页面只写有头部和侧边栏部分 -->
    <!-- 头部开始 -->
    <div class="head">
      <div>欢迎{{name}}来到Panda后台管理系统</div>
      <div>亲爱的{{name}}, 本次登录时间为{{time1}}</div>
    </div>
    <!-- 侧边栏开始 -->
    <div class="box">
      <div class="box-left">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpHome">首页</span>
              </el-menu-item>

              <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpTable">分页表格</span>
              </el-menu-item>

              <el-menu-item index="7">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpTag">标签页</span>
              </el-menu-item>
              <el-menu-item index="9">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpUpload">图片上传</span>
              </el-menu-item>

              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpPublished">已发布</span>
              </el-menu-item>
              <el-menu-item index="6">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpWarkdown">发布文章</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpStato">统计</span>
              </el-menu-item>

              <el-menu-item index="8">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpQuery">导出excel</span>
              </el-menu-item>

              <el-menu-item index="10">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="jumpLogout">退出系统</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!-- 这是子路由也是主页的内容，写在home中 -->
      <div class="box-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      time1: ""
    };
  },
  components: {},
  methods: {
    // 点击跳转到主页面
    jumpHome() {
      this.$router.push("/");
    },
    // 跳转到已发布页面
    jumpPublished() {
      this.$router.push("/Publish");
    },
    // 跳转到统计页面
    jumpStato() {
      this.$router.push("/Stato");
    },

    // 跳转到发布文章页面
    jumpWarkdown() {
      this.$router.push("/Warkdown");
    },
    // 跳转到标签页面
    jumpTag() {
      this.$router.push("/Tag");
    },

    // 跳转到导出页面
    jumpQuery() {
      this.$router.push("/Query");
    },
    // 跳转到图片上传页面
    jumpUpload() {
      this.$router.push("/Upload");
    },
    // 跳转到退出页面
    jumpLogout() {
      this.$router.push("/Logout");
    },
    // 跳转到分页表格页面
    jumpTable() {
      this.$router.push("/Table");
    },

    // 把登录时间转换为标准时间
    standardTime() {
      this.time1 = this.$dayjs(localStorage.getItem("time")).format(
        "YYYY年MM月DD日 HH时mm分ss秒"
      );
    }
  },
  mounted() {
    this.name = localStorage.getItem("name");
    // this.time = localStorage.getItem('time');
    this.standardTime();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.head {
  justify-content: space-between;
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: aliceblue;
  background: rgb(46, 94, 133);
  overflow: hidden;
}
.head div {
  margin: 0 30px 0 30px;
}
.box-left {
  width: 10%;
  // height:720px;
  background: #545c64;
}
.box {
  display: flex;
}
.box-right {
  width: 88%;
  height: 780;
  margin: 30px 14px 10px 15px;
}
</style>