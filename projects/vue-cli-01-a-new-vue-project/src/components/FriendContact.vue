<template>
    <li>
        <h2> {{ friend.name }}</h2>
        <button @click="toggleDetails">Show Details</button>
        <ul v-if="detailsAreVisible">
            <li><strong>Phone: </strong>{{ friend.phone }}</li>
            <li><strong>Email: </strong>{{ friend.email }}</li>
        </ul>
    </li>
</template>

<script>
export default ({
    data() { 
        return {
            detailsAreVisible: false,
            friend: {
                id: "armando",
                name: "Armando Longobardi",
                phone: "0123 1234 23232",
                email: "a.longo@gmail.com"
            }
        };
    },
    methods: {
        toggleDetails () {
            this.detailsAreVisible = !this.detailsAreVisible;
        }
    }
})
</script>
