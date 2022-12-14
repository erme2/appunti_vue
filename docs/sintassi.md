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

- ### **data**
é l'oggetto che contiene i dati e le strutture di dati, **deve essere dichiarato come una *funzione* e questa funzione deve sempre ritornare un oggetto**

- ### **methods**
é un oggetto che contiene una lista delle funzioni che utilizzeremo all'interno di Vue.

- ### **computed**
le computed properties sono essenzialmente come i methods, con un'unica grande differenza: vue conoscerà le dependencies (altre propietà di vue collegate al computed field) e verranno ricalcolate solo se una di queste dependencies cambia.

**computed dovrebbe contenere funzioni elementari, funzioni complesse (o che richiedono anche solo un parametro) dovrebbero essere dichiarate in `methods`**.

- ### props
    Props abbrevia properties. Si possono dichiarare delle variabili in props e funzioneranno come le variabili che 
abbiamo in `data`. Vengono usate nei child components per passare dei parametri da parent a child.
 
- ### emits
    Emits é un array di eventi custom che il componente child può emettere in determinate situazioni. Viene usato per poi 
essere collegati a delle funzioni (che saranno dichiarate in `methods`) e passare parametri aggiornati indietro al componente
parent.
-  ### provide
    Se si dichiarano dei valori nella proprietà provide di un componente parent e leggerli dalla proprietà `inject` nel 
componente child.

    Potrebbe tornare utile connettere il contenuto di provide con il contenuto di `data`. Per fare questo si può dichiarare 
provide come una funzione (un po' come data) e usare una funzione return e la sintassi this per linkare il i dati di provide
a `data`.

    ```javascript
    export default {
      data() {
        return {
          topics: [
            'a', 'b', 'c'
          ],
        };
      },
      provide() {
        return {
          topics: this.topics
        }
      }
    };
    ```
    La compinazione provide/inject puó essere usata anche per passare delle funzioni che verranno poi eseguite nel parent 
component.
     ```javascript
     // In the parent component: 
     export default {
       methods: {
         activateTopic(topicId) {
             // do domething 
         }
       },
       provide() {
         return {
           topics: this.topics,
           selectTopic: this.activateTopic
         }
       }
     };
   ```
    ```html
    <!-- in the child com -->
    <template>
       <button @click="selectTopic(id)">do something</button>
    </template>
    <script>
      export default {
       inject['selectTopic'],
       props['id', 'name', 'description']
     };
    </script>   
   ```

- ### inject
    Se un componente parent dichiara delle variabili in `provide` si possono leggere in un componente child elencandole 
in `inject`.

## **template**
Usando questo parametro puoi lasciare vuoto l'elemento html su cui hai montato l'app vue e mettere qui il codice html che avresti messo 
nell'elemento html.
```js
Vue.createApp({
    template: `
    <h1>{{ title }}</h1> 
    <ul>
        <li v-for="row in rows">{{ row.id }}</p>
    </ul>`,
    data() {
        return {
            title: 'look at this :)',
            computedValue: [
                {id: 1, name: test1},
                {id: 2, name: test2}
            ]
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
    
- `ref`: é usato da vue per referenziare elementi html in diversi contesti. Ad esempio: potresti avere un elemento input di
cui voi leggere il valore aggiornato a uno specifico evento (come un click):
    ```html
    <section id="app">
        <input type="text" ref="userText">
        <button @click="setText">Set Text</button>
        <p>{{ message }}</p>
    </section>
    ```
    ```javascript
    const app = Vue.createApp({
        data() {return {
            message: ""
        }},
        methods: {
            setText() {
                this.message = this.$refs.userText.value;
            }
        }
    });
    ```

- `v-bind`: collega il valore di un attributo html ad una proprietà di `data` (lo shorthand per `v-bind` é `:`)

    ```html
    <p>Learn more <a v-bind:href="vueLink">about Vue</a></p>
    <p>Learn more <a :href="vueLink">about Vue</a></p>
    ```
- `v-for`: collega un elemento ad un array presente nella funzione `data` e ripete l'oggetto per ogni elemento nell'array/oggetto collegato
    
    ```html
    <li v-for="goal in goals">{{ goal }}</li>
    <!-- or -->
    <li v-for="(goal, index) in goals">{{ index }} - {{ goal }}</li>
    <!-- or -->
    <li v-for="(value, key, index) in {name: User, age: 32}">{{ key }}{{ value }} - {{ index }}</li>
    <!-- or -->
    <li v-for="num in 10">{{ num }}</li>
    ```
    Quando usi il `v-for` é buona abitudine usare l'attributo `key`, che aiuta ad accedere ad un elemento specifico della lista per aggiornarlo o eliminarlo. Non c'é un valore unico fornito in automatico da vue, ma nelle situazioni classiche basta utilizzare un valore unico che protreste aver ricevuto dal DB ad esempio...
    ```html
    <li v-for="goal in goals" :key="unique_key">{{ goal }}</li>
    ```

- `v-html`: funzione come v-bind, serve a collegare una proprietà delle funzione data al contenuto di un elemento html, ma viene usato se questo contenuto dovrà essere trattato come codice html. NON ABUSARE, la norma dovrebbe essere v-bind e v-html l'eccezione.

    ```html
    <p v-html="outputGoal()"></p>
    ```

- `v-if`: vue utilizza questo if per visualizzare o meno un elemento html. Puoi usare una qualsiasi espressione JS e l'elemento sarà visibile sono se e finché questa espressione sarà `true` (l'espressione protrebbe essere collegata ad una funzione o ad una proprietà di data che cambiando protrebbe cambiare il risultato dell'espressione).
Attenzione!!! Questo elemento non verrà sono nascosto, verrà completamente rimosso!
    - `v-else`
    - `v-else-if`
    Possono essere utilizzati con `v-if` ma saranno validi solo se usati negli elementi direttamente successivi all'elemento che ha un `v-if` affindato nel codice.

    ```html
    <p v-if="goals.length === 0">questo paragrafo sarà visibile finché l'array goals rimarrà vuoto</p>
    <p v-else-if="goals.lengh > 10">questo paragrafo sarà visibile solo se goals ha più di 10 elementi</p>
    <p v-else>questo paragrafo sarà visibile finché l'array goals non sarà vuoto (e con meno di 10 elementi)</p>
    
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

- `v-show`: molto simile ad `v-if` ma con due grandi differenze: non può essere linkato ad altri elementi html (come con `v-else`), ma soprattutto l'elemento non verrà eliminato dal document, ma solo mostrato/nascosto. Mostrato se l'espressione = true, nascosto se false.
    ```html
    <p v-show="1 === 1">paragrafo visibile solo se 1 === 1</p>
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
>    </div>
    <div
        class="demo2" 
        :style="{borderColor: boxASelected ? 'red' : '#ccc'}"
        @click="selectBox('A')"
>    </div>
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
