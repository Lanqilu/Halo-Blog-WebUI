<template>
  <el-header class="halo-header" height="50px">
    <div class="halo-shadow"></div>
    <el-row :gutter="30" justify="space-between">
      <el-col :span="8">
        <div class="halo-nav-link">
          <ul class="halo-nav-link-ul">
            <li class="nav-link-item">
              <a href="//81.70.151.52:3000/home">主页</a>
            </li>
            <li class="nav-link-item">
              <a href="//81.70.151.52:3000/home">测试</a>
            </li>
            <li class="nav-link-item">
              <a href="//81.70.151.52:3000/home">测试</a>
            </li>
            <li class="nav-link-item">
              <a href="//81.70.151.52:3000/home">测试</a>
            </li>
            <li class="nav-link-item">
              <a href="//www.bilibili.com/anime/" target="_blank" class="link">番剧</a>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <!-- <div class="halo-search">
          <el-form ref="form" :model="form" label-width="150px" inline="true" size="small">
            <el-form-item>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search"></el-button>
            </el-form-item>
          </el-form>
        </div>-->
      </el-col>
      <el-col :span="8">
        <div class="halo-user-center">
          <a href="//test:8008/#/blog/article" target="_blank" class="link">个人中心</a>
          <a href="//test:8008/#/blog/article" target="_blank" class="link">个人中心</a>
          <a href="//test:8008/#/blog/article" target="_blank" class="link">个人中心</a>
          <a href="//test:8008/#/blog/article" target="_blank" class="link">个人中心</a>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  // 首页 Banner
  name: "IndexBanner",
};
</script>

<style lang="scss" scoped>
.test-style {
  border: solid 1px;
  min-width: 10px;
}

ol,
ul {
  list-style: none;
}

.halo-header {
  background-image: url("../../assets/images/bilibiliBanner2021Autumn.png");
  background-position-x: center;
  // 把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉
  background-size: cover;
  width: 100%;
  // 需要自适应调整
  height: 155px;
}

.halo-shadow {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
}

.halo-nav-link {
  height: 50px;
  .halo-nav-link-ul {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
    .nav-link-item {
      color: white;
    }
  }
}

.halo-search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  .el-form-item {
    margin-bottom: 0;
  }
}

.halo-user-center {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-evenly;
  color: white;
}
</style>