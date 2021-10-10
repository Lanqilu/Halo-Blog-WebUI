<template>
  <div class="halo-home">

    <div class="halo-body">
      <!-- 右侧卡片  -->
      <div class="halo-left-content">
        <UserInfo></UserInfo>
        <UserInfo></UserInfo>
      </div>

      <div class="halo-right-content">
        <!-- 左上测导航条 -->
        <default-header></default-header>
        <!-- 幻灯片 -->
        <div class="halo-carousel">
          <el-carousel :interval="5000" height="230px">
            <el-carousel-item
                v-for="item in carouselData.blogs"
                :key="item.id"
                @click.prevent="toBlogDetail(item.id)"
            >
              <div class="halo-carousel-title">{{ item.blogTitle }}</div>
              <img class="post_bg" :src="item.blogCover" :alt="item.blogTitle"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!--文章-->
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
    </div>

    <!-- 回到顶部 -->
    <el-backtop :bottom="100"></el-backtop>
  </div>
  <halo-footer></halo-footer>
</template>

<script>
import homeData from "../hooks/homeData";
import carouselData from "../hooks/carouselData";
import UserInfo from "../components/Cards/UserInfo.vue";
import SortInfo from "../components/Cards/SortInfo.vue";
import {useRouter} from "vue-router";
import IndexBanner from "../components/Banner/IndexBanner.vue";
import HaloFooter from "../components/Footer/HaloFooter.vue";
import DefaultHeader from "../components/Header/DefaultHeader.vue";


export default {
  name: "Home",
  components: {UserInfo, IndexBanner, HaloFooter, DefaultHeader, SortInfo},
  setup() {
    const router = useRouter();

    function toBlogDetail(id) {
      router.push({name: "BlogDetail", params: {blogId: id}});
    }

    return {
      toBlogDetail,
      ...homeData(),
      ...carouselData(),
    };
  },
};
</script>

<style lang="scss">
@import "../assets/style/mixin.scss";

.halo-blog-created,
.halo-carousel-title {
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  color: #f3f0f0dc;
  border-radius: 3px;
  letter-spacing: 0.3px;
}


.halo-body {
  .halo-right-content {
    .halo-blogs-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;

      .blogs {
        margin-top: 20px;
        border-radius: 12px;
        box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
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
            // text-align: center;
            // background: rgba(0, 0, 0, 0.3);
            // color: #f3f0f0dc;
            // border-radius: 3px;
            // letter-spacing: 0.3px;
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

    .halo-carousel {
      cursor: pointer;

      .halo-carousel-title {
        margin: 15px;
        padding: 0 6px;
        position: absolute;
        transform: translateY(180px);
        // text-align: center;
        // background: rgba(0, 0, 0, 0.3);
        // color: #f3f0f0dc;
        // border-radius: 3px;
        // letter-spacing: 0.3px;
      }

      .el-carousel__container {
        border-radius: 12px;
        overflow: hidden;

        img {
          width: 100%;
          padding: 0;
          margin: 0;
        }

        button {
          border-radius: #{$border-radius};
        }
      }

      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        border-radius: 12px;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
        overflow: hidden;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
        overflow: hidden;
      }
    }
  }
}
</style>