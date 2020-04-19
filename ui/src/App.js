import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Login } from './component/Login';
import { Game } from './component/Game'

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4001",
      id: "",
      inGame: false,
      userCreated: false,
      socket: socketIOClient("http://127.0.0.1:4001"),
      admin: false,
      players: []
    };
  }

  componentDidMount() {
    // Login and lobby
    this.state.socket.on('connect', () => {
      this.setState({ id: this.state.socket.id });
    });

    this.state.socket.on("setAdmin", isAdmin => {
      this.setState({ admin: isAdmin })
    });

    this.state.socket.on("playerAdded", players => {
      this.setState({ players: players });
    });

    this.state.socket.on("gameStart", data => {
      this.setState({ inGame: true })
    })
  }

  startGame = () => {
    this.state.socket.emit("startGame", this.state.id)
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.inGame
          ? <Game socket={this.state.socket}></Game>
          : <Login socket={this.state.socket} onlinePlayers={this.state.players} admin={this.state.admin} startGame={this.startGame}></Login>
        }

      </div>
    );
  }
}

export default App;