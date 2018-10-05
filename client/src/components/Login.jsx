import React, { Component } from 'react';
import '../css/App.css';
import '../BENstrap-in/css/my.css';
import '../css/login.css';
// import Routes from "./Routes.jsx";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_name:'',
            last_name:'',
            password:''
        }
    }
    render() {
        return (
            <div className="Register row">
                <div id="registerImg"></div>
                <form>
                    <input type="text" placeholder="EMAIL"/>
                    <input type="text" placeholder="USERNAME"/>
                    <input type="text" placeholder="PASSWORD"/>
                    <input type="submit"></input>
                </form>
                <h1>REGISTER</h1>
            </div>
        );
    }
}

class Logon extends Component {
    constructor(props){
        super(props);
        this.state = {
            user_name:'',
            password:''
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        this.props.history.push("/app");
    }
    render() {
        return (
            <div className="Logon row">
                <h1>LOGIN</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="USERNAME"/>
                        <input type="text" placeholder="PASSWORD"/>
                        <input type="submit" value="Login"/>
                    </form>
                    {/* <p><a>Username?</a><i className="fas fa-arrows-alt-h"></i><a>Password?</a></p> */}
                </div>
                <div id="logonImg"></div>
            </div>
        );
    }
}

class Login extends Component {
    state = {
        
    }
    
    render() {
        return (
            <div className={`Login`}>
                <div className="log-container">
                    <Logon/>
                    <Link to="./">Home Page</Link>
                    <Register/>
                </div>
            </div>
        );
    }
}
  
export default Login;