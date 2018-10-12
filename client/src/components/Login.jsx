import React, { Component } from 'react';
import '../css/App.css';
import '../BENstrap-in/css/my.css';
import '../css/login.css';
import Register from './Register.jsx';
import Logon from './Logon.jsx';

class Login extends Component {
    render() {
        return (
            <div className={`Login`}>
                <div className="log-container">
                    <Logon/>
                    <Register/>
                </div>
            </div>
        );
    }
}
  
export default Login;