const app = Vue.createApp({
    data(){ return {
        friends: [{
            id:'manuel',
            name: 'Manuel Lorenz',
            phone: '1234 12345',
            email: 'manuel@localhost'
        }, {
            id:'julie',
            name: 'Julie Jones',
            phone: '1234 12346',
            email: 'julie@localhost'
        }]
    };}
});
app.component('friend-contact', {

});

app.mount('#app');