<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Test from "./views/Test.vue";
import UserInfo from "./components/Cards/UserInfo.vue";
import MarkdownEditorTest from "./views/Test/MarkdownEditorTest.vue";
import SetUpTest from "./views/Test/SetUpTest.vue";

export default {
  components: { Home, Test, UserInfo, MarkdownEditorTest, SetUpTest },
  setup() {},
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
