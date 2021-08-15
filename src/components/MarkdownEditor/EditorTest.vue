<template>
  <div >
    <div ref="MarkdownEditor" class="markdown-editor" ></div>
    <button @click.prevent="btnclose">close</button>
  </div>

</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import {Editor} from "@toast-ui/editor";
import {ref} from "vue";

const editorEvents = [
  // 'load',
  // 'change',
  // 'caretChange',
  // 'focus',
  'blur',
  // 'keydown',
  // 'keyup',
  // 'beforePreviewRender',
  // 'beforeConvertWysiwygToMarkdown',
];

export default {
  name: "MarkdownEditor",
  props: {
    previewStyle: {
      type: String,
    },
    height: {
      type: String,
    },
    initialEditType: {
      type: String,
    },
    initialValue: {
      type: String,
    },
    options: {
      type: Object,
    },
  },


  data() {
    const eventOptions = {};

    const defaultValueMap = {
      initialEditType: 'markdown',
      initialValue: '',
      height: '500px',
      previewStyle: 'vertical',
    };

    editorEvents.forEach((event) => {
      eventOptions[event] = (...args) => {
        this.$emit(event, ...args);
      };
    });

    const options = {
      ...this.options,
      initialEditType: this.initialEditType,
      initialValue: this.initialValue,
      height: this.height,
      previewStyle: this.previewStyle,
      events: eventOptions,
    };

    Object.keys(defaultValueMap).forEach((key) => {
      if (!options[key]) {
        options[key] = defaultValueMap[key];
      }
    });

    return {
      editor: null, computedOptions: options,
      content: null
    };
  },

  watch: {
    previewStyle(newValue) {
      this.editor.changePreviewStyle(newValue);
    },
    height(newValue) {
      this.editor.height(newValue);
    },
    initialValue(newValue, preValue) {
      console.log(newValue)
    },
  },

  mounted() {
    const options = {...this.computedOptions, el: this.$refs.MarkdownEditor};
    this.editor = new Editor(options);
    console.log(this)
  },
  methods: {

    invoke(methodName, ...args) {
      let result = null;

      if (this.editor[methodName]) {
        result = this.editor[methodName](...args);
      }

      return result;
    },
  },

  destroyed() {
    editorEvents.forEach((event) => {
      this.editor.off(event);
    });
    this.editor.destroy();
  },
};
</script>

<style scoped>
.markdown-editor {
  background: white;
}

</style>