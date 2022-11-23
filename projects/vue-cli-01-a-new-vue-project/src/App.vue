<template>
    <h2>My friends</h2>
    <ul>
        <friend-contact></friend-contact>
    </ul>
</template>

<script>
import FriendContact from './components/FriendContact.vue';
export default {
  components: { FriendContact },
    data(){return {
        friends: [
            {
                id: "armando",
                name: "Armando Longobardi",
                phone: "0123 1234 23232",
                email: "a.longo@gmail.com"
            },
            {
                id: "pietro",
                name: "Pietro Sagnibene",
                phone: "0123 1234 23232",
                email: "p.sagni@gmail.com"
            },
            {
                id: "Luca",
                name: "Luca Rossi",
                phone: "0123 1234 23232",
                email: "l.rossi@gmail.com"
            }
        ]
    };}
};
</script>
