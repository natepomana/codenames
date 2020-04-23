import React, { Fragment, Component } from "react";
import { Button, Box, Grid } from "@chakra-ui/core";
import Card from "./Card";


export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: props.socket,
            team: "Red",
            turn: true,
            cards: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y']
        }
    }

    componentDidMount = () => {
        this.state.socket.emit("")
    }



    cardClicked = (word, team) => {
        console.log(word);
    }


    render() {

        return (<Fragment>
            <Box> Top Data </Box>
            <Grid mb={5} templateColumns="repeat(5, 1fr)" gap={5}>
                {this.props.cards.map(word => {
                    return <Card cardClicked={this.cardClicked} word={word.name} team={word.team}></Card>
                })}
            </Grid>
            <Button>End Turn</Button> <Button>Shoot your shot!</Button>
        </Fragment>
        )
    }

}

