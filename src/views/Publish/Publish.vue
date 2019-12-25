<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed label="#" width="60">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column fixed prop="title" label="标题" width="400" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" width="120" align="center"></el-table-column>
      <el-table-column prop="category" label="类目" width="120" align="center"></el-table-column>
      <el-table-column prop="source" label="来源" width="120" align="center"></el-table-column>
      <el-table-column prop="star" label="重要性" width="120" align="center"></el-table-column>
      <el-table-column prop="date" label="发布时间" width="300" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300" align="center">
        <!-- 三个操作功能 -->
        <template slot-scope="scope">
          <el-button type="text" size="small" class="bj" @click="redact(scope.row)">编辑</el-button>
          <el-button @click="handleClick(scope.row._id)" type="text" size="small" class="ck">查看</el-button>
          <el-button @click="del(scope.row._id)" type="text" size="small" class="sc">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {},
  methods: {
    // 编辑，点击之后挑战到编辑页面
    redact(row) {
      // 通过$router.push() 传参的方式传值 一般我们都用name 跟 query name{}就是路径 query类似get请求
      //query:{第一个是自己去的名字 后面跟我们传的参数} name 就是跳转跟跳转路径  query 是传的参数
      //然后再要接受的页面用mounted() {  this.ruleForm = this.$route.query.row1  }, 接受左边是例子记得用数组装
      this.$router.push({ name: "Redact", query:{ row1: row }});
    },
    // 删除功能
// post请求在根目录删除，不然就是伪删除
del(ids){
  this.$axios.req('/article/delete',{_id:ids }).then(res=>{
    console.log(res);
    // 重新获取我们的内容也就是刷新，
    this.geTallArticle()
  }).catch(err=>{
    console.log(err);
  })
},
    // del(index) {
      // this.tableData.splice(index, 1);
    // },
    // 查看，点击之后跳转到查看页面
    handleClick(ids) {
      // this.$router.push({ name: "Redact", query:{ row1: row }});
      this.$router.push({name:'Examine',query:{ids1:ids}});
    },
    // get请求拿到所有已发布文章allArticle
    geTallArticle() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          // console.log(res.data);
          this.tableData = res.data;
          this.tableData.map(item => {
            item.date = this.$dayjs(item.date).format("YYYY-MM-DD hh:mm:ss");
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.geTallArticle();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bj {
  background: rgb(64, 158, 255);
  width: 60px;
  color: #000;
}
.ck {
  width: 60px;
  background: rgb(103, 194, 58);
  color: #000;
}
.sc {
  width: 60px;
  background: rgb(245, 108, 108);
  color: #000;
}
</style>