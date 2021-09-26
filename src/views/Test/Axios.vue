<template>
  <div>
    <div>Axios 测试使用页面</div>
    <button @click="getHandle()">发送 Get 请求</button>
    <button @click="postHandle()">发送 Post 请求</button>
    <button @click="getMyHandle()">发送 Get 请求-封装</button>
    <button @click="postMyHandle()">发送 Post 请求-封装</button>
  </div>
</template>

<script>
import axios from "axios";
import {get, post} from "../../utils/request.js"

export default {
  name: "Axios",
  methods: {
    getHandle() {
      // axios.get 发送 Get 请求
      // 参数1: 请求地址
      // 参数2: 配置信息
      //   params 表示传递到服务器端的数据，以 url 参数的形式拼接在请求地址后面
      //   headers 表示请求头
      axios.get("http://test:8088/blog/number/1", {
        params: {},
        headers: {}
      }).then(res => console.log(res))
    },
    postHandle() {
      // axios.post 发送 Post 请求
      // 参数1: 请求地址
      // 参数2: 传递数据，默认 JSON 格式
      // 参数3: 配置信息，默认 content-type: 'application/json'
      axios.post("http://test:8088/login", {
        email: "1379978893@qq.com",
        password: "111111"
      }, {
        params: {},
      })
          .then(res => console.log(res))
          .catch(err => console.log(err))
    },

    getMyHandle() {
      get("/blog/number/1", "").then(res => console.log(res));
    },
    postMyHandle() {
      post("/login", {
        email: "1379978893@qq.com",
        password: "111111"
      })
    }
  }
}
</script>

<style scoped>

</style>