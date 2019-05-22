// 对element-ui 分页组件的封装。避免每次用到table组件都要重写分页组件；
<template>
  <div class="table-wrap-with-page">
    <div class="table-wrap-with__table">
      <slot></slot>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="num"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TableWrapWithPage',
  props: {
    // 总数量
    total: {
      type: Number,
      default: 0
    },
    // 每页显示的数量
    num: {
      type: Number,
      default: 0
    },
    // 页码
    page: {
      type: Number,
      default: 50
    },
    // 当前页或页显示数量变化时触发的函数
    sizeChange: {
      type: Function
    },
    // 每页显示数量的选项
    pageSizes: {
      type: Array,
      default: function() {
        return [100, 150, 200];
      }
    }
  },
  methods: {
    handleSizeChange(num) {
      this.$emit('update:num', num);
      this.$emit('update:page', 1);
      if (this.sizeChange) {
        this.sizeChange(1);
      }
    },
    handleCurrentChange(page) {
      this.$emit('update:page', page);
      if (this.sizeChange) {
        this.sizeChange(page);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-wrap-with-page {
  height: 100%;
  background-color: #fff;
}
.table-wrap-with__table {
  padding: 12px 0;
  box-sizing: border-box;
  height: calc(100% - 32px);
}
</style>
