
// Ensure Element components are all imported here, and 'used' below
import {
  Aside,
  Button,
  Cascader,
  Container,
  Form,
  FormItem,
  Header,
  Input,
  Main,
  Option,
  Popover,
  Select,
  Switch,
  TabPane,
  Tabs,
  Tooltip,
} from 'element-ui';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

export default function initialiseElementComponents(Vue) {
  locale.use(lang);

  // See import above
  Vue.component(Aside.name, Aside);
  Vue.component(Button.name, Button);
  Vue.component(Cascader.name, Cascader);
  Vue.component(Container.name, Container);
  Vue.component(Form.name, Form);
  Vue.component(FormItem.name, FormItem);
  Vue.component(Header.name, Header);
  Vue.component(Input.name, Input);
  Vue.component(Main.name, Main);
  Vue.component(Option.name, Option);
  Vue.component(Popover.name, Popover);
  Vue.component(Select.name, Select);
  Vue.component(Switch.name, Switch);
  Vue.component(TabPane.name, TabPane);
  Vue.component(Tabs.name, Tabs);
  Vue.component(Tooltip.name, Tooltip);
}
