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
        this.points = color === "red" ? 9 : 8;
        this.cards = []
    }


    addPlayers(players) {
        this.players = players;
    }

    addCards(cards, team) {
        cards.forEach(card => {
            card.team = team;
            card.isBomb = false;
        })
        this.cards = cards;
    }

    setSpyMaster() {
        this.spyMaster = this.players[Math.floor(Math.random() * this.players.length)];
    }

    getIds() {
        return this.players.map(player => player.id);
    }

    getIdsExcludingSpyMaster() {
        return this.getIds().filter(id => id !== this.spyMaster.id);
    }

    hasPlayer(id) {
        let decide = false;
        this.players.forEach(player => {
            if (player.id === id) {
                console.log("Players match:", id, player);
                decide = true;
                return;
            }
        });
        return decide;
    }

    hasCard(pickedCard) {
        let decide = false;
        this.cards.forEach(card => {
            if (card.word === pickedCard) {
                decide = true;
                return;
            }
        });
        return decide;
    }

}