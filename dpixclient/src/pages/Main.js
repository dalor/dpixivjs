import React from "react";
import { connect } from "react-redux";
import Menu from "../components/Menu"
import HelpLogin from "../components/HelpLogin"
import Page from "../components/Page"

export default connect((data) => ({ user: data.user }))(({ user }) => {
  return (
    user?.id ?
      <Menu />
      :
      <Page>
        <HelpLogin />
      </Page>
  );
});
