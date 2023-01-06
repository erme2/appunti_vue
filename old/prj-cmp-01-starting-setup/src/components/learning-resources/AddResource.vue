<template>
  <base-dialog v-if="inputIsInvalid" title="Invalid Input" @closeDialog="confirmError">
    <template #default>
      <p>Unfortunately, at least one input value is invalid.</p>
      <p>Please check all inputs and make sure you enter at least a few characters in to each input field.</p>
    </template>
    <template #actions>
      <base-button @click="confirmError">Ok</base-button>
    </template>
  </base-dialog>
  <base-card>
        <form @submit.prevent="submitData">
            <div class="form-control">
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" ref="titleInput" />
            </div>
            <div class="form-control">
                <label for="description">Description:</label>
                <textarea id="description" name="description" type="text" ref="descriptionInput"></textarea>
            </div>
            <div class="form-control">
                <label for="link">Link:</label>
                <input id="link" name="link" type="text" ref="linkInput"/>
            </div>
            <div class="form-control">
                <base-button type="submit">Submit</base-button>
            </div>
        </form>
    </base-card>
</template>
<script>
import BaseDialog from "@/components/UI/BaseDialog.vue";
import BaseButton from "@/components/UI/BaseButton.vue";

export default {
  components: {BaseButton, BaseDialog},
  data() {return {
    inputIsInvalid: false,
  };},
  inject: ['addResource'],
  methods: {
    confirmError() {
      this.inputIsInvalid = false;
    },
    submitData() {
            let newResourceObject = {
              id: new Date().toISOString(),
              title: this.$refs.titleInput.value,
              description: this.$refs.descriptionInput.value,
              link: this.$refs.linkInput.value
            };
            if (newResourceObject.title.trim() === '' ||
                newResourceObject.description === '' ||
                newResourceObject.link === ''
            ) {
              this.inputIsInvalid = true;
              return;
            }
            this.addResource(newResourceObject);
            this.$refs.titleInput.value = '';
            this.$refs.descriptionInput.value = '';
            this.$refs.linkInput.value = '';
        }
  }
};
</script>


<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>