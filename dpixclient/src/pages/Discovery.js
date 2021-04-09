import React, { useState } from "react";
import { discoveryFetch } from "../services/pic";
import PicListLoader from "../components/PicListLoader";
import { connect } from "react-redux";
import Loading from "../components/Loading"
import Page from "../components/Page"

export default connect((data) => ({ token: data.token }))(({ token }) => {
  const [discoveryIds, setDiscoveryIds] = useState(undefined);

  if (!discoveryIds)
    discoveryFetch(token).then(setDiscoveryIds)

  return (
    <Page className="discovery">
      <h2 className="center">Discovery</h2>
      {discoveryIds ? <PicListLoader ids={discoveryIds} token={token} /> : <Loading />}
    </Page>
  );
});
