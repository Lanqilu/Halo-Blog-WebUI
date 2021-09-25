<template>
  <div>
    {{ state.sort }}
  </div>
</template>

<script>
import {getSortByUserId} from "../../api";
import {useStore} from "vuex";

export default {
  name: "SortInfo",

  setup() {
    const store = useStore();
    const userId = store.getters.getUser.id;
    console.log(userId);
    let state = {
      sort: null,
    }


    state.sort = getSortByUserId(userId);
    let sortDate = state.sort.date;
    console.log(sortDate);


    console.log(state.sort);

    return {
      state
    }
  }
}
</script>

<style scoped>

</style>