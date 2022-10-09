Vue.createApp({
    data() {
        return {
            goals: [],
            enteredValue: "",
        };
    },
    methods: {
        addGoal() {
            if (this.enteredValue == "") {
                console.log("Empty value entered");
            } else {
                this.goals.push(this.enteredValue);
            }
            this.enteredValue = "";
        },
    },
}).mount("#app");

// const buttonEL = document.querySelector('button');
// const inputEl = document.querySelector('input');
// const listEl = document.querySelector('ul');

// function addGoal(){
//     const enteredValue = inputEl.value;
//     const listItemEl = document.createElement('li');
//     listItemEl.textContent = enteredValue;
//     listEl.appendChild(listItemEl);
//     inputEl.value = '';
// }

// buttonEL.addEventListener('click', addGoal);
