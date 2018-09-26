import React from "react";
import { Route, Switch } from "react-router-dom";
import Base from "./containers/Base";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login.jsx";
import AppliedRoute from "./components/AppliedRoute";

export default ({childProps}) =>
  <Switch>
    <AppliedRoute path="/" exact component={Base} props={childProps}/>
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;