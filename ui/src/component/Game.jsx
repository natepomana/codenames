import React, { Fragment, Component } from "react";
import { Button, Box, Grid } from "@chakra-ui/core";


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



    render() {

        return (<Fragment>
            <Box> Top Data </Box>
            <Grid mb={5} templateColumns="repeat(5, 1fr)" gap={5}>
                {this.state.cards.map(word => {
                    return <Box w="100%" h="50px" textAlign="center" bg="blue.500">{word}</Box>
                })}
            </Grid>
            <Button>End Turn</Button> <Button>Shoot your shot!</Button>
        </Fragment>
        )
    }

}

