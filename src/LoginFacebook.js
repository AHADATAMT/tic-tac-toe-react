import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

export default class LoginFacebook extends Component {

    responseFacebook = (response) => {
        console.log(response);
        this.props.handleLogged(response);
    }
    render() {
        return (
            <div>
                <FacebookLogin
                    appId="279314389649072"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={this.responseFacebook} />
            </div>
        )
    }
}
