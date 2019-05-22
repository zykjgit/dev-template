<template>
  <div class="login flex-center">
    <el-card class="login-box-wrap">
      <el-form ref="form" label-width="40px">
        <el-form-item label="账号">
          <el-input placeholder="请输入账号" v-model="post.account"> </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" type="password" v-model="post.password"> </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="width:100%" @click="submitEnter">登录</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      post: {
        account: 'dev20190000',
        password: '123456'
      }
    };
  },
  methods: {
    submitEnter() {
      this.$message({
        type: 'success',
        duration: '2000',
        message: '登录成功'
      });
      this.$router.push({ path: '/home' });
    }
  }
};
</script>

<style lang="scss">
.login {
  height: 100%;
}
.login-box-wrap {
  width: 340px;
}
</style>
