import React from "react";
import PropTypes from "prop-types";

import Navigation from "../Navigation/Navigation";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main-container">
        <Navigation />
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
