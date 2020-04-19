// Team
// Color (Red, Blue)
// Players (Array of players)
// Spymaster (Single player)
// Points (Total points)
// Cards (Array of cards)

module.exports = class wordDeck {
    constructor(color) {
        this.words = [];
        this.generateWords();
    }

    generateWords() {
        var fs = require('fs');
        fs.readFile('words/words.txt', 'utf8', (err, data) => {
            if (err) throw err;
            this.words = data.split('\n');
            this.randomizeWords();
            console.log(this.words.length + " words processed and shuffled.")
        });
    }

    randomizeWords() {
        let randomWords = this.words;
        var currIndex = randomWords.length, temp, randIndex;
        while (0 !== currIndex) {
            randIndex = Math.floor(Math.random() * currIndex);
            currIndex -= 1;
            temp = randomWords[currIndex];
            randomWords[currIndex] = randomWords[randIndex];
            randomWords[randIndex] = temp;
        }
        this.words = randomWords;
    }

}