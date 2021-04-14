import React from "react";
import { Link } from "react-router-dom";
import "./PicContent.css";
import { fix } from "../../urls";
import { connect } from "react-redux";
import { defaultSettings, qualityConverter } from "../../config";

const MainPics = ({ pic, onClick, quality }) => {
  const url = pic.urls[quality] || pic.urls[qualityConverter[quality]];
  return url ? (
    <div className="main-pics">
      {[...Array(pic.pageCount).keys()].map((p, key) => (
        <img
          src={fix(url.replace("_p0", `_p${p}`))}
          key={key}
          onClick={onClick}
          alt={pic.illustTitle}
        />
      ))}
    </div>
  ) : null;
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
    <MainPics pic={pic} onClick={onClick} quality={quality} />
  </div>
));

export default PicContent;
