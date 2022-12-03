# Props (Properties) e relazione parent/child (genitore/figlio)

Quando creiamo una app e linkiamo all'interno della stessa un componente si viene a creare una relazione parent/child.
Ma come funziona questa relazione? In linea di principio il passaggio di informazioni deve avere una sola direzione:

    parent -> child

## Props
Le properties vanno passate nel template parent e specificate usando il kebap-case
```html
<template>
    <section>
        <header>
            <h1>My friends</h1>
        </header>
        <ul>
            <friend-contact
                    name="Pippo"
                    phone-number="123 456 789 00"
                    email-address="pippo@email.com"
                    :is-favorite="1 === 1"
            ></friend-contact>
            <friend-contact
                    name="Pluto"
                    phone-number="123 456 789"
                    email-address="pluto@email.com"
                    :is-favorite="false"
            ></friend-contact>
        </ul>
    </section>
</template>
```
E poi dichiarate nel template child all'interno dell'export default
```html
<script>
    // dichiarazione base: un array
    export default ({
        props: [
            'name',
            'phoneNumber',
            'emailAddress'
        ],
        [...]
    });
    // object base
    export default ({
        props: {
            name: String,
            phoneNumber: String,
            emailAddress: String
        }
    });
    // object avanzato
    export default ({
        props: {
            name: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: false,
                default: 'Not present'
            },
            emailAddress: {
                type: String,
                required: false,
                default: "not provided",
                validator: function (value) {
                    [...]
                    return value;
                }
            }
        }
    });
</script>
```
### Tipi di props accettate:
- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol
- any constructor function