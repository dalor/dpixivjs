import React, { useState } from "react";
import Wrapper from "../MenuWrapper"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LoginScreen from "../../images/helpLoginScreen.png"
import { url } from "../../urls"
import "./HelpLogin.css"

export default () => {

    const [copied, setCopied] = useState(false)

    const code = `document.body.appendChild(Object.assign(document.createElement("script"),{crossorigin:"Anonymous",defer:true,src:"${url}/script.js"}))`;

    return (
        <Wrapper width="80%" big={true}>
            <div className="help-login">
                <h2 className="center">How to login guide</h2>
                <img src={LoginScreen} />
                <p>
                    Go to page <a href="https://accounts.pixiv.net/login">accounts.pixiv.net/login</a> and enter code:
                </p>
                <pre>
                    {code}
                </pre>
                <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                    <button className="blue-button">
                        {copied ? "Copied!" : "Copy to clipboard"}
                    </button>
                </CopyToClipboard>
            </div>
        </Wrapper >
    );
};
