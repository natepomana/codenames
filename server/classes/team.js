// Team
// Color (Red, Blue)
// Players (Array of players)
// Spymaster (Single player)
// Points (Total points)
// Cards (Array of cards)

module.exports = class Team {
    constructor(color) {
        this.color = color;
        this.players = [];
        this.spyMaster = null;
        this.points = 0;
        this.cards = []
    }


    addPlayers(players) {
        this.players = players;
    }

    addCards(cards) {
        this.cards = cards;
    }

    setSpyMaster() {
        this.spyMaster = this.players[Math.random(0, this.players.length - 1)];
    }

}