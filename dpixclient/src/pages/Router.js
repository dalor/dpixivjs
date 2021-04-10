import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Main"
import Settings from "./Settings"
import Pic from "./Pic"
import Discovery from "./Discovery";
import Following from "./Following";

import SetSession from "../components/SetSession"

import MenuButton from "../components/MenuButton"

import { discovery, following, settings } from "../navs";
import { connect } from "react-redux";

export default connect((data) => ({ user: data.user }))(({ user }) => {

    const active = user?.id

    return (
        <Router>
            <Switch>
                {active && <Route path={discovery}>
                    <MenuButton />
                    <Discovery />
                </Route>}
                {active && <Route path={following}>
                    <MenuButton />
                    <Following />
                </Route>}
                {active && <Route path={settings}>
                    <MenuButton />
                    <Settings />
                </Route>}
                <Route path="/session/:session">
                    <SetSession />
                </Route>
                <Route path="/:id">
                    {active && <MenuButton />}
                    <Pic />
                </Route>
                <Route path="/">
                    <Main />
                </Route>
            </Switch>
        </Router>
    )
})