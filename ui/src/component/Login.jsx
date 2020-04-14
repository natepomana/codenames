import React, { Fragment, Component } from "react";


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            userCreated: false,
            socket: props.socket
        }
    }

    addPlayer = () => {
        this.setState({
            name: "tester",
            userCreated: true
        });
    }


    render() {
        const userCreated = this.state.userCreated;
        return (
            userCreated ?
                <p>welcome my dood, {this.state.name}</p>
                : <Fragment><p>gotta sign up</p> <button onClick={this.addPlayer}>click mi</button></Fragment >
        )
    }

}

