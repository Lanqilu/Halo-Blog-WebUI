<template>
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
          <div>{{ blog.author.nickName }}</div>
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
    <div id="content" class="content markdown-body" v-html="blog.info.content"></div>
    <el-skeleton :rows="10" animated v-if="blog.info.isShow" :throttle="200"/>
    <el-divider></el-divider>
  </div>
</template>

<script>
import "../../assets/markdown-css/halo-markdown.css";
import "highlight.js/styles/atom-one-dark.css";
import blogData from "../../hooks/blogData.js";

export default {
  name: "BlogDetails",
  setup() {
    // 进入页面 滚动条重置
    window.scrollTo(0, 0);
    return {
      ...blogData(),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";


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


</style>