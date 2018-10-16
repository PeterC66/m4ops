
// Ensure Element components are all imported here, and 'used' below
import {
  Aside,
  Button,
  Container,
  Header,
  Main,
  Select,
} from 'element-ui';

export default function initialiseElementComponents(Vue) {
// See import above
  Vue.use(Aside);
  Vue.use(Button);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Main);
  Vue.use(Select);
}
