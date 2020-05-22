import React from "react";
import PropTypes from "prop-types";

import Menu from "../Menu/Menu";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main-container">
        <Menu />
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
