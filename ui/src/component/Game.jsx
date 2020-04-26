import React, { Fragment, Component } from "react";
import { Button, Box, Grid } from "@chakra-ui/core";
import Card from "./Card";


export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: props.socket,
            team: null,
            turn: true,
            spyMaster: null,
            cards: props.cards
        }
    }

    componentDidMount = () => {
        this.state.socket.emit("getPlayerInfo", this.state.socket.id, (data) => {
            this.setState({ team: data.team, spyMaster: data.spyMaster });
        });
    }



    cardClicked = (word, team) => {
        console.log(word);
    }

    renderCards = () => {
        const cardsView = this.state.cards.map(card => {
            return <Card word={card.word} team={card.team}></Card>
        });
        return cardsView;
    }

    render() {
        const allCards = this.state.cards;
        console.log(allCards);
        return (<Fragment>
            <Box> I am on the {this.state.team} team. Am I a spyMaster? {this.state.spyMaster ? "yes" : "no"}</Box>

            <Grid mb={5} templateColumns="repeat(5, 1fr)" gap={5}>
                {this.renderCards()}
            </Grid>
            <Button>End Turn</Button> <Button>Shoot your shot!</Button>
        </Fragment>
        )
    }

}

