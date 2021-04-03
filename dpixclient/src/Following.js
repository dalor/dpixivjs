import React, { useState } from "react";
import { following } from "./urls";
import PicListLoader from "./PicListLoader";

export default ({ token }) => {
  const [followingIds, setFollowingIds] = useState(undefined);

  const [page, setPage] = useState(1);

  const [started, setStarted] = useState(false);

  const loadPage = (callback) =>
    fetch(following(page), {
      headers: { Token: token },
    }).then((res) => {
      if (res.ok)
        res.json().then((json) => {
          if (json.ok) {
            setPage(page + 1);
            callback(json.data.ids);
          }
        });
    });

  if (!followingIds && !started) {
    setStarted(true);
    loadPage(setFollowingIds);
  }

  return (
    <div className="following">
      <h2 className="center">Following</h2>
      <PicListLoader ids={followingIds} preloadNext={loadPage} token={token} />
    </div>
  );
};
