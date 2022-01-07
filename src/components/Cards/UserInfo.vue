<template>
  <div class="halo-user-info">
    <!-- 如果登录展示该 div -->
    <div class="halo-has-login" v-show="user.hasLogin">
      <div class="halo-user-meta">
        <div class="halo-user-avatar">
          <el-avatar shape="square" :size="130" :src="user.avatar"></el-avatar>
          <div class="username"> {{ user.username }}</div>
        </div>
        <div class="halo-user-button">
          <div class="halo-personal-homepage halo-bottom" @click="goTo('trends')">

            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                 class="right-entry-icon">
              <g clip-path="url(#clip0)">
                <path
                    d="M10 10.743C7.69883 10.743 5.83333 8.87747 5.83333 6.5763C5.83333 4.27512 7.69883 2.40964 10 2.40964V10.743Z"
                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                <path
                    d="M10 10.743C10 13.0441 8.1345 14.9096 5.83333 14.9096C3.53217 14.9096 1.66667 13.0441 1.66667 10.743H10Z"
                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                <path
                    d="M10 10.743C10 8.44182 11.8655 6.57632 14.1667 6.57632C16.4679 6.57632 18.3333 8.44182 18.3333 10.743H10Z"
                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                <path
                    d="M9.99999 10.743C12.3012 10.743 14.1667 12.6085 14.1667 14.9096C14.1667 17.2108 12.3012 19.0763 9.99999 19.0763V10.743Z"
                    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="20" height="20" fill="currentColor" transform="matrix(-1 0 0 1 20 0.742981)"></rect>
                </clipPath>
              </defs>
            </svg>

            动态
          </div>
          <div class="halo-personal-homepage halo-bottom" @click="publishArticle()">

            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                 class="right-entry-icon">
              <path
                  d="M15.435 17.7717H4.567C2.60143 17.7717 1 16.1723 1 14.2047V5.76702C1 3.80144 2.59942 2.20001 4.567 2.20001H15.433C17.3986 2.20001 19 3.79943 19 5.76702V14.2047C19.002 16.1703 17.4006 17.7717 15.435 17.7717ZM4.567 4.00062C3.59327 4.00062 2.8006 4.79328 2.8006 5.76702V14.2047C2.8006 15.1784 3.59327 15.9711 4.567 15.9711H15.433C16.4067 15.9711 17.1994 15.1784 17.1994 14.2047V5.76702C17.1994 4.79328 16.4067 4.00062 15.433 4.00062H4.567Z"
                  fill="currentColor"></path>
              <path
                  d="M9.99943 11.2C9.51188 11.2 9.02238 11.0667 8.59748 10.8019L8.5407 10.7635L4.3329 7.65675C3.95304 7.37731 3.88842 6.86226 4.18996 6.50976C4.48954 6.15544 5.0417 6.09699 5.4196 6.37643L9.59412 9.45943C9.84279 9.60189 10.1561 9.60189 10.4067 9.45943L14.5812 6.37643C14.9591 6.09699 15.5113 6.15544 15.8109 6.50976C16.1104 6.86409 16.0478 7.37731 15.6679 7.65675L11.4014 10.8019C10.9765 11.0667 10.487 11.2 9.99943 11.2Z"
                  fill="currentColor"></path>
            </svg>

            消息

          </div>
          <div class="halo-personal-homepage halo-bottom" @click="logout">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                 class="link-icon">
              <path
                  d="M17.6137 9.30115C17.6932 9.10837 17.6932 8.89282 17.6137 8.70004C17.5743 8.60393 17.5165 8.51726 17.4443 8.44504L15.2221 6.22282C14.9148 5.9156 14.4176 5.91615 14.111 6.22282C13.8043 6.52948 13.8037 7.02671 14.111 7.33393L14.9921 8.21504L7.99985 8.21504C7.56596 8.21448 7.21429 8.56615 7.21429 9.00059C7.21429 9.21726 7.30207 9.41393 7.44429 9.55615C7.58651 9.69837 7.78318 9.78615 7.99985 9.78615L14.9921 9.78615L14.111 10.6673C13.8043 10.9739 13.8037 11.4712 14.111 11.7784C14.4182 12.0856 14.9154 12.085 15.2221 11.7784L17.4443 9.55615C17.5165 9.48393 17.5743 9.39726 17.6137 9.30115"
                  fill="currentColor"></path>
              <path
                  d="M11.8889 5.11111C9.74127 2.96349 6.25873 2.96349 4.11111 5.11111C1.96349 7.25873 1.96349 10.7413 4.11111 12.8889C6.25873 15.0365 9.74127 15.0365 11.8889 12.8889C12.1957 12.5821 12.6932 12.5821 13 12.8889C13.3068 13.1957 13.3068 13.6932 13 14C10.2387 16.7613 5.76127 16.7613 3 14C0.238731 11.2387 0.23873 6.76127 3 4C5.76127 1.23873 10.2387 1.23873 13 4C13.3068 4.30683 13.3068 4.80429 13 5.11111C12.6932 5.41794 12.1957 5.41794 11.8889 5.11111Z"
                  fill="currentColor"></path>
            </svg>
            退出
          </div>
        </div>
      </div>
    </div>

    <!-- 如果未登录展示该 div -->
    <div class="halo-has-not-login" v-if="!user.hasLogin">
      <div class="login" @click="goToNew('login')">登 录</div>
      <div class="register" @click="goToNew('register')">注 册</div>
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

    // 路由到新地址
    function goTo(string) {
      router.push(`/${string}`)
    }

    // 路由到新地址并在新页面打开
    function goToNew(string) {
      let data = router.resolve(`/${string}`)
      window.open(data.href, '_blank')
    }

    let user = reactive({
      username: "Hello",
      avatar: "https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-f@master/image.4skloqie47w0.png",
      userId: 0,
      hasLogin: false,
      articleCount: 0,
    });

    onMounted(() => {
      getAuthorArticleCount();

      // 判断是否登录
      if (store.getters.getUser) {
        user.username = store.getters.getUser.username;
        user.avatar = store.getters.getUser.avatar;
        user.userId = store.getters.getUser.id;
        user.hasLogin = true;
      }
    });

    // 获取该作者的文章数目
    async function getAuthorArticleCount() {
      let res = await getAuthorArticle(user.userId);
      user.articleCount = res.data.data;
    }


    function logout() {
      axios.delete("http://localhost:8080/auth/logout", {
        headers: {Authorization: localStorage.getItem("token")},
      }).then((res) => {
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
      goTo,
      goToNew,
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
  width: 300px;
  margin-bottom: 12px;

  .halo-has-not-login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;

    .login {
      margin: 16px 16px 8px 16px;
      background: rgba(210, 231, 231, 0.99);
    }

    .register {
      margin: 8px 16px 16px 16px;
      background: rgba(230, 219, 232, 0.99);
    }

    .login,
    .register {
      flex: 1 0 auto;
      border-radius: 8px;
      font-size: 18px;
      height: 65px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-content: center;
      cursor: pointer;
      line-height: 65px;

      &:hover {
        font-size: 20px;
        background: #{$blue};
        color: #ffffff;
      }
    }
  }

  .halo-has-login {
    .halo-user-meta {
      display: flex;
      justify-content: space-evenly;

      .halo-user-avatar {
        width: 130px;
        height: 166px;
        margin: 8px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        .username {
          font-size: 18px;
          color: #71829e;
        }
      }

      .halo-user-button {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .halo-personal-homepage {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            margin-right: 6px;
          }


          &:hover {
            background: #{$blue};
          }
        }


        .icon {
          height: 20px;
          width: 20px;
          transform: translateY(1px);

          .add-icon, .massage-icon {
            height: 62px;
            width: 62px;
            color: #333333;
            margin-top: 8px;
            margin-bottom: 8px;

            &:hover {
              cursor: pointer;
              color: #{$blue};
            }
          }
        }
      }
    }
  }
}
</style>