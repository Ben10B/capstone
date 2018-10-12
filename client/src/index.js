import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import Login from './components/Login';
import CreateProfile from './components/create-profile/CreateProfile.jsx';
import registerServiceWorker from './registerServiceWorker';
import PrivateRoute from './components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
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
        store.dispatch(clearCurrentProfile());
        //Redirect to Login
        window.location.href = '/';
    }
}

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div>
                <Route exact path="/" component={Login} />
                <Switch>
                    <PrivateRoute exact path="/home" component={App} />
                </Switch>
                <Switch>
                    <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                </Switch>
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById("root")
);
registerServiceWorker();