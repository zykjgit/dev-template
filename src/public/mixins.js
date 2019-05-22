import { transformMoney } from './utils';
export default {
  methods: {
    //用于转换 el-table组件上的金额
    MX_formatter(row, column, cellValue) {
      return transformMoney(cellValue, 2);
    },
    MX_transferMoney(num, type = 1) {
      return transformMoney(num, type);
    }
  }
};
