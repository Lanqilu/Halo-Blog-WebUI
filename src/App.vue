<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Test from "./views/Test.vue";
import UserInfo from "./components/Cards/UserInfo.vue";
import MarkdownEditorTest from "./views/Test/MarkdownEditorTest.vue";
import SetUpTest from "./views/Test/SetUpTest.vue";
import MarkdownContent from "./views/Test/MarkdownContent.vue";

export default {
  components: {
    Test,
    UserInfo,
    MarkdownEditorTest,
    SetUpTest,
    MarkdownContent,
  },
  setup() {
  },
};
</script>

<style>

@font-face {
  font-family: HarmonyOS_Sans_SC_Regular;
  src: url(https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-c@master/font/HarmonyOS_Sans/HarmonyOS_Sans_SC_Regular.ttf);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  /*font-family: "HarmonyOS_Sans_SC_Regular", serif;*/
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
  /* box-shadow: outset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 0;
  background: rgba(0, 0, 0, 0);
}

/* 阿里图标 */
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

/*回到顶部图标*/
.el-backtop {
  border-radius: 12px !important;
}

a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}

#app {
  background: linear-gradient(
      90deg,
      rgba(247, 149, 51, 0.1),
      rgba(243, 112, 85, 0.1) 15%,
      rgba(239, 78, 123, 0.1) 30%,
      rgba(161, 102, 171, 0.1) 44%,
      rgba(80, 115, 184, 0.1) 58%,
      rgba(16, 152, 173, 0.1) 72%,
      rgba(7, 179, 155, 0.1) 86%,
      rgba(109, 186, 130, 0.1)
  );
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  /* currentColor 是一个变量，这个变量的值是当前元素的 color 值 */
  /* 如果当前元素没有在 CSS 里显示地指定一个 color 值，那它的颜色值就遵从 CSS 规则，从父元素继承而来*/
  fill: currentColor;
  overflow: hidden;
}
</style>
