import React, { Component } from "react";
import { Button, Box, Grid, Text } from "@chakra-ui/core";
import Card from "./Card";


export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: props.socket,
            team: null,
            turn: false,
            cards: props.cards,
            redCardsLeft: 9,
            blueCardsLeft: 8,
            spyMaster: null
        }
    }

    componentDidMount = () => {
        this.state.socket.emit("getPlayerInfo", this.state.socket.id, (data) => {
            this.setState({ team: data.team, spyMaster: data.spyMaster, turn: data.team === "red" ? true : false });
        });

        this.state.socket.on("updateCardSelected", cards => {
            console.log(cards.cards);
            this.setState({ cards: cards.cards })
        });
    }

    cardClicked = (card) => {
        if (this.state.turn && !this.state.spyMaster) {
            this.state.socket.emit("cardSelected", card);
        }
    }

    renderCards = () => {
        const cardsView = this.state.cards.map(card => {
            return <Card word={card.word} team={card.team} isSpyMaster={this.state.spyMaster} isBomb={card.isBomb} isTempSelected={card.selected} cardClicked={this.cardClicked} isSelectionConfirmed={false}></Card>
        });
        return cardsView;
    }

    render() {
        const allCards = this.state.cards;
        return (<Box mt={350}>
            <Box>
                <Text fontSize="xl">Red Team: {this.state.redCardsLeft}   Blue Team: {this.state.blueCardsLeft}</Text>
            </Box>
            <Box> I am on the {this.state.team} team. Am I a spyMaster? {this.state.spyMaster ? "yes" : "no"}</Box>

            <Grid mb={5} templateColumns="repeat(5, 1fr)" gap={5}>
                {this.renderCards()}
            </Grid>
            <Button>End Turn</Button> <Button>Shoot your shot!</Button>
        </Box >
        )
    }

}

