import React, { useState, useRef } from "react";
import { fix } from "./urls";
import { PicContent } from "./Pic";
import "./PicList.css";

const SmallPic = ({ pic, i, loadMore }) => {
  const [fullPic, setFullPic] = useState(false);

  const ref = useRef(null);

  return (
    <div className={"small-pic" + (fullPic ? " only-one" : "")} ref={ref}>
      {fullPic ? (
        <PicContent
          pic={pic}
          hide={() => {
            setFullPic(false);
            window.scrollTo(0, ref.current.offsetTop);
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
          <img src={fix(pic.urls.medium)} onClick={() => setFullPic(true)} />
          <div
            className="more-button"
            onClick={e => {
              e.preventDefault();
              loadMore(pic, i);
            }}
          />
        </a>
      )}
    </div>
  );
};

export default ({ pics, loadMore }) => (
  <div className="pic-list">
    {pics.map((pic, key) => (
      <SmallPic pic={pic} key={key} loadMore={loadMore} i={key} />
    ))}
  </div>
);
