Vue Lifecycles

1. `createApp({...})`

   Tutto inizia qui, niente succede prima di questo step, e a questo punto il DOM viene letto e virtualizzato da Vue.

   - `beforeCreate()`

     chiamato prima che anche `createApp` sia stato eseguito
   - `created()`

     chiamato appena dopo `createApp` ma prima ancora che il template venga renderizzato/visualizzato, appena che dopo
     questa funzione viene eseguita il template viene compilato
     - `Compile template`

   - `beforeMount()`

     viene eseguita appena prima che qualcosa arrivi sullo schermo e venga visualizzato
   - `mounted()`

     a questo punto vediamo la base inizializzata ma nessuna variabile (di quelle dichiarate nel `createApp`) é stata
     dichiarata o nessuna funzione eseguita.

   - `mount()`

     a questo punto Vue é pronto per iniziare a eseguire il codice e a creare le variabili e a eseguire le funzioni
     descritte nel `createApp`

1. `Data Changed`

   - `beforeUpdate`

        Viene chiamata prima che qualsiasi dato venga aggiornato (aggiornamenti non visualizzati)
   - `updated`

        Viene chiamata appena dopo che i dati sono stati aggiornati (aggiornamenti visualizzati)
1. `Unmounted`
    Volendo tutte le instanze di Vue che sono state `montate` possono essere `smontate`. I motivi per farlo potrebbero 
essere moltissimi, ma a questo punto non ci interessano molto. Le due funzioni connesse invece sono interessanti :)
Cmq a questo punto tutto quello che era in memoria proveniente dal precedente mount viene cancellato (template, script,
virtual dom, tutto).
   - `beforeUnmount`

        Eseguito prima di eseguire l'unmount
   - `unmounted`

        Eseguito appena dopo la conclusione dell'operazione di unmount


Tutte queste funzioni devono essere dichiarate all'interno dell'ogetto che passiamo al `createApp`:

```javascript
const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: 'Vue is great!',
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      this.message = this.currentUserInput;
    },
  },
  beforeCreate() {
    // run some code here :)
    console.log("At this point nothing happen yet!");      
  }
});

app.mount('#app');

```

  
    