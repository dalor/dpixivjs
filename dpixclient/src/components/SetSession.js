import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { userInfoFetch, userExtraFetch } from "../services/user";
import Loading from "./Loading";

const SetSession = connect(null, (dispatch) => ({
  setData: (data) =>
    dispatch({
      type: "saveData",
      data,
    }),
}))(({ to, setData }) => {
  const [loaded, setLoaded] = useState(false);

  const { session } = useParams();

  const loadUser = () =>
    userExtraFetch(session).then((user) => {
      if (user) {
        setData({
          token: session,
          user,
        });
      }
      setLoaded(true);
    });

  useEffect(() => {
    loadUser();
  }, []);

  if (loaded) return <Redirect to={to || "/"} />;
  else return <Loading />;
});

export default SetSession;
