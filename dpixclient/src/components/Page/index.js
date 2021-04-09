import React, { useRef } from "react";
import "./Page.css"

const ScrollEvent = (bottomHeight, onBottom) => {

  let inBottom = false

  return ({ target }) => {
    if (target.scrollTopMax - target.scrollTop < bottomHeight) {
      if (!inBottom) {
        onBottom()
        inBottom = true
      }
    } else {
      inBottom = false
    }
  }
}

export default ({ children, className, onBottom }) => {

  const bottomHeight = 500;

  const onScroll = ScrollEvent(bottomHeight, onBottom)

  return (
    <div className={"page" + (className ? ` ${className}` : "")} onScroll={onBottom && onScroll}>
      {children}
    </div>
  )
};