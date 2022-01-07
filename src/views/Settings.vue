<template>
    <div class="halo-page">
      <el-row>
        <el-col :sm="4" :md="4">
          <div class="setting">
            <div class="halo-bottom" @click="goTo('profile')">个人中心</div>
            <div class="halo-bottom" @click="goTo('account')">账号设置</div>
            <div class="halo-bottom">账号安全</div>
            <div class="halo-bottom">账号设置</div>
            <div class="halo-bottom">账号设置</div>
            <div class="halo-bottom">账号设置</div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="20" :md="20">
          <div class="content">
            <router-view name="profile"/>
            <router-view name="account"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <halo-footer></halo-footer>
</template>

<script>

import router from "../router";
import HaloFooter from "../components/Footer/HaloFooter.vue";

export default {
  name: "Settings",
  components: {
    HaloFooter
  },
  setup() {
    function goTo(string) {
      router.push(`/settings/${string}`)
    }

    return {
      goTo,
    }
  },
}
</script>

<style lang="scss" scoped>

@import "../assets/style/mixin.scss";

.halo-page {
  width: 100vw;
  max-width: 1024px;
  margin: auto;
}

.setting {
  height: 400px;
  margin: 12px 12px 0 12px;
  background: #FFFFFF;
  border-radius: #{$border-radius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.content {
  margin: 12px 12px 0 0;
  background: #FFFFFF;
  padding: 20px 12px 20px 12px;
  border-radius: #{$border-radius};
}


</style>