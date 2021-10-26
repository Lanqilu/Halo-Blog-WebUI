import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from "./router";
// Element 组件样式
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';

import store from './store'

const app = createApp(App)


app.use(router).use(ElementPlus).use(store).mount('#app')
