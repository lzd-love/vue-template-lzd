<!--
 * @Author: lzd
 * @Date: 2020-09-08 11:14:21
 * @LastEditors: lzd
 * @LastEditTime: 2020-09-08 13:51:40
 * @Description: content description
-->
<template>
  <div class="login">
    <div class="login-container">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        class="login-form"
        label-position="left"
      >
        <div class="login-title">设备管理系统</div>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit() {
      console.log("submit!");
      if (this.form.username === "admin" && this.form.password === "123456") {
        this.$notify({
          title: "成功",
          message: "登陆成功",
          type: "success"
        });
        this.$router.push({
          path: "/overview",
          params: {
            value: "haha"
          }
        });
      } else {
        this.$notify({
          title: "警告",
          message: "请确认账户信息",
          type: "warning"
        });
      }
    }
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
.login-form {
  width: 350px;
  margin: 0 auto; /* 上下间距160px，左右自动居中*/
  background-color: rgb(255, 255, 255, 0.6); /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
  margin-top: 30vh;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login.jpg");
  background-size: 100% 100%;
}

/* 标题 */
.login-title {
  color: #303133;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
