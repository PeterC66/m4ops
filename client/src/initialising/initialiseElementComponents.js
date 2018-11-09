
// Ensure Element components are all imported here, and 'used' below
import {
  Button, // Keep el-button for ChooseLayer
  Cascader, // Keep el-cascader for ChooseLayer and ChooseOPS
  TabPane,
  Tabs,
} from 'element-ui';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

export default function initialiseElementComponents(Vue) {
  locale.use(lang);

  // See import above
  Vue.component(Button.name, Button);
  Vue.component(Cascader.name, Cascader);
  Vue.component(TabPane.name, TabPane);
  Vue.component(Tabs.name, Tabs);
}
