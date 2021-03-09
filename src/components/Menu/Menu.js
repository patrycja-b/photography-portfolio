import React from "react";

import NavigationList from "../NavigationList/NavigationList";
import "./Menu.scss";
import * as menu from "../../menu.json";

const menuItems = menu.default.children;

const generateMenuLinks = (arr) =>
  arr.filter((item) => {
    if (item.children) {
      generateMenuLinks(item.children);
    }
    return item.type === "directory";
  });

const items = generateMenuLinks(menuItems);

const itemsNav = (it) =>
  it.map(({ name, path, children, type }) => {
    return {
      name,
      path: path.replace("images", ""),
      type,
      sublinks: children ? itemsNav(children) : null,
    };
  });

const finalNav = itemsNav(items);

const Menu = () => (
  <aside>
    <h1 className="header">PATRYCJA BATKO PHOTOGRAPHY</h1>
    <nav>
      <NavigationList items={finalNav} />
    </nav>
  </aside>
);

export default Menu;
