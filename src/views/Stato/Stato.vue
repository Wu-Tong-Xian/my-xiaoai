<template>
  <div>
    <!-- 本页面是统计页面 -->
    <!-- 头部开始 -->
    <div class="stato-head">
      <div class="head-style">
        <el-button type="primary" class="head-style1">
          <div class="head-style2">
            <div>今日发布</div>
            <div class="el-icon-check head-style3"></div>
          </div>
          <div>1</div>
        </el-button>
      </div>
      <div class="head-style">
        <el-button type="success" class="head-style1">
          <div class="head-style2">
            <div>原创文章</div>
            <div class="el-icon-tickets head-style3"></div>
          </div>
          <div>5</div>
        </el-button>
      </div>
      <div class="head-style">
        <el-button type="info" class="head-style1">
          <div class="head-style2">
            <div>新留言</div>
            <div class="el-icon-bell head-style3"></div>
          </div>
          <div>0</div>
        </el-button>
      </div>
      <div class="head-style">
        <el-button type="danger" class="head-style1">
          <div class="head-style2">
            <div>新消息</div>
            <div class="el-icon-phone-outline head-style3"></div>
          </div>
          <div>0</div>
        </el-button>
      </div>
    </div>
    <!-- 头部结束 -->
    <!-- 饼图开始 -->
    <div class="figure">
      <div class="figure-pie1">
        <ve-pie :data="chartData"></ve-pie>
      </div>
      <!-- 玫瑰图开始 -->
      <div class="figure-pie2">
        <ve-pie :data="chartData1" :settings="chartSettings"></ve-pie>
      </div>
    </div>
    <!-- 瀑布图开始 -->
    <div>
      <ve-waterfall :data="chartData2"></ve-waterfall>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      // 饼图
      chartData: {
        columns: ["category", "num"],
        rows: []
      },
      // 玫瑰图
      chartData1: {
        columns: ["source", "num"],
        rows: []
      },
      // 瀑布图
      chartData2: {
        columns: ["date", "num"],
        rows: [  ]
      }
    };
  },
  components: {},
  methods: {
    getAllData() {
      // 通过请求拿到数据
      this.$axios
        .req("/article/allArticle ")
        .then(res => {
          // console.log(res.data);
          // 定义一个list来装收到的数据
          let list = res.data;
          list.map(item=>{
            item.date = this.$dayjs(item.date).format('YYYY年MM月DD日')
          })
          // 定义一个categorys对象 来接受 分组信息  groupBy是lodash的方法  第一个参数为：我们的数组，第二个：我们要分的东西
          // 饼图的数据
          // console.log(list);
          let categorys = this.$lodash.groupBy(list, "category");
          // 循环这个对象
          // console.log(categorys);
          for (let i in categorys) {
            // 并且把循环到的push进要画图的数组里面
            this.chartData.rows.push({
              category: i,
              num: categorys[i].length
            });
          }

          // 饼图的数据
          let list1 = res.data;
          // console.log(list1);
          let sources = this.$lodash.groupBy(list1, "source");
          // console.log(sources);
          for (let i in sources) {
            // console.log(i);
            this.chartData1.rows.push({
              source: i,
              num: sources[i].length
            });
          }

          // 瀑布图
          let list2 = res.data;
          console.log(list2);
          let dates = this.$lodash.groupBy(list2, "date");
          console.log(dates);
          for (let i in dates) {
            // console.log(i);
           
            this.chartData2.rows.push({
              date: i,
              num: dates[i].length
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getAllData();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 头部样式
.stato-head {
  display: flex;
  justify-content: space-evenly;
}
.head-style {
  width: 380px;
}
.head-style1 {
  width: 100%;
  font-size: 20px;
}
.head-style2 {
  display: flex;
  justify-content: center;
}
.head-style3 {
  position: relative;
  left: 25px;
}
// 头部样式结束
.figure {
  width: 100%;
  height: 400px;
  justify-content: space-around;
  display: flex;
  margin-top: 40px;
}
.figure-pie1 {
  width: 400px;
  height: 300px;
}
.figure-pie2 {
  width: 400px;
  height: 300px;
}
</style>