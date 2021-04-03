import React, { useState } from "react";
import { Link } from "react-router-dom";
import { discovery, following } from "./navs";

export default ({ token, saveToken }) => {
  const [newToken, setNewToken] = useState("");
  return (
    <main>
      <div className="set-token">
        <input
          type="text"
          onChange={(e) => setNewToken(e.target.value)}
        ></input>
        <button onClick={() => saveToken(newToken)}>Save</button>
      </div>
      <Link to={discovery}>Discovery</Link>
      <Link to={following}>Following</Link>
    </main>
  );
};
