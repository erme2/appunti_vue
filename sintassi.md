# Sintassi

## Inizializzare Vue
Una volta caricato il file dell'eseguibile vue dal CDN dovrai inizializzare l'oggetto Vue con cui andrai a lavorare. Questa parte collega un oggetto vue ad una parte della pagina html e ti permette di usare vue per controllare quell'oggetto e tutti i child che contiene.
```javascript
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

```javascript
const app = Vue.createApp({
    data() {...},
    methods: {...}
});
app.mount("#user-goal");
```

### **Parametri**
- **data**: é l'oggetto che contiene i dati e le strutture di dati, **deve essere dichiarato come una *funzione* e questa funzione deve sempre ritornare un oggetto**
- **methods**: é un oggetto che contiene una lista delle funzioni che utilizzeremo all'interno di Vue.
- **computed**: é un oggetto che contiene una lista di funzioni, come methods. Però queste funzioni devono essere semplici e devono essere pensate per ovviare a problemi semplici che una semplice variabile non può risolvere. Vue per sua natura ricalcola la singola proprietà (di `data`) aggiornata ed esegue tuttle le funzioni presenti nel template. Le funzioni computed, vengono eseguite sono se citate direttamente.

Da notare come all'interno delle funzioni ci si possa riferire all'oggetto data usando `this`.

## Direttive (Directives)
Le directives sono delle proprietà degli oggetti html che non vengono riconosciuti dal browser ma che vengono riconosciuti e usati da Vue. 


Iniziano quasi tutti per `v-`. Elencheró qui sotto i più importanti
- `v-bind`: collega il valore di un attributo html ad una proprietà di `data`

    ```html
    <p>Learn more <a v-bind:href="vueLink">about Vue</a></p>
    ```

- `v-for`: collega un elemento ad un array presente nella funzione `data` e ripete l'oggetto per ogni elemento nell'array collegato
    
    ```html
    <li v-for="goal in goals">{{ goal }}</li>
    ```

- `v-html`: funzione come v-bind, serve a collegare una proprietà delle funzione data al contenuto di un elemento html, ma viene usato se questo contenuto dovrà essere trattato come codice html. NON ABUSARE, la norma dovrebbe essere v-bind e v-html l'eccezione.

    ```html
    <p v-html="outputGoal()"></p>
    ```

- `v-model`: collega il `value` di un html element ad una proprietà dell'oggetto dichiarato nella funzione `data` dell'oggetto Vue. 
    
    **Attenzione questo é un collegamento che funziona in dure direzioni!!!**
    
    ```html
    <input type="text" id="goal" v-model="enteredValue" />
    ```

- `v-on:element`: collega un evento all'elemento html

    ```html
    <button v-on:click="addGoal">Add Goal</button>
    ```

- `v-once`: questa direttiva serve a bloccare l'interazione con vue dopo la prima interazione. Diciamo che hai un valore che deve essere aggiornato una sola volta, questa è la direttiva giusta
    ```html
    <p>Result: {{ counter }}</p>
    <p v-once>blocked: {{ counter }}</p>
    ```


## Modificatori di eventi (event modifiers)
Quando colleghi un evento ad una funzione potresti voler fermare la funzione connessa all'evento di default. Per esempio nel caso di un form, potresti voler disabilitare il submit connesso all'evento click su un button. Questo si può fare con un event modifier.
```html
<!-- 
in this case the form submit is prevented (the page will not reload)
but the submitForm function is executed
 -->
<form v-on:submit.prevent="submitForm">
<!-- 
in this other case the submitForm function will be executed just if you click on the right mouse button 
 -->
<button v-on:click.right="submitForm">Sign up</button>
<!-- 
in this other case the input will execute the function when the enter key is entered
 -->
<input type="text" v-bind:value="yourName" v-on:input.enter="update($event)">
```



## Interpolazione (interpolation)
- `{{ var }}`: stampa una variabile dal oggeto nel codice html. 
    - Questa sintassi é valida per qualsiasi oggetto dichiarato nella funzione `data` 

        ```html
        <p>{{ enteredValue }}</p>
        ```

    - Questa sintassi é valida per qualsiasi funzione dichiarata nell'oggetto `methods`

        ```html
        <p>{{ addGoal() }}</p>
        ```

    - Questa sintassi é valida solo all'interno di un tag html es: 
    
        ```html
        <div>{{ quiSi }} ma <a href="{{ quiNO }}">devi usare il `v-bind`</a></div>
        ```

    - Qualsiasi espressione JS valida funzionerà all'interno di queste curly braces

        ```html
        <p>{{ 1 + 1 }}</p> or <p>{{ Math.random() }}</p>
        ```

- `$event`: se stai chiamando una funzione che hai creato in `methods` e vuoi passare in maniera esplicita l'evento (quello creato e gestito da JS) connesso alla funzione puoi usare questa parola chiave. 
    *Attenzione questo argomento deve essere il primo che passi* 
    ```html
    <input type="text" v-on:input="update($event, 123)">
    ```
    ```javascript
    const app = Vue.createApp({
        data() {
            return {
                yourName: "AAA"
            };
        },
        methods: {
            update(event, secondArg) {
                this.yourName = event.target.value + secondArg;
            }
        }
    });
    ```