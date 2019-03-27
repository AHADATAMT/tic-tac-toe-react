import React from 'react';
import './index.css';
import { Container, Row, Col } from 'reactstrap';
import LoginFacebook from './LoginFacebook';
import Board from './Board';
import HighScores from './HighScores';
import ShareScore from './ShareScore';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            history: Array(Array(9).fill(null)),
            isStart: false,
            score: 0,
            winner: null,
            startAt: 0,
        };
    }

    handleProcess = (squares, history) => {
        if (!this.state.isStart) {
            this.setState({
                isStart: true,
                startAt: Date.now()
            })
            
        }
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            history: history,
            winner: this.calculateWinner(squares)
        },()=>{
            if(this.state.winner !==null)
            {this.setState({
                score: Date.now()-this.state.startAt
            })}
        });
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
            if ((squares[line[0]] !== null) && (squares[line[0]] === squares[line[1]]) && (squares[line[1]] === squares[line[2]])) {
                return squares[line[0]];
            }
        }
        return false
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <Container className="game">
                <Row>
                    <h1>Hello {this.props.username}</h1>
                    <ShareScore username={this.props.username} score={this.state.score} winner={this.state.winner} />
                </Row>
                <Row className="game-board">
                    <Board {...this.state} calculateWinner={this.calculateWinner} handleProcess={this.handleProcess} />
                </Row>
                <Row className="game-info">
                    <div>{status}</div>
                    <ol>{this.state.history.map((step, index) => (<li key={index} onClick={() => this.setState({
                        squares: step
                    })}> {index == 0 ? 'Go to Game Start' : 'Go to move #' + (index)} </li>))}</ol>
                </Row>
                <HighScores />
            </Container>
        );
    }
}



