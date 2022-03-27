import React, { useState, useEffect } from "react";
import { ugoiraFetch } from "../../services/pic";
import { fixUgoira } from "../../urls";
import { connect } from "react-redux";


const Ugoira = connect((data) => ({ token: data.token }))(
  ({ illustId, onClick, onLoad, illustTitle, token, quality }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      ugoiraFetch(illustId, token).then(setData);
    }, [illustId]);

    return (
      data && <img
        src={fixUgoira(data[quality] || data.original, data.averageDelay)}
        onClick={onClick}
        alt={illustTitle || illustId}
        onLoad={onLoad}
      />
    );
  })

export default Ugoira;
