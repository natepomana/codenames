import React, { Fragment, Component } from "react";


export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            userCreated: false,
            socket: props.socket
        }
    }


    render() {

        return (<div>we in da game bois
        </div>
        )
    }

}

