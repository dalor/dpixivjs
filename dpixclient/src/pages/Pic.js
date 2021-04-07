import React from "react";
import { connect } from "react-redux";
import Pic from "../components/Pic"
import { useParams } from "react-router-dom";
import SimilarPics from "../components/SimilarPics"


export default connect((data) => ({ token: data.token }))(({ token }) => {
  const { id } = useParams();
  return (
    <div className="page">
      <Pic id={id} />
      {token && <SimilarPics id={id} token={token} />}
    </div>
  );
});
