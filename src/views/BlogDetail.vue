<template>
  <div class="m-container">
    <div class="halo-blog">
      <div class="halo-title-card">
        <div class="post-info">
          <div class="halo-blog-info">
            <div class="halo-blog-sort">vue</div>
            <div class="halo-blog-tags">你好</div>
            <div class="halo-blog-tags">你好</div>
            <div class="halo-blog-tags">你好</div>
          </div>

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

        <div
          class="post-cover"
          :style="{ backgroundImage: 'url(' + blog.info.blogCover + ')' }"
        ></div>
      </div>

      <div
        class="post-cover"
        :style="{ backgroundImage: 'url(' + blog.info.blogCover + ')' }"
      ></div>

      <div class="halo-blog-content">
        <div class="m-blog" v-bind:class="{ active: state.isShowContent }">
          <div class="describe">
            {{ blog.info.description }}
          </div>
          <el-divider></el-divider>
          <div
            class="content markdown-body"
            v-html="blog.info.content"
            v-highlight
          ></div>
          <el-divider></el-divider>

          <div class="like" @click.once="giveLike()">
            点赞数：{{ blog.info.blogLike }}
          </div>
        </div>

        <div class="halo-blog-catalogue" v-if="state.isShowContent">
          <div class="fsdhufh"></div>
        </div>
      </div>
    </div>

    <div class="halo-setting">
      <button @click="showContent">目录</button>
    </div>

    <halo-footer></halo-footer>
  </div>
</template>
<script>
import "../assets/markdown-css/halo-markdown.css";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import marked from "marked";
import { BlogDetail, getAuthorInfo } from "../api";
import axios from "axios";
import { ElMessage } from "element-plus";
import HaloFooter from "../components/Footer/HaloFooter.vue";

export default {
  name: "BlogDetail",
  components: {
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
    });

    const blogId = route.params.blogId;

    onMounted(async () => {
      let blogDetailRes = await BlogDetail(blogId);
      blog.info = { ...blog.info, ...blogDetailRes.data.data };
      blog.info.content = marked(blog.info.content);

      console.log(blog);

      // 判断是否是自己的文章，能否编辑
      blog.isOwnBlog = blog.info.userId === store.getters.getUser.id;

      let authorInfoRes = await getAuthorInfo(blog.info.userId);
      blog.author = authorInfoRes.data.data;
    });

    // 点赞
    function giveLike() {
      axios.post(`http://localhost:8088/blog/like/${blogId}`).then((res) => {
        console.log(res);
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

    // 目录显示按钮;
    function showContent() {
      state.isShowContent = !state.isShowContent;
    }

    return {
      state,
      blog,
      giveLike,
      showContent,
    };
  },
};
</script>

<style scoped lang="scss">
.halo-blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;

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
      .fsdhufh {
        border-radius: 12px;
        background: #99cccc;
        position: sticky;
        top: 30px;
        height: 500px;
        width: 100%;
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
}
</style>