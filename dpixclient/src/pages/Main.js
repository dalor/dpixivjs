import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Menu from "../components/Menu";

const MainPage = connect((data) => ({ user: data.user }))(({ user }) => {
  return user?.id ? <Menu /> : <Redirect to="/help" />;
});

export default MainPage;
