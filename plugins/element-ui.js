import Vue from 'vue'
import {
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Form,
  FormItem,
  Dialog,
  Button,
  ButtonGroup,
  Loading,
  MessageBox,
  Message,
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(Input, { locale })
Vue.use(Radio, { locale })
Vue.use(RadioGroup, { locale })
Vue.use(Checkbox, { locale })
Vue.use(CheckboxGroup, { locale })
Vue.use(Form, { locale })
Vue.use(FormItem, { locale })
Vue.use(Dialog, { locale })
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

