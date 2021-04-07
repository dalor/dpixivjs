import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";

export default connect(null, (dispatch) =>
({
    setSession: (session) => dispatch({
        type: "saveData",
        data: { token: session }
    })
})
)(({ to, setSession }) => {
    const { session } = useParams();
    setSession(session)
    return <Redirect to={to || "/"} />
})