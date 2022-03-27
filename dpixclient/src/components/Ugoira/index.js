import React, { useState, useEffect } from "react";
import { ugoiraFetch } from "../../services/pic";
import Loading from "../Loading";
import { fixUgoira } from "../../urls";
import { connect } from "react-redux";


const Ugoira = connect((data) => ({ token: data.token }))(
  ({ illustId, onClick, onLoad, illustTitle, token }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      ugoiraFetch(illustId, token).then(setData);
    }, [illustId]);

    data &&
      console.log(fixUgoira(data.original, data.averageDelay))

    return (
      data && <img
        src={fixUgoira(data.original, data.averageDelay)}
        onClick={onClick}
        alt={illustTitle || illustId}
        onLoad={onLoad}
      />
    );
  })

export default Ugoira;
