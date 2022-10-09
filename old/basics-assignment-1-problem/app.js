const app = Vue.createApp({
    data() {
        return {
            myName: "Arduino",
            myAge: 46,
            vueImage: "https://miro.medium.com/max/1400/1*OrjCKmou1jT4It5so5gvOA.jpeg",
            testValue: "CiAO!"
        }
    },
    methods: {
        nextAge(years) {
            return this.myAge + years;
        },
        randomNumber() {
            return Math.random();
        }
    }
});
app.mount("#assignment")