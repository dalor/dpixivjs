import React, { useState } from "react";
import "./MenuButton.css";
import Menu from "../Menu";

const MenuButton = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={
          "menu-global-button" +
          (show ? " menu-global-button-active" : " menu-global-button-inactive")
        }
        onClick={() => setShow(!show)}
      />
      {show && (
        <div
          className="menu-block"
          onClick={(e) => {
            if (e.target.parentNode === e.currentTarget) {
              setShow(false);
            }
          }}
        >
          <Menu onButtonClick={() => setShow(false)} />
        </div>
      )}
    </>
  );
};

export default MenuButton;
