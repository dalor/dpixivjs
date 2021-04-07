import React, { useState } from "react";
import { shortGroupInfoFetch, recomendationFetch } from "../../services/pic";
import PicList from "../PicList";

export default ({ ids, preloadNext, token }) => {
  
  const partCount = 20;
  const recCount = 10;

  const [pics, setPics] = useState([]);

  const [tempPics, setTempPics] = useState([]);

  const [tempIds, setTempIds] = useState([]);

  const dropNLoad = (ids_, count) =>
    new Promise((resolve, reject) => {
      if (ids_ && ids_.length > 0)
        shortGroupInfoFetch(ids_.splice(0, count), token)
          .then(resolve)
    });

  const preloadToTempPics = (ids_) => {
    dropNLoad(ids_, partCount).then((pics_) =>
      setTempPics(tempPics.concat(pics_))
    );
  };

  const preload = () => {
    if (ids.length < partCount && preloadNext) {
      if (tempIds.length < partCount)
        preloadNext((ids_) => {
          const newTempIds = ids.splice(0).concat(tempIds).concat(ids_);
          setTempIds(newTempIds);
          preloadToTempPics(newTempIds);
        });
      else preloadToTempPics(tempIds);
    } else preloadToTempPics(ids);
  };

  if (!pics.length > 0) {
    dropNLoad(ids, partCount)
      .then((data) => {
        preload();
        setPics(data);
      })
  }

  const loadReccomended = (illustId) => recomendationFetch(illustId, token)

  const insertAfter = (i, pics_) => {
    setPics(
      pics
        .slice(0, i + 1)
        .concat(pics_)
        .concat(pics.slice(i + 1))
    );
  };

  const loadMorePics = (picsIds, i) => {
    dropNLoad(picsIds, recCount).then((data) => insertAfter(i, data));
  };

  const loadMore_ = (pic, i) => {
    if (!pic.similarIds)
      loadReccomended(pic.illustId).then((recIds) => {
        pic.similarIds = recIds.filter(
          (id_) => pics.findIndex((pic_) => id_ == pic_.illustId) < 0
        );
        loadMorePics(pic.similarIds, i);
      });
    else loadMorePics(pic.similarIds, i);
  };

  return (
    <div className="pic-loader">
      <PicList pics={pics} loadMore={loadMore_} />
      {((ids && ids.length > 0) ||
        tempIds.length > 0 ||
        tempPics.length > 0) && (
          <div
            className="show-more"
            onClick={() => {
              preload();
              setPics(pics.concat(tempPics.splice(0, partCount)));
            }}
          >
            Show more
          </div>
        )}
    </div>
  )

};
