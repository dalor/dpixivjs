import React, { useState } from "react";
import { similarFetch } from "../../services/pic";
import PicListLoader from "../PicListLoader"

export default ({ id, token }) => {

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
            className="show-more"
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

};
