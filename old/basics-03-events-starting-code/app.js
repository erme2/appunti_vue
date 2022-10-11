const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      yourName: "Arduino"
    };
  },
  methods: {
    add(amount) {
      this.counter = this.counter + amount;
    },
    submitForm(event) {
      alert('ok!');
    },
    remove(amount) {
      this.counter = this.counter - amount;
    },
    update(event) {
      this.yourName = event.target.value;
    }
  }
});

app.mount('#events');
