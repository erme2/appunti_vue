<template>
  <ul>
    <li :class="{active: this.modelValue === 'poor'}">
      <button type="button" @click="activate('poor')">Poor</button>
    </li>
    <li :class="{active: this.modelValue === 'average'}">
      <button type="button" @click="activate('average')">Average</button>
    </li>
    <li :class="{active: this.modelValue === 'great'}">
      <button type="button" @click="activate('great')">Great</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RatingControl",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    activate(option) {
      this.activeOption = option;
      this.$emit('update:modelValue', option);
    }
  }
}
</script>

<style scoped>
.active {
  border: 2px solid forestgreen;
}
ul {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
}
li {
  margin: 0 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  font: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>