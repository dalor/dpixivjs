import React from "react";
import { Link } from "react-router-dom";
import "./PicContent.css";
import Ugoira from "../Ugoira";
import { fix, ugoiraUrl } from "../../urls";
import { connect } from "react-redux";
import { defaultSettings, qualityConverter } from "../../config";

const MainPics = ({ pic, onClick, quality }) => {
  if (pic.illustType === 2) {
    return (<Ugoira
      illustId={pic.illustId}
      illustTitle={pic.illustTitle}
      onClick={onClick}
    />)
  } else {
    const url = pic.urls[quality] || pic.urls[qualityConverter[quality]];
    return url ?
      [...Array(pic.pageCount).keys()].map((p, key) => (
        <img
          src={fix(url.replace("_p0", `_p${p}`))}
          key={key}
          onClick={onClick}
          alt={pic.illustTitle}
        />
      )
      ) : null;
  }
};

const PicContent = connect((data) => ({
  quality: Object.assign(defaultSettings, data.settings || {}).picQuality,
}))(({ pic, onClick, quality }) => (
  <div className="pic-content">
    <div className="pic-title">
      <Link className="pic-text" to={`/${pic.illustId}`}>
        {pic.illustTitle}
      </Link>
      <a
        className="pixiv-link"
        target="_blank"
        rel="noreferrer"
        href={`https://www.pixiv.net/en/artworks/${pic.illustId}`}
      > </a>
    </div>
    <div className="main-pics">
      <MainPics pic={pic} onClick={onClick} quality={quality} />
    </div>
  </div>
));

export default PicContent;
