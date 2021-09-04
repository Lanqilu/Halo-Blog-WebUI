<template>
  <div class="m-container">
    <default-header></default-header>
    <div class="halo-blog">
      <!-- 文章头信息 -->
      <div class="halo-title-card">
        <div class="post-info">
          <!-- 文章分类和标签信息 -->
          <div class="halo-blog-info">
            <div class="halo-blog-sort">vue</div>
            <div class="halo-blog-tags">你好</div>
            <div class="halo-blog-tags">你好</div>
            <div class="halo-blog-tags">你好</div>
          </div>

          <!-- 文章标题 -->
          <div class="halo-blog-title">
            <div class="title">
              {{ blog.info.blogTitle }}
            </div>
            <div class="edit">
              <el-link icon="el-icon-edit" v-if="blog.isOwnBlog">
                <router-link
                  :to="{ name: 'BlogEdit', params: { blogId: blog.info.id } }"
                  >编辑</router-link
                >
              </el-link>
            </div>
          </div>

          <!-- 文章作者信息 -->
          <div class="halo-blog-author">
            <div class="avatar">
              <img :src="blog.author.avatar" alt class="author-avatar" />
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

      <div class="halo-blog-content">
        <!-- 文章主体信息 -->
        <div class="m-blog" v-bind:class="{ active: state.isShowContent }">
          <div id="describe" class="describe">
            {{ blog.info.description }}
          </div>
          <el-divider></el-divider>

          <el-skeleton
            :rows="10"
            animated
            v-if="blog.info.isShow"
            :throttle="200"
          />

          <div
            id="content"
            class="content markdown-body"
            v-html="blog.info.content"
          ></div>

          <el-divider></el-divider>

          <div class="like" @click.once="giveLike()">
            点赞数：{{ blog.info.blogLike }}
          </div>
        </div>

        <!-- 文章目录 -->
        <div class="halo-blog-catalogue" v-if="state.isShowContent">
          <div class="toc">
            <div>
              <ul id="toc-content">
                <li
                  v-for="item in state.treeArray"
                  :key="item.id"
                  :id="`${item.id}-halo`"
                  :class="item.tag"
                >
                  <a :href="'#' + item.id">{{ item.name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 固定设置按钮 -->
    <div class="halo-setting">
      <button @click="showContent">目录</button>
      <button @click="toTop">回到顶部</button>
    </div>
  </div>
  <halo-footer></halo-footer>
</template>
<script>
import "../assets/markdown-css/halo-markdown.css";
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import marked from "marked";
import { BlogDetail, getAuthorInfo } from "../api";
import axios from "axios";
import { ElMessage } from "element-plus";
import HaloFooter from "../components/Footer/HaloFooter.vue";
import DefaultHeader from "../components/Header/DefaultHeader.vue";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default {
  name: "BlogDetail",
  components: {
    DefaultHeader,
    HaloFooter,
  },

  setup() {
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
      },
      isOwnBlog: false,
      author: {
        avatar: "",
        username: "默认名称",
        email: "",
      },
    });

    let state = reactive({
      isShowContent: true,
      treeArray: [],
      scroll: "",
    });

    const blogId = route.params.blogId;

    // 参考地址：https://blog.csdn.net/weixin_41727824/article/details/112776711
    let rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true, //默认为true。 允许 Git Hub标准的markdown.
      tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
      breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
      pedantic: false, //默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
      smartLists: true,
      smartypants: true, //使用更为时髦的标点，比如在引用语法中加入破折号。
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      langPrefix: "hljs language-",
    });

    onMounted(async () => {
      let blogDetailRes = await BlogDetail(blogId);
      console.log("————————————————数据获取完成————————————————");

      blog.info = { ...blog.info, ...blogDetailRes.data.data };
      blog.info.content = marked(blog.info.content);

      console.log("————————————————marked转义完成————————————————");

      // 判断是否是自己的文章，能否编辑
      blog.isOwnBlog = blog.info.userId === store.getters.getUser.id;

      let authorInfoRes = await getAuthorInfo(blog.info.userId);
      blog.author = authorInfoRes.data.data;

      getToc();
      console.log("————————————————挂载完成————————————————");

      blog.info.isShow = false;

      window.addEventListener("scroll", dataScroll);
    });

    // 点赞
    function giveLike() {
      axios.post(`http://localhost:8088/blog/like/${blogId}`).then((res) => {
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
    }

    function getToc() {
      let childrens = document.getElementById("content").children;
      for (let i = 0; i < childrens.length - 1; i++) {
        let nodeName = childrens[i].nodeName;
        if (nodeName == "H2" || nodeName == "H3") {
          state.treeArray.push({
            id: childrens[i].id,
            name: childrens[i].innerText,
            tag: childrens[i].nodeName,
          });
        }
      }
    }

    // 目录显示按钮;
    function showContent() {
      state.isShowContent = !state.isShowContent;
    }

    function toTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // console.log(state.scroll);
      // loadScroll();
    }

    function dataScroll() {
      state.scroll =
        document.documentElement.scrollTop || document.body.scrollTop; //获取屏幕距离顶部的距离
    }

    function loadScroll() {
      let childrens = document.getElementById("content").children;
      for (let i = 1; i < childrens.length - 1; i++) {
        let nodeName = childrens[i].nodeName;
        if (nodeName == "H2" || nodeName == "H3") {
          if (childrens[i].offsetTop - state.scroll > 10) {
            var anchorId = childrens[i].id + "-halo";
            break;
          }
        }
      }
      let tocContent = document.getElementById(anchorId);
      tocContent = tocContent.previousSibling;

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
    };
  },
};
</script>

<style scoped lang="scss">
.m-container {
  width: 1200px;
  margin: 0 auto;

  .halo-blog {
    display: flex;
    flex-direction: column;
    align-items: center;

    .halo-title-card {
      margin-top: 30px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background: #ffffff;
      border-radius: 12px;
      width: 100%;
      max-height: 300px;

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
          }
          .edit {
            margin: 20px;
          }
        }

        .halo-blog-author {
          margin-top: 15px;
          display: flex;
          justify-content: flex-start;

          img {
            max-height: 3.5rem;
            border-radius: 6px;
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
        border-radius: 12px;
        width: 300px;
        height: 200px;
        background-size: cover;
        margin: 20px;
      }
    }

    .halo-blog-content {
      margin: 30px auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      width: 100%;

      .m-blog {
        .describe {
          line-height: 1.8;
          font-size: 1.1em;
        }

        padding: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background: #ffffff;
        border-radius: 12px;
        width: 100%;

        .like {
          cursor: pointer;
        }
      }

      .active {
        width: 70%;
      }

      .halo-blog-catalogue {
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        top: 30px;
        height: 500px;
        width: 100%;
        position: sticky;
        .toc {
          overflow: auto;
          height: 100%;
          background: #ffffff6b;
          ul,
          li {
            list-style: none;
            margin: 0px;
            padding: 0px;
          }

          ul {
            width: 75%;
            margin: 20px auto;

            .catalog-active {
              color: #e94986 !important;
              &::before {
                content: "# ";
                margin-left: -1em;
              }
            }

            .H2 {
              margin-bottom: 5px;
              color: rgb(150, 58, 211);
            }
            .H3 {
              margin-left: 25px;
              margin-bottom: 5px;
              color: rgb(211, 98, 22);
            }

            .H2,
            .H3 {
              border-radius: 10px;
              &:hover {
                color: rgb(49, 77, 235);
              }
            }
          }

          // 滚动条
          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 0px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: rgba(0, 0, 0, 0.2);
          }
          &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: rgba(0, 0, 0, 0.1);
          }
        }

        margin-left: 30px;
        width: 30%;
      }
    }
  }

  .halo-setting {
    position: fixed;
    right: 40px;
    bottom: 100px;
    z-index: 1;
  }
}
</style>