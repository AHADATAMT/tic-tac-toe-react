import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginFacebook from './LoginFacebook';
import Game from './Game';

export default class AppGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null
    }
  }
  handleLogged = userInfo => {
    this.setState({
      username: userInfo.name
    })
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" render={() => {
            if (this.state.username)
              return <Game username={this.state.username}/>
            else
              return <LoginFacebook handleLogged={this.handleLogged} />
          }} exact />
          <Route path="/game" component={Game} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<AppGame />, document.getElementById('root')
);