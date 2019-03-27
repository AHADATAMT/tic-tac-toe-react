import React, { Component } from 'react'


const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;

export default class HighScores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreBoard: []
        }
    }

    gethighScores = async () => {
        let response = await fetch(url);
        let body = response.json();
        body.then(data => this.setState({ scoreBoard: data.items }, () => console.log(this.state.scoreBoard)))
    }

    componentDidMount() {
        this.gethighScores();
    }
    deleteThisScore = async id => {
        const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev/${id}`;
        const response = await fetch(url,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
        console.log(response);
    }
    render() {
        return (
            <div>
                {this.state.scoreBoard.map(record => <p><b>{record.player}</b>: {record.score} <a onClick={() => this.deleteThisScore(record._id)} href="#"><b>X</b></a></p>)}
            </div>
        )
    }
}