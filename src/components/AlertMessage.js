import React, { Component } from 'react';

class AlertMessage extends Component {

    render(){
        return(
            <div id={this.props.page === 'login' ? "alert-message-login" : "alert-message-register"} className="alert-message-container">
                <p>
                    {this.props.code && 
                        <b>{this.props.code}:</b>
                    }  {this.props.message}
                </p>
            </div>
        )
    }

}

export default AlertMessage;