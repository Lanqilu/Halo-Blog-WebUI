<template>
  <div id="halo-blog">
    <div class="halo-blogs-box">
      <div
          v-for="item in homeData.blogs"
          :key="item.id"
          class="blogs"
          @click="toBlogDetail(item.id)"
      >
        <div class="halo-blog-content">
          <h3 class="halo-blog-title">{{ item.blogTitle }}</h3>
          <p class="halo-blog-text">{{ item.description }}</p>
        </div>
        <div class="halo-blog-img">
          <img class="post_bg" :src="item.blogCover" :alt="item.blogTitle"/>
          <p class="halo-blog-created">{{ item.created }}</p>
        </div>
      </div>
    </div>
    <!--分页-->
    <el-pagination
        class="halo-pagination"
        background
        hide-on-single-page="1"
        layout="prev, pager, next, jumper"
        :current-page="homeData.currentPage"
        :page-size="homeData.pageSize"
        :total="homeData.total"
        @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import homeData from "../../hooks/homeData";

export default {
  name: "BlogCard",
  setup() {
    return {
      ...homeData(),
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/style/mixin.scss";

.halo-blogs-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .blogs {
    margin-top: 12px;
    border-radius: #{$border-radius};
    box-shadow: #{$box-shadow};
    background: rgba(255, 255, 255, 0.9);

    .halo-blog-content {
      cursor: pointer;

      display: flex;
      flex-direction: column;
      padding: 30px;

      .halo-blog-title {
        font-weight: 700;
        line-height: 1.6;
        font-size: 1.3rem;
        margin-bottom: 10px;
        z-index: 1;

        &:after {
          display: block;
          content: "";
          width: 30%;
          height: 8px;
          background-color: #FFD55D;
          bottom: 0;
          z-index: -1;
          position: relative;
          transform: translateY(-13px);
        }
      }

      .halo-blog-text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        color: rgba(141, 140, 140, 0.856);
        font-size: 0.9rem;
        line-height: 160%;
      }
    }

    min-height: 100px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    .halo-blog-img {
      padding: 0;
      margin: 0;

      .halo-blog-created {
        position: absolute;
        z-index: 1;
        transform: translateY(-40px) translateX(210px);
        width: 100px;
      }

      img {
        width: 330px;
        height: 100%;
        padding: 0;
        margin: 0;
      }
    }
  }
}

.halo-pagination {
  text-align: center;
  margin-top: 20px;

  .number,
  .btn-prev,
  .btn-next {
    background: #ffffff00;
  }

}


</style>