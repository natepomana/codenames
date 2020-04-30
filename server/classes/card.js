// Card
// Word (String)
// Team (Red, Blue, Null)
// Bomb? (True, False)
// Selected? (True, False)

module.exports = class Card {
    constructor(word) {
        this.word = word;
        this.team = null;
        this.isBomb = false;
        this.selected = false;
        this.found = false;
    }
}