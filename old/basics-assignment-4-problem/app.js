const app = Vue.createApp({
    computed: {
        className() {
            const showClass = this.showPar ? 'visible' : 'hidden';
            if (this.classInput == 'user1') {
                return showClass+' user1';
            } else if (this.classInput == 'user2') {
                return showClass+' user2';
            }
            return showClass;
        }
    },
    data(){return{
        bgColor: "",
        classInput: "",
        showPar: true,
        testBind: "https://rmsoft.net"
    }},
    methods: {
        showHidePar() {
            this.showPar = !this.showPar;
            if (this.showPar) {
                this.testBind = "https://google.com";
            } else {
                this.testBind = "https://bing.com";
            }
        }
    }
});
app.mount('#assignment');