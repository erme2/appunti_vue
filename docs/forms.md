# Forms
Le forms sono lo strumento che si usa in html per raccogliere i dati che poi si manderanno al server.
In Vue spesso si usa collegare i vari tipi di input a delle proprietà di data usando la connessione v-model.

## Inputs
### Standard
Questa connessione funziona nativamente con:
- input -> Tutti i tipi di input funzionano nativamente con i v-model. Addirittura alcuni tipi formattano la variabile contenuta nel 
giusto tipo di variabile connessa (es type="number" -> int).
- select -> Se le options hanno values diversi la proprietà connessa conterrà il valore selezionato o sarà vuota. 
Aggiornando il valore della proprietà la select verrà aggiornata nativamente
- checkbox -> Anche le checkbox funzionano nativamente se il value viene settato correttamente. Il valore della proprietà
connessa deve essere inizializzato come un array. Selezionando/Deselezionando le varie checkbox i valori selezionati/deselezionati
verranno aggiunti/eliminati dall'array. Aggiornado i dati dell'array connesso le checkbox verranno aggiornate nativamente.
**Attenzione!!!** checkbox singole possono essere usate con valori bool (`true`/`false`)
- options -> come select



### Components
Anche i components possono essere usati come elementi di un form e linkati a delle variabili di vue.

#### Cosa fare nel parent component
Semplicemente create in component e linkarlo ad un valore usando `v-model`
``` html
<rating-control v-model="rating"></rating-control>
```

#### Cosa fare nel child component
Il child component deve essere costruito per supportare questa funzione ed in particolare deve dichiarare un props ed un 
emits specifici:
```vue
<script>
export default {
  name: "RatingControl",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      activeOption: null
    };
  },
  methods: {
    activate(option) {
      this.activeOption = option;
      this.$emit('update:modelValue', option);
    }
  }
}
</script>
```
deve anche avere un `method` che emetta il custom event specifico.

Esempio di un child compoment funzionante
```vue
<template>
  <ul>
    <li :class="{active: this.modelValue === 'poor'}">
      <button type="button" @click="activate('poor')">Poor</button>
    </li>
    <li :class="{active: this.modelValue === 'average'}">
      <button type="button" @click="activate('average')">Average</button>
    </li>
    <li :class="{active: this.modelValue === 'great'}">
      <button type="button" @click="activate('great')">Great</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RatingControl",
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    activate(option) {
      this.activeOption = option;
      this.$emit('update:modelValue', option);
    }
  }
}
</script>
```
Da notare che si può usare la props `modelValue` come una variabile. Questo manterrà l'interfaccia aggiornata con il valore
della props e allo stesso tempo aggiornerà il child component quando il parent component aggiornerà il v-model connesso.

