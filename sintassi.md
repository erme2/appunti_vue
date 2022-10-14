# Inizializzare Vue
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

# **Parametri**

## **data**
é l'oggetto che contiene i dati e le strutture di dati, **deve essere dichiarato come una *funzione* e questa funzione deve sempre ritornare un oggetto**

## **methods**
é un oggetto che contiene una lista delle funzioni che utilizzeremo all'interno di Vue.

## **computed**
le computed properties sono essenzialmente come i methods, con un'unica grande differenza: vue conoscerà le dependencies (altre propietà di vue collegate al computed field) e verranno ricalcolate solo se una di queste dependencies cambia.

**computed dovrebbe contenere funzioni elementari, funzioni complesse (o che richiedono anche solo un parametro) dovrebbero essere dichiarate in `methods`**.

## **watch**
contiene una lista di funzioni il cui nome é collegato alle proprieta di `data`. Queste funzioni verranno eseguite quando la collegata proprietà cambia. In queste funzioni é possibile dichiarare due parametri di sistema: value, oldvalue che contengono appunto il valore corrente e il valore precedente.
```Javascript
Vue.createApp({
    data() {
        return {
            enteredValue: '',
            computedValue: '';
        };
    },
    watch: {
        enteredValue(value, oldValue) {
            computedValue = enteredValue + " some static data";
            console.log('enteredValue old value = '+ oldValue)
        }
    }
}).mount('#app');
```

Da notare come all'interno di tutte le funzioni (contenute nelle varie proprietà) ci si possa riferire all'oggetto data usando `this`.




# Direttive (Directives)
Le directives sono delle proprietà degli oggetti html che non vengono riconosciuti dal browser ma che vengono riconosciuti e usati da Vue. 


Iniziano quasi tutti per `v-`. Elencheró qui sotto i più importanti
- `v-bind`: collega il valore di un attributo html ad una proprietà di `data` (lo shorthand per `v-bind` é `:`)

    ```html
    <p>Learn more <a v-bind:href="vueLink">about Vue</a></p>
    <p>Learn more <a :href="vueLink">about Vue</a></p>
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

- `v-on:element`: collega un evento all'elemento html (`@` é lo shorthand per `v-on`)

    ```html
    <button v-on:click="addGoal">Add Goal</button>
    <button @click="addGoal">Add Goal</button>
    ```

- `v-once`: questa direttiva serve a bloccare l'interazione con vue dopo la prima interazione. Diciamo che hai un valore che deve essere aggiornato una sola volta, questa è la direttiva giusta
    ```html
    <p>Result: {{ counter }}</p>
    <p v-once>blocked: {{ counter }}</p>
    ```


# Modificatori di eventi (event modifiers)
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



# Interpolazione (interpolation)
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

    # Dynamic Styles
    Vue può cambiare lo style di qualsiasi oggetto controllato molto facilmente. Ci sono diversi modi di intervenire: 

    - style: puoi collegare usando v-bind per collegare lo style di una classe ad proprietà di `data` (o un computed). Grazie alla sintassi della singola parentesi graffa é possibile definire il valore della proprietà css dinamicamente
    ```html
        <div
            class="demo1" 
            :style="{'border-color': boxASelected ? 'red' : '#ccc'}"
            @click="selectBox('A')"
        ></div>
        <div
            class="demo2" 
            :style="{borderColor: boxASelected ? 'red' : '#ccc'}"
            @click="selectBox('A')"
        ></div>
    ```

    É interessante notare come le proprietà debbano essere dichiarate come stringa se usiamo il nome convezionale (demo1) o che possano essere dichiarate come variabili se si usa il usa la versione camelCase (demo2)

    - class: aggiornare le classi dovrebbe essere più comodo per tenere lo style e il codice ognuno al suo posto. Per quanto riguarda le classi abbiamo 3 modi per aggiornare dinamicamente le classi.
        - valutando una variabile: viene valutata una proprietà `data` (o un computed) e restituita una stringa che contiene le classi corrette.
        ```html
        <div
            :class="boxASelected ? 'demo active' : 'demo'" 
            @click="selectBox('A')"
        ></div>
        ```
        - sintassi con graffa singola: per situazioni più complesse ma non estreme: ogni classe viene valutata singolarmente e se true aggiunte alla propietà class.
        ```html
        <div
            :class="{demo: true, active: boxASelected}" 
            @click="selectBox('A')"
        ></div>
        ```

        - sintassi con graffa singola e doppia proprietà: per facilitare situazioni un po' più complesse dove vanno considerate molte classi: tutte le classi singole vengono spostate nella propietà class che rimane invariabile, le classi che vengono aggiunte in base alle variabili collegate in `:class`.
        ```html
        <div
            class="demo"
            :class="{active: boxASelected}" 
            @click="selectBox('A')"
        ></div> 
        ```   
        - array syntax: puoi usare un array per definire le classi
        ```html
        <div
            :class="[demo, {active: boxASelected}]" 
            @click="selectBox('A')"
        ></div> 
        ```   

        - sintassi con bind a proprietà o computed: nella proprietà binded viene collegato un computed the ritorna una stringa calcolata in blase al valore di altre proprietà.
        ```html
            <div
                class="demo"
                :class="boxAclasses" 
                @click="selectBox('A')"
            ></div> 
        ```
        ```javascript
            const app = Vue.createApp({
                computed: {
                    boxAclasses() {
                        return {active: this.boxASelected};
                    }
                }
                data() {return {
                    boxASelected: false
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

        ```
