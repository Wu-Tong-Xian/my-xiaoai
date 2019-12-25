<template>
  <!-- 发布文章页面 -->

  <!-- 最大盒子背景颜色 -->
  <div class="my-box">
    <!-- 第二大盒子让两边有距离 -->
    <div class="my-box1">
      <!-- 第三个盒子设置头部颜色 -->
      <div class="my-box2">
        <div></div>
        <div>
          <!-- 设置样式 -->
          <el-button class="style1">查看</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" class="style2">发布</el-button>
        </div>
      </div>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要">
          <el-input type="textarea" v-model="ruleForm.abstract"></el-input>
        </el-form-item>

        <div class="box">
          <div>
            <el-form-item label="作者">
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="类目">
              <el-select v-model="ruleForm.category" placeholder="请选择活动区域">
                <el-option
                  v-for="(item,index) in category"
                  :key="index"
                  :label="item.value"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="来源">
              <el-select v-model="ruleForm.source" placeholder="请选择活动区域">
                <el-option
                  v-for="(item,index) in source"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="重要性">
              <el-select v-model="ruleForm.star" placeholder="请选择活动区域">
                <el-option
                  v-for="(item,index) in magnitude"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 发布时间 -->
          <div class="block">
            <span class="demonstration">发布时间</span>
            <el-date-picker
              v-model="ruleForm.date"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
            ></el-date-picker>
          </div>
        </div>
        <!-- 文章内容 -->
        <div id="main">
          <mavon-editor v-model="ruleForm.text" />
        </div>

        <el-form-item class="reset1">
          <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        // 文章标题
        title: "",
        // 文章摘要
        abstract: "",
        // 作者
        author: "",
        // 类目
        category: "",
        // 来源
        source: "",
        // 重要
        star: "",
        //文章内容
        text: "",
        // 时间
        date: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      // 类目
      category: [
        { value: "Vue", label: "Recat" },
        { value: "Nodejs", label: "Nodejs" },
        { value: "性能优化", label: "性能优化" },
        { value: "Javascript", label: "Javascript" },
        { value: "小程序", label: "小程序" },
        { value: "共聚类分析", label: "共聚类分析" },
        { value: "其他", label: "其他" }
      ],
      // 重要
      magnitude: [
        { value: "1☆", label: "1☆" },
        { value: "2☆", label: "2☆" },
        { value: "3☆", label: "3☆" },
        { value: "4☆", label: "4☆" },
        { value: "5☆", label: "5☆" }
      ],
      // 来源
      source: [
        { value: "原创", label: "原创" },
        { value: "转载", label: "转载" },
        { value: "与他人合作", label: "与他人合作" }
      ]
    };
  },
  methods: {
    //   发布文章
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 通过post请求把数据传上去
          this.$axios
            .req("/article/create", {
              // 文章标题
              title: this.ruleForm.title,
              // 文章摘要
              abstract: this.ruleForm.abstract,
              // 作者
              author: this.ruleForm.author,
              // 类目
              category: this.ruleForm.category,
              // 来源
              source: this.ruleForm.source,
              // 重要
              star: this.ruleForm.star,
              //文章内容
              text: this.ruleForm.text,
              // 时间
              date: this.ruleForm.date
            })
            .then(res => {
              // console.log(res);
              // 如果code=200代表成功 提示发布成功并跳转到已发布页面
              if (res.code === 200) {
                this.$message({ type: "success", message: res.data });
                this.$router.push("/publish");
            
              } else {
                this.$message({ type: "error", message: "所有项目不能为空" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// my-box 都是盒子样式

.my-box1 {
  margin: 0 20px 0 20px;
}
.my-box2 {
  display: flex;
  justify-content: space-between;
  background: rgb(89, 165, 134);
  margin: 20px 0px 20px 0px;
}
// 下面是两个头部样式
.style1 {
  background: red;
}
.style2 {
  margin: 0 20px 0 20px;
}
// 都是盒子用来做横向排列
.box {
  display: flex;
}
.box1 {
  display: flex;
}
// 时间样式
.block {
  width: 400px;
}
.demonstration {
  margin-right: 10px;
}
</style>