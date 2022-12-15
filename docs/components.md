# Components

I `compoments` sono una funzionalità di Vue volta ad aiutare lo sviluppatore a evitare ripetizioni di codice e a rendere 
capillare la destrutturazione dei problemi e del codice.
In pratica sono delle mini-app costruite e collegate all'app principale, vengono dichiarate nello stesso modo e si collegano all'app 
principale.

Grazie all'estensione `.vue`, tutte le parti di un component possono essere salvate nello stesso file: 
- [Templates](#template)
- [Script](#script)
- [Style](#style)

## <a name="template"></a> `<template>`
Contiene il codice html
```vue
<template>
  <div>
    <the-header></the-header>
    <badge-list></badge-list>
    <user-info
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"
    ></user-info>
  </div>
</template>
```

## <a name="script"></a> `<script>`
Contiene il codice javascript
```vue
<script>
export default {
  data() {
    return {
      activeUser: {
        name: 'test user',
        description: 'Site owner and admin',
        role: 'admin',
      },
    };
  },
};
</script>
```

## <a name="style"></a> `<style>`
Contiene il codice css.
```vue
<style scoped>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
```
Il codice css può essere di due tipi: `general` (default) o `scoped` e verrà applicato solo al componente dove é stato
dichiarato. Per 

## Come caricare i components
I `components` possono essere caricati a livello globale usando il file `main.js`. 
In questo modo i `compoments` saranno accessibili a livello globale.

```javascript
import { createApp } from 'vue';

import App from './App.vue';
import TheHeader from './components/TheHeader.vue';
import BaseBadge from './components/BaseBadge.vue';
import BadgeList from './components/BadgeList.vue';
import UserInfo from './components/UserInfo.vue';

const app = createApp(App);

app.component('the-header', TheHeader);
app.component('base-badge', BaseBadge);
app.component('badge-list', BadgeList);
app.component('user-info', UserInfo);

app.mount('#app');
```

Ma anche locale, ma in questo caso i components saranno accessibili sono all'interno del component che ha caricato il 
nuovo componente.

```html
<script>
import BadgeList from "./BadgeList.vue";

export default {
  components: {
    BadgeList
  },
  props: ['type', 'caption'],
  computed: {
    classes() {
      return {
        'badge--admin': this.type === 'admin',
        'badge--author': this.type === 'author',
      };
    },
  },
};
</script>
```
**Attenzione!!! Per motivi di ottimizzazione del caricamento e della gestione delle risorse se non é veramente necessario 
caricare un componente a livello globale é sempre meglio caricarlo a livello locale.**

## Slots
Gli slots sono dei componenti che é facile riutilizzare in diverse situazioni. Servono per isolare e riutilizzare parti 
di html e css. 
Per esempio diciamo che vogliamo creare un componente che useremo come wrapper solo per applicare uno specifico style e
avere un effetto ombra attorno ad altri components.
Si crea il componente nella solita maniera, si applica lo style (e anche codice JS se necessario) e si carica dal `main.js`
file (cosí che sia disponibile ovunque) ...
```vue
<template>
  <div>
    <!-- questo if renderà disponibile questa parte di codice solo se sarà presente uno slot con nome header -->
    <header v-if="$slots.header">
      <slot name="header">
        <!-- qui verrà mostrato il contenuto del compomente che chiama questo slot -->
      </slot>
    </header>
    <slot>
      <!-- lo slot senza nome é lo slot `default` -->
      <!-- il codice che lasci qui funzionerà come un contenuto di default -->
    </slot>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$slots.header);
  }
};
</script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>
```
E poi lo si carica in un qualsiasi component nel caso in cui si voglia applicare quello style/html/funzionejs.

```vue
<template>
  <section>
    <base-card>
      <template #header>
        <!-- questo codice verrà mostrato nello slot chiamato header -->
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </template>
      <template #default>
        <!-- questo codice verrà mostrato nello slot senza nome (default) -->
        <p>{{ infoText }}</p>
      </template>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['fullName', 'infoText', 'role'],
};
</script>
```
Il codice del componente slot verrà applicato all'interno del tag `template` del componente che lo richiama. Lo slot 
conterrà a sua volta il contenuto del template all'interno del tag `<slot>`. Questo permette di passare variabili dal 
componente principale allo slot senza connessioni dirette tra i due componenti **che non saranno in una relazione 
parent/child (padre/figlio)**. Gli slot potrebbero essere anche vuoti o non dichiarati. In tal caso il codice HTML 
presente nel template dello slot verrà usato come contenuto di default (fallback).

**Attenzione: gli slot possono essere multipli, nel tal caso uno dovrà prendere il nome di `default` e gli altri dovranno
avere nomi diversi**

### Scoped Slots
Quando crei un componete che verrà largamente usato, o anche condiviso potresti voler rendere personalizzabili alcune parti.
Come ad esempio il contenuto degli item all'interno di una lista. Per fare questo puoi inserire uno slot all'interno del
componente e prendere il markeup contenuto nel template padre e caricarlo nello slot all'interno del template figlio.
Ora il problema é che i dati che vogliamo mostrare sono all'interno del compomente figlio e non possiamo accedervi dal 
componente padre.

```vue
CourseGoal.vue
<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <!-- i valori che assegniamo allo slot saranno accessibili al component che legge questo slot -->
      <slot :item="goal"></slot>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      goals: ['a', 'b'],
    }
  }
}
</script>
```

```vue
App.vue
<templte>
  <div>
    <course-goals>
      <!-- qui dobbiamo aggiungere un template per avere accesso alle variabili che 
      vengono dallo slot interno al componente -->
      <template #default="slotProps">
        <h2>{{ slotProps.item }}</h2>
      </template>
    </course-goals>
  </div>
</templte>
<script>
import CourseGoals from "./CourseGoals.vue";
export default {
  components: {
    CourseGoals
  }
}
 </script>

```

## Dynamic Components
A volte potremmo avere la necessità di mostrare uno specifico componente o un altro dinamicamente. Un problema che si 
potrebbe risolvere facilmente usando `v-if`. Questa soluzione però potrebbe risultare stucchevole nel caso ci siano molte 
opzioni in gioco. Per questo esiste il `<component>` che rappresenta un componente dinamico che carica un componente 
in base al nome che verrà caricato nella proprietà `is`.
Collegando (`v-bind`) una variabile alla proprietà `is` il componente diverrà dinamico.

```vue
<template>
  <button @click="selectedComponent('compoment-a')">Show A</button>
  <button @click="selectedComponent('compoment-b')">Show B</button>
  <!-- potresti ovviare al problema con un v-if, ma in caso avessi molti -->
  <!-- components il gioco potrebbe non valere la candela  -->
  <compoment-a v-if="selectedComponent === 'compoment-a'"></compoment-a>
  <compoment-b v-if="selectedComponent === 'compoment-b'"></compoment-b>
  <!-- oppure usare un `component` con la propietà `is` collegata (v-bind) -->
  <!-- alla proprietà che contiene il nome del compomente che vuoi usare --> 
  <component :is="selectedComponent"></component>
</template>
<script>
import CompomentA from './compoments/CompomentA.vue';
import CompomentB from './compoments/CompomentB.vue';
export default {
  components: {
    CompomentA,
    CompomentB
  },
  data() {
    return {
      selectedComponent: 'compoment-a'
    };
  },
  methods: {
    setSelectedComponent(cmp) {
      this.selectedComponent = cmp;
    }
  }
};
</script>

```


## Alive Components
Quando usi un componente dinamico (anche con `v-if`) il componente disattivato viene rimosso dal DOM. Se questo particolare
componente dovesse qualche informazione (come un campo input che potrebbe contenere qualche 
input proveniente dall'utente), queste informazioni andrebbero perse.
Per evitare questo problema si può chiedere a Vue di mantenere attivo il componete per non perdere queste informazioni.
```vue
<template>
  <button @click="selectedComponent('compoment-a')">Show A</button>
  <button @click="selectedComponent('compoment-b')">Show B</button>
  <keep-alive>
    <component :is="selectedComponent"></component>
  </keep-alive>
</template>
```


## Teleport
A volte usando un componente dentro l'altro potremmo perdere in contatto con la struttura dell DOM principale dove ogni 
markup html ha il suo significato. Per esempio potremmo avere un componente creato per mostrare messaggi diretti all'utente
e per questo potremmo usare il tag `<dialog>` che esiste proprio per questa specifica esigenza. 
Da un punto di vista funzionale potremmo agganciarlo ovunque all'interno del DOM e funzionerebbe ovunque. Ma da un punto 
di vista concettuale e semantico (webcrawler) un po' confusa o almeno 
disordinata. In breve, dovremmo agganciare questo elemento all'elemento principale dell'app e non in un sotto-elemento 
(agganciato a un altro sotto-elemento ...). Per fare questo Vue ci mette a disposizione l'elemento `teleport`.
Teleport accetta un solo parametro/proprietà: `to`.
Puoi passare a `to` un qualsiasi selettore CSS (anche un `#id`) e Vue aggancerà il nuovo elemento a questo elemento.

dQa3CE5JLqSsg#I*DoO^G^GXZ$HoA5O%

```vue
<template>
  <div>
    <h2>Manage Goals</h2>
    <input type="text" ref="goal" />
    <button @click="setGoal">Set Goal</button>
    <teleport to="body">
      <error-alert>
        <h2>Error</h2>
        <p>Message</p>
      </error-alert>
    </teleport>
  </div>
</template>

```
