import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Container, Row, Col } from 'reactstrap';

function Square({ onClick, value }) {
    return (
        <button className="square" onClick={() => onClick()}>
            {value}
        </button>
    );
}

class Board extends React.Component {

    handleClick(i) {
        if (this.props.squares[i] != null || this.props.calculateWinner(this.props.squares))
            return

        const squares = this.props.squares.slice();
        const history = this.props.history.slice();

        squares[i] = this.props.xIsNext ? 'X' : 'O';

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
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                        {this.renderSquare(3)}
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            history: Array(Array(9).fill(null))
        };
    }

    handleProcess = (squares, history) => {
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            history: history
        }, () => console.log(this.state.history));
    }

    calculateWinner = squares => {
        let lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < 8; i++) {
            let line = lines[i];
            if (squares[line[0]] !== null && squares[line[0]] === squares[line[1]] && squares[line[1]] === squares[line[2]])
                return squares[line[0]];
        }
        return false
    }

    render() {
        console.log(this.state.squares);
        const winner = this.calculateWinner(this.state.squares);
        console.log(winner);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board {...this.state} calculateWinner={this.calculateWinner} handleProcess={this.handleProcess} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.state.history.map((step, index) => (<li key={index} onClick={() => this.setState({
                        squares: step
                    })}> {index == 0 ? 'Go to Game Start' : 'Go to move #' + (index)} </li>))}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
