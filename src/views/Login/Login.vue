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
        <div class="box1">
          <div>
            <el-form-item label="验证码" prop="code" class="code1">
              <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <!--用v-thtm得到 系统返回的验证码    点击后再一次得到  getcodes获取验证码的方法 得到的烟瘴吗-->
            <span v-html="codes" @click='getcodes'></span>
          </div>
        </div>
        <el-form-item>
          <!-- 登录注册的 -->
          <el-button type="primary" @click="submitForm('ruleForm')" class="login-style">登录</el-button>
          <!-- 点击登录之后应该跳转到主页面 -->
          <el-button type="primary" class="login-style">
            <span @click="reyister">注册</span>
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
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      codes: "",
      ruleForm: {
        pass: "", //密码
        code: "", //验证码
        name: "" //账户
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
   submitForm(){
      this.$router.push("/");
    },
    // 点击登录之后跳转注册的方法
    reyister() {
      this.$router.push("/reyister");
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // post请求传两个参数，路径和对象
          // 通过post请求从数据库对比我输入的账户密码跟数据库留存的账户密码是否一致
          this.$axios
            .req("/user/login", {
              'username': this.ruleForm.name,
              'password': this.ruleForm.pass,
              'code': this.ruleForm.code
            })
            .then(res => {
              console.log(res);
              // 如果返回的数据等于200 登录成功
              if(res.code ===200  ){
                this.$message({type:'success',message: res.message})
                this.$router.push('/')
                localStorage.setItem('name',this.ruleForm.name);
                console.log(res);
                localStorage.setItem('time',res.data[0].date);
                //  否则登录不成功，抛出相应的错误
              }else{
                this.$message({ type:'error',message:res.message})
              }
              
           
            })
            .catch(err => {});
         } //else (this.this.ruleForm.name === ){
        //   this.$message({type:'erry',message:" 用户名为空或者不正确 "})
        // }
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
  width: 100%;
  height:100%;
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