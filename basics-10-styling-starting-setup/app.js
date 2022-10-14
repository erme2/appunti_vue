const app = Vue.createApp({
    data() {return {
        boxASelected: false,
        boxBSelected: false,
        boxCSelected: false
    }},
    methods: {
        selectBox(box){
            if (box == "A") {
                this.boxASelected = !this.boxASelected;
                console.log(this.boxASelected);                    
            } else if (box == "B") {
                this.boxBSelected = !this.boxBSelected;
            } else if (box == "C") {
                this.boxCSelected = !this.boxCSelected;
            }
        }
    }
});
app.mount('#styling');