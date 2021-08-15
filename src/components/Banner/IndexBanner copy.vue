<template>
  <div class="halo-banner">
    <div class="halo-banner-header">
      <div class="header-content">
        <div class="nav-link test-style">
          <ul class="nav-link-ul">
            <li class="nav-link-item">
              <a href="//localhost:3000/home">主页</a>
            </li>
            <li class="nav-link-item">
              <a href="//localhost:3000/home">测试</a>
            </li>
            <li class="nav-link-item">
              <a href="//localhost:3000/home">测试</a>
            </li>
            <li class="nav-link-item">
              <a href="//localhost:3000/home">测试</a>
            </li>
            <li class="nav-link-item">
              <a href="//www.bilibili.com/anime/" target="_blank" class="link">番剧</a>
            </li>
          </ul>
        </div>

        <div class="nav-search-box">
          <div class="nav-search">
            <form id="nav-search-form">
              <!--  autocomplete  是否启用自动完成功能 自动完成允许浏览器对字段的输入，是基于之前输入过的值。-->
              <!--  accesskey 激活（使元素获得焦点）元素的快捷键 [ Alt + s ]  -->
              <input
                type="text"
                autocomplete="off"
                accesskey="s"
                placeholder="搜索"
                class="nav-search-keyword"
              />
              <div class="nav-search-btn">
                <button type="button" class="nav-search-submit">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="nav-user-center test-style">
          <a href="//localhost:8008/#/blog/article" target="_blank" class="link">个人中心</a>
        </div>
      </div>
    </div>

    <div class="halo-banner-image"></div>
  </div>
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

.halo-banner {
  ol,
  ul {
    list-style: none;
  }

  .halo-banner-header {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 56px;
    color: white;

    .header-content {
      padding: 10px 24px;
      line-height: 30px;
      margin: 0 auto;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .nav-link {
        .nav-link-ul {
          display: flex;
          align-items: center;

          .nav-link-item {
            margin-right: 12px;
          }
        }
      }

      .nav-search-box {
        .nav-search {
          position: relative;

          #nav-search-form {
            display: block;
            padding: 0 38px 0 16px;
            border: 1px solid hsla(0, 0%, 100%, 0);
            border-radius: 5px;
            background-color: #fff;
          }

          .nav-search-keyword {
            overflow: hidden;
            width: 100%;
            height: 34px;
            border: none;
            background-color: white;
            box-shadow: none;
            color: #999;
            font-size: 14px;
            line-height: 34px;
            transition: all 0.2s;

            &:focus {
              outline: none;
            }
          }

          .nav-search-btn {
            position: absolute;
            top: 0;
            right: 0;
            margin: 0;
            padding: 0;
            width: 48px;
            height: 36px;
            border: none;
            border-radius: 2px;
            background: #e7e7e7;
            line-height: 26px;
            cursor: pointer;

            .nav-search-submit {
              // 清除 button 默认样式
              outline: none;
              border: 0;
              cursor: pointer;

              &:hover {
                color: #2b85e4;
              }

              .icon {
                width: 25px;
                height: 25px;
                margin: 0 auto;
                position: absolute;
                // icon 元素居中
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }
    }
  }

  .halo-banner-image {
    background-image: url("../../assets/images/bilibiliBanner2021Autumn.png");
    background-position-x: center;
    // 把背景图片放大到适合元素容器的尺寸，图片比例不变，但是要注意，超出容器的部分可能会裁掉
    background-size: cover;
    width: 100%;
    // 需要自适应调整
    height: 155px;
  }
}
</style>