<template>
  <div>SetUpTest</div>
</template>

<script>
export default {
  name: "SetUpTest",
  setup(prop, context) {
    console.log(prop)
    console.log(context)
    console.log(context.emit)
  }
}
</script>

<style scoped>

</style>