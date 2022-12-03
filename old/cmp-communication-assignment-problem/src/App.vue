<template>
  <div>
    <active-user
        :username="user.name"
        :age="user.age"
    ></active-user>
  </div>
  <div>
    <user-data
        :props_name="user.name"
        :props_age="user.age"
        @sendData="getData"
    ></user-data>
  </div>
</template>

<script>
import ActiveUser from "./components/ActiveUser";
import UserData from "./components/UserData";

export default {
  name: "App",
  components: {UserData, ActiveUser},
  data() {
    return {
      user: {
        name: 'Davide',
        age: 10
      }
    }
  },
  methods: {
    getData(updated) {
      this.user.name = updated.username;
      this.user.age = updated.age;
    }
  }
}
</script>

<style scoped>

</style>