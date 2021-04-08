import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Main"
import Pic from "./Pic"
import Discovery from "./Discovery";
import Following from "./Following";

import SetSession from "../components/SetSession"

import { discovery, following } from "../navs";
import { connect } from "react-redux";

export default connect((data) => ({ user: data.user }))(({ user }) => {

    return (
        <Router>
            <Switch>
                {user?.id && <Route path={discovery}>
                    <Discovery />
                </Route>}
                {user?.id && <Route path={following}>
                    <Following />
                </Route>}
                <Route path="/session/:session">
                    <SetSession />
                </Route>
                <Route path="/:id">
                    <Pic />
                </Route>
                <Route path="/">
                    <Main />
                </Route>
            </Switch>
        </Router>
    )
})