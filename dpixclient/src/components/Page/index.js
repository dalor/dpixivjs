import React from "react";
import "./Page.css";

const ScrollEvent = (bottomHeight, onBottom) => {
  let inBottom = false;

  return ({ target }) => {
    if (target.scrollTopMax - target.scrollTop < bottomHeight) {
      if (!inBottom) {
        onBottom();
        inBottom = true;
      }
    } else {
      inBottom = false;
    }
  };
};

const Page = ({ children, className, onBottom }) => {
  const bottomHeight = 500;

  const onScroll = ScrollEvent(bottomHeight, onBottom);

  const setGlobals = (e) => {
    const target = e.currentTarget;
    window.page = {
      goTop: () => {
        console.log(target);
        target.scrollTop = 0;
      },
    };
  };

  return (
    <div
      className={"page" + (className ? ` ${className}` : "")}
      onScroll={onBottom && onScroll}
      onLoad={setGlobals}
    >
      {children}
    </div>
  );
};

export default Page;
