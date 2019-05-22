import Vue from 'vue';
import TableWrapWithPage from '@/components/TableWrapWithPage.vue';

Vue.component('table-wrap-with-page', TableWrapWithPage);
import {
  Header,
  Aside,
  Main,
  Footer,
  Container,
  Loading,
  MessageBox,
  Message,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Card,
  Form,
  FormItem,
  Button,
  DatePicker,
  TimeSelect,
  TimePicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select,
  OptionGroup,
  Tabs,
  Option,
  Row,
  Table,
  TableColumn,
  Col,
  Pagination,
  Dialog,
  TabPane,
  Switch,
  Checkbox,
  Upload
} from 'element-ui';
Vue.use(Upload);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Switch);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Col);
Vue.use(Tabs);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Header);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Card);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Container);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
