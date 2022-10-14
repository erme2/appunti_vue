const target = 37;
const timeInterval = 5000;
const tooMuch = "Too much!";
const app = Vue.createApp({
    computed: {
        result() {
            if (this.number < target) {
                return "Not there yet";
            } else if (this.number == target) {
                return target;
            } else if (this.number > target) {
                return tooMuch;
            }
        }
    },
    data(){return{
        number: 0,
    }},
    methods: {
        add(num) {
            this.number = this.number + num;
            console.log(num + " added ("+this.number+")");
        }
    }, 
    watch: {
        result() {
            const copyThis = this;
            if (this.result === tooMuch){
                setTimeout(function() {
                    copyThis.number = 0;
                    console.log("number reset");
                }, timeInterval);
                console.log("timeout started");
            }
        }
    }

});
app.mount("#assignment");