<template>
  <div class="halo-home">
    <div class="halo-body">
      <!-- 左侧卡片  -->
      <div class="halo-left-content">
        <UserInfo></UserInfo>
        <div class="halo-base-card">
          <div class="halo-bottom" @click="updateLink(1)">全部链接</div>
          <div class="halo-bottom" @click="getMyLink()">我创建的链接</div>
          <div class="halo-bottom">我收藏的链接</div>
        </div>
      </div>
      <!-- 右侧卡片  -->
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
          <div class="link-card" @click="newLink()">
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
                <div><img class="link-img" :src="link.linkCover" :alt="link.title" @click="hrefClick(link.link)"/></div>
                <div class="link-info">
                  <p class="link-title" @click="editLink(link)">{{ link.linkTitle }} </p>
                  <div class="link-description">{{ link.linkDescription }}</div>
                  <div class="link-address" @click="hrefClick(link.link)">{{ link.link }}</div>
                </div>
              </div>

              <div class="card-action">
                <img class="link-img" :src="link.linkCover" :alt="link.title"/>
                <div class="author-info">
                  <div class="author-nickname">
                    默认昵称
                  </div>
                  <div class="author-link">
                    <div>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mail_fill"/>
                      </svg>
                    </div>
                    <div>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-info-circle-fill"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="link-action">
                  <div>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-dianzan"/>
                    </svg>
                    <div class="number">
                      100
                    </div>
                  </div>
                  <div>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-heart"/>
                    </svg>
                    <div class="number">
                      100
                    </div>
                  </div>
                  <div class="halo-bottom" @click="hrefClick(link.link)">跳转</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <el-dialog v-model="state.dialogFormVisible" title="编辑链接">
      <el-form ref="form" :model="state.link" label-width="100px">
        <el-form-item label="链接标题">
          <el-input v-model="state.link.linkTitle"></el-input>
        </el-form-item>
        <el-form-item label="链接描述">
          <el-input v-model="state.link.linkDescription" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="state.link.link"></el-input>
        </el-form-item>
        <el-form-item label="链接图片地址">
          <el-input v-model="state.link.linkCover"></el-input>
        </el-form-item>
        <div style="display: flex;">
          <el-form-item label="是否发布">
            <el-switch v-model="state.link.publish"></el-switch>
          </el-form-item>
          <el-form-item label="是否开启评论" style="margin-left: 40px">
            <el-switch v-model="state.link.openComment"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitAddLink()">创建</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

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
import {post, del, get} from "../utils/request";
import {getAllPublicLink} from "../api/link"
import {ElMessage} from 'element-plus'
import 'animate.css';
import {useStore} from "vuex";

export default {
  name: "Nav",
  components: {UserInfo, HaloFooter, DefaultHeader},
  setup: function () {
    let state = reactive({
      dialogFormVisible: false,
      postLink: {
        linkId: "",
        linkTitle: "",
        linkDescription: "",
        link: "",
        linkCover: "",
        isPublish: "",
        isOpenComment: "",
      },
      InitLink: {
        linkId: "",
        linkTitle: "默认标题",
        linkDescription: "",
        link: "https://",
        linkCover: "https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-a@master/img/网站.svg",
        publish: true,
        openComment: true,
      },
      link: {
        linkId: "",
        linkTitle: "默认标题",
        linkDescription: "",
        link: "https://",
        linkCover: "https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-a@master/img/网站.svg",
        publish: true,
        openComment: true,
      },
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

    const store = useStore();

    // 获取登录用户ID
    function getUserId() {
      let id = store.getters.getUser.id;
      if (id === undefined) {
        ElMessage.info({
          message: "未登录",
          // 是否显示关闭按钮
          'show-close': true,
          // 信息显示时间
          duration: 1000
        })
        return 0;
      } else {
        return id;
      }
    }

    // 参数 1 表示更新全部链接
    // 参数 0 表示更新我的链接
    async function updateLink(action) {
      if (action === 1) {
        let res = await getAllPublicLink();
        res = res.data.data;
        state.links = res;
        console.log(state.links);
      } else {
        getMyLink();
      }
    }

    // 判断网站链接是否正确
    function checkLink(link) {
      // TODO 需要加入后端验证
      let strRegex = /^(http|https):\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
      let re = new RegExp(strRegex);
      if (link !== "") {
        if (!re.test(link)) {
          ElMessage.error({
            message: "网站链接错误",
            // 是否显示关闭按钮
            'show-close': true,
            // 信息显示时间
            duration: 1000
          });
        } else {
          return true;
        }
      } else {
        ElMessage.error({
          message: "网站链接为空",
          // 是否显示关闭按钮
          'show-close': true,
          // 信息显示时间
          duration: 1000
        });
      }
      return false;
    }

    // 点击跳转新页面网站
    function hrefClick(link) {
      window.open(link)
    }

    // 获取元素的绝对位置坐标（像对于页面左上角）
    function getElementPagePosition(element) {
      //计算x坐标
      let actualLeft = element.offsetLeft;
      let current = element.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      //计算y坐标
      let actualTop = element.offsetTop;
      while (current !== null) {
        actualTop += (current.offsetTop + current.clientTop);
        current = current.offsetParent;
      }
      //返回结果
      return {x: actualLeft, y: actualTop}
    }

    // 鼠标移入 LinkCard 事件
    function mouseOver(linkId) {
      // 移除未关闭的弹窗
      for (const element of document.getElementsByClassName("show")) {
        element.setAttribute("class", "popup-card")
      }
      // 获取鼠标当前 hover 的 Card 对象
      let popupCard = document.getElementById("popup-card-" + linkId);
      let linkCard = document.getElementById("link-card-" + linkId);

      let x, y;
      // 获取 linkCard 的绝对定位
      ({x, y} = getElementPagePosition(linkCard));
      // 设置弹出卡片位置
      popupCard.setAttribute("style", "top:" + (y - 50) + "px; left:" + (x - 110) + "px;")
      // 添加 CSS 以显示弹出卡片
      popupCard.setAttribute("class", "show animate__zoomIn");

    }

    // 鼠标移开 LinkCard 操作
    function mouseLeave(linkId) {
      let popupCard = document.getElementById("popup-card-" + linkId);
      popupCard.setAttribute("class", "popup-card")
    }

    // 提交增加或修改链接信息表单
    function onSubmitAddLink() {
      if (checkLink(state.link.link) === false) {
        return;
      }
      if (state.link.linkId !== "") {
        state.postLink.linkId = state.link.linkId;
      }
      state.postLink.link = state.link.link;
      state.postLink.linkTitle = state.link.linkTitle;
      state.postLink.linkDescription = state.link.linkDescription;
      state.postLink.linkCover = state.link.linkCover;
      state.postLink.isPublish = state.link.publish ? "1" : "0";
      state.postLink.isOpenComment = state.link.openComment ? "1" : "0";

      post("/link/edit", state.postLink).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          ElMessage.success({
            message: res.data.msg,
            // 是否显示关闭按钮
            'show-close': true,
            // 信息显示时间
            duration: 1000
          });
          // TODO 不同状态下更新内容不同
          updateLink(1);
          state.dialogFormVisible = false
        }
      })
    }

    // 获取我创建的链接
    function getMyLink() {
      let uid = getUserId();
      if (uid !== 0) {
        get(`/link-user/getLink/${uid}`).then((res) => {
          if (res.data.code === 200) {
            state.links = res.data.data;
          }
        })
      }
    }

    // 编辑链接
    function editLink(link) {
      state.link = link;
      state.link.publish = (link.isPublish === 1);
      state.link.openComment = (link.isOpenComment === 1);
      state.dialogFormVisible = true;
    }

    // 初始化新增链接的表单
    function newLink() {
      state.link = state.InitLink;
      state.dialogFormVisible = true;
    }

    // 删除链接
    // TODO 需要加入权限验证
    function deleteLink(linkId) {
      del(`/link/delete?linkId=${linkId}`).then((res) => {
        if (res.data.code === 200) {
          ElMessage.success({
            message: res.data.msg,
            // 是否显示关闭按钮
            'show-close': true,
            // 信息显示时间
            duration: 1000
          });
          updateLink(1);
        }
      })
    }


    return {
      state,
      editLink,
      newLink,
      hrefClick,
      mouseOver,
      mouseLeave,
      onSubmitAddLink,
      deleteLink,
      getMyLink,
      updateLink
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
  cursor: pointer;
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
      height: 228px;
      border-radius: #{$border-radius};

      display: flex;
      flex-direction: column;

      background-color: #FFFFFF;
      box-shadow: #{$box-shadow};

      .base-info {
        display: flex;

        .link-img {
          cursor: pointer;
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

          .link-title {
            cursor: pointer;
          }

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
        height: 58px;
        border-bottom-right-radius: #{$border-radius};
        border-bottom-left-radius: #{$border-radius};
        display: flex;
        justify-content: flex-start;

        img {
          margin: 0 8px 8px 8px;
          width: 50px;
          height: 50px;
        }

        .author-info {
          margin-top: 4px;
          width: 110px;
          display: flex;
          flex-direction: column;
          font-size: 18px;

          .author-link {
            margin-top: 4px;
            display: flex;

            .icon {
              color: #{$blue};
              cursor: pointer;
              margin-right: 8px;
              font-size: 18px;
            }
          }


        }

        .link-action {
          width: 268px;
          margin: 8px 8px 8px 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .icon {
            font-size: 30px;
            cursor: pointer;
          }

          .number {
            font-size: 10px;
            text-align: center;
          }

          .halo-bottom {
            background: #bee3d5;

            &:hover {
              background: #{$blue};
            }
          }
        }

      }
    }
  }
}
</style>