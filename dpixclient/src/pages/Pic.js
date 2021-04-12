import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Pic from "../components/Pic"
import { useParams } from "react-router-dom";
import SimilarPics from "../components/SimilarPics"
import Page from "../components/Page"
import { runnerAndDecorator } from "../tools"
import Loading from "../components/Loading"

export default connect((data) => ({ user: data.user }))(({ user }) => {

  const { id } = useParams();

  const [oldId, setOldId] = useState(id);

  useEffect(() => {
    setOldId(id)
  }, [id])

  if (id !== oldId) {
    setOldId(id)
    window.page.goTop()
  }

  const rad = runnerAndDecorator();

  return (
    <Page onBottom={rad.runner}>
      {id === oldId ? <>
        <Pic id={oldId} />
        {user?.id && <SimilarPics id={oldId} onBottomDecorator={rad.decorator} />}
      </> :
        <Loading />
      }
    </Page>
  );
});
