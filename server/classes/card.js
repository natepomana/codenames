// Card
// Word (String)
// Team (Red, Blue, Null)
// Bomb? (True, False)
// Selected? (True, False)

class Card {
    constructor(word, team, isBomb) {
        this.word = word;
        this.team = team;
        this.isBomb = isBomb;
        this.selected = False;
    }
}