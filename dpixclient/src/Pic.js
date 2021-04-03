import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Pic.css";
import { info, fix, similar } from "./urls";
import PicListLoader from "./PicListLoader";

const MainPics = ({ url, pages, hide }) => (
  <div className="main-pics">
    {[...Array(pages).keys()].map((p, key) => (
      <img
        src={fix(url.replace("_p0", `_p${p}`))}
        key={key}
        onClick={() => hide && hide()}
      />
    ))}
  </div>
);

export const PicContent = ({ pic, hide, show, token }) => {
  const [similarIds, setSimilarIds] = useState(undefined);

  const [showSimilar, setShowSimilar] = useState(show || false); //false

  if (pic && token && !similarIds)
    fetch(similar(pic.illustId), {
      headers: { Token: token },
    }).then((res) => {
      if (res.ok)
        res.json().then((json) => {
          if (json.ok) {
            setSimilarIds(json.data.ids);
          }
        });
    });

  return (
    <div className="pic">
      <div className="content">
        <h2 className="center pic-title">
          <Link to={`/${pic.illustId}`}>{pic.illustTitle}</Link>
          <a
            className="pixiv-link"
            target="_blank"
            href={`https://www.pixiv.net/en/artworks/${pic.illustId}`}
          />
        </h2>
        <MainPics url={pic.urls.original} pages={pic.pageCount} hide={hide} />
        {token && (
          <>
            <div className="similar-pics">
              <PicListLoader
                ids={similarIds}
                hide={!showSimilar}
                token={token}
              />
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ({ token }) => {
  const { id } = useParams();
  const [pic, setPic] = useState(undefined);

  if (pic && pic.illustId != id) setPic(undefined);
  if (pic === undefined)
    fetch(info(id)).then((res) => {
      if (res.ok) {
        res.json().then((json) => {
          if (json.ok) setPic(json.data);
          else setPic(null);
        });
      } else setPic(null);
    });
  return pic === undefined ? (
    <h2 className="center">Loading...</h2>
  ) : pic ? (
    <PicContent pic={pic} show={true} token={token} />
  ) : (
    <h1 className="center">Wrong id!</h1>
  );
};
