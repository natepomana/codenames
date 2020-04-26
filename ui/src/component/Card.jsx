import React, { Fragment, Component } from "react";
import { Button, Box, Grid, Flex } from "@chakra-ui/core";


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.word,
            team: this.props.team,
            isBomb: this.props.isBomb
        }
    }

    cardClickedHandler = () => this.props.cardClicked(this.state.word, this.state.team);

    setColor = () => {
        if (!this.props.isSpyMaster) {
            return "white";
        }
        if (this.state.team === "red") {
            return "red.200";
        }
        if (this.state.team === "blue") {
            return "blue.200";
        }
        if (this.state.isBomb === true) {
            return "gray.300";
        }
    }

    render() {
        return (
            <Flex bg={this.setColor()} rounded="md" w="100%" h="120px" align="center" justify="center" borderWidth="1px" onClick={this.cardClickedHandler}>
                {this.state.word}
            </Flex>
        )
    }

}

export default Card;
