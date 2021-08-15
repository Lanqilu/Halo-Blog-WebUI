import {createApp} from 'vue'
import App from './App.vue'
// 路由
import router from "./router";
// Element 组件样式
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import store from './store'


createApp(App).use(router).use(ElementPlus).use(store).mount('#app')
