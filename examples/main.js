import Vue from 'vue';
import App from './App.vue';
import router from './router';
import mixins from './mixins';

import 'wh-component/src/styles/antd.js';
// 组件样式
import 'wh-component/src/styles/index.less';
// 组件内联样式（第三方插件样式等）
import 'wh-component/lib/wh-component.css';
import whComponent from 'wh-component';
Vue.use(whComponent);

import '@src/icons';

import yuejizuoFormMaking from '../packages/index';
import '@src/styles/index.less';
Vue.use(yuejizuoFormMaking);

import * as viewTemplate from './views/view-template';
for (let name of Object.keys(viewTemplate)) {
  Vue.component(viewTemplate[name].name, viewTemplate[name]);
}

Vue.mixin(mixins);
new Vue({
  router,
  i18n: window.yjzi18n,
  render: h => h(App),
}).$mount('#app');
