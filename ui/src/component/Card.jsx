import React, { Fragment, Component } from "react";
import { Button, Box, Grid, Flex } from "@chakra-ui/core";


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.word,
            team: this.props.team
        }
    }

    cardClickedHandler = () => {
        this.props.cardClicked(this.state.word, this.state.team)
    }


    render() {
        return (
            <Flex rounded="md" w="100%" h="120px" align="center" justify="center" borderWidth="1px" onClick={this.cardClickedHandler}>
                {this.state.word}
            </Flex>
        )
    }

}

export default Card;
