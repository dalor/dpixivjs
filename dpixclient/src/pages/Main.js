import React from "react";
import { connect } from "react-redux";
import Menu from "../components/Menu"
import HelpLogin from "../components/HelpLogin"

export default connect((data) => ({ user: data.user }))(({ user }) => {
  return (
    user?.id ? <Menu /> : <div className="page"><HelpLogin /></div>
  );
});
