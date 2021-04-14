import React from "react";
import Wrapper from "../MenuWrapper";
import CopyButton from "../CopyButton";
import LoginScreen from "../../images/helpLoginScreen.png";
import "./HelpLogin.css";

const HelpLogin = () => {
  const code = `document.body.appendChild(Object.assign(document.createElement("script"),{crossorigin:"Anonymous",defer:true,src:"https://${window.location.hostname}/script.js"}))`;

  return (
    <Wrapper width="80%" big={true}>
      <div className="help-login">
        <h2 className="center">How to login guide</h2>
        <img src={LoginScreen} alt="Login screen" />
        <p>
          Go to page{" "}
          <a href="https://accounts.pixiv.net/login">
            accounts.pixiv.net/login
          </a>{" "}
          and enter code:
        </p>
        <pre>{code}</pre>
        <CopyButton text={code} title="Copy to clipboard" />
      </div>
    </Wrapper>
  );
};

export default HelpLogin;
