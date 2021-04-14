import React, { useState, useRef } from "react";
import { fix } from "../../urls";
import PicContent from "../PicContent";
import "./PicList.css";
import { connect } from "react-redux";
import { defaultSettings } from "../../config";

const SmallPic = ({ pic, loadMore, quality }) => {
  const [fullPic, setFullPic] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const ref = useRef(null);

  return (
    <div
      className={
        "small-pic" + (loaded ? " loaded" : "") + (fullPic ? " only-one" : "")
      }
      ref={ref}
    >
      {fullPic ? (
        <PicContent
          pic={pic}
          onClick={() => {
            setFullPic(false);
            ref.current.scrollIntoView();
          }}
        />
      ) : (
        <a
          href={`/${pic.illustId}`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {pic.pageCount > 1 && pic.urls && (
            <div className="small-page-count">{pic.pageCount}</div>
          )}
          <img
            src={fix(pic.urls[quality])}
            onClick={() => setFullPic(true)}
            onLoad={() => setLoaded(true)}
            alt={pic.illustTitle}
          />
          {/* <div
            className="more-button"
            onClick={e => {
              e.preventDefault();
              loadMore(pic, i);
            }}
          /> */}
        </a>
      )}
    </div>
  );
};

const PicList = connect((data) => ({
  quality: Object.assign(defaultSettings, data.settings || {})
    .picPreviewQuality,
}))(({ pics, loadMore, quality }) => (
  <div className="pic-list">
    {pics.map((pic) => (
      <SmallPic pic={pic} quality={quality} loadMore={loadMore} key={pic.id} />
    ))}
  </div>
));

export default PicList;
