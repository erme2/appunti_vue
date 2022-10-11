const app = Vue.createApp({
    data (){
        return {
            userInput1: "OUTPUT 1",
            userInput2: "OUTPUT 2"
        }
    },
    methods: {
        displayAlert() {
            alert('ciao!');
        },
        updateUserInput1(event) {
            this.userInput1 = event.target.value;
        },
        updateUserInput2(event) {
            this.userInput2 = event.target.value;
        }
    }
});
app.mount('#assignment');