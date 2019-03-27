import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';

export default class Board extends Component {


    handleClick(i) {
        if (this.props.squares[i] != null || this.props.calculateWinner(this.props.squares))
            return

        const squares = this.props.squares.slice();
        const history = this.props.history.slice();

        squares[i] = this.props.xIsNext ? "X" : "O";

        history.push(squares);
        this.props.handleProcess(squares, history)
    }

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        return (
            <Container>
                <Row>
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </Row>
            </Container>
        );
    }
}

function Square({ onClick, value }) {
    return (
        <button className="square" onClick={() => onClick()}>
            {value}
        </button>
    );
}
