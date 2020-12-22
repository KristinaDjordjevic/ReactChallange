import React, { Component } from 'react';
import Service from '../components/Service';
import AlertMessage from '../components/AlertMessage';

class RegisterUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            emailError: 'none',
            emailValidationError: 'none',
            password: '',
            passwordError: 'none',
            password2: '',
            password2Error: 'none', 
            passwordRepeatError: 'none',
            resMessage: '',
            resCode: ''
        }

    }

    handleInput=(event)=>{
        this.setState({[event.target.id]: event.target.value, resMessage: ''});
    }

    register=()=>{
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

        if(!this.state.password2){
            this.setState({password2Error: 'block'});
            checked = false;
        }else{
            this.setState({password2Error: 'none'});
        }

        if(this.state.password2 && this.state.password && this.state.password !== this.state.password2){
            this.setState({passwordRepeatError: 'block'});
            checked = false;
        }else{
            this.setState({passwordRepeatError: 'none'});
        }

        if(!checked){
            return;
        }

        // Register user
        Service.post('/register',{
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        },(res)=>{
            this.setState({
                resMessage: res.Message,
                resCode: res.Code
            });
        });
    }

    render(){
        return(
            <div>
                <div className="login-box">
                    <label>Email</label>
                    <input type="text" id="email" value={this.state.email} onChange={this.handleInput}/>
                    <span className="error" style={{display: this.state.emailError}}>* enter your email</span>
                    <span className="error" style={{display: this.state.emailValidationError}}>* enter valid email</span>

                    <label>Password</label>
                    <input type="password" id="password" value={this.state.password} onChange={this.handleInput}/>
                    <span className="error" style={{display: this.state.passwordError}}>* enter your password</span>

                    <label>Repeat password</label>
                    <input type="password" id="password2" value={this.state.password2} onChange={this.handleInput}/>
                    <span className="error" style={{display: this.state.password2Error}}>* repeat your password</span>
                    <span className="error" style={{display: this.state.passwordRepeatError}}>* password is not same</span>

                    <button onClick={this.register}>Sign up</button>
                </div>

                {this.state.resMessage &&
                    <AlertMessage message={this.state.resMessage} code={this.state.resCode} page={"register"}/>
                }
            </div>
        );
    }

}

export default RegisterUser;