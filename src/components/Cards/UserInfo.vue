<template>
  <div class="halo-user-info">
    <!-- 如果登录展示该 div -->
    <div class="halo-has-login" v-show="user.hasLogin">
      <div class="halo-user-meta">
        <div class="halo-user-avatar">
          <el-avatar shape="square" :size="166" :src="user.avatar"></el-avatar>
        </div>
        <div class="halo-user-button">
          <div class="halo-personal-homepage halo-base-bottom" @click="publishArticle()">动态</div>
          <div class="logout halo-base-bottom" @click="logout()">退出</div>
          <div class="icon">
            <div class="add" @click="publishArticle()">
              <svg class="add-icon" aria-hidden="true">
                <use xlink:href="#icon-plus-circle-fill"/>
              </svg>
            </div>
            <div class="massage">
              <svg class="massage-icon" aria-hidden="true">
                <use xlink:href="#icon-info-circle-fill"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 如果未登录展示该 div -->
    <div class="halo-has-not-login" v-if="!user.hasLogin">
      <div class="login">
        <a href="/login">登 录</a>
      </div>
      <div class="register">
        <a href="/register">注 册</a>
      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import {useRouter} from "vue-router";
import {getAuthorArticle} from "../../api";


export default {
  name: "UserInfo",
  setup: function () {
    const store = useStore();
    const router = useRouter();

    let user = reactive({
      username: "Hello",
      avatar: "https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-f@master/image.4skloqie47w0.png",
      userId: 0,
      hasLogin: false,
      articleCount: 0,
    });

    onMounted(() => {
      getAuthorArticleCount();
    });

    // 获取该作者的文章数目
    async function getAuthorArticleCount() {
      let res = await getAuthorArticle(user.userId);
      user.articleCount = res.data.data;
    }

    // 判断是否登录
    if (store.getters.getUser) {
      user.username = store.getters.getUser.username;
      user.avatar = store.getters.getUser.avatar;
      user.userId = store.getters.getUser.id;
      user.hasLogin = true;
    }

    function logout() {
      axios
          .get("http://test:8088/logout", {
            headers: {Authorization: localStorage.getItem("token")},
          })
          .then((res) => {
            store.commit("REMOVE_INFO");
            location.reload();
          });
    }

    function publishArticle() {
      router.push("/blog/add");
    }

    return {
      user,
      logout,
      publishArticle,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";

.halo-user-info {
  border-radius: #{$border-radius};
  box-shadow: #{$box-shadow};

  background: #FFFFFF;
  height: 182px;
  width: 320px;
  margin-bottom: 12px;

  .halo-has-not-login {
    width: 100%;
    display: flex;
    flex-flow: column;
    margin: 0;
    padding: 15px;

    .login,
    .register {
      flex: 1 0 auto;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-content: center;
      margin: 10px;
      cursor: pointer;
      font-size: 1.1rem;
      height: 65px;
      font-weight: 600;

      a {
        display: block;
        border-radius: 12px;
        text-align: center;
        width: 100%;
        height: 65px;
        // 文本上下居中
        line-height: 65px;
      }
    }

    .login {
      background: rgba(210, 231, 231, 0.99);
    }

    .register {
      background: rgba(230, 219, 232, 0.99);
    }

    .login > a:hover,
    .register > a:hover {
      background: #93c2e2;
      color: #ffffff;
    }
  }

  .halo-has-login {
    .halo-user-meta {
      display: flex;

      .halo-user-avatar {
        width: 166px;
        height: 166px;
        margin: 8px;
        border-radius: 8px;
      }

      .halo-user-button {
        display: flex;
        flex-direction: column;

        .halo-personal-homepage,
        .logout {
          background: #{$blue};
          color: #ffffff;
          margin-top: 8px;

          &:hover {
            background: #50a1f5;
          }
        }


        .icon {
          height: 78px;
          width: 130px;
          display: flex;
          justify-content: space-between;

          .add-icon, .massage-icon {
            height: 62px;
            width: 62px;
            color: #{$blue};
            margin-top: 8px;
            margin-bottom: 8px;

            &:hover {
              cursor: pointer;
              color: #50a1f5;
            }
          }
        }
      }
    }
  }
}
</style>