<template>
  <div class="halo-home">

    <div class="halo-body">
      <!-- 右侧卡片  -->
      <div class="halo-left-content">

        <user-info></user-info>
        <time-card></time-card>
        <music-card></music-card>
        <router-view name="blogContents"/>

      </div>
      <div class="halo-right-content">
        <!-- 左上测导航条 -->
        <default-header></default-header>
        <router-view name="indexCarousel"/>
        <router-view name="linkList"/>
        <router-view name="blogCards"/>
        <router-view name="blogDetails"/>
        <router-view name="Content"/>
      </div>
    </div>
    <!-- 回到顶部 -->
    <el-backtop :bottom="100"></el-backtop>
  </div>
  <halo-footer></halo-footer>
</template>

<script>
import UserInfo from "../components/Cards/UserInfo.vue";
import SortInfo from "../components/Cards/SortInfo.vue";
import IndexBanner from "../components/Banner/IndexBanner.vue";
import HaloFooter from "../components/Footer/HaloFooter.vue";
import DefaultHeader from "../components/Header/DefaultHeader.vue";
import IndexCarousel from "../components/Carousel/IndexCarousel.vue";
import BlogCard from "../components/Blog/BlogCard.vue";
import MusicCard from "../components/Cards/MusicCard.vue";
import TimeCard from "../components/Cards/TimeCard.vue";

export default {
  name: "Home",
  components: {
    IndexCarousel,
    UserInfo,
    IndexBanner,
    HaloFooter,
    DefaultHeader,
    SortInfo,
    BlogCard,
    MusicCard,
    TimeCard
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
  .halo-left-content {
    .fixed {
      top: 12px;
      position: sticky;
    }

  }


}
</style>