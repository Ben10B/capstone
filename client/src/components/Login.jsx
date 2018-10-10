import React, { Component } from 'react';
import '../css/App.css';
import '../BENstrap-in/css/my.css';
import '../css/login.css';
import { Link } from "react-router-dom";
import Register from './Register.jsx';
import Logon from './Logon.jsx';

class Login extends Component {
    state = {
        
    }
    
    render() {
        return (
            <div className={`Login`}>
                <div className="log-container">
                    <Logon/>
                    <Link to="/home">Home Page</Link>
                    <Register/>
                </div>
            </div>
        );
    }
}
  
export default Login;