
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                this.monsterHealth = 0;
            }
            return { width: this.monsterHealth+'%'}
        },
        playerBarStyle() {
            if (this.playerHealth < 0) {
                this.playerHealth = 0;
            }
            return { width: this.playerHealth + '%'}
        },
        specialAvailable() {
            return this.attackRound % 3 !== 0;
        }
    },
    data(){ return {
        playerHealth: 100,
        monsterHealth: 100,
        attackRound: 0,
        winner: null,
        gameLog: []
    }},
    methods: {
        attackMonster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackRound = this.attackRound + 1;
            this.log('psssslayer', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth = this.playerHealth - attackValue;
            this.attackRound ++;
            this.log('monster', 'attack', attackValue);
        },
        healPlayer() {
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth = this.playerHealth + healValue;
            }
            this.log('player', 'heal', healValue);
        },
        log(who, what, value) {
            this.gameLog.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        },
        specialAttackMonster() {
            this.attackRound ++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.log('player', 'special attack', attackValue);
            this.attackPlayer();
        },
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.attackRound = 0;
            this.winner = null;
            this.gameLog = [];
        },
        surrender() {
            this.winner = 'monster';
        }
    },
    watch: {
        playerHealth(value){
            if (value <= 0 && this.monsterHealth <= 0 ) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // you lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if (value <= 0 && this.playerHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // you win
                this.winner = 'player';
            }
        }
    }
});
app.mount('#game');