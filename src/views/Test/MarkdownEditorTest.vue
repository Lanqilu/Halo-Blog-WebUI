<template>
  <div id="editorSection"></div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import {Editor} from "@toast-ui/editor";
import {onMounted} from "vue";

export default {
  name: "MarkdownEditorTest",

  props:{
    initialValue: {
      type: String,
    },
  },

  setup(props,context) {

    let editor = null

    onMounted(() => {
      editor = new Editor({
        el: document.querySelector('#editorSection'),
        height: '600px',
        initialEditType: props.initialValue,
        previewStyle: 'vertical',
      });
    })




  },
}
</script>

<style scoped>
#editorSection {
  background: white;
}
</style>