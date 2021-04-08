import React from "react";
import "./Menu.css"
import MenuWrapper from "../MenuWrapper"
import { Link } from "react-router-dom";
import { discovery, following } from "../../navs";
import { botAuth } from "../../urls"
import { connect } from "react-redux";

import discoveryIcon from "../../images/discoveryIcon.png"
import followingIcon from "../../images/followingIcon.png"
import settingsIcon from "../../images/settingsIcon.png"
import botIcon from "../../images/botIcon.png"

const ButtonText = ({ icon, text }) => (
    <div className="button-text">
        <img className="button-icon" src={icon} alt={text} />
        <span> {text}</span>
    </div>
)

const MenuButton = ({ icon, text, link, external }) => (
    external ?
        <a className="menu-button" href={link}><ButtonText icon={icon} text={text} /></a> :
        <Link className="menu-button" to={link}><ButtonText icon={icon} text={text} /></Link>
)

export default connect((data) => ({ token: data.token, user: data.user }))(({ token, user }) => (
    <MenuWrapper width="600px" height="560px">
        <div className="menu-user-info">
            <div className="user-nickname">
                {user.name}
            </div>
            <div className="user-followings">
                Following: {user.following}
            </div>
        </div>
        <div className="menu-buttons">
            <MenuButton
                text="Discovery"
                link={discovery}
                icon={discoveryIcon}
            />
            <MenuButton
                text="Following"
                link={following}
                icon={followingIcon}
            />
            <MenuButton
                text="Settings"
                link={"/"}
                icon={settingsIcon}
            />
            <MenuButton
                text="Login to Bot"
                link={botAuth(token)}
                icon={botIcon}
                external={true}
            />
        </div>
    </MenuWrapper>
))