const { version, name } = require('../package.json');
import {
  /* eslint-disable no-unused-vars */
  YjzFormMaking,
  YjzFormGenerator,
} from './module';

// 引入组件使用的icon
import '@src/icons';
const components = [YjzFormMaking, YjzFormGenerator];
// 国际化
import VueI18n from 'vue-i18n';

import lang from '@src/locale';
const displayVersion = () => {
  Function(`
    window.console && console.log('%c${name} %cV${version} ', 'color: #1890ff;font-weight: 500;font-size: 20px;font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;', 'color: #ccc;');
  `)();
};

// 定义install方法，接收Vue作为参数
const install = function(Vue) {
  // 判断是否安装，安装过就不继续往下执行
  if (install.installed) return;
  install.installed = true;
  // 国际化
  Vue.use(VueI18n);
  const locale = localStorage.getItem('lang') || 'zh_CN';
  // 通过选项创建 VueI18n 实例
  const yjzi18n = new VueI18n({
    locale, // 设置地区
    messages: lang, // 设置地区信息
  });
  // 遍历注册所有组件
  components.map(component => component.install(Vue));
  displayVersion();

  window.yjzi18n = yjzi18n;
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install, // 全量引入 // 所有组件，必须具有install，才能使用Vue.use()
  YjzFormMaking,
  YjzFormGenerator,
};

export default {
  install, // 全量引入 // 所有组件，必须具有install，才能使用Vue.use()
  YjzFormMaking,
  YjzFormGenerator,
};
