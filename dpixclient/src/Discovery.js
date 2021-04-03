import React, { useState } from "react";
import { discovery } from "./urls";
import PicListLoader from "./PicListLoader";

export default ({ token }) => {
  const [discoveryIds, setDiscoveryIds] = useState(undefined);

  if (!discoveryIds)
    fetch(discovery, {
      headers: { Token: token },
    }).then((res) => {
      if (res.ok)
        res.json().then((json) => {
          if (json.ok) {
            setDiscoveryIds(json.data.ids);
          }
        });
    });

  return (
    <div className="discovery">
      <h2 className="center">Discovery</h2>
      <PicListLoader ids={discoveryIds} token={token}/>
    </div>
  );
};
