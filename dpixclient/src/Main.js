import React, { useState } from "react";
import { Link } from "react-router-dom";
import { discovery, following } from "./navs";
import { botAuth } from "./urls"

export default ({ token, saveToken }) => {
  const [newToken, setNewToken] = useState(token || "");
  return (
    <main>
      <div className="set-token">
        <input
          type="text"
          onChange={(e) => setNewToken(e.target.value)}
          value={newToken}
        ></input>
        <button onClick={() => saveToken(newToken)}>Save</button>
      </div>
      <Link to={discovery}>Discovery</Link>
      <Link to={following}>Following</Link>
      <p>
        <a href={botAuth(token)}>Bot auth</a>
      </p>
    </main>
  );
};
