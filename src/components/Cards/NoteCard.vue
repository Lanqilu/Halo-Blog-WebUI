<template>
  <div class="note-card push-card">
    <el-input
        v-model="note.note"
        :autosize="{ minRows: 4, maxRows: 7 }"
        :rows="2"
        type="textarea"
        placeholder="Please input"
    />
    <div class="button-pub">
      <el-button type="primary" @click="pushNote">发布</el-button>
    </div>
  </div>
  <div class="note-card" v-for="item in notesList.note" :key="item.id">
    {{ item.note }}
    <!--    {{ item.createTime }}-->
  </div>

</template>

<script>

import {onMounted, reactive} from "vue";
import {post, get} from "../../utils/request";
import {ElMessage} from "element-plus";

export default {
  setup: function () {
    let note = reactive({
      note: "",
      userId: JSON.parse(localStorage.getItem("userInfo")).userId,
    })

    let notesList = reactive({
      note: {}
    });

    function pushNote() {
      post("/blog/notes", note).then((res) => {
        if (res.data.code === 200) {
          ElMessage.success({
            message: "发布成功",
            type: "success",
          });
        }
        getNotesByUserId();
      })

    }

    async function getNotesByUserId() {
      let res = await get("blog/notes/user/" + note.userId);
      notesList.note = res.data.data
    }


    onMounted(async () => {
      await getNotesByUserId()
    })

    return {
      note,
      notesList,
      pushNote
    }
  }
}


</script>

<style scoped lang="scss">
@import "../../assets/style/mixin.scss";

.button-pub {
  display: flex;
  justify-content: right;
  margin-top: #{$card-gap};
  margin-right: #{$card-gap};

  .el-button {
    padding: 8px 20px;
    font-size: 16px;
  }

}

.push-card {
  min-height: 172px;
}


.note-card {
  width: 100%;
  min-height: 100px;
  background: #{$white};
  border-radius: #{$border-radius};
  margin-bottom: #{$card-gap};
  padding: #{$border-radius};
  box-shadow: #{$box-shadow};
  font-size: 18px;
}
</style>