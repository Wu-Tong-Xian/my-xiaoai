<template>
  <div class="box">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="ipt-box">
        <div class="xt">欢迎来到Panda系统</div>
        <el-form-item label="用户名" prop="name" class="ipt-style">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="ipt-style">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 登录注册的 -->
          <el-button type="primary" @click="submitForm('ruleForm')" class="login-style">注册</el-button>
          <!-- 点击登录之后应该跳转到主页面 -->
          <el-button type="primary" class="login-style">
            <span @click="reyister">前往登录</span>
          </el-button>
          <el-button @click="resetForm('ruleForm')" class="reyister-style">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {

      if (value.trim() === "") {
        return callback(new Error("用户名不能为空"));
      } else  if (/[\u4E00-\u9FA5]/g.test(value) ) {
           callback(new Error('用户名不能为汉字!'));
         }
      else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error("请输入密码"));
      }else {
        callback();
      }
    };
    return {
      obj: {},
      codes: "",
      ruleForm: {
        pass: "", //密码
        name: "" //账户
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" },
         { min: 6, max: 15, message: '密码长度不能小于6', trigger: 'blur' }
        ],
        name: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 点击登录之后跳转主页的方法
    reyister() {
      this.$router.push('/login')
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // post请求传两个参数，路径和对象
          // 通过post请求从数据库对比我输入的账户密码跟数据库留存的账户密码是否一致
          this.$axios.req("/user/register", {username: this.ruleForm.name,password: this.ruleForm.pass,}).then(res => {
              console.log(res);
              if( res.code === 200  ){
                console.log(this.ruleForm.name);
                this.$router.push('/login')
                this.$message({type:'sucess',message:res.message})
              }else{
                this.$message({type:'error',message:res.message})
              }

            }).catch(err => {});
        } else {
          console.log('err');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 通过get请求从数据库拿到验证码
    getcodes() {
      this.$axios
        .req("/captcha")
        .then(res => {
          this.codes = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getcodes();
  }
};
</script>
<style scoped lang='scss'>
// 盒子样式
.box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("../../assets/timg.jpg") ;
}
.ipt-style {
  width: 400px;
  padding-top: 10px;
  padding-bottom: 25px;
  line-height: 100px;
}
// 验证码框样式
.code1 {
  width: 250px;
}
.ipt-box {
  background: rgb(162, 190, 96);
  width: 500px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  top: 120px;
}
.xt {
  font-size: 24px;
  color: rgb(5, 129, 78);
}
// 登录注册的样式
.login-style {
  position: relative;
  left: -10px;
}
.reyister-style {
  margin: 20px 90px 20px 0px;
  background: #409eff;
  color: aliceblue;
}
.box1 {
  display: flex;
}
</style>