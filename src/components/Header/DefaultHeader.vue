<template>
  <!--  <div class="halo-top"></div>-->
  <div class="halo-header">
    <div class="halo-a halo-bottom" @click="goTo('home')">
      主页
    </div>
    <div class="halo-a halo-bottom" @click="goTo('nav')">
      导航
    </div>
    <div class="halo-a halo-bottom" @click="goToNew('tools')">
      工具
    </div>
    <div class="halo-a halo-bottom" @click="goToNew('settings')">
      设置
    </div>
    <div class="halo-a halo-bottom" @click="getMore()">
      更多
    </div>
  </div>
</template>

<script>

import {useRouter} from "vue-router";

export default {
  name: "DefaultHeader",

  setup() {
    const router = useRouter();

    function goToNew(string) {
      let data = router.resolve(`/${string}`)
      window.open(data.href, '_blank')
    }

    function goTo(string) {
      router.push(`/${string}`)
    }

    function getMore() {

    }

    return {
      goTo,
      goToNew,
      getMore,
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
  margin: 30px 0 12px 0;
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
