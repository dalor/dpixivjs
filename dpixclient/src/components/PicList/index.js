import React, { useState, useRef } from "react";
import { fix } from "../../urls";
import PicContent from "../PicContent";
import "./PicList.css";

const SmallPic = ({ pic, loadMore }) => {

  const [fullPic, setFullPic] = useState(false);

  const [loaded, setLoaded] = useState(false);

  const ref = useRef(null);

  return (
    <div className={"small-pic" + (loaded ? " loaded" : "") + (fullPic ? " only-one" : "")} ref={ref}>
      {fullPic ? (
        <PicContent
          pic={pic}
          onClick={() => {
            setFullPic(false);
            ref.current.scrollIntoView()
          }}
        />
      ) : (
        <a
          href={`/${pic.illustId}`}
          onClick={e => {
            e.preventDefault();
          }}
        >
          {pic.pageCount > 1 && pic.urls && (
            <div className="small-page-count">{pic.pageCount}</div>
          )}
          <img
            src={fix(pic.urls.medium)}
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

export default ({ pics, loadMore }) => (
  <div className="pic-list">
    {pics.map((pic) => (
      <SmallPic pic={pic} loadMore={loadMore} key={pic.id} />
    ))}
  </div>
);
