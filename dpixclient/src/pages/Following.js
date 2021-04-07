import React, { useState } from "react";
import { followingFetch } from "../services/pic";
import PicListLoader from "../components/PicListLoader";
import { connect } from "react-redux";
import Loading from "../components/Loading"

export default connect((data) => ({ token: data.token }))(({ token }) => {

  const [followingIds, setFollowingIds] = useState(undefined);

  const [page, setPage] = useState(1);

  const [started, setStarted] = useState(false);

  const loadPage = (callback) => followingFetch(page, token)
    .then((ids) => {
      setPage(page + 1);
      callback(ids)
    })

  if (!followingIds && !started) {
    setStarted(true);
    loadPage(setFollowingIds);
  }

  return (
    <div className="following page">
      <h2 className="center">Following</h2>
      {followingIds ? <PicListLoader ids={followingIds} preloadNext={loadPage} token={token} /> : <Loading />}
    </div>
  );
});
