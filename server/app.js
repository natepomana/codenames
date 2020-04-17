const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

let interval;
let count;
const Game = require('./classes/game')
const game = new Game();

io.on("connection", socket => {

    socket.on('addPlayer', name => {
        const isAdmin = game.addPlayer(name, socket.id);
        socket.emit("setAdmin", isAdmin)
        io.sockets.emit("playerAdded", game.getPlayersName())
    })

    console.log("New client connected");
    count += 1;
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 500);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        count -= 1
    });



});

server.listen(port, () => console.log(`Listening on port ${port}`));

const getApiAndEmit = async socket => {
    try {
        const res = "yerr"
        socket.emit("FromAPI", res); // Emitting a new message. It will be consumed by the client
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
