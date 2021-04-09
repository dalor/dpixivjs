import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Pic from "../components/Pic"
import { useParams } from "react-router-dom";
import SimilarPics from "../components/SimilarPics"
import Page from "../components/Page"
import { runnerAndDecorator } from "../tools"

export default connect((data) => ({ user: data.user }))(({ user }) => {

  const { id } = useParams();

  const [oldId, setOldId] = useState(id);

  useEffect(() => {
    setOldId(id)
  }, [id])

  const rad = runnerAndDecorator();

  return (
    <Page onBottom={rad.runner}>
      <Pic id={oldId} />
      {user?.id && <SimilarPics id={oldId} onBottomDecorator={rad.decorator} />}
    </Page>
  );
});
