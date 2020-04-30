import React, { Fragment, Component } from "react";
import { Button, Box, Grid, Flex, Text } from "@chakra-ui/core";


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.word,
            team: this.props.team,
            isBomb: this.props.isBomb,
            tempSelected: this.props.isTempSelected,
            selectionConfirmed: this.props.isSelectionConfirmed
        }
    }

    cardClickedHandler = () => {
        if (!this.props.isSpyMaster) {
            this.props.cardClicked(this.state.word);
        }

    }

    setColor = () => {
        // if the card is already chosen for good set to team color
        // if the card is pre-selected, set to off-grey for team
        // if they're not a game master, make it light grey
        if (this.state.selectionConfirmed) {
            if (this.state.team === "red") {
                return "red.300";
            }
            if (this.state.team === "blue") {
                return "blue.400";
            }
        }
        if (this.props.isTempSelected) {
            return "gray.200";
        }
        return "gray.50";
    }

    setWordColor = () => {
        if (this.state.selectionConfirmed) {
            return "gray.100";
        }
        if (!this.props.isSpyMaster) {
            return "black"
        }
        if (this.state.team === "red") {
            return "red.300";
        }
        if (this.state.team === "blue") {
            return "blue.400";
        }
        if (this.state.isBomb === true) {
            return "gray.300";
        }
    }

    render() {
        return (
            <Flex bg={this.setColor()} rounded="md" w="100%" h="120px" align="center" justify="center" borderWidth="1px" onClick={this.cardClickedHandler.bind(this)}>
                <Text fontSize="xl" color={this.setWordColor()}>{this.state.word}</Text>
            </Flex>
        )
    }

}

export default Card;
