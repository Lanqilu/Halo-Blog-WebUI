<template>
  <div class="halo-home">
    <div class="halo-body">
      <!-- 右侧卡片  -->
      <div class="halo-left-content">
        <UserInfo></UserInfo>
        <UserInfo></UserInfo>
        <UserInfo></UserInfo>
        <UserInfo></UserInfo>
        <UserInfo></UserInfo>
      </div>

      <div class="halo-right-content">
        <!-- 左上测导航条 -->
        <default-header></default-header>
        <div class="link-content">
          <!-- 链接卡片 -->
          <div
              class="link-card"
              v-for="link in state.links"
              :key="link.linkId"
              :id="'link-card-' + link.linkId"
          >
            <div class="link-card-left" @click="hrefClick(link.link)">
              <img :src="link.linkCover" :alt="link.title"/>
            </div>
            <div class="link-card-right" @mouseover="mouseOver(link.linkId)">
              <p class="link-title">{{ link.linkTitle }}</p>
              <div class="link-description">{{ link.linkDescription }}</div>
              <div class="link-address">{{ link.link }}</div>
            </div>
          </div>
          <!-- 新增链接卡片 -->
          <div class="link-card">
            <div class="link-card-left-add">
              <svg class="add" aria-hidden="true">
                <use xlink:href="#icon-zengjia-copy"/>
              </svg>
            </div>
            <div class="link-card-right-add">新增链接</div>
          </div>
        </div>
        <!-- 弹出卡片 -->
        <div id="popup-cards">
          <div
              class="popup-card"
              v-for="link in state.links"
              :key="link.linkId"
              :id="'popup-card-' + link.linkId"
              @mouseleave="mouseLeave(link.linkId)"
          >
            <div class="card-info">
              <div class="base-info">
                <div><img class="link-img" :src="link.linkCover" :alt="link.title"/></div>
                <div class="link-info">
                  <p class="link-title">{{ link.linkTitle }}</p>
                  <div class="link-description">{{ link.linkDescription }}</div>
                  <div class="link-address">{{ link.link }}</div>
                </div>


              </div>

<!--              <div class="card-action">-->
<!--                <div>点赞</div>-->
<!--                <div>收藏</div>-->
<!--                <div>跳转</div>-->
<!--                <div>编辑</div>-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 回到顶部 -->
    <el-backtop :bottom="100"></el-backtop>
  </div>
  <halo-footer></halo-footer>
</template>

<script>
import {onMounted, reactive} from "vue";
import UserInfo from "../components/Cards/UserInfo.vue";
import HaloFooter from "../components/Footer/HaloFooter.vue";
import DefaultHeader from "../components/Header/DefaultHeader.vue";
import {getAllPublicLink} from "../api/link"
import {ElMessage} from 'element-plus'
import 'animate.css';

export default {
  name: "Nav",
  components: {UserInfo, HaloFooter, DefaultHeader},
  setup() {
    let state = reactive({
      links: {
        linkId: "",
        linkTitle: "默认标题",
        linkDescription: "",
        link: "",
        linkCover: "",
        linkLike: "",
        isPublish: "",
        isOpenComment: "",
        createTime: "",
        updateTime: "",
      }
    });

    onMounted(async () => {
      let res = await getAllPublicLink();
      res = res.data.data;
      state.links = res;
      console.log(state.links);
    })

    function hrefClick(link) {
      var strRegex = /^(http|https):\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
      var re = new RegExp(strRegex);
      if (link != "") {
        if (!re.test(link)) {
          ElMessage.error({
            message: "网站链接错误",
            // 是否显示关闭按钮
            'show-close': true,
            // 信息显示时间
            duration: 1000
          });
        } else {
          window.open(link, "_blank");
        }
        console.log(link);
      } else {
        ElMessage.error({
          message: "网站链接为空",
          // 是否显示关闭按钮
          'show-close': true,
          // 信息显示时间
          duration: 1000
        });
      }
    }

    function mouseOver(linkId) {
      console.log("鼠标从" + linkId + "移入");
      let popupCard = document.getElementById("popup-card-" + linkId);
      let linkCard = document.getElementById("link-card-" + linkId);

      let x, y;
      // 获取 linkCard 的绝对定位
      ({x, y} = getElementPagePosition(linkCard));
      popupCard.setAttribute("class", "show animate__zoomIn");
      popupCard.setAttribute("style", "top:" + (y - 50) + "px; left:" + (x - 110) + "px;")
    }

    function mouseLeave(linkId) {
      console.log("鼠标从" + linkId + "移出");
      let popupCard = document.getElementById("popup-card-" + linkId);
      popupCard.setAttribute("class", "popup-card")
    }

    // 获取元素的绝对位置坐标（像对于页面左上角）
    function getElementPagePosition(element) {
      //计算x坐标
      var actualLeft = element.offsetLeft;
      var current = element.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      //计算y坐标
      var actualTop = element.offsetTop;
      var current = element.offsetParent;
      while (current !== null) {
        actualTop += (current.offsetTop + current.clientTop);
        current = current.offsetParent;
      }
      //返回结果
      return {x: actualLeft, y: actualTop}
    }


    return {
      state,
      hrefClick,
      mouseOver,
      mouseLeave,
    }
  }
}

</script>

<style lang="scss">
@import "../assets/style/mixin.scss";

$link-with: 271px;
$link-height: 110px;


.link-title {
  font-weight: 700;
  font-size: 20px;
}

.link-description {
  font-size: 16px;
  color: #5C5959;
}

.link-address {
  font-size: 14px;
  color: #9C9898;
}

.halo-body {
  .halo-right-content {
    .link-content {
      // 卡片 grid 布局
      display: grid;
      grid-template-columns: repeat(3, #{$link-with});
      // 列间距
      column-gap: #{$card-gap};
      // 行间距
      row-gap: #{$card-gap};

      .link-card {
        border-radius: #{$border-radius};
        height: #{$link-height};
        box-shadow: #{$box-shadow};
        display: flex;
        background-color: aliceblue;

        // 链接图片
        .link-card-left {
          width: 102px;
          padding: 8px 8px 8px 8px;

          img {
            width: 94px;
            height: 94px;
            border-radius: #{$border-radius};
          }

          &:hover {
            cursor: pointer;
          }
        }

        .link-card-right {
          width: 161px;
          padding: 16px 8px 16px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .link-title, .link-description, .link-address {
            // 超出文本显示省略号
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .link-card-left-add {
        width: 102px;
        padding: 8px 8px 8px 8px;

        &:hover {
          cursor: pointer;
        }

        .add {
          width: 94px;
          height: 94px;
        }
      }

      .link-card-right-add {
        width: 161px;
        font-size: 20px;
        padding: 8px 8px 8px 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .popup-card {
    display: none;
  }

  .show {
    display: block;
    position: absolute;
    // hover 动画时间
    animation-duration: 0.25s;

    .card-info {
      width: 426px;
      height: 226px;
      border-radius: #{$border-radius};

      display: flex;
      flex-direction: column;

      background-color: #FFFFFF;
      box-shadow: #{$box-shadow};

      .base-info {
        display: flex;

        .link-img {
          width: 150px;
          height: 150px;
          border-radius: #{$border-radius};
          margin: 8px 10px 8px 8px;
        }

        .link-info {
          width: 250px;
          margin: 16px 8px 16px 0;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .link-title, .link-address {
            // 超出文本显示省略号
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          & > div {
            // 强制换行 只有连续的字母或数字会出现不自动换行问题
            word-wrap: break-word
          }

        }

      }


      .card-action {
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
        height: 40px;
        background-color: rgb(196, 255, 255);
        display: flex;
        justify-content: space-between;

        & > div {
          width: 100%;
        }
      }
    }
  }
}
</style>