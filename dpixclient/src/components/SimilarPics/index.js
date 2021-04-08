import React, { useState } from "react";
import { similarFetch } from "../../services/pic";
import PicListLoader from "../PicListLoader"
import { connect } from "react-redux";

export default connect((data) => ({ token: data.token }))(({ id, token }) => {

  const [similarIds, setSimilarIds] = useState(undefined);

  const [showSimilar, setShowSimilar] = useState(false); //false

  if (!similarIds)
    similarFetch(id, token).then(setSimilarIds)

  return (
    similarIds ?
      <div className="similar-pics">
        {showSimilar &&
          <PicListLoader
            ids={similarIds}
            token={token}
          />}
        {!showSimilar && (
          <div
            className="blue-button"
            onClick={() => {
              setShowSimilar(true);
            }}
          >
            Show similar
          </div>
        )}
      </div>
      :
      null
  )
});
