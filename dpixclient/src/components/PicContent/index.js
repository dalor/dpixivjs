import React from "react";
import { Link } from "react-router-dom";
import "./PicContent.css";
import { fix } from "../../urls";

const MainPics = ({ url, pages, onClick }) => (
    <div className="main-pics">
        {[...Array(pages).keys()].map((p, key) => (
            <img
                src={fix(url.replace("_p0", `_p${p}`))}
                key={key}
                onClick={onClick}
                alt={url}
            />
        ))}
    </div>
);

export default ({ pic, onClick }) => (
    <div className="pic-content">
        <div className="pic-title">
            <Link className="pic-text" to={`/${pic.illustId}`}>{pic.illustTitle}</Link>
            <a
                className="pixiv-link"
                target="_blank"
                href={`https://www.pixiv.net/en/artworks/${pic.illustId}`}
            />
        </div>
        <MainPics url={pic.urls.original} pages={pic.pageCount} onClick={onClick} />
    </div>
)