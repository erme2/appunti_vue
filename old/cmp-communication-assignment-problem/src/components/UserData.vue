<template>
  <form @submit.prevent="sendData">
    <div>
      <label for="username">Username: </label>
      <input type="text" id="username"  v-model="updated.username" />
    </div>
    <div>
      <label for="age">Age: </label>
      <input type="number" id="age" v-model="updated.age" />
    </div>
    <div>
      <button type="submit">Send</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    props_name: {
      type: String,
      default: ''
    },
    props_age: {
      type: Number,
      default: 0
    }
  },
  emits: ['send-data'],
  name: "UserData",
  data() {
    return {
      updated: {
        username: this.props_name,
        age: this.props_age
      }
    }
  },
  methods: {
    sendData() {
      this.$emit('send-data', this.updated);
    },
  }
}
</script>

<style scoped>

</style>