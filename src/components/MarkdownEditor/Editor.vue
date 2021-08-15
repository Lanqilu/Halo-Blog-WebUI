<template>

  <!-- 鼠标移出 div 触发事件 -->
  <div id="editorSection" @mouseleave="saveData()"></div>


</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import {Editor} from "@toast-ui/editor";
import {onMounted} from "vue";
// import '@toast-ui/editor/dist/i18n/zh-cn.js'

export default {
  name: "EditorTest",

  props: {
    initialValue: {
      type: String,
    },
  },

  setup(props, context) {

    let editor = null
    let content = ""

    onMounted(() => {
      editor = new Editor({
        el: document.querySelector('#editorSection'),
        initialValue: props.initialValue,
        height: '600px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
      });
    })


    function saveData() {
      if (content !== editor.getMarkdown()) {
        content = editor.getMarkdown()
      }
      context.emit("blurEditor", content)
    }

    return {
      saveData
    }

  },
}
</script>

<style scoped>
#editorSection {
  background: white;
}
</style>