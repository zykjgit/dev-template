<template>
  <div class="layout-header">
    <div></div>
    <el-dropdown>
      <span class="el-dropdown-link"> Jack<i class="el-icon-arrow-down el-icon--right"></i> </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
        <el-dropdown-item @click.native="dialogVisible = true">修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog v-loading="loading" title="修改密码" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-form ref="form" :rules="rules" :model="body">
          <el-form-item label="旧密码" prop="old_password">
            <el-input placeholder="请输入" type="password" v-model="body.old_password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="checkPass">
            <el-input placeholder="请输入" type="password" v-model="body.checkPass"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="new_password">
            <el-input placeholder="请输入" type="password" v-model="body.new_password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdatePassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const verifyPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入确认新密码'));
      } else if (value !== this.body.checkPass) {
        return callback(new Error('两次输入的密码不一致，请重新输入'));
      }
      callback();
    };
    this.rules = {
      old_password: [{ message: '请输入旧密码', trigger: 'change', required: true }],
      new_password: [{ validator: verifyPass, trigger: 'blur', required: true }],
      checkPass: [{ message: '请输入密码!', trigger: 'blur', required: true }]
    };
    return {
      dialogVisible: false,
      body: {
        new_password: '',
        old_password: '',
        checkPass: ''
      },
      loading: false
    };
  },
  methods: {
    handleLogout() {
      alert('注销成功');
      this.$router.push('/login');
    },
    handleUpdatePassword() {
      if (this.loading) return;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          alert('修改成功');
        }
      });
    }
  }
};
</script>

<style lang="scss">
.layout-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
