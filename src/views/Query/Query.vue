<template>
  <div>
    <!-- 模糊搜索 -->
    <!-- <div>
      <el-input v-model="input" placeholder="请输入您想搜索的商品名称" style="width: 30% align:left"></el-input>
    </div> -->

    <!-- 分页 -->
    <el-table
      :data="table.slice((currentPage-1)*currentSize,currentSize*currentPage)"
      border
      style="width: 100%"
    >

      <!-- get请求拿到数据 通过element 省略数据复制给table 直接通过element prop='NAME' 如果是循环{{table.NAME}} -->
      <el-table-column prop="NAME" label="名称" width="410" align="center"></el-table-column>
      <el-table-column prop="GOODS_SERIAL_NUMBER" label="商品编号" width="310" align="center"></el-table-column>
      <el-table-column prop="ORI_PRICE" label="原价" width="250" align="center"></el-table-column>
      <el-table-column prop="PRESENT_PRICE" label="现价" width="250" align="center"></el-table-column>
      <el-table-column label="操作" width="330" align="center">
        <template >
          <!-- slot-scope="scope" 如果要操作功能吧这句话放在上面 template里面 -->
          <!-- 修改功能 -->
          <!-- <el-button @click="mdf(scope.row)" type="text" size="small" class="mdf">修改</el-button> -->
          <!-- 点击修改之后弹出框默认为原有数据 -->
          <el-dialog title :visible.sync="dialogFormVisible">
            <el-form :model="box">
              <el-form-item label="名称：" :label-width="formLabelWidth">
                <el-input v-model="box.NAME" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="原价：" :label-width="formLabelWidth">
                <el-input v-model="box.ORI_PRICE" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="现价：" :label-width="formLabelWidth">
                <el-input v-model="box.PRESENT_PRICE" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 删除功能 -->
          <!-- <el-button @click="del(scope.row)" type="text" size="small" class="del">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="1000"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.length"
      ></el-pagination>
    </div>
    <!-- csv 导出 -->
    <button>
      <download-excel
        class="btn btn-default"
        :data="table.slice((currentPage-1)*currentSize,currentSize*currentPage)"
        type="csv"
        name="filename.csv"
      >CSV下载</download-excel>
    </button>

     <!-- excel 导出 -->
    <button>
      <download-excel
        class="btn btn-default"
        :data="table.slice((currentPage-1)*currentSize,currentSize*currentPage)"
        type="xls"
        name="filename.xls"
      >excel下载</download-excel>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 定义一个空盒子用来装表格点击的每一样
      box: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      currentPage: 1,
      currentSize: 10,
      table: [],
      input: "",
      arr: [],
    };
  },
  components: {},
  methods: {
    // get请求拿到表格数据
    getTable() {
      this.$axios.req("/tableData").then(res => {
        // console.log(res.data);
        this.table = res.data;
        this.arr = this.table;
      });
    },
    //变化分页
    handleSizeChange(val) {
      this.currentSize = val;
    },
    //当前分页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // // 删除
    // del(row) {
    //   // this.table.splice(this.table.indexOf(row),1)
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!"
    //       });
    //       this.table.splice(this.table.indexOf(row), 1);
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    // 修改
    // mdf(row) {
    //   (this.dialogFormVisible = true), (this.box = row);
    // }
    // 点击修改弹出框取消恢复默认值，确定就修改
  },
  mounted() {
    this.getTable();
  },
  watch: {
    input(val) {
      this.table = this.arr.filter(item => {
        return JSON.stringify(item).includes(val);
        // console.log(this.list);
      });
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.mdf {
  width: 80px;
  background: rgb(64, 158, 255);
  color: rgb(248, 244, 244);
}
.del {
  width: 80px;
  background: rgb(245, 108, 108);
  color: rgb(248, 244, 244);
}
</style>