<template>
  <h2>{{ username }}</h2>
  <h3>{{ age }} years</h3>
</template>

<script>
export default {
  name: "ActiveUser",
  props: {
    username: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>