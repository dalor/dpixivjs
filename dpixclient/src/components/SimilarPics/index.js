import React, { useState, useEffect } from "react";
import { similarFetch } from "../../services/pic";
import PicListLoader from "../PicListLoader";
import { connect } from "react-redux";

const SimilarPics = connect((data) => ({ token: data.token }))(
  ({ id, token, onBottomDecorator }) => {
    const [similarIds, setSimilarIds] = useState(undefined);

    const [showSimilar, setShowSimilar] = useState(true); //false

    useEffect(() => {
      similarFetch(id, token).then((ids) => {
        setSimilarIds(ids);
      });
      setSimilarIds([]);
    }, [id]);

    return similarIds ? (
      <div className="similar-pics">
        {showSimilar && (
          <PicListLoader
            ids={similarIds}
            token={token}
            onBottomDecorator={onBottomDecorator}
          />
        )}
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
    ) : null;
  }
);

export default SimilarPics;
