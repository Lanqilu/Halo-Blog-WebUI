import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from "./router";
// Element 组件样式
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import store from './store'

import hljs from 'highlight.js' //导入代码高亮文件
import './assets/markdown-css/atom-one-dark.css'  //导入代码高亮样式


const app = createApp(App)

//自定义一个代码高亮指令
app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})

app.use(router).use(ElementPlus).use(store).mount('#app')
