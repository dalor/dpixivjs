import React from "react";
import { connect } from "react-redux";
import Pic from "../components/Pic"
import { useParams } from "react-router-dom";
import SimilarPics from "../components/SimilarPics"


export default connect((data) => ({ user: data.user }))(({ user }) => {
  const { id } = useParams();
  return (
    <div className="page">
      <Pic id={id} />
      {user?.id && <SimilarPics id={id} />}
    </div>
  );
});
