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
        this.spymaster = null;
        this.points = 0;
        this.cards = []
    }
}