var Team = require('./team')
var Card = require('./card')
var Player = require('./player')


// Game
// Players (Array)
// RedTeam - team class - contains players and cards
// BlueTeam - team class - contains players and cards
// Bomb - loser card
// Turn? (Red,Blue)
// isGameOver? (True, False)
// gameWinner (Null, Red or Blue)

module.exports = class Game {
    constructor() {
        this.players = [];
        this.redTeam = new Team("red");
        this.blueTeam = new Team("blue")
        this.bomb = null;
        this.gameOver = false;
        this.gameWinner = null;
        this.turn = "red";
    }

    changeTurn() {
        this.turn = turn === "red" ? "blue" : "red"
    }

    addPlayer(name, id) {
        const isAdmin = this.players.length === 0 ? true : false;
        let player = new Player(name, id, isAdmin);
        this.players.push(player)
        console.log("NEW PLAYER")
        console.log(player.name, player.id)
        return isAdmin
    }

    getPlayersName() {
        return this.players.map(player => {
            return player.name;
        });
    }

    getPlayerId(name) {
        this.players.forEach(player => {
            console.log(player)
            if (player.name === name) {
                console.log(player.id);
                return player.id
            }
        })
    }

}
