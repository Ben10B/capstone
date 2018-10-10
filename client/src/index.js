import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
//Check for token
if(localStorage.jwtToken) {
    //Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //Set user and is authenticated
    store.dispatch(setCurrentUser(decoded));
    //Check for expired token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        //Logout user
        store.dispatch(logoutUser());
        //Clear current Profile
        //Redirect to Login
        window.location.href = '/';
    }
}

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div>
                <Route path="/" exact component={Login} />
                <Route path="/home" component={App} />
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById("root")
  );
// ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();