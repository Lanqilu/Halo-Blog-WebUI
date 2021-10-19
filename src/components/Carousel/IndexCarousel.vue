<template>
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
</template>

<script>
import carouselData from "../../hooks/carouselData";
import {useRouter} from "vue-router";

export default {
  name: "IndexCarousel",
  setup() {

    const router = useRouter();

    function toBlogDetail(id) {
      router.push({name: "BlogDetail", params: {blogId: id}});
    }

    return {
      toBlogDetail,
      ...carouselData(),
    };
  }
}


</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";

.halo-carousel {
  cursor: pointer;

  .el-carousel.el-carousel--horizontal {
    border-radius: 8px;
  }

  .halo-carousel-title {
    margin: 15px;
    padding: 0 6px;
    position: absolute;
    transform: translateY(180px);
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
</style>