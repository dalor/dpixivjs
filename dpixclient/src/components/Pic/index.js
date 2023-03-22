import React, { useState, useEffect } from "react";
import { infoFetch } from "../../services/pic";
import Loading from "../Loading";
import PicContent from "../PicContent";
import NotFound from "../NotFound";
import { connect } from "react-redux";
import "./Pic.css";

const Pic = connect((data) => ({ token: data.token }))(
  ({ id, token }) => {
    const [pic, setPic] = useState(undefined);

    useEffect(() => {
      setPic(undefined);
      infoFetch(id, token).then((pic_) => {
        setPic(pic_);
      });
    }, [id]);

    return (
      <div className="pic" style={!pic ? { height: "100%" } : {}}>
        {pic ? (
          <PicContent pic={pic} />
        ) : pic === undefined ? (
          <Loading />
        ) : (
          <NotFound />
        )}
      </div>
    );
  });

export default Pic;
