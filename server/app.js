const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

let count;
const Game = require('./classes/game')
const WordDeck = require('./classes/wordDeck');
const game = new Game();
const wordDeck = new WordDeck();
console.log("Game created.");

io.on("connection", socket => {

    socket.on('addPlayer', name => {
        const isAdmin = game.addPlayer(name, socket.id);
        socket.emit("setAdmin", isAdmin);
        io.sockets.emit("playerAdded", game.getPlayersName());
    });

    socket.on('startGame', id => {
        if (game.admin === id) {
            const success = game.startGame(wordDeck);
            if (success) {
                io.sockets.emit("gameStart");
            }
        }
    });

    console.log("New client connected");
    count += 1;
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        count -= 1
    });

});

server.listen(port, () => console.log(`Listening on port ${port}`));
