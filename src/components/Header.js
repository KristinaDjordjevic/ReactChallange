import React, { Component } from 'react';

class Header extends Component {

    render(){
        return(
            <div className="header">
                <div className="logo">
                    React challange
                </div>
                <ul>
                    <a href="/configs"><li>Configurations</li></a>
                </ul>
            </div>
        );
    }

}


export default Header;