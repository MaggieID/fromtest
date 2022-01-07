import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss';

import '@/components/GooFlow/style/index.scss'; // global css

import '@/styles/index.scss'; // global css
import '@/styles/common.scss'; // global css

import FormMaking from '@/components/FormMaking/index';

import VueEditor from 'vue2-editor';

import 'e-icon-picker/lib/symbol.js'; // 基本彩色图标库
import 'e-icon-picker/lib/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; // font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css'; // element-ui 图标库
import iconfont from '@/font/iconfont.json';
import '@/font/iconfont.css';
import '@/font/iconfont.js';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import eIconPicker, { EIcon, analyzingIconForIconfont } from 'e-icon-picker';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(FormMaking);
Vue.use(VueEditor);
const forIconfont = analyzingIconForIconfont(iconfont);
Vue.use(EIcon);
Vue.use(eIconPicker, {
    FontAwesome: true,
    ElementUI: true,
    eIcon: true,
    eIconSymbol: false,
    addIconList: forIconfont.list,
    removeIconList: []
});

new Vue({
    render: (h) => h(App)
}).$mount('#app');