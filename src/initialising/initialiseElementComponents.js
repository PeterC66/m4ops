
// Ensure Element components are all imported here, and 'used' below
import {
  Aside,
  Button,
  Container,
  Form,
  FormItem,
  Header,
  Input,
  Main,
  Select,
  Tooltip,
} from 'element-ui';

export default function initialiseElementComponents(Vue) {
// See import above
  Vue.use(Aside);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Header);
  Vue.use(Input);
  Vue.use(Main);
  Vue.use(Select);
  Vue.use(Tooltip);
}
