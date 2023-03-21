import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Main";
import Settings from "./Settings";
import Pic from "./Pic";
import Discovery from "./Discovery";
import Following from "./Following";
import Help from "./Help";

import SetSession from "../components/SetSession";

import MenuButton from "../components/MenuButton";

import { discovery, following, settings } from "../navs";
import { connect } from "react-redux";

const RouterPage = connect((data) => ({ user: data.user }))(({ user }) => {
  return (
    <Router>
      <Switch>
        {user && (
          <Route path={discovery}>
            <MenuButton />
            <Discovery />
          </Route>
        )}
        {user && (
          <Route path={following}>
            <MenuButton />
            <Following />
          </Route>
        )}
        {user && (
          <Route path={settings}>
            <MenuButton />
            <Settings />
          </Route>
        )}
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/session/:session">
          <SetSession />
        </Route>
        <Route path="/:id">
          {user && <MenuButton />}
          <Pic />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
});

export default RouterPage;
