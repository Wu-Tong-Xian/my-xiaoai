<template>
  <div>
    <div class="home-box">
      <div class="home-box-1">
        <div>
          <img src="../assets/ren.svg" alt />
        </div>
        <div>
          New visits
          <b>{{counter.visits}}</b>
        </div>
      </div>
      <div class="home-box-1">
        <div>
          <img src="../assets/xinxi.svg" alt />
        </div>
        <div>
          messages
          <b>{{counter.messages}}</b>
        </div>
      </div>
      <div class="home-box-1">
        <div>
          <img src="../assets/qian.svg" alt />
        </div>
        <div>
          purchases
          <b>{{counter.purchases }}</b>
        </div>
      </div>
      <div class="home-box-1">
        <div>
          <img src="../assets/che.svg" alt />
        </div>
        <div>
          shopping
          <b>{{counter.shopping}}</b>
        </div>
      </div>
    </div>
    <!-- 折线图 -->
    <div>
      <ve-line :data="chartData"></ve-line>
    </div>

    <div class="three-figures">
      <!-- 使用雷达图 在组件 HomeRadar中-->
      <div>
        <HomeRadar class="radar"></HomeRadar>
      </div>
      <!-- 使用饼图 在组件HomePie中-->
      <div>
        <HomePie class="pie"></HomePie>
      </div>
      <!-- 柱形图 -->
      <div class="bar-chart">
        <ve-histogram :data="chartData"></ve-histogram>
      </div>
    </div>
    <div class="three-functions">
      <!-- 引入订单 -->
      <div class="order">
        <Order></Order> 
      </div>
      <!-- 引入TODOlist -->
      <div class="todo-list">
        <TodoList></TodoList>
      </div>
      <!-- 引入进度条 -->
      <div class="progress-bar">
        <progressBar></progressBar>
      </div>
    </div>
  </div>
</template>
  
<script>
// 引入雷达图组件
import HomeRadar from "../components/HomeRadar";
// 引入饼图组件
import HomePie from "../components/HomePie";
// 引入进度条
import progressBar from "../components/Progress-bar"
// 引入订单
import Order from "../components/Order"
// 引入todolist
import TodoList from "../components/Todo-list"
export default {
  data() {
    return {
      // 折线图
      chartData: {
        columns: ["date", "expected", "actual"],
        rows: []
      },

      counter: ""
    };
  },
  components: {
    HomeRadar,
    HomePie,
    Order,
    TodoList,
    progressBar
  },
  methods: {
    // 拿到计数器方法的数据
    getCounter() {
      this.$axios
        .req("/homeData")
        .then(res => {
          // console.log(res);
          this.counter = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 拿到折线图   柱状图数据
    getlineChart() {
      this.$axios
        .req("/homeChat")
        .then(res => {
          // console.log(res.data);
          this.chartData.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCounter();
    this.getlineChart();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 顶部4个小框counter样式
.home-box {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-evenly;
}
.home-box div {
  width: 23.5%;
  background: rgb(207, 219, 186);
}
.home-box-1 {
  display: flex;
  justify-content: space-around;
}
.home-box-1 div {
  padding-top: 20px;
}
// 雷达，饼 ，柱形图样式
.three-figures {
  width: 100%;
  height: 400px;
  background: antiquewhite;
  display: flex;
  justify-content: space-around;
}
.radar {
  width: 500px;
  height: 300px;
}
.pie {
  width: 500px;
  height: 300px;
}
.bar-chart {
  width: 32.5%;
  height: 300px;
}
// 订单 TODOlist 进度条样式
.three-functions {
  width: 100%;
  height: 400px;
  background: rgb(233, 220, 230);
  display: flex;
  justify-content: space-around;
}
.order {
  width: 48%;
  height: 400px;
   background: azure;
    margin-top:20px;
}
.todo-list {
  width: 24%;
  height: 400px;
   background: azure;
    margin-top:20px;
}
.progress-bar {
  width: 24%;
  height: 400px;
  background: azure;
  margin-top:20px;
}
</style>