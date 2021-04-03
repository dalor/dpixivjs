import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pic from "./Pic";
import Discovery from "./Discovery";
import Following from "./Following";
import "./App.css";
import Main from "./Main";
import { discovery, following } from "./navs";

function App({}) {
  const [token, setToken] = useState(null);
  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const loadToken = () => {
    setToken(localStorage.getItem("token") || "");
  };
  if (!token && token != "") loadToken();
  console.log(token);
  return (
    <>
      <Router>
        <Switch>
          <Route path={discovery}>
            {token ? (
              <Discovery token={token} />
            ) : (
              <Main token={token} saveToken={saveToken} />
            )}
          </Route>
          <Route path={following}>
            {token ? (
              <Following token={token} />
            ) : (
              <Main token={token} saveToken={saveToken} />
            )}
          </Route>
          <Route path="/:id">
            <Pic token={token} />
          </Route>
          <Route path="/">
            <Main token={token} saveToken={saveToken} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
