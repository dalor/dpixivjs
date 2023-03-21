import React, { useEffect, useState } from "react";
import "./App.css";
import Router from "./pages/Router"
import { connect } from "react-redux";
import { userInfoFetch, userExtraFetch } from "./services/user"

export default connect(
  (data) => ({
    token: data.token
  }),
  (dispatch) => ({
    setUser: (user) => dispatch({
      type: "saveData",
      data: { user }
    })
  })
)(
  ({ token, setUser }) => {

    useEffect(
      () => {
        if (token)
          userExtraFetch(token).then(setUser).catch(() => setUser(null))
      }, [token]
    )

    return (
      <main>
        <Router />
      </main>
    );
  })
