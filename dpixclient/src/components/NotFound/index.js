import React from "react";
import "./NotFound.css";
import NotFoundImage from "../../images/notFound.webp";

const NotFound = () => (
  <div className="not-found">
    <img src={NotFoundImage} alt="Not found..." />
  </div>
);

export default NotFound;
