# Vue template

Sono files che hanno usano l'estensione `.vue` e che sono utilizzabili e
comprensibili sono al compilatore vue. Contengono tre sezioni:
- `template`

    ```html
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    ```
  contiene il codice html che verrà visualizzato nel componente
- `script`
    ```html
    <script>
    import HelloWorld from './components/HelloWorld.vue'

    export default {
      name: 'App',
      components: {
        HelloWorld
      }
    }
    </script>
    ```
  contiene tutto il codice JS che servirà al componente.
  Da notare:
    - che si possono importare altri componenti all'interno di questo componente principale
    - come le impostazioni dell'applicazione vengano dichiarate con `export default`


- `style`
    ```html
    <style>
    #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    }
    </style>
    ```    
  contiene il css specifico per questo file


