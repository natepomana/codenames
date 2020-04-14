const Game = require('./classes/game')

module.exports = function () {
    const game = new Game()

    function addPlayer(name) {
        game.addPlayer(name)
        callback(null)
    }

}