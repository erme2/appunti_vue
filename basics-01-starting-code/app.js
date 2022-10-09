const app = Vue.createApp({
    data() {
        return {
            testOutput1: "output 1",
            testOutput2: "output 2",
            courseGoal: 'test',
            vueLink: "https://vuejs.org"
        };
    }, 
    methods: {
        outputGoal() {
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
                return this.testOutput1+" ("+randomNumber+")";
            } else {
                return this.testOutput2+" ("+randomNumber+")";
            }
        }
    }
});
app.mount("#user-goal");