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
        this.cards = [];
        this.blankCards = [];
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
            this.dividePlayers();
            // once teams are divided, determine spyMaster per team
            this.redTeam.setSpyMaster();
            this.blueTeam.setSpyMaster();
            // select 25 cards from wordDeck to use for game
            while (this.cards.length < 25) {
                // select random number between 0 and wordDeck.length
                let selectedWord = wordDeck.words[Math.floor(Math.random() * wordDeck.words.length)];
                // If the word is not in this.cards, add it.
                if (!this.containsWord(selectedWord)) {
                    this.cards.push(new Card(selectedWord));
                }
            }
            // ok so we have 25 cards, let's distribute them to teams. make a copy for splicing.
            let cardDivision = this.cards;
            // red always goes first, they get 9
            this.redTeam.addCards(cardDivision.slice(0, 9), "red");
            // blue gets 8, this follows rules based on size.
            this.blueTeam.addCards(cardDivision.slice(9, 17), "blue");
            // leaves 8 cards left, random pick to be assassin
            this.blankCards = cardDivision.slice(17, 24);
            this.setBomb(cardDivision.slice(24)[0]);
            // randomize cards since they're all assigned.
            this.randomizeCards();
            return true;
        }
        else {
            return false;
        }

    }

    setBomb(card) {
        card.isBomb = true;
        this.bomb = card;
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

    randomizeCards() {
        let randomCards = this.cards;
        var currIndex = randomCards.length, temp, randIndex;
        while (0 !== currIndex) {
            randIndex = Math.floor(Math.random() * currIndex);
            currIndex -= 1;
            temp = randomCards[currIndex];
            randomCards[currIndex] = randomCards[randIndex];
            randomCards[randIndex] = temp;
        }
        this.cards = randomCards;
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

    dividePlayers() {
        const divider = Math.ceil(this.players.length / 2);
        this.redTeam.addPlayers(this.players.slice(0, divider));
        this.blueTeam.addPlayers(this.players.slice(divider));
    }


    getPlayerTeam(id) {
        let result;
        this.players.forEach(player => {
            if (player.id === id) {
                result = {
                    team: this.redTeam.hasPlayer(player.id) ? "red" : "blue",
                    spyMaster: this.redTeam.spyMaster.id === id || this.blueTeam.spyMaster.id === id ? true : false
                };
                return;
            }

        });
        return result;
    }

    getPlayerTeamIds(playerId, excludeMaster) {
        if (this.redTeam.hasPlayer(playerId)) {
            return excludeMaster ? this.redTeam.getIdsExcludingSpyMaster() : this.redTeam.getIds()
        }
        else {
            return excludeMaster ? this.blueTeam.getIdsExcludingSpyMaster() : this.blueTeam.getIds()
        }
    }


    cardSelected(selectedCard) {
        this.cards.forEach(card => {
            if (card.word === selectedCard && card.found === false) {
                card.selected = card.selected ? false : true;
                return;
            }
        })
    }

    submitSelection() {
        // go through cards. if selected == true, turn found to true, update score(s)
        // store scores beforehand to see if they picked a faulty card
        let wrongTeamSelection = false;
        this.cards.forEach(card => {
            if (card.selected) {
                card.selected = false;
                card.found = true;
                if (this.bomb === card) {
                    this.gameOver = true;
                    this.gameWinner = this.turn === "red" ? "blue" : "red";
                }
                if (this.redTeam.hasCard(card.word)) {
                    console.log("RED CARD")
                    this.redTeam.points -= 1;
                    console.log(this.redTeam.points)
                    if (this.turn === "blue") {
                        // picked the wrong card..
                        wrongTeamSelection = true;
                    }
                }
                else if (this.blueTeam.hasCard(card.word)) {
                    this.blueTeam.points -= 1;
                    if (this.turn === "red") {
                        // picked the wrong card..
                        wrongTeamSelection = true;
                    }
                }
                else {
                    // it was a blank card. should we do anything here?
                    wrongTeamSelection = true;
                }
            }
        });
        console.log(wrongTeamSelection)
        if (wrongTeamSelection) {
            this.endTurn();
        }
    }

    endTurn() {
        this.turn = this.turn === "red" ? "blue" : "red";
    }

    hasWinnerByScore() {
        if (this.redTeam.points === 0) {
            this.gameOver = true;
            this.gameWinner = "red"
            return true;
        }
        else if (this.blueTeam.points === 0) {
            this.gameOver = true;
            this.gameWinner = "blue";
            return true;
        }
        return false;
    }


    endGame() {
        // game is over, reveal all cards.
        this.cards.forEach(card => {
            card.found = true;
        });
    }

}
