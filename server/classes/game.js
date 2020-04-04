import 'team.js';
import 'card.js';
import 'player.js';


// Game
// Players (Array)
// RedTeam - team class - contains players and cards
// BlueTeam - team class - contains players and cards
// Bomb - loser card
// Turn? (Red,Blue)
// isGameOver? (True, False)
// gameWinner (Null, Red or Blue)

class Game {
    constructor() {
        this.players = [];
        this.redTeam = new Team("red");
        this.blueTeam = new Team("blue")
        this.bomb = Null;
        this.gameOver = False;
        this.gameWinner = Null;
        this.turn = "red";
    }

    changeTurn() {
        this.turn = turn === "red" ? "blue" : "red"
    }



}
