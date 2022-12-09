# Components

I `compoments` sono una funzionalità di Vue volta ad aiutare lo sviluppatore a evitare ripetizioni di codice e a rendere 
capillare la destrutturazione dei problemi e del codice.
In pratica sono delle mini-app costruite e collegate all'app principale, vengono dichiarate nello stesso modo e si collegano all'app 
principale.

Grazie all'estensione `.vue`, tutte le parti di un component possono essere salvate nello stesso file: 
- [Templates](#template)
- script (contiene il codice JS necessario a )
- style

I `components` components possono essere caricati a livello globale usando il file `main.js`. 
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

## #<a name="template"></a> Template
