<template>
  <div class="halo-home">
    <div class="halo-body">
      <!-- 右侧卡片  -->
      <div class="halo-left-content">
        <div>
          <UserInfo></UserInfo>
        </div>
        <div class="halo-test"></div>
        <div class="halo-test"></div>
        <div class="halo-test"></div>
        <div class="halo-test"></div>
        <div class="halo-test"></div>
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
              <img :src="link.linkCover" :alt="link.title" />
            </div>
            <div class="link-card-right" @mouseover="mouseOver(link.linkId)">
              <p class="link-title">{{ link.linkTitle }}</p>
              <p>{{ link.linkDescription }}</p>
            </div>
          </div>
          <!-- 新增链接卡片 -->
          <div class="link-card">
            <div class="link-card-left">
              <svg class="add" aria-hidden="true">
                <use xlink:href="#icon-zengjia-copy" />
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
                <!-- <img :src="link.linkCover" :alt="link.title" /> -->
                <p>{{ link.linkTitle }}</p>
                <p>{{ link.linkDescription }}</p>
                <p>{{ link.link }}</p>
              </div>

              <div class="card-action">
                <div>点赞</div>
                <div>收藏</div>
                <div>跳转</div>
                <div>编辑</div>
              </div>
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
import { onMounted, reactive } from "vue";
import UserInfo from "../components/Cards/UserInfo.vue";
import HaloFooter from "../components/Footer/HaloFooter.vue";
import DefaultHeader from "../components/Header/DefaultHeader.vue";
import { getAllPublicLink } from "../api/link"
import { ElMessage } from 'element-plus'
import 'animate.css';

export default {
  name: "Nav",
  components: { UserInfo, HaloFooter, DefaultHeader },
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
      ({ x, y } = getElementPagePosition(linkCard));
      popupCard.setAttribute("class", "show animate__zoomIn");
      popupCard.setAttribute("style", "top:" + (y - 50) + "px; left:" + (x - 20) + "px;")
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
      return { x: actualLeft, y: actualTop }
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
.halo-home {
  width: 1200px;
  margin: 0 auto;
}

.halo-body {
  display: grid;
  grid-template-columns: 330px 850px;
  grid-gap: 20px;

  .halo-left-content {
    margin-top: 30px;

    div:first-child {
      margin-top: 0;
    }

    & > div {
      min-height: 200px;
      width: 330px;
      background-color: rgb(222, 234, 246);
      margin-top: 20px;
      border-radius: 10px;
    }

    .halo-card-glass {
      background-color: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      border-radius: 12px;
      -webkit-border-radius: 12px;
      color: rgba(255, 255, 255, 0.75);
    }

    .halo-test {
      background-color: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      border-radius: 12px;
      -webkit-border-radius: 12px;
      //color: rgba(255, 255, 255, 0.75);
      color: rgba(128, 48, 48, 0.75);
      font-size: 20px;
    }
  }

  .halo-right-content {
    .link-content {
      // 卡片 grid 布局
      display: grid;
      grid-template-columns: repeat(3, 30%);
      // 列间距
      column-gap: 5%;
      // 行间距
      row-gap: 20px;
      z-index: -3;
      .link-card {
        display: flex;
        border-radius: 12px;
        height: 100px;
        background-color: aliceblue;
        box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
        .link-card-left {
          width: 40%;
          padding: 15px;
          display: flex;
          align-items: stretch;
          flex-direction: column;
          justify-content: space-around;
          img {
            border-radius: 8px;
          }
          &:hover {
            cursor: pointer;
          }
        }
        .link-card-right {
          padding-top: 15px;
          padding-left: 10px;
          .link-title {
            font-weight: 700;
            line-height: 1.6;
            font-size: 1.2rem;
          }
          width: 60%;
        }
      }
      .link-card-right-add {
        padding-left: 10px;
        line-height: 100px;
        font-size: 1.2rem;
        width: 100%;
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
      width: 300px;
      border-radius: 12px;
      height: 200px;
      background-color: rgb(255, 228, 196);
      box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

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