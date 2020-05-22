import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";

import NavigationList from "../NavigationList/NavigationList";
import "./Menu.scss";

const query = graphql`
  {
    site {
      siteMetadata {
        menuLinks {
          name
          link
          sublinks {
            name
            link
          }
        }
      }
    }
  }
`;

const Menu = ({ children }) => {
  const { isNavOpen, toggleNav } = useState(false);
  const {
    site: {
      siteMetadata: { menuLinks },
    },
  } = useStaticQuery(query);
  return (
    <aside>
      <h1 className="header">PATRYCJA BATKO PHOTOGRAPHY</h1>
      <nav>
        <NavigationList items={menuLinks} />
      </nav>
    </aside>
  );
};

export default Menu;
