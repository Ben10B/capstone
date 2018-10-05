import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import App from "../App";
import NotFound from "../NotFound";
import AppliedRoute from "../AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Login} props={childProps}/>
    <AppliedRoute path="/dashboard" exact component={App} props={childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;