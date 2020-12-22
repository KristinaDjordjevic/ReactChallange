import React, { Component } from 'react';
import Service from './Service';
import { Auth } from './Auth';
import AlertMessage from '../components/AlertMessage';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            emailError: 'none',
            emailValidationError: 'none',
            password: '',
            passwordError: 'none',
            resMessage: '',
            resCode: ''
        }

    }

    handleInput=(event)=>{
        this.setState({[event.target.id]: event.target.value});
    }

    login=()=>{
        let checked = true;

        // Email format validation
        if(this.state.email){
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regEmail.test(this.state.email)){
                this.setState({emailValidationError: 'block'});
                checked = false;
            }else{
                this.setState({emailValidationError: 'none'});
            }
        }
        
        if(!this.state.email){
            this.setState({emailError: 'block'});
            checked = false;
        }else{
            this.setState({emailError: 'none'});
        }

        if(!this.state.password){
            this.setState({passwordError: 'block'});
            checked = false;
        }else{
            this.setState({passwordError: 'none'});
        }

        if(!checked){
            return;
        }

        // Login user
        Service.post('/login',{
            email: this.state.email,
            password: this.state.password
        },(res)=>{
            if(res.token){
                    Auth.token = res.token;
                    localStorage.setItem('token-rc', res.token);
                    window.location.href = '/configs';
            }else{
                this.setState({
                    resMessage: res.Message,
                    resCode: res.Code
                });
            }
        });
    }
    
    render(){
        return(
            <div>
                <div className="login-box">
                    <label>Email</label>
                    <input type="text" id='email' value={this.state.email} onChange={this.handleInput}/>
                    <span className="error" style={{display: this.state.emailError}}>* enter your email</span>
                    <span className="error" style={{display: this.state.emailValidationError}}>* enter valid email</span>

                    <label>Password</label>
                    <input type="password" id='password' value={this.state.password} onChange={this.handleInput}/>
                    <span className="error" style={{display: this.state.passwordError}}>* enter your password</span>

                    <button onClick={this.login}>Login</button>
                </div>

                {this.state.resMessage &&
                    <AlertMessage message={this.state.resMessage} code={this.state.resCode} page={"login"}/>
                }
            </div>
        );
    }

}

export default Login;