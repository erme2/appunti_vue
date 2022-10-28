const app = Vue.createApp({
    // computed: {
    //     buttonValue() {
    //         return this.showButton ? "Hide List" : "Show List";
    //     }
    // },
    data (){return {
        newAssignment: "",
        assignmentList: [],
        showButton: true,
        buttonValue: "aaa"
    }},
    methods: {
        addAssignment() {
            this.assignmentList.push(this.newAssignment);
        },
        showHide() {
            this.showButton = !this.showButton;
        }
    }
});
app.mount('#assignment');