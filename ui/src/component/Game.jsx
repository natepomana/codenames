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
            spyMaster: null,
            gameOver: false
        }
    }

    componentDidMount = () => {
        this.state.socket.emit("getPlayerInfo", this.state.socket.id, (data) => {
            this.setState({ team: data.team, spyMaster: data.spyMaster, turn: data.team === "red" ? true : false });
        });

        this.state.socket.on("updateCardSelected", cards => {
            this.setState({ cards: cards.cards })
        });


        this.state.socket.on("updateTurnActions", data => {
            console.log(data);

            this.setState({
                cards: data.cards,
                turn: this.state.team === data.turn ? true : false,
                redCardsLeft: data.redTeamPoints,
                blueCardsLeft: data.blueTeamPoints,
                gameOver: data.gameOver
            })
        })

    }

    cardClicked = (card) => {
        if (this.state.turn && !this.state.spyMaster && !this.state.gameOver) {
            this.state.socket.emit("cardSelected", card);
        }
    }

    submitSelection = () => {
        if (this.state.turn && !this.state.spyMaster && !this.state.gameOver) {
            this.state.socket.emit("submitSelection");
        }
    }

    endTurn = () => {
        if (this.state.turn && !this.state.spyMaster && !this.state.gameOver) {
            this.state.socket.emit("endTurn");
        }
    }


    renderCards = () => {
        const cardsView = this.state.cards.map(card => {
            return <Card word={card.word} team={card.team} isSpyMaster={this.state.spyMaster} isBomb={card.isBomb} isTempSelected={card.selected} cardClicked={this.cardClicked} isSelectionConfirmed={card.found}></Card>
        });
        return cardsView;
    }

    renderEndGame = () => {
        if (this.state.gameOver) {
            if (this.state.turn) {
                return <Box>you won my dood</Box>
            }
            else {
                return <Box>You lost my dood</Box>
            }
        }
    }

    render() {
        const allCards = this.state.cards;
        return (<Box mt={50}>
            <Box>
                <Text fontSize="xl">Red Team: {this.state.redCardsLeft}   Blue Team: {this.state.blueCardsLeft}</Text>
            </Box>
            <Box> I am on the {this.state.team} team. Am I a spyMaster? {this.state.spyMaster ? "yes" : "no"}</Box>
            <Box>It is {this.state.turn ? "your" : "not your"} turn.</Box>
            {this.renderEndGame()}
            <Grid mb={5} templateColumns="repeat(5, 1fr)" gap={5}>
                {this.renderCards()}
            </Grid>
            <Button onClick={this.endTurn.bind(this)}>End Turn</Button> <Button onClick={this.submitSelection.bind(this)}>Shoot your shot!</Button>
        </Box >
        )
    }

}

