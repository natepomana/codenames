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
        this.admin = null;
        this.cards = []
        this.totalCards = 25;
    }

    changeTurn() {
        this.turn = turn === "red" ? "blue" : "red"
    }

    startGame(wordDeck) {
        // make sure there are at least 4 players
        if (this.players.length >= 4) {
            // divide players into teams (randomize pls)
            this.randomizePlayers();
            const divider = Math.ceil(this.players.length / 2);
            let playersDivision = this.players;
            this.redTeam.addPlayers(playersDivision.splice(0, divider));
            this.blueTeam.addPlayers(playersDivision);
            // once teams are divided, determine gameMaster per team
            this.redTeam.setSpyMaster();
            this.blueTeam.setSpyMaster();
            // select 25 cards from wordDeck to use for game
            while (this.cards.length > 25) {
                // select random number between 0 and wordDeck.length
                let selectedWord = wordDeck.words[Math.random(0, this.wordDeck.length - 1)];
                // If the word is not in this.cards, add it.
                if (!this.containsWord(selectedWord)) {
                    this.cards.append(new Card(selectedWord));
                }
            }
            // ok so we have 25 cards, let's distribute them to teams. make a copy for splicing.
            let cardDivision = this.cards;
            // red always goes first, they get 9
            this.redTeam.addCards(cardDivision.splice(0, 9));
            // blue gets 8, this follows rules based on size.
            this.blueTeam.addCards(cardDivision.splice(0, 8));
            // leaves 8 cards left, random pick to be assassin

        }
        else {
            return false;
        }

    }

    containsWord(word) {
        this.cards.forEach(card => {
            if (card.word === word) {
                return true;
            }
        });
        return false;
    }

    randomizePlayers() {
        let randomPlayers = this.players;
        var currentIndex = randomPlayers.length, temp, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temp = randomPlayers[currentIndex];
            randomPlayers[currentIndex] = randomPlayers[randomIndex];
            randomPlayers[randomIndex] = temp;
        }
        this.players = randomPlayers;
    }

    addPlayer(name, id) {
        const isAdmin = this.players.length === 0 ? true : false;
        let player = new Player(name, id, isAdmin);
        if (isAdmin) {
            this.admin = player.id
        }
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
