<template>
  <!--  <div class="halo-top"></div>-->
  <div class="halo-header">
    <div class="halo-a" @click="toHome()">
      主页
    </div>
    <div class="halo-a" @click="toNav()">
      导航
    </div>
    <div class="halo-a" @click="toHome()">
      工具
    </div>
    <div class="halo-a" @click="toHome()">
      动态
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
.halo-top {
  height: 20px;
}

.halo-header {
  margin: 30px 0 20px 0;
  height: 60px;
  width: 100%;
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .halo-a {
    cursor: pointer;
  }
}
</style>>
