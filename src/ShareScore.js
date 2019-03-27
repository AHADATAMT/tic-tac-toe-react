import React, { Component } from 'react'

// We actually don't care about the response ... do we?
export default class ShareScore extends Component {

  shareScore = async () => {
    let data = new URLSearchParams();
    data.append('player', this.props.username);
    // @ts-ignore
    data.append('score', this.props.score / 1000);
    const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      }
    );
    console.log(response);
  }
  render() {
    if (this.props.winner)
      return (
        <div>
          <p>{this.props.score / 1000}s</p>
          <button onClick={this.shareScore}>Share your score!</button>
        </div>
      )
    else
      return <></>
  }
}
