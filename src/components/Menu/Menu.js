import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import NavigationList from "../NavigationList/NavigationList";
import "./Menu.scss";
import * as menu from "../../menu.json";

const menuItems = menu.default.children;

const generateMenuLinks = (arr) =>
  arr.filter((item) => {
    // console.log(item);
    if (item.children) {
      generateMenuLinks(item.children);
    }
    return item.type === "directory";
  });

const items = generateMenuLinks(menuItems);

console.log(items, "ITITI");

const itemsNav = (it) =>
  it.map(({ name, path, children, type }) => {
    return {
      name,
      path: path.replace("images", ""),
      type,
      sublinks: children ? itemsNav(children) : null,
    };
  });

console.log("FINAL", itemsNav(items));

const finalNav = itemsNav(items);

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

const Menu = () => {
  const {
    site: {
      siteMetadata: { menuLinks },
    },
  } = useStaticQuery(query);

  return (
    <aside>
      <h1 className="header">PATRYCJA BATKO PHOTOGRAPHY</h1>
      <nav>
        <NavigationList items={finalNav} />
      </nav>
    </aside>
  );
};

export default Menu;
