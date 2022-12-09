# Components

I compoments sono una funzionalità di Vue volta ad aiutare lo sviluppatore a evitare ripetizioni di codice e a rendere 
capillare la destrutturazione dei problemi e del codice.
In pratica sono delle mini-app costruite e collegate all'app principale, vengono dichiarate nello stesso modo e si collegano all'app 
principale.

```javascript
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
    data(){ return {
        detailsAreVisible: false,
        friend: {
            id:'manuel',
            name: 'Manuel Lorenz',
            phone: '1234 12345',
            email: 'manuel@localhost'
        }
    };},
    methods: {
        toggleDetails() {
            this.detailsAreVisible = !this.detailsAreVisible;
        }
    },
    template: `
        <li>
          <h2>{{ friend.name}}</h2>
          <button @click="toggleDetails">
              {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
          </button>
          <ul v-if="detailsAreVisible">
            <li><strong>Phone:</strong>{{ friend.phone }}</li>
            <li><strong>Email:</strong>{{friend.email}}</li>
          </ul>
        </li>
    `
});

app.mount('#app');
```