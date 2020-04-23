import React, { Fragment, Component } from "react";
import { Button, Box, Input, FormControl, FormLabel, ListItem } from "@chakra-ui/core";

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
            return <ListItem>{player}</ListItem>;
        });
        return (<Box>
            {this.state.userCreated ?
                <Fragment>
                    <p>Hey {this.state.name}!</p>
                    {this.props.admin ? <Button label="Start Game" variant="outline" onClick={this.props.startGame}>Start Game</Button> : <Fragment></Fragment>}
                </Fragment>
                : <Box w={1 / 5} m="0 auto">
                    <p>Codenames woooo</p>
                    <FormControl>
                        <FormLabel htmlFor="nickname">Nickname</FormLabel>
                        <Input mb={2} label="Nickname" id="nickname" placeholder="neeto" type="text" value={this.state.name} onChange={evt => this.updateName(evt)} />
                        <Button label="Join Game" variant="outline" onClick={this.addPlayer}>Join Game</Button>
                    </FormControl>


                </Box>}
            <p>Players online: {playerList}</p>
        </Box>
        )
    }

}

