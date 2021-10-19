<template>
  <div class="halo-edit">
    <default-header></default-header>
    <div class="m-content">
      <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">

        <el-form-item label="标题" prop="blogTitle">
          <el-input v-model="editForm.blogTitle"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="description">
          <el-input type="textarea" v-model="editForm.blogCover"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item>
        <!-- axios 是异步进行 需要等数据返回后才进行渲染 -->
        <el-form-item label="内容" prop="content" v-if="edit">
          <MarkdownEditor :initialValue="editForm.content" @blurEditor="updateData"></MarkdownEditor>
        </el-form-item>
        <el-form-item label="状态" prop="content">
          <textarea v-model="editForm.status"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(editForm)">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <halo-footer></halo-footer>
</template>

<script>
import {reactive, toRaw} from "vue";
import {BlogDetail} from "../api";
import {useRoute} from "vue-router";
import {post} from "../utils/request";
import MarkdownEditor from "../components/MarkdownEditor/Editor.vue";
import DefaultHeader from "../components/Header/DefaultHeader.vue";
import HaloFooter from "../components/Footer/HaloFooter.vue";
import marked from "marked";
import hljs from "highlight.js";

export default {
  name: "BlogEdit",
  components: {
    MarkdownEditor,
    DefaultHeader,
    HaloFooter,
  },

  setup() {
    // 用于接收 MarkdownEditor 传回的编辑内容
    let state = reactive({
      content: "",
    });

    // 自定义事件 在鼠标离开编辑器时触发
    // 将 MarkdownEditor 传回的编辑内容保存到 content 变量上
    function updateData(content) {
      state.content = content;
    }

    // 参考地址：https://blog.csdn.net/weixin_41727824/article/details/112776711
    let rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      gfm: true, // 默认为 true。 允许 GitHub 标准的 Markdown.
      tables: true, // 默认为 true。 允许支持表格语法。该选项要求 gfm 为true。
      breaks: true, // 默认为 false。 允许回车换行。该选项要求 gfm 为true。
      pedantic: false, // 默认为 false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
      smartLists: true,
      smartypants: true, // 使用更为时髦的标点，比如在引用语法中加入破折号。
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      langPrefix: "hljs language-",
    });


    return {
      updateData,
      state,
    };
  },

  data() {
    return {
      editForm: {
        id: null,
        blogTitle: "",
        description: "",
        blogCover:
            "https://cdn.jsdelivr.net/gh/halo-blog/cdn-blog-img-e@master/macos.6z1mshl4twk0.svg",
        content: "",
        status: null,
      },
      rules: {
        blogTitle: [
          {required: true, message: "请输入标题", trigger: "blur"},
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        description: [
          {required: true, message: "请输入摘要", trigger: "blur"},
        ],
      },
      edit: false,
    };
  },

  mounted() {
    this.isEdit();
  },

  methods: {
    // 提交表单
    submitForm() {
      // 提交时让 MarkdownEditor 组件传回来的 content 赋值到表格对象中
      this.editForm.content = this.state.content;
      // 将 MarkDown 内容转译为 HTML
      this.editForm.contentHtml = marked(this.editForm.content);
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          post("/blog/edit", toRaw(this.editForm))
              .then(() => {
                this.$alert("操作成功", "提示", {
                  confirmButtonText: "确定",
                  callback: () => {
                    this.$router.push("/home");
                  },
                });
              });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //  判断是否可以编辑
    async isEdit() {
      const route = useRoute();
      let blogId = route.params.blogId;
      if (blogId) {
        // 是编辑模式
        let res = await BlogDetail(blogId);
        const blog = res.data.data;
        this.editForm.id = blog.id;
        this.editForm.blogTitle = blog.blogTitle;
        this.editForm.blogCover = blog.blogCover;
        this.editForm.description = blog.description;
        this.editForm.content = blog.content;
        this.editForm.status = blog.status;
        // 修改为可以编辑
        this.edit = true;
      } else {
        // 是新建文章，直接可以编辑
        this.edit = true;
      }
    },

  },
};
</script>

<style lang='scss' scoped>
.halo-edit {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .m-content {

    margin-top: 30px;
  }
}
</style>