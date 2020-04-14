import React, { Fragment, Component } from "react";


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
        return (<div>
            {this.state.userCreated ?
                <p>Hey {this.state.name}!</p>
                : <Fragment>
                    <p>Gotta sign up</p>
                    <input type="text" value={this.state.name} onChange={evt => this.updateName(evt)} />
                    <button onClick={this.addPlayer}>click mi</button>
                </Fragment>}
            <p>Current number online: {this.props.onlinePlayers}</p>
        </div>
        )
    }

}
