import React, { useState } from "react";
import { infoFetch } from "../../services/pic";
import Loading from "../Loading"
import PicContent from "../PicContent"
import "./Pic.css"

export default ({ id }) => {

  const [pic, setPic] = useState(undefined);

  if (pic === undefined)
    infoFetch(id).then(setPic)

  return (
    <div className="pic" style={!pic ? { height: '100%' } : {}}>
      {pic ? <PicContent pic={pic} /> : <Loading />}
    </div>
  )

};
