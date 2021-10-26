<template>
  <div class="halo-sticky">
    <!-- 文章目录 -->
<!--    <div class="halo-blog-catalogue" v-if="state.isShowContent">-->
<!--      <div class="toc-title">目录</div>-->
<!--      <el-divider></el-divider>-->
<!--      <div class="toc">-->

<!--        <div>-->
<!--          <ul id="toc-content">-->
<!--            <li-->
<!--                v-for="item in state.treeArray"-->
<!--                :key="item.id"-->
<!--                :id="`${item.id}-halo`"-->
<!--                :class="item.tag"-->
<!--                class="toc-content-item"-->
<!--            >-->
<!--              &lt;!&ndash; 使用DOM进行跳转,不记录历史记录&ndash;&gt;-->
<!--              <a class="toc-content-item" @click="jump(`${item.id}`)">{{ item.name }}</a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <!-- 点赞投币收藏  -->
    <div class="operation">
      <div
          class="like"
          @click.once="giveLike()"
          :class="blog.info.isLike === true ? 'activeLike' : ''"
      >
        <svg class="icon dianzan" aria-hidden="true">
          <use xlink:href="#icon-dianzan"/>
        </svg>
        <span id="likeNum"> {{ blog.info.blogLike }}</span>

      </div>
      <div>投币</div>
      <div>收藏</div>
    </div>
  </div>
</template>

<script>


import blogData from "../../hooks/blogData";

export default {
  name: "BlogContents",

  setup() {
    return {
      ...blogData(),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";

.halo-sticky {

  top: #{$card-gap};
  position: sticky;

  .halo-blog-catalogue {

    border-radius: #{$border-radius};
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .el-divider--horizontal {
      margin-top: 0;
      margin-bottom: 0;
    }

    .toc-title {
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #333333;

    }

    // 目录
    .toc {
      padding-top: 10px;
      padding-bottom: 10px;
      overflow: auto;
      height: 500px;

      // 目录中标题鼠标样式
      .toc-content-item {
        cursor: pointer;
      }

      ul {
        // 文本不换行 多出的截断
        // 包裹了 lu 不能实现截断
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      ul,
      li {
        list-style: none;
        margin: 0;
        padding-top: 1.5px;
        padding-bottom: 1.5px;
      }

      ul {
        width: 75%;
        margin: 10px auto;

        .catalog-active {
          color: #{$blue} !important;


          &::before {
            content: "→ ";
            margin-left: -1.3em;
          }
        }

        .H2 {
          margin-bottom: 5px;
          color: rgba(93, 163, 126);
        }

        .H3 {
          margin-left: 20px;
          margin-bottom: 5px;
          color: rgba(114, 133, 163);
        }

        .H4 {
          margin-left: 30px;
          margin-bottom: 5px;
          color: rgba(163, 142, 131);
        }


        .H2,
        .H3 {
          &:hover {
            color: #{$blue};
          }
        }
      }


      &::-webkit-scrollbar {
        // 隐藏滚动条
        //display: none;
        width: 4px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
      }

      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
      }
    }
  }

  // 目录下的点赞操作
  .operation {
    margin-top: 12px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    height: 50px;
    width: 100%;

    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;

    & > div {
      cursor: pointer;

      &:hover {
        color: #{$blue};
      }
    }
  }
}


.activeLike {
  color: rgba(28, 27, 27, 0.96) !important;
}

.like {
  cursor: pointer;
  color: rgba(163, 156, 156, 0.9);

  .dianzan {
    width: 1.3em;
    height: 1.3em;
  }

  & > span {
    padding: 5px;
    display: none;
  }
}

.active {
  width: 75%;
}


</style>