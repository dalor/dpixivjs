import React, { useEffect, useState } from "react";
import "./App.css";
import Router from "./pages/Router"
import { connect } from "react-redux";
import { userInfoFetch, userExtraFetch } from "./services/user"

export default connect(
  (data) => ({
    token: data.token,
    user: data.user
  }),
  (dispatch) => ({
    setUser: (user) => dispatch({
      type: "saveData",
      data: { user }
    })
  })
)(
  ({ token, user, setUser }) => {

    const [newUser, setNewUser] = useState(null)

    const loadUser = () =>
      Promise.all([userInfoFetch(token), userExtraFetch(token)])
        .then(([first, second]) => setNewUser(Object.assign({}, first || {}, second || {})))

    useEffect(
      () => {
        if (token)
          loadUser()
      }, [token]
    )

    if (newUser) {
      if (user.id === newUser.id) {
        setTimeout(() => setUser(newUser)) // setTimeout go brrrrr
      } else {
        loadUser()
      }
    }

    return (
      <main>
        <Router />
      </main>
    );
  })
