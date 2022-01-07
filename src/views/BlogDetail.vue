<template>
  <div class="halo-blog">
    <div class="halo-body">
      <div class="halo-blog-left">
        <div class="user-info">
          <UserInfo></UserInfo>
        </div>
        <div class="halo-sticky">
          <!-- 文章目录 -->
          <div class="halo-blog-catalogue" v-if="state.isShowContent">
            <div class="toc-title">目录</div>
            <el-divider></el-divider>
            <div class="toc">

              <div>
                <ul id="toc-content">
                  <li
                      v-for="item in state.treeArray"
                      :key="item.id"
                      :id="`${item.id}-halo`"
                      :class="item.tag"
                      class="toc-content-item"
                  >
                    <!-- 使用DOM进行跳转,不记录历史记录-->
                    <a class="toc-content-item" @click="jump(`${item.id}`)">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 点赞投币收藏  -->
          <div class="operation">
            <div
                class="like"
                @click.once="giveLike()"
                :class="blog.info.isLike === true ? 'activeLike' : ''"
            >
              <svg class="icon dianzan" aria-hidden="true">
                <use xlink:href="#icon-dianzan"/>
              </svg>
              <span id="likeNum"> {{ blog.info.blogLike }}</span>

            </div>
            <div>投币</div>
            <div>收藏</div>
          </div>
        </div>
      </div>

      <div class="halo-blog-right">
        <default-header></default-header>
        <!-- 文章头信息 -->
        <div class="halo-title-card">
          <div class="post-info">
            <!-- TODO:文章分类和标签信息 -->

            <!-- 文章标题 -->
            <div class="halo-blog-title">
              <div class="title">{{ blog.info.blogTitle }}</div>
              <div class="edit">
                <el-link icon="el-icon-edit" v-if="blog.isOwnBlog">
                  <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.info.id } }">编辑</router-link>
                </el-link>
              </div>
            </div>

            <!-- 文章作者信息 -->
            <div class="halo-blog-author">
              <div class="avatar">
                <img :src="blog.author.avatar" alt class="author-avatar"/>
              </div>
              <div class="author-info">
                <div>{{ blog.author.username }}</div>
                <div>{{ blog.author.email }}</div>
              </div>
            </div>
          </div>

          <!-- 文章封面 -->
          <div
              class="post-cover"
              :style="{ backgroundImage: 'url(' + blog.info.blogCover + ')' }"
          ></div>
        </div>
        <!-- 文章主体信息 -->
        <div class="m-blog" v-bind:class="{ active: state.isShowContent }">
          <div id="describe" class="describe">{{ blog.info.description }}</div>
          <el-divider></el-divider>

          <el-skeleton :rows="10" animated v-if="blog.info.isShow" :throttle="200"/>

          <div id="content" class="content markdown-body" v-html="blog.info.content"></div>

          <el-divider></el-divider>
        </div>
      </div>
    </div>


    <!-- 回到顶部 -->
    <el-backtop :bottom="100"></el-backtop>

    <!-- 固定设置按钮 -->
    <div class="halo-setting">
      <button @click="showContent">目录</button>
    </div>
  </div>
  <halo-footer></halo-footer>
</template>
<script>
import "../assets/markdown-css/halo-markdown.css";
import {onMounted, reactive, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {BlogDetail, getAuthorInfo} from "../api";
import {ElMessage} from "element-plus";
import HaloFooter from "../components/Footer/HaloFooter.vue";
import DefaultHeader from "../components/Header/DefaultHeader.vue";
import UserInfo from "../components/Cards/UserInfo.vue";
import "highlight.js/styles/atom-one-dark.css";
import {get} from "../utils/request";

export default {
  name: "BlogDetail",
  components: {
    DefaultHeader,
    HaloFooter,
    UserInfo,
  },

  setup(){
    const route = useRoute();
    const store = useStore();

    // 进入页面 滚动条重置
    document.body.scrollTo(0, 0);

    let blog = reactive({
      info: {
        userId: null,
        blogTitle: "",
        description: "",
        content: "",
        blogLike: null,
        isShow: true,
        isLike: false,
      },
      isOwnBlog: false,
      author: {
        avatar: "",
        username: "",
        email: "",
      },
    });

    let state = reactive({
      isShowContent: true,
      treeArray: [],
      scroll: "",
    });

    const blogId = route.params.blogId;

    onMounted(async () => {
      let blogDetailRes = await BlogDetail(blogId);
      console.log("————————————————数据获取完成————————————————");

      blog.info = {...blog.info, ...blogDetailRes.data.data};

      blog.info.content = blog.info.contentHtml;

      try {
        // 判断是否是自己的文章，能否编辑
        blog.isOwnBlog = blog.info.userId === store.getters.getUser.id;
      } catch (e) {
        console.log(e);
        console.log("未登录");
      }

      let authorInfoRes = await getAuthorInfo(blog.info.userId);
      blog.author = authorInfoRes.data.data;

      getToc();
      console.log("————————————————数据挂载完成————————————————");

      blog.info.isShow = false;

      window.addEventListener("scroll", dataScroll);
    });

    // 点赞
    function giveLike() {
      get(`/blog/like/${blogId}`).then((res) => {
        if (res.data.code === 200) {
          ElMessage.success({
            message: res.data.msg,
            type: "success",
          });
          blog.info.blogLike = res.data.data;
        } else {
          ElMessage(res.data.msg);
        }
      });
      blog.info.isLike = true;
      document.getElementById("likeNum").setAttribute("style", "display: initial;")
    }

    function getToc() {
      let children = document.getElementById("content").children;
      for (let i = 0; i < children.length - 1; i++) {
        let nodeName = children[i].nodeName;
        if (nodeName === "H2" || nodeName === "H3" || nodeName === "H4") {
          state.treeArray.push({
            id: children[i].id,
            name: children[i].innerText,
            tag: children[i].nodeName,
          });
        }
      }
    }

    // 目录显示按钮;
    function showContent() {
      state.isShowContent = !state.isShowContent;
    }

    // 回到顶部 弃用
    function toTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    //获取屏幕距离顶部的距离
    function dataScroll() {
      state.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    }

    function loadScroll() {
      let children = document.getElementById("content").children;
      let anchorId;
      for (let i = 1; i < children.length - 1; i++) {
        let nodeName = children[i].nodeName;
        if (nodeName === "H2" || nodeName === "H3" || nodeName === "H4") {
          if (children[i].offsetTop - state.scroll > 10) {
            anchorId = children[i].id + "-halo";
            break;
          }
        }
      }
      let tocContent = document.getElementById(anchorId);
      try {
        tocContent = tocContent.previousSibling;
      } catch {
        console.log("...");
      }

      const li = document.querySelector(".catalog-active");
      if (li) {
        li.classList.remove("catalog-active");
      }
      try {
        tocContent.classList.add("catalog-active");
      } catch {
        console.log("...");
      }
    }

    function jump(v) {
      document.getElementById(v).scrollIntoView(true);
    }

    // TODO 根据页面滑动实现目录跟随 2021年9月26日

    watch(
        () => state.scroll,
        () => {
          loadScroll();
          // console.log(state.scroll);
        }
    );

    return {
      state,
      blog,
      giveLike,
      showContent,
      toTop,
      jump,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/mixin.scss";

.halo-blog {
  width: 1169px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;


  .halo-body {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    width: 100%;
    position: relative;

    .halo-blog-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 836px;

      .halo-title-card {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background: #ffffff;
        border-radius: #{$border-radius};
        width: 100%;
        max-height: 300px;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .post-info {
          padding: 30px;

          .halo-blog-info {
            display: flex;
          }

          .halo-blog-title {
            display: flex;
            align-items: center;
            margin: 0.8rem 0 0.8rem 0;

            .title {
              font-weight: 700;
              font-size: 2.3rem;
              line-height: 1.2;
              text-align: left;
              padding: 0;

              &:after {
                display: block;
                content: "";
                width: 30%;
                height: 15px;
                background-color: #ffd55d;
                bottom: 0;
                z-index: -1;
                position: relative;
                transform: translateY(-15px);
              }
            }

            .edit {
              margin: 20px;
            }
          }

          .halo-blog-author {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;

            img {
              max-height: 3.5rem;
              border-radius: #{$border-radius};
            }

            .author-info {
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
            }
          }
        }

        .post-cover {
          border-radius: #{$border-radius};
          width: 350px;
          height: 200px;
          background-size: cover;
          margin: 8px;
        }
      }

      .m-blog {
        .describe {
          line-height: 1.8;
          font-size: 1.1em;
        }

        margin-top: #{$card-gap};
        padding: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background: rgba(255, 255, 255, 0.8);
        border-radius: #{$border-radius};
        width: 836px;
      }
    }

    .halo-blog-left {
      margin-right: #{$card-gap};
      top: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;

      .halo-sticky {
        top: #{$card-gap};
        position: sticky;

        .halo-blog-catalogue {

          border-radius: #{$border-radius};
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

          .el-divider--horizontal {
            margin-top: 0;
            margin-bottom: 0;
          }

          .toc-title {
            text-align: center;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            color: #333333;

          }

          // 目录
          .toc {
            padding-top: 10px;
            padding-bottom: 10px;
            overflow: auto;
            height: 500px;

            // 目录中标题鼠标样式
            .toc-content-item {
              cursor: pointer;
            }

            ul {
              // 文本不换行 多出的截断
              // 包裹了 lu 不能实现截断
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            ul,
            li {
              list-style: none;
              margin: 0;
              padding-top: 1.5px;
              padding-bottom: 1.5px;
            }

            ul {
              width: 75%;
              margin: 10px auto;

              .catalog-active {
                color: #{$blue} !important;
                &::before {
                  content: "→ ";
                  margin-left: -1.3em;
                }
              }

              .H2 {
                margin-bottom: 5px;
                color: rgba(93, 163, 126);
              }

              .H3 {
                margin-left: 20px;
                margin-bottom: 5px;
                color: rgba(114, 133, 163);
              }

              .H4 {
                margin-left: 30px;
                margin-bottom: 5px;
                color: rgba(163, 142, 131);
              }


              .H2,
              .H3 {
                &:hover {
                  color: #{$blue};
                }
              }
            }


            &::-webkit-scrollbar {
              // 隐藏滚动条
              //display: none;
              width: 4px;
            }

            &::-webkit-scrollbar-thumb {
              border-radius: 5px;
              box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
              background: rgba(0, 0, 0, 0.2);
            }

            &::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0);
            }
          }
        }

        // 目录下的点赞操作
        .operation {
          margin-top: 12px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          height: 50px;
          width: 100%;

          display: flex;
          flex-wrap: nowrap;
          justify-content: space-evenly;
          align-items: center;

          & > div {
            cursor: pointer;

            &:hover {
              color: #{$blue};
            }
          }
        }
      }
    }

    .activeLike {
      color: rgba(28, 27, 27, 0.96) !important;
    }

    .like {
      cursor: pointer;
      color: rgba(163, 156, 156, 0.9);

      .dianzan {
        width: 1.3em;
        height: 1.3em;
      }

      & > span {
        padding: 5px;
        display: none;
      }
    }

    .active {
      width: 75%;
    }
  }
}

.halo-setting {
  display: none;
  position: fixed;
  left: 40px;
  top: 10px;
  z-index: 1;
}
</style>