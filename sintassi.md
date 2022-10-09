# Sintassi

## Inizializzare Vue
Una volta caricato il file dell'eseguibile vue dal CDN dovrai inizializzare l'oggetto Vue con cui andrai a lavorare. Questa parte collega un oggetto vue ad una parte della pagina html e ti permette di usare vue per controllare quell'oggetto e tutti i child che contiene.
```
Vue.createApp({
    data() {
        return {
            goals: [],
            enteredValue: ''
        };
    },
    methods: {
        addGoal() {
            this.goals.push(this.enteredValue);
        }
    }
}).mount('#app');
```
Quando inizializzi Vue puoi salvare questa applicazione vue in una variabile e poi usare quella per controllare il processo vue.
```
const app = Vue.createApp({
    data() {...},
    methods: {...}
});
app.mount("#user-goal");
```




### **Parametri**
- **data**: é l'oggetto che contiene i dati e le strutture di dati, **deve essere dichiarato come una *funzione* e questa funzione deve sempre ritornare un oggetto**
- **methods**: é un oggetto che contiene una lista delle funzioni che utilizzeremo all'interno di Vue.

Da notare come all'interno delle funzioni ci si possa riferire all'oggetto data usando `this`.

## Directives
Le directives sono delle proprietà degli oggetti html che non vengono riconosciuti dal browser ma che vengono riconosciuti e usati da Vue. 


Iniziano quasi tutti per `v-`. Elencheró qui sotto i più importanti
- `v-bind`: collega il valore di un attributo html ad una proprietà di `data`

    ```<p>Learn more <a v-bind:href="vueLink">about Vue</a></p>```

- `v-for`: collega un elemento ad un array presente nella funzione `data` e ripete l'oggetto per ogni elemento nell'array collegato
    
    ```<li v-for="goal in goals">{{ goal }}</li>```

- `v-model`: collega il `value` di un html element ad una proprietà dell'oggetto dichiarato nella funzione `data` dell'oggetto Vue. 

    ```<input type="text" id="goal" v-model="enteredValue" />```

- `v-on:element`: collega un evento all'elemento html

    ```<button v-on:click="addGoal">Add Goal</button>```



## Sintassi
- `{{ var }}`: stampa una variabile vue nel codice html. Attenzione questa sintassi é valida solo all'interno di un tag html es: ```<div>{{ quiSi }} ma <a href="{{ quiNO }}">devi usare il `v-bind`</a></div>```
