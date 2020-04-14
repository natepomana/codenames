import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Login } from './component/Login';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      inGame: false,
      userCreated: false,
      socket: socketIOClient("http://127.0.0.1:4001"),
      players: []
    };
  }

  componentDidMount() {
    this.state.socket.on("FromAPI", data => this.setState({ response: data }));

    this.state.socket.on("playerAdded", player => {
      console.log(player)
      this.setState(prevState => ({ players: [...prevState.players, player] }));
    });
  }



  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.inGame
          ? <p>In Game</p>
          : <Login socket={this.state.socket} onlinePlayers={this.state.players.length}></Login>
        }

      </div>
    );
  }
}

export default App;