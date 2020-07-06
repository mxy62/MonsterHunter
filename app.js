git config--global user.name "mxy62"
new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameStart: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameStart = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isplayer: true,
                text: "playerAttack is     " + damage
            });
            if (this.checkWin()) {
                return;
            };

            this.monsterAttack();

        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isplayer: true,
                text: "playerSpecialAttack is  " + damage
            });

            if (this.checkWin()) {
                return;
            };
            this.monsterAttack();
        },
        monsterAttack() {
            var damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage;
            this.turns.unshift({
                isplayer: false,
                text: "mosterAttack is  " + damage
            });
            this.checkWin();

        },
        heal: function () {
            if (this.playerHealth <= 90) {
                var heal = 10
                this.playerHealth += 10;
                this.turns.unshift("heal is  " + heal);
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack();
        },
        giveUp: function () {
            this.gameStart = false;
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameStart = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameStart = false;
                }
                return true;
            }
            return false;
        }
    }
})