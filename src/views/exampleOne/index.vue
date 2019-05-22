<template>
  <div class="user-manage">
    <table-wrap-with-page
      :page.sync="params.page_num"
      :num.sync="params.page_size"
      :size-change="handlePageChange"
      :total="userTotal"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </table-wrap-with-page>
  </div>
</template>

<script>
export default {
  name: 'exampleOne',
  data() {
    return {
      params: {
        page_num: 10,
        page_size: 1
      },
      userTotal: 0,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },
  methods: {
    handlePageChange(num) {
      console.log(num);
    }
  }
};
</script>

<style lang="scss">
.user-manage {
  height: 100%;
}
</style>
