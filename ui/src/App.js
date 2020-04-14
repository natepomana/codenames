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
    const { endpoint } = this.state;
    this.state.socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.inGame
          ? <p>In Game</p>
          : <Login socket={this.state.socket}></Login>
        }

      </div>
    );
  }
}

export default App;