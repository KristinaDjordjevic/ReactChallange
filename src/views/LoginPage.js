import React, { Component } from 'react';
import Login from '../components/Login';
import RegisterUser from '../components/RegisterUser';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin: true,
        }
    }

    userLogin=()=>{
        this.setState({isLogin: true})
    }

    userRegister=()=>{
        this.setState({isLogin: false})
    }
    
    render(){
        return(
            <div className="login-container">
                <h1 className={this.state.isLogin ? "login-title active" : "login-title"} onClick={this.userLogin}>Login</h1>
                <span>/</span>                     
                <h1 className={!this.state.isLogin ? "register-title active" : "register-title"} onClick={this.userRegister}>Sign Up</h1>

                {this.state.isLogin ? 
                    <Login />
                    :
                    <RegisterUser />
                }
            </div>
        );
    }

}

export default LoginPage;