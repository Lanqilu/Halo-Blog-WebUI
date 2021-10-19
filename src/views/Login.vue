<template>
  <div class="m-loginnew">
    <div class="container">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <form action="#" class="form" id="form1" :model="registryForm">
          <h2 class="form__title">注 册</h2>
          <input type="text" placeholder="用户名" class="input" v-model="registryForm.username"/>
          <input type="email" placeholder="电子邮箱" class="input" v-model="registryForm.email"/>
          <input type="password" placeholder="密码" class="input" v-model="registryForm.password"/>
          <div class="code">
            <input type="text" placeholder="验证码" class="input" v-model="registryForm.authCode"/>
            <div class="code-btn" @click="sendCode()">发送验证码</div>
          </div>
          <button class="btn" @click.prevent="registry()">注 册</button>
        </form>
      </div>

      <!-- Sign In -->
      <div class="container__form container--signin">
        <form action="#" class="form" id="form2" :model="ruleForm">
          <h2 class="form__title">登 录</h2>
          <input type="email" placeholder="电子邮箱" class="input" v-model="ruleForm.email"/>
          <input type="password" placeholder="密码" class="input" v-model="ruleForm.password"/>
          <!--        <a href="#" class="link">忘记密码?</a>-->
          <button class="btn" @click.prevent="submitForm()">登 录</button>
        </form>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" id="signIn" @click="signInBtn">点击登录</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" id="signUp" @click="signUpBtn">点击注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, onMounted} from "vue";
import axios from "axios";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import {get, post} from "../utils/request";

export default {
  name: "Login",

  setup() {
    const store = useStore();
    const router = useRouter();

    let ruleForm = reactive({
      email: "1379978893@qq.com",
      password: "111111",
    });

    let registryForm = reactive({
      username: "hhhh",
      email: "885240677@qq.com",
      password: "111111",
      authCode: ""
    });

    function submitForm() {
      post("/login", ruleForm).then((res) => {
        // 获取 JWT
        const jwt = res.headers["authorization"];
        // 获取用户信息
        const userInfo = res.data.data;

        // 赋值到全局store
        store.commit("SET_TOKEN", jwt);
        store.commit("SET_USERINFO", userInfo);

        // 登录成功
        console.log("登录成功");
        // 跳转页面
        router.push("/home");
      });
    }

    function registry() {
      post("/register", registryForm)
          .then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              ElMessage.success({
                message: res.data.msg,
                type: "success",
              });
              // 改变数据
              ruleForm.email = registryForm.email;
              ruleForm.password = registryForm.password;

              // 跳转到登录页
              let container = document.querySelector(".container");
              container.classList.remove("right-panel-active");
            } else {
              ElMessage(res.data.msg);
            }
          });
    }

    function sendCode() {
      let email = registryForm.email;
      get(`/sent/${email}`).then((res) => {
        console.log(res)
        ElMessage.success({
          message: res.data.msg,
          // 是否显示关闭按钮
          'show-close': true,
          // 信息显示时间
          duration: 1000
        })
      })
    }

    onMounted(() => {
      const route = useRoute();
      // 根据路由判断是否登录或注册
      // TODO 有闪烁现象
      if (route.fullPath === "/register") {
        let container = document.querySelector(".container");
        container.classList.add("right-panel-active");
      }
    });

    return {
      ruleForm,
      registryForm,
      registry,
      submitForm,
      sendCode,
    };
  },

  methods: {
    signInBtn() {
      let container = document.querySelector(".container");
      container.classList.remove("right-panel-active");
    },
    signUpBtn() {
      let container = document.querySelector(".container");
      container.classList.add("right-panel-active");
    },
  },
};
</script>

<style>

.code {
  width: 283px;
  display: flex;
  align-items: center;
}

.code-btn {
  width: 183px;
  height: 35px;
  background: blue;
  color: #FFFFFF;
  margin: 8px;
  border-radius: 8px;
  line-height: 35px;
  cursor: pointer;
}

.m-loginnew {
  /* COLORS */
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;

  /* RADII */
  --button-radius: 0.7rem;

  /* SIZES */
  --max-width: 758px;
  --max-height: 420px;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  align-items: center;
  background-color: var(--white);
  background: url("https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-e@master/macos.6z1mshl4twk0.svg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;

}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;

}

.link {
  color: var(--gray);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;

}

.container {
  background-color: var(--white);
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
  0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  width: 100%;

}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;

}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;

}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;

}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;

}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;

}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);

}

.overlay {
  background-color: var(--lightblue);
  background: url("https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-e@master/macos.6z1mshl4twk0.svg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;

}

.container.right-panel-active .overlay {
  transform: translateX(50%);

}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;

}

.overlay--left {
  transform: translateX(-20%);

}

.container.right-panel-active .overlay--left {
  transform: translateX(0);

}

.overlay--right {
  right: 0;
  transform: translateX(0);

}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);

}

.btn {
  background-color: var(--blue);
  background-image: linear-gradient(
      90deg,
      var(--blue) 0%,
      var(--lightblue) 74%);
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

}

.form > .btn {
  margin-top: 1.5rem;

}

.btn:active {
  transform: scale(0.95);

}

.btn:focus {
  outline: none;

}

.form {
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;

}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;

}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>

