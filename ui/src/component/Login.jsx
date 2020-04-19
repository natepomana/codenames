import React, { Fragment, Component } from "react";
import { Button } from "@chakra-ui/core";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            userCreated: false,
            socket: props.socket
        }
    }

    addPlayer = () => {
        if (this.state.name !== "") {
            this.state.socket.emit('addPlayer', this.state.name);
            this.setState({
                userCreated: true
            });
        }
    }

    updateName = (evt) => {
        this.setState({
            name: evt.target.value
        });
    }

    render() {
        const playerList = this.props.onlinePlayers.map(player => {
            return <li>{player}</li>;
        });
        return (<div>
            {this.state.userCreated ?
                <Fragment>
                    <p>Hey {this.state.name}!</p>
                    {this.props.admin ? <button onClick={this.props.startGame}>Start Game</button> : <Fragment></Fragment>}
                </Fragment>
                : <Fragment>
                    <p>Gotta sign up my dood</p>
                    <input label="Nickname" type="text" value={this.state.name} onChange={evt => this.updateName(evt)} />
                    <button label="Join" variant="outline-brand" onClick={this.addPlayer}>join</button>
                </Fragment>}
            <p>Players online: {playerList}</p>
        </div>
        )
    }

}

