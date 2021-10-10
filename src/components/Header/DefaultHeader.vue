<template>
  <!--  <div class="halo-top"></div>-->
  <div class="halo-header">
    <div class="halo-a halo-bottom" @click="toHome()">
      主页
    </div>
    <div class="halo-a halo-bottom" @click="toNav()">
      导航
    </div>
    <div class="halo-a halo-bottom" @click="toHome()">
      工具
    </div>
    <div class="halo-a halo-bottom" @click="toHome()">
      Bottom
    </div>
    <div class="halo-a halo-bottom" @click="toHome()">
      Bottom
    </div>
    <div class="halo-a halo-bottom" @click="toHome()">
      Bottom
    </div>
  </div>
</template>

<script>

import {useRouter} from "vue-router";

export default {
  name: "DefaultHeader",

  setup() {
    const router = useRouter();

    function toNav() {
      router.push("/nav");
    }

    function toHome() {
      router.push("/home");
    }


    return {
      toNav,
      toHome,
    }

  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";

// header 统一样式
$header-background: #FFFFFF;

// 距离顶部留20px
.halo-top {
  height: 20px;
}

.halo-header {
  margin: 30px 0 20px 0;
  height: 60px;
  width: 100%;
  background: #{$header-background};
  box-shadow: #{$box-shadow};
  border-radius: #{$border-radius};

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .halo-a {
    cursor: pointer;
  }
}
</style>>
