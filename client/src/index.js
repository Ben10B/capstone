import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';
// import Routes from './Routes';
// const keys = require("./keys");
// const mongoose = require("mongoose");

ReactDOM.render(
    <Router>
        <div>
            <Route path="/login" exact component={Login} />
            <Route path="/" component={App} />
        </div>
    </Router>,
    document.getElementById("root")
  );
// ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

// const User = require("./user-model");
// mongoose.connect(keys.mongodb.dbURI, ()=>{
//     console.log("We are connected to mongo!");
// })